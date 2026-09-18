# Publishing this room to GitBook

**Mechanism: GitBook Git Sync—different from Gacha's, and this document is shaped after
`GachaRateDesignDatum/PUBLISHING.md` (the zone's in-house bar for "how does this room publish") but
is honest about being a different mechanism throughout.** Do not read the two documents as
interchangeable procedures; only the shape (what's published, how to confirm it, the known hazards)
transfers.

**The front/back law binds this file: `Articles/.claude/rules/gitbook-github-two-faces.md`.**
GitBook is the front door, GitHub is the back door, they sync, and a commit on either side is
publication. Read that file before pushing here—this document covers the mechanics; that one covers
the law.

## What actually publishes, and how a push becomes a live page

A push to this repository's synced branch is picked up by GitBook's own Git Sync integration and
rendered automatically—there is no change-request step, no `invoke_operation` call, and no manual
"submit" action the way Gacha's MCP flow requires. **A sync commit runs CI exactly like any other
push, and it can turn the repository red without a human having touched anything**—measured, not
hypothetical: `ffbc768` (GitBook's own commit) failed `tools/check.mjs`'s `prettier --check` on the
`SUMMARY.md` it wrote, before either of the two human commits that followed it (ARK-028). A red run
after a sync merge is not automatically "our" red to explain—check who the run's own head commit
actually is before assuming.

**Which branch is wired to sync, and the exact webhook/pull mechanism GitBook uses, is not recorded
anywhere in this repository**—that configuration lives on GitBook's own side (the space's Git Sync
settings), set up once outside any file here. This is the first open item this document names rather
than assumes: whoever configured the sync knows which branch; this document does not, and should not
guess.

## What `.gitbook.yaml` + `SUMMARY.md` bind

- **`.gitbook.yaml`** is a **publication filter**, not a privacy control—its own header comment says
  so explicitly: _"Note the limit honestly: this is a publication filter, not a privacy control. The
  repository is public, so everything here is readable on GitHub either way."_ It sets `root: ./`
  and points GitBook at `README.md` (readme) and `SUMMARY.md` (summary) as the two files that define
  the site's structure. Without it, GitBook would publish every tracked file, including internal
  working material—which is exactly why it exists.
- **`SUMMARY.md`** is the site's table of contents: the ordered list of pages GitBook actually
  renders (currently 11 entries—the README, the standard itself, the delivery checklist, the
  AI-agents doc, the example conformance record, errata, sources, changelog, governance,
  contributing, and the licence). A file not listed in `SUMMARY.md` is not part of the published
  site's navigation even if it is tracked and even if `.gitbook.yaml` does not explicitly exclude
  it—the practical publication boundary is "is it in SUMMARY.md," not "is it gitignored."

## Read-the-verdict—confirming a push actually landed

Per `DEPARTMENT-HEAD-CONTRACT.md` §8e, a push is not finished until its pusher reads the verdict.
For a Git-Sync space there is no API response to read (unlike Gacha's change-request flow, which
returns a revision id directly)—confirmation is **visual**: open the live GitBook site at
`https://hetcreep.gitbook.io/hetcreep-docs` (this repo's own `README.md:14` names the root site;
Sprite is that site's `/docs` variant per the coordinates recorded in
`GachaRateDesignDatum/PUBLISHING.md`, which both articles share and which names the re-derivation
procedure) and check that the changed content actually rendered. There is no shortcut that avoids
opening the page; a green `git push` says nothing about whether Git Sync picked it up, ran, or
succeeded.

## PARTIALLY SETTLED—one measurement, in one direction only; the push-direction hazard is still open

**n = 1.** One commit has been observed; this is a single data point, not a series, and is stated as
one on purpose rather than let the word "measured" imply more than it does.

**What `ffbc768` actually shows** (`HetCreep/SpriteDesignDatum` main, "GITBOOK-1: change request
with no subject merged in GitBook"): GitBook's Git Sync writes to git, in GitBook's own `SUMMARY.md`
form, without warning—the mechanism `gitbook-github-two-faces.md` rests on, and that part stands.
The commit added one new page, `licence.md` (two lines: `# Licence` and a blank—see `ARK-026`,
below); its filename-derived slug and its heading-derived slug are the same string (`licence`), so
this one observation **cannot discriminate** between "Git Sync derives slugs from filenames" and
"Git Sync derives slugs from first-line headings, same as the change-request path." Titles of the
other, untouched pages were unaffected—because nothing was pushed to them in this commit, not
because a title-preservation rule was exercised.

**What this does NOT show:** whether _pushing_ a heading-first markdown body _through_ Git Sync
reproduces Gacha's measured hazard (a first-line heading silently rewriting a page's title and
slug). `ffbc768` is GitBook writing **into** git; the open question is about the opposite
direction—us writing **through** the sync—and no commit exercising that direction has been observed.

**The settling test from round 4 stays open**, unchanged: push a one-line change to a file whose
first line is a heading (not a filename-slug-degenerate case like `licence.md`), then check the live
page's URL slug and title before and after. It still needs someone with the head's own reach into
the GitBook site to run. If that test runs, this section becomes a real SETTLED with a second,
direction- matched measurement behind it—not before.

## Pull before push

Per `gitbook-github-two-faces.md` rule 1: `git pull --ff-only` before any push to this repository.
GitBook's own Git Sync writes commits here without warning (exactly as `ffbc768` did)—a push built
on a stale local diverges from a remote that already moved.

## The `.gitignore` fence (ARK-016) and why internal material never publishes

`SpriteDesignDatum/.gitignore` excludes `.claude/` and `scratchpad/` (added 2026-09-02,
ARK-016)—agent governance stores, sweep logs, and session scratch material. These entries exist for
a **tracking** reason (a real public GitHub remote, where an untracked-but-not-ignored file is one
`git add -A` away from being committed and pushed) that is separate from, but reinforces, the
GitBook-side publication filter above: even if `.gitbook.yaml`/`SUMMARY.md` somehow changed to
include such a file, it would need to be tracked and pushed first, and the `.gitignore` fence stops
that at the git layer before GitBook's own filter would ever need to. Two independent layers,
neither alone sufficient, both now present.

## What this document deliberately does not do

No live GitBook space was probed, no push was made, and no tracked article file in this repository
was touched to produce this document—it states the mechanism as configured elsewhere and known
today, and names what remains genuinely unknown rather than assuming a shape it hasn't verified.
