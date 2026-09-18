#!/usr/bin/env node
// External-standard watch for Sprite Design Datum. Node 18+, zero dependencies.
//
//   node tools/watch-sources.mjs             sweep, append the verdicts to REVALIDATION.md
//   node tools/watch-sources.mjs --dry-run   sweep, print, write nothing
//
// WHAT THIS DOES: reads SOURCES.md, fetches every live locator, and records whether the
// URL still answers.
//
// WHAT THIS DOES NOT DO: check whether the page still SAYS what the standard says it
// says. A 200 means a server answered. It does not mean the vendor kept the default, the
// store kept the ceiling, or the spec kept the wording. Only a human or a caretaker
// reading the page can settle that, and this script's output is deliberately worded so it
// can never be mistaken for having done so. A watch that implies it verified content is
// worse than no watch: it manufactures confidence nobody earned.
//
// The vocabularies are therefore kept apart on purpose:
//
//   reachable / moved / dead        what this script can observe   (machine)
//   held / moved / unreachable      what a re-read concludes       (human)

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCES = join(ROOT, 'SOURCES.md')
const REGISTER = join(ROOT, 'REVALIDATION.md')
const DRY = process.argv.includes('--dry-run')
const TODAY = new Date().toISOString().slice(0, 10)

// Be a guest. Sequential, spaced, honest about who is calling, and no retries: a source
// that is down stays down for a month, and hammering it changes nothing except our
// standing with the people whose documentation this standard depends on.
const DELAY_MS = 1200
const TIMEOUT_MS = 20000
const UA =
  'sprite-design-datum-watch/1.0 (link revalidation for a published standard; ' +
  'contact github.com/HetCreep)'

const KNOWN_CLASSES = ['SPECIFICATION', 'VENDOR_DOC', 'TOOL_DEFAULT', 'RECOMMENDATION']

// Exit 2 means "nothing was watched". A watch that cannot watch must not report the
// same exit code as a watch that swept cleanly: on a schedule, exit 0 renders as a green
// tick, and a repository that loses or renames SOURCES.md would collect a green tick
// every month forever while nothing at all was being checked. Findings never fail the
// run; only being unable to look does.
const CANNOT_WATCH = 2

// ---------------------------------------------------------------------------

if (!existsSync(SOURCES)) {
  console.error('SOURCES.md is missing, so there are no locators to sweep.')
  console.error('Nothing was checked and nothing was written. This is not a pass.')
  console.error('')
  console.error('If SOURCES.md was renamed or moved, point SOURCES at it in this script.')
  console.error('If it has not been written yet, that is the thing to do next: the standard')
  console.error('instructs a reader to verify version-sensitive claims against the cited')
  console.error('source, and without the locator table that instruction cannot be carried out.')
  console.error('Do not silence this by deleting the workflow.')
  process.exit(CANNOT_WATCH)
}

// --- parse the locator table -----------------------------------------------
// Schema: | id | cited as | line | class | url | version | accessed | revalidate |
// Read by column NAME, not position, so a later column insertion does not silently
// shift every field by one.

const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((s) => s.trim())

function parseRows(src) {
  const lines = src.split('\n')
  const rows = []
  let cols = null
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim()
    if (!t.startsWith('|')) {
      cols = null
      continue
    }
    const c = cells(t)
    if (/^:?-{2,}:?$/.test(c[0])) continue // the |---|---| separator
    if (!cols) {
      if (c.map((h) => h.toLowerCase()).includes('id')) cols = c.map((h) => h.toLowerCase())
      continue
    }
    const row = { line: i + 1 }
    cols.forEach((name, j) => (row[name] = c[j] ?? ''))
    if (row.id) rows.push(row)
  }
  return rows
}

// A cell may hold a bare URL, a markdown link, an autolink, or backticks.
const urlOf = (cell) => (/(https?:\/\/[^\s)\]>`]+)/.exec(cell || '') || [])[1] || ''

// Is the redirect target the same document, or a different one?
//
// The first sweep reported two "moved" rows and only one of them had moved. Apple really did
// reorganise a page; Google Play bounced to the same page with `?hl=he` attached, chosen from
// the caller's IP. Both are redirects and `res.redirected` cannot tell them apart, so a raw
// comparison files a locale bounce as a finding — every month, forever, on rows nothing is wrong
// with. That is how a report teaches people to stop reading it.
//
// Same origin and same path, differing only in query or fragment, is the same document. A changed
// path is a real move and still reports. Deliberately narrow: it does not try to strip locale
// SEGMENTS (`/en-us/`), because a path is where a real move shows up and guessing which segments
// are decorative would start hiding the thing this exists to catch.
function sameDocument(from, to) {
  try {
    const a = new URL(from)
    const b = new URL(to)
    const strip = (p) => p.replace(/\/+$/, '')
    return a.host === b.host && strip(a.pathname) === strip(b.pathname)
  } catch {
    return false
  }
}

// accessed + revalidate, or null when either is unparseable.
function dueDate(accessed, revalidate) {
  const m = /^(\d+)\s*([dwmy])$/i.exec((revalidate || '').trim())
  if (!m || !/^\d{4}-\d{2}-\d{2}$/.test((accessed || '').trim())) return null
  const d = new Date(accessed.trim() + 'T00:00:00Z')
  if (Number.isNaN(d.getTime())) return null
  const n = Number(m[1])
  const unit = m[2].toLowerCase()
  if (unit === 'd') d.setUTCDate(d.getUTCDate() + n)
  else if (unit === 'w') d.setUTCDate(d.getUTCDate() + n * 7)
  else if (unit === 'm') d.setUTCMonth(d.getUTCMonth() + n)
  else d.setUTCFullYear(d.getUTCFullYear() + n)
  return d
}

const rows = parseRows(readFileSync(SOURCES, 'utf8'))
if (!rows.length) {
  console.error('SOURCES.md exists but holds no parseable locator rows. Nothing was checked.')
  console.error('')
  console.error('This script reads the first markdown table whose header row contains a cell')
  console.error('named "id". If the locator table was reshaped, reconcile the header with the')
  console.error('schema documented at the top of this file rather than removing the watch.')
  process.exit(CANNOT_WATCH)
}

// --- sweep ------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const verdicts = []
const overdue = []
const schemaNotes = []
const classNotes = []

for (const row of rows) {
  const raw = (row.url || '').trim()
  const url = urlOf(raw)
  const rev = (row.revalidate || '').trim().toLowerCase()

  // A class outside the four is a flag, not an error. SOURCES.md classes the measured
  // corpora EXTERNAL-MEASURED on purpose — a corpus is material a measurement was taken
  // FROM, not a document making a claim, and forcing it into one of the four would be
  // exactly the mis-attribution this register exists to prevent. Reported so a reader
  // sees it, worded so nobody spends a morning "fixing" a deliberate decision.
  if (row.class && !KNOWN_CLASSES.includes(row.class.trim().toUpperCase()))
    classNotes.push(`${row.id}: class \`${row.class.trim()}\` is outside the four-class schema`)

  const due = dueDate(row.accessed, row.revalidate)
  if (due && due < new Date()) {
    overdue.push({
      id: row.id,
      accessed: row.accessed,
      revalidate: row.revalidate,
      since: due.toISOString().slice(0, 10),
    })
  } else if (!due && rev !== 'never') {
    schemaNotes.push(
      `${row.id}: cannot compute a due date from accessed "${row.accessed}" + ` +
        `revalidate "${row.revalidate}"`,
    )
  }

  // Prefix, not equality: the cells that ship read "UNREACHABLE — 403 across
  // registry.khronos.org", so an exact match never fires and every one of those rows
  // gets filed under the wrong reason. In a register whose whole value is that its
  // labels are honest, a wrong reason is not cosmetic. Testing first also guarantees a
  // row explaining its 403 by quoting the URL is never fetched.
  if (raw.toUpperCase().startsWith('UNREACHABLE')) {
    verdicts.push({
      id: row.id,
      url: raw,
      http: '-',
      verdict: 'skipped',
      note: 'marked UNREACHABLE',
    })
    continue
  }
  if (rev === 'never') {
    verdicts.push({ id: row.id, url, http: '-', verdict: 'skipped', note: 'revalidate never' })
    continue
  }
  if (!url) {
    verdicts.push({
      id: row.id,
      url: raw,
      http: '-',
      verdict: 'skipped',
      note: 'no URL in the row',
    })
    continue
  }

  process.stderr.write(`  ${row.id} ${url} ... `)
  let res = null
  let err = ''
  try {
    res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (e) {
    err = e?.message || String(e)
  }

  if (!res) {
    verdicts.push({ id: row.id, url, http: '-', verdict: 'dead', note: `fetch failed: ${err}` })
    process.stderr.write(`dead (${err})\n`)
  } else if (!res.ok) {
    verdicts.push({
      id: row.id,
      url,
      http: res.status,
      verdict: 'dead',
      note: res.statusText || '',
    })
    process.stderr.write(`dead (${res.status})\n`)
  } else if (res.redirected && res.url !== url && !sameDocument(url, res.url)) {
    verdicts.push({ id: row.id, url, http: res.status, verdict: 'moved', note: `now ${res.url}` })
    process.stderr.write(`moved -> ${res.url}\n`)
  } else if (res.redirected && res.url !== url) {
    verdicts.push({
      id: row.id,
      url,
      http: res.status,
      verdict: 'reachable',
      note: `redirected within the same document (${new URL(res.url).search || 'trailing slash'})`,
    })
    process.stderr.write(`reachable (same doc, redirected)\n`)
  } else {
    verdicts.push({ id: row.id, url, http: res.status, verdict: 'reachable', note: '' })
    process.stderr.write(`reachable\n`)
  }
  await sleep(DELAY_MS)
}

// --- write the sweep into the register --------------------------------------

const fetched = verdicts.filter((v) => v.verdict !== 'skipped')
const count = (v) => fetched.filter((x) => x.verdict === v).length
const esc = (s) => String(s).replace(/\|/g, '\\|')

let out = `\n## Sweep ${TODAY}\n\n`
out += `Run by \`tools/watch-sources.mjs\`. ${rows.length} rows in \`SOURCES.md\`, ${fetched.length} fetched, `
out += `${verdicts.length - fetched.length} skipped (UNREACHABLE or revalidate \`never\`). `
out += `${count('reachable')} reachable, ${count('moved')} moved, ${count('dead')} dead.\n\n`
out += `**This is a reachability sweep and nothing more.** No row below is marked **held**: `
out += `whether a page still says what the standard says it says is a judgement a person has to `
out += `make by reading it. A \`reachable\` verdict means a server answered on that day.\n\n`

out += `| id | verdict | http | url | note |\n| --- | --- | --- | --- | --- |\n`
for (const v of verdicts)
  out += `| ${esc(v.id)} | ${v.verdict} | ${v.http} | ${esc(v.url)} | ${esc(v.note)} |\n`

out += `\n**Due for a human re-read** — \`accessed\` + \`revalidate\` is now in the past:\n\n`
out += overdue.length
  ? overdue
      .map(
        (o) =>
          `- \`${o.id}\` — accessed ${o.accessed}, revalidate ${o.revalidate}, due since ${o.since}\n`,
      )
      .join('')
  : `- none\n`

if (schemaNotes.length)
  out +=
    `\n**Rows this script could not read properly:**\n\n` +
    schemaNotes.map((n) => `- ${n}\n`).join('')

if (classNotes.length)
  out +=
    `\n**Classes outside the four-class schema** — noted, not errors. ` +
    `\`SOURCES.md\` states why each one is filed the way it is; read that before ` +
    `changing anything here:\n\n` +
    classNotes.map((n) => `- ${n}\n`).join('')

console.log(out)

if (DRY) {
  console.log('--dry-run: REVALIDATION.md was not written.')
  process.exit(0)
}

// Append only. A previous verdict is evidence that somebody looked on that day, and
// deleting it destroys the only thing this register is for.
const prior = existsSync(REGISTER) ? readFileSync(REGISTER, 'utf8') : '# Revalidation register\n'
writeFileSync(REGISTER, prior.replace(/\s*$/, '\n') + out, 'utf8')

// Best effort: keep the register formatted so tools/check.mjs stays green after a sweep.
// `shell: true` here raised DEP0190 on every run — Node warns that arguments are concatenated
// rather than escaped. Nothing here is attacker-controlled, but a deprecation warning printed on
// every sweep is noise in a report whose whole value is that its output gets read.
spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['--yes', 'prettier', '--write', 'REVALIDATION.md'],
  {
    cwd: ROOT,
    stdio: 'ignore',
    timeout: 120000,
  },
)

console.log(`Appended sweep ${TODAY} to REVALIDATION.md.`)
