#!/usr/bin/env node
// Mechanical invariants for Sprite Design Datum. Node 18+, zero dependencies.
//
//   node tools/check.mjs           check the repository as it stands
//   node tools/check.mjs 1.1.0     also assert the tag about to be cut agrees
//
// Every check below corresponds to something that already went wrong in this repository.
// None of them judge content. They assert only that the documents agree with each other
// and with the files around them. Green here means the artifact is internally consistent;
// it does not mean any claim inside it is still true. That is REVALIDATION.md's job, and
// only a human or a caretaker reading the source can settle it.

import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TAG = (process.argv[2] || '').replace(/^v/, '')

const read = (rel) => (existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : null)

// ---------------------------------------------------------------------------
// Flattening.
//
// .prettierrc.json sets proseWrap "always", so a sentence is broken at column 100
// wherever the break happens to land, and a line-oriented regex reports false
// positives: "Two things a lawyer must" / "settle" is two lines, not one. Every
// check that matches a phrase matches it against blocks joined back into one
// string, with a segment table so a match still reports its true source line.
// ---------------------------------------------------------------------------

const NEW_BLOCK = /^(#{1,6}\s|\d+[.)]\s|[-*+]\s|\||-{3,}$|={3,}$|_{3,}$)/

function blocksOf(src) {
  const lines = src.split('\n')
  const out = []
  let cur = null
  let fenced = false
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].replace(/\r$/, '')
    if (/^\s*(```|~~~)/.test(raw)) {
      fenced = !fenced
      cur = null
      continue
    }
    if (fenced) {
      out.push({ text: raw.trim(), line: i + 1, segs: [{ at: 0, line: i + 1 }] })
      cur = null
      continue
    }
    // Strip blockquote markers and indentation so a wrapped quote or list item joins.
    const s = raw.replace(/^\s*(?:>\s?)*/, '').trim()
    if (s === '') {
      cur = null
      continue
    }
    if (cur && !NEW_BLOCK.test(s)) {
      cur.segs.push({ at: cur.text.length + 1, line: i + 1 })
      cur.text += ' ' + s
    } else {
      cur = { text: s, line: i + 1, segs: [{ at: 0, line: i + 1 }] }
      out.push(cur)
    }
  }
  return out
}

const cache = new Map()
function blocks(rel) {
  if (!cache.has(rel)) {
    const src = read(rel)
    cache.set(rel, src === null ? [] : blocksOf(src))
  }
  return cache.get(rel)
}

// Source line of a character offset inside a joined block.
function lineAt(block, offset) {
  let line = block.line
  for (const seg of block.segs) if (seg.at <= offset) line = seg.line
  return line
}

// ---------------------------------------------------------------------------
// What counts as "in the repository".
// ---------------------------------------------------------------------------

let trackedFiles
function tracked() {
  if (trackedFiles !== undefined) return trackedFiles
  try {
    trackedFiles = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  } catch {
    trackedFiles = null
  }
  return trackedFiles
}

// Documents the checks read: tracked markdown when git can answer, the root listing
// when it cannot, plus LICENSE, which is plain text but carries two of the invariants.
function documents() {
  const list = tracked() || readdirSync(ROOT).filter((f) => f.endsWith('.md'))
  const docs = list.filter((f) => f.toLowerCase().endsWith('.md'))
  if (existsSync(join(ROOT, 'LICENSE'))) docs.push('LICENSE')
  return docs
}

// ---------------------------------------------------------------------------
// Check harness.
// ---------------------------------------------------------------------------

const results = []
function check(name, fn) {
  const r = { name, found: [], note: '' }
  fn(
    (where, msg) => r.found.push({ where, msg }),
    (msg) => (r.note = msg),
  )
  results.push(r)
}

// ---------------------------------------------------------------------------
// 1 - a count word must agree with the ordered list it introduces.
//
// SPRITE-DESIGN-DATUM.md's licence header is a condensed second copy of LICENSE's
// list of what a lawyer must settle. Two items were added; LICENSE was updated to
// "Four", the header kept saying "Two" over three items.
// ---------------------------------------------------------------------------

const WORDS = 'one two three four five six seven eight nine ten'.split(' ')
const COUNT_RE = new RegExp(
  `\\b(${WORDS.join('|')})\\s+(things|rules|limits|reasons|items)\\b`,
  'gi',
)

check('count word vs list length', (fail) => {
  for (const doc of documents()) {
    const bs = blocks(doc)
    for (let i = 0; i < bs.length; i++) {
      const hits = [...bs[i].text.matchAll(COUNT_RE)]
      if (!hits.length) continue
      const next = bs[i + 1]
      // Only a count word that actually introduces an ordered list is checkable.
      if (!next || !/^1[.)]\s/.test(next.text)) continue
      let items = 0
      for (let j = i + 1; j < bs.length; j++) {
        const m = /^(\d+)[.)]\s/.exec(bs[j].text)
        if (!m || Number(m[1]) !== items + 1) break
        items++
      }
      const hit = hits[hits.length - 1]
      const said = WORDS.indexOf(hit[1].toLowerCase()) + 1
      if (said !== items) {
        fail(
          `${doc}:${lineAt(bs[i], hit.index)}`,
          `"${hit[0]}" introduces a list of ${items}, expected ${said} ` +
            `(list starts at ${doc}:${next.line})`,
        )
      }
    }
  }
})

// ---------------------------------------------------------------------------
// 2 - a closed file enumeration in LICENSE must match what is tracked.
//
// LICENSE named five files as "everything in this repository" while the repository
// tracked nine, leaving four outside the grant on a narrow reading. If the sentence
// stops naming files there is nothing left to disagree with and this check goes
// quiet, which is correct: removing the list also removes the closed claim.
// ---------------------------------------------------------------------------

check('LICENSE enumeration vs tracked files', (fail, note) => {
  const lic = blocks('LICENSE')
  if (!lic.length) return fail('LICENSE', 'file is missing')
  const files = tracked()
  if (!files) return fail('LICENSE', 'git ls-files unavailable, enumeration NOT checked')

  const RE = /Everything in this repository\s*[–—-]\s*(.+?)\s*[–—-]\s*is licensed/i
  let seen = 0
  for (const b of lic) {
    const m = RE.exec(b.text)
    if (!m) continue
    seen++
    const named = m[1]
      .split(/,|\band\b/)
      .map((s) => s.trim().replace(/[`*]/g, ''))
      .filter((s) => /^[\w./-]+\.[A-Za-z0-9]+$/.test(s))
    const where = `LICENSE:${lineAt(b, m.index)}`
    const ghost = named.filter((f) => !files.includes(f))
    const missing = files.filter((f) => !named.includes(f))
    if (ghost.length) fail(where, `enumerates files that are not tracked: ${ghost.join(', ')}`)
    if (missing.length)
      fail(
        where,
        `closed enumeration of ${named.length} omits ${missing.length} tracked ` +
          `file(s): ${missing.join(', ')}`,
      )
  }
  if (!seen) note('LICENSE names no file list, nothing to disagree with')
})

// ---------------------------------------------------------------------------
// 3 - the provenance figures are duplicated verbatim across three files.
//
// A second copy of a number is the defect this standard spends several pages
// warning about. These copies exist anyway, so they are pinned.
// ---------------------------------------------------------------------------

const FIGURES = {
  claims: /(\d+)\s+claims\b/gi,
  held: /(\d+)\s+held\b/gi,
  corrected: /(\d+)\s+corrected\b/gi,
  unverifiable: /(\d+)\s+unverifiable\b/gi,
  'published values': /(\d+)\s+published values\b/gi,
  'unsourced quantities': /(\d+)\s+quantit(?:y|ies) with no published source\b/gi,
  overclaims: /(\d+)\s+overclaims?\b/gi,
}

check('cross-file numeric agreement', (fail, note) => {
  const seen = {}
  for (const doc of documents()) {
    for (const b of blocks(doc)) {
      for (const [key, re] of Object.entries(FIGURES)) {
        for (const m of b.text.matchAll(re)) {
          const hit = { n: Number(m[1]), where: `${doc}:${lineAt(b, m.index)}` }
          if (seen[key]) seen[key].push(hit)
          else seen[key] = [hit]
        }
      }
    }
  }
  for (const [key, hits] of Object.entries(seen)) {
    if (new Set(hits.map((h) => h.n)).size > 1)
      fail(
        hits[0].where,
        `"${key}" disagrees across copies: ` + hits.map((h) => `${h.n} at ${h.where}`).join(', '),
      )
  }
  const one = (key) => (seen[key] ? seen[key][0] : null)
  const claims = one('claims')
  const held = one('held')
  const corrected = one('corrected')
  const unver = one('unverifiable')
  if (claims && held && corrected && unver) {
    const sum = held.n + corrected.n + unver.n
    if (sum !== claims.n)
      fail(
        claims.where,
        `${held.n} held + ${corrected.n} corrected + ${unver.n} unverifiable = ${sum}, ` +
          `not the ${claims.n} claims stated`,
      )
  } else if (Object.keys(seen).length) {
    fail('provenance figures', 'the claims/held/corrected/unverifiable set is incomplete')
  }
  const copies = Object.values(seen).reduce((n, h) => n + h.length, 0)
  note(`${copies} copies of ${Object.keys(seen).length} figures`)
})

// ---------------------------------------------------------------------------
// 4 - version strings live in separate files and nothing else binds them.
// ---------------------------------------------------------------------------

const lineOfIndex = (src, i) => src.slice(0, i).split('\n').length

check('version-string coupling', (fail, note) => {
  const found = []

  const datum = read('SPRITE-DESIGN-DATUM.md')
  const dm = datum && /\*\*Version\s+(\d+\.\d+\.\d+[\w.-]*)\*\*/.exec(datum)
  if (dm) found.push({ v: dm[1], where: `SPRITE-DESIGN-DATUM.md:${lineOfIndex(datum, dm.index)}` })
  else fail('SPRITE-DESIGN-DATUM.md', 'no "**Version X.Y.Z**" in the front matter')

  const log = read('CHANGELOG.md')
  const lm = log && /^##\s+v?(\d+\.\d+\.\d+[\w.-]*)\b/m.exec(log)
  if (lm) found.push({ v: lm[1], where: `CHANGELOG.md:${lineOfIndex(log, lm.index)}` })
  else fail('CHANGELOG.md', 'no "## X.Y.Z" release heading')

  const cff = read('CITATION.cff')
  const cm = cff && /^version:\s*['"]?(\d+\.\d+\.\d+[\w.-]*)['"]?/m.exec(cff)
  if (cm) found.push({ v: cm[1], where: `CITATION.cff:${lineOfIndex(cff, cm.index)}` })
  else if (cff) fail('CITATION.cff', 'exists but declares no "version:" field')

  if (TAG) found.push({ v: TAG, where: 'argv (tag about to be cut)' })

  if (new Set(found.map((f) => f.v)).size > 1)
    fail(
      found[0].where,
      'versions disagree: ' + found.map((f) => `${f.v} at ${f.where}`).join(', '),
    )
  else if (found.length) note(`${found[0].v} in ${found.length} place(s)`)
})

// ---------------------------------------------------------------------------
// 5 - every rule id must resolve to a heading that defines it.
//
// Other projects' conformance records are meant to cite these ids, so a reference
// to a rule no heading defines is a broken contract, not a typo.
//
// The id pattern is [APLE] followed by a digit, so LAYER ids — B, B-ext, C — cannot match
// and never have. That is deliberate: they are layer names, not rule ids, nothing cites them
// by number, and there is no heading-per-layer contract to break. Nothing here inspects Layer
// B or Layer C content and nothing is meant to. Whether a value is filed in the right layer is
// a judgement about the value, which no regex reaches.
// ---------------------------------------------------------------------------

check('rule-id resolution', (fail, note) => {
  const docs = documents()
  const defined = new Set()
  for (const doc of docs) {
    for (const m of (read(doc) || '').matchAll(/^#{1,6}\s+([APLE]\d)\b/gm)) defined.add(m[1])
  }
  if (!defined.size) return fail('SPRITE-DESIGN-DATUM.md', 'no rule-defining headings found at all')

  let refs = 0
  for (const doc of docs) {
    const lines = (read(doc) || '').split('\n')
    for (let i = 0; i < lines.length; i++) {
      for (const m of lines[i].matchAll(/\b([APLE]\d)\b/g)) {
        refs++
        if (!defined.has(m[1]))
          fail(`${doc}:${i + 1}`, `references ${m[1]}, which no heading defines`)
      }
    }
  }
  note(`${refs} references across ${docs.length} files, ${defined.size} ids defined`)
})

// ---------------------------------------------------------------------------
// 6 - prettier. The repo ships .prettierrc.json and nothing enforced it.
// A run that could not happen is reported as a failure, never as a pass.
// ---------------------------------------------------------------------------

const ANSI = new RegExp(String.fromCharCode(27) + '\\[[0-9;]*m', 'g')

check('prettier --check', (fail, note) => {
  // Scoped to tracked files rather than ".", so a contributor's local editor or
  // agent scratch directory cannot fail the repository's own format check.
  // --ignore-unknown because the tracked set includes LICENSE and .gitignore, which
  // prettier has no parser for; without it every run fails for a reason that has
  // nothing to do with formatting, and a reader learns to ignore the check.
  const scope = tracked() || ['.']
  const r = spawnSync('npx', ['--yes', 'prettier@3', '--check', '--ignore-unknown', ...scope], {
    cwd: ROOT,
    shell: true,
    encoding: 'utf8',
    timeout: 180000,
  })
  if (r.error || r.status === null)
    return fail('npx prettier', `could not run, NOT checked (${r.error?.message || 'timed out'})`)
  const out = `${r.stdout || ''}${r.stderr || ''}`.replace(ANSI, '')
  if (r.status === 0) return note(`${scope.length} tracked files formatted`)
  let named = 0
  for (const line of out.split('\n')) {
    const m = /^\[warn\]\s+(\S.*)$/.exec(line.trim())
    if (m && !/Code style issues/.test(m[1])) {
      named++
      fail(m[1], 'is not formatted per .prettierrc.json')
    }
  }
  if (!named)
    fail('npx prettier', `exited ${r.status}: ${out.trim().split('\n').slice(-3).join(' / ')}`)
})

// ---------------------------------------------------------------------------

let bad = 0
console.log('sprite design datum - mechanical checks\n')
for (const { name, found, note } of results) {
  console.log(`  ${found.length ? 'FAIL' : 'PASS'}  ${name}${note ? `  (${note})` : ''}`)
  for (const f of found) console.log(`        ${f.where}\n          ${f.msg}`)
  bad += found.length
}
const passed = results.filter((r) => !r.found.length).length
console.log(
  `\n${passed}/${results.length} checks pass` +
    (bad ? `, ${bad} finding(s)` : '') +
    '\n\nGreen means these documents agree with each other and with the files around them.' +
    '\nIt does not mean any external claim in them is still true - see REVALIDATION.md.',
)
process.exit(bad ? 1 : 0)
