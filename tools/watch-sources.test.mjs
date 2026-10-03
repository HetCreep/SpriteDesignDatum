// Tests for watch-sources.mjs. Node 18+, zero dependencies: node --test tools/watch-sources.test.mjs
//
// The watch is a script, not a module, and it finds SOURCES.md relative to its own file. So
// each case copies the script into a fresh temporary repository with a fixture SOURCES.md and
// runs it with --dry-run, which writes nothing. No fixture row carries a URL, so nothing is
// fetched and the tests need no network.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'watch-sources.mjs')
const CANNOT_WATCH = 2
const HEADER =
  '| id | cited as | line | class | url | version | accessed | revalidate |\n' +
  '| --- | --- | --- | --- | --- | --- | --- | --- |\n'

function run(rows) {
  const root = mkdtempSync(join(tmpdir(), 'watch-sources-test-'))
  try {
    mkdirSync(join(root, 'tools'))
    copyFileSync(SCRIPT, join(root, 'tools', 'watch-sources.mjs'))
    writeFileSync(join(root, 'SOURCES.md'), '# Sources\n\n' + HEADER + rows.join('\n') + '\n')
    const r = spawnSync(process.execPath, [join(root, 'tools', 'watch-sources.mjs'), '--dry-run'], {
      encoding: 'utf8',
      timeout: 60000,
    })
    return { status: r.status, out: (r.stdout || '') + (r.stderr || '') }
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test('a revalidating row with a blank url cell fails the run as CANNOT_WATCH', () => {
  const r = run(['| S-901 | Example spec | 10 | SPECIFICATION |  | 1.0 | 2026-09-01 | 90d |'])
  assert.equal(r.status, CANNOT_WATCH, r.out)
  assert.match(r.out, /S-901/)
})

test('a url cell holding text but no URL fails the run as CANNOT_WATCH', () => {
  const r = run([
    '| S-902 | Example spec | 10 | SPECIFICATION | see the spec | 1.0 | 2026-09-01 | 90d |',
  ])
  assert.equal(r.status, CANNOT_WATCH, r.out)
  assert.match(r.out, /S-902/)
})

test('an UNREACHABLE row with a finite interval is still skipped, and the run passes', () => {
  const r = run([
    '| S-903 | Example spec | 10 | SPECIFICATION | UNREACHABLE—403 everywhere | 1.0 | 2026-09-01 | 90d |',
  ])
  assert.equal(r.status, 0, r.out)
})

test('a revalidate-never row with no URL is still skipped, and the run passes', () => {
  const r = run(['| S-904 | Example corpus | 10 | SPECIFICATION |  | 1.0 | 2026-09-01 | never |'])
  assert.equal(r.status, 0, r.out)
})
