# GitBook, for this standard — an assessment, not a decision

> **Status update, 2026-08-11, second run:** a connected caretaker session re-assessed everything
> below against the live product and the live site. The offline text is preserved unchanged as the
> record; the measured findings and the revised recommendation are in
> [**Re-assessment with the network**](#re-assessment-with-the-network--2026-08-11-connected-run) at
> the end of this file. Headline: the site is live, the ToS is not a conflict, **but the standard's
> 35 anchors do not survive GitBook's render — measured, not inferred.**

**Status: prepared offline, 2026-08-11. Nothing was published and nothing was connected.** The
question this file answers: the licence tells adopters to _"LINK to it and cite it"_, the repository
is private, and distribution scored lowest of everything the audit measured — is GitBook the way to
close that gap?

## Found in the working tree while this was being written — read this first

**Mid-session, the working tree acquired changes this assessment did not make and cannot verify.**
When this run started, the tree was clean and the files read matched the v2.0.0 tag. By the time
this assessment was written, `git status` showed four modified tracked files and one new one, none
of them touched by this session: `README.md`, `LICENSE`, `CITATION.cff`, and — released, tagged
frozen text — `SPRITE-DESIGN-DATUM.md`, plus a new `.github/FUNDING.yml`. Together they assert, as
fact, that the standard is **"Published at https://hetcreep.gitbook.io/hetcreep-docs"**, point the
citation and licence-request routes at that address, and add a GitHub Sponsors section.

Nothing was reverted — the changes are not this session's to destroy, and the owner reviews the
tree. But four things need saying plainly:

1. **The publication claim is unverified.** This session had no network (see below); whether
   `hetcreep.gitbook.io/hetcreep-docs` exists, serves the standard, or preserves its anchors was not
   checkable. If the site is not live, the diff writes a dead link into the standard's own front
   matter as its canonical citation address.
2. **The diff edits the released 2.0.0 text without a version bump.** The tag is immutable, but
   committing this as-is makes the file at HEAD diverge from `v2.0.0` while still saying "Version
   2.0.0" — the thing `GOVERNANCE.md` ("A released version does not change") exists to prevent.
   `tools/check.mjs` cannot catch it; the version strings still agree.
3. **It pre-empts the decision this assessment was told is not yet made.** Publishing is the owner's
   call. If the owner made it, none of this is a defect — but then the anchor question below stops
   being hypothetical and becomes the first thing to test against the live site.
4. **These changes and this assessment disagree** — the diff implements GitBook; the recommendation
   below argues against it. Both are now in front of the owner, which is where the disagreement
   belongs.

---

**The honest headline first: this assessment could not fetch anything.** The session it was written
in was non-interactive and the environment denied every network instrument — `WebFetch` and
`WebSearch` (permission), `curl` ("requires approval"), `Invoke-WebRequest` (blocked by a command
hook). Every statement below about GitBook the live product is therefore **unverified, from training
memory, and marked as such** — the exact class of claim this repository's own rules say must be
checked against the source before anyone relies on it. What is _not_ unverified is the structural
half: what this artifact needs from any host is measurable from this repository, and that half is
where the recommendation actually comes from.

---

## What this artifact needs from any host

Measured from the repository, no network required:

1. **A world-readable, stable URL to the exact frozen text, per version.** Releases are frozen
   (`GOVERNANCE.md`); a conformance record names the version it was written against; a link that
   serves different words later breaks the whole mechanism.
2. **Anchor stability.** `SPRITE-DESIGN-DATUM.md` carries 35 explicit `<a id>` anchors (counted,
   this tree), and its contents section instructs other projects to cite rule ids — `#L1`, `#E3` —
   precisely so links survive heading rewording. **Any host that rewrites, drops, or re-derives
   those anchors breaks the one thing the document's citation discipline depends on.** This is the
   load-bearing requirement, and it disqualifies hosts on its own.
3. **Correct licence display.** CC BY-NC-ND, drafted and not lawyer-reviewed (`LICENSE`), with a
   standing grant whose scope is deliberate. The document must appear with its notice, verbatim.
4. **Near-zero standing maintenance.** One caretaker, and its duty list is already long. Every
   renderer between the repository and the reader is a new perishable surface: it re-renders on the
   platform's schedule, so anchor behaviour would need a row in `REVALIDATION.md` and periodic
   re-checking, forever, for a tool the standard does not otherwise need.
5. **Publishing is the owner's decision.** The repository being private is precisely the decision
   not yet made. Nothing below changes that, and this file does not either.

## GitBook against those needs

Every claim in this section is **⚠️ unverified — network blocked this run**. Each carries the URL a
connected session must read before any of it is relied on.

- **What it is.** A hosted documentation platform: spaces of pages, its own editor and renderer,
  with a Git Sync feature that mirrors content between a GitBook space and a GitHub/GitLab
  repository. ⚠️ unverified — check `https://gitbook.com` and
  `https://docs.gitbook.com/getting-started/git-sync`.
- **How it takes content from Git.** Git Sync maps repository markdown into GitBook's own document
  model and renders through GitBook's pipeline — meaning the served page is a **transformation** of
  the file, not the file. ⚠️ unverified — the transformation rules live at
  `https://docs.gitbook.com` (Git Sync section, markdown support pages).
- **The anchor question — the one that decides it.** Whether GitBook's renderer preserves literal
  `<a id="L1"></a>` HTML anchors, strips them, or substitutes its own heading-derived ids is exactly
  the fact that matters and exactly the fact that could not be checked. ⚠️ unverified — check
  GitBook's markdown/HTML support documentation, then **test with a real page before trusting the
  documentation**. If explicit anchors do not survive, GitBook fails need 2 outright and nothing
  else about it matters.
- **Plans and cost.** GitBook has historically offered a free tier for personal/open content and
  paid per-user plans for organisations; limits and the current shape of the free tier move with the
  product. ⚠️ unverified — check `https://www.gitbook.com/pricing`.
- **Terms of service over hosted content.** Hosted platforms take a licence from the uploader
  sufficient to store, reproduce, and display the content. That grant is the owner's to give — an
  owner hosting their own document is exercising their own copyright, not violating ND — but the
  breadth of the clause (sublicensing? derivative processing? survival after deletion?) is exactly
  what must be read, and it was not readable this run. ⚠️ unverified — check GitBook's current terms
  at `https://policies.gitbook.com` or wherever the ToS lives today.
- **Whether hosting is redistribution.** By the owner, no — CC BY-NC-ND restricts what _others_ may
  do; the copyright holder needs no licence from themselves. The genuine question is only the ToS
  grant above, plus one wrinkle this repository already recorded: earlier revisions were published
  under MIT (`LICENSE`, scope item 1), so the ND position is strongest for current and future
  revisions regardless of host.
- **Maintenance cost.** Even if everything above checks out: a GitBook space is a second rendering
  of the normative text, on a platform that updates without asking. The caretaker would owe a
  standing re-validation of anchor behaviour and rendering fidelity after platform changes it gets
  no notice of. That is a permanent new duty purchased for capabilities — multi-page navigation,
  search, team editing — that a single-file normative document does not use.

## The honest alternatives

**GitHub, public repository, plain.** Zero new tooling, zero cost. The day the repository flips
public: `github.com/HetCreep/SpriteDesignDatum/blob/v2.0.0/SPRITE-DESIGN-DATUM.md` is a versioned
permalink to the frozen text; `raw.githubusercontent.com` serves the bytes themselves, unrendered
and anchor-exact by definition; the issue tracker `CONTRIBUTING.md` already promises "after
publication" comes into existence; and `CITATION.cff` gains its `url` in the same commit, as its own
comment instructs. One thing still needs testing rather than trusting: whether GitHub's markdown
renderer preserves literal `<a id>` anchors in the _rendered_ view — ⚠️ unverified, test on a
scratch public file before telling adopters to cite `#L1` against the rendered page. If the rendered
view fails, the raw URL still cannot fail, and the standard's own text (cite the id, not the
heading) is already written for that world.

**GitHub Pages.** A styled site under the owner's domain, still free. But the default pipeline is
another renderer with the same re-verification burden as GitBook and none of its excuses — worth it
only if the owner someday wants a designed home for the standard, and buildable then. Not first.

**Do nothing.** Costs nothing, breaks nothing, and is the current state. `CONTRIBUTING.md` already
says honestly that the licence's issue-tracker instruction points at something that does not exist.
Acceptable indefinitely; it just leaves the audit's lowest number where it is.

## Recommendation

**GitBook is the wrong tool for this artifact.** Not because the product is bad — because this is
one long normative file whose explicit anchors are load-bearing, and interposing a platform renderer
converts a solved problem (bytes in a tagged file) into a standing verification duty against a
moving product, for features this document doesn't use, at a price of at least a ToS reading and
possibly money. The distribution gap is real, but it is closed by **flipping this repository
public**, not by adding a platform: same content, versioned permalinks for free, the issue tracker
`CONTRIBUTING.md` already promises, and one anchor test on GitHub's renderer as the only homework.

## If the owner decides to publish — what it takes, in order

The visibility flip itself is the owner's action; everything after it is caretaker work already
described in the repository's own files:

1. **Owner:** repository visibility → public. This single step makes every byte of the repository
   world-readable, which is why nothing in this assessment performed it.
2. Test GitHub's rendered-view handling of `<a id>` anchors; record the result here.
3. Same commit, per the files' own instructions: add `url`/`repository-code` to `CITATION.cff`
   (`CITATION.cff:20-24`), update `CONTRIBUTING.md`'s report route (`CONTRIBUTING.md:95-98`), fix
   `check.yml`'s inert header, and pin both workflow actions to commit SHAs (`check.yml:13-14` says
   to do exactly this on publish).
4. Re-run `node tools/check.mjs` — the LICENSE-enumeration and version checks cover the edited files
   — and read what it says.

---

## Re-assessment with the network — 2026-08-11, connected run

Everything above is the offline assessment, preserved as written. This section re-answers its open
questions with fetched evidence, states the evidence class of each answer, and revises the
recommendation. Two evidence classes: **raw fetch** — bytes retrieved with node and searched
directly; **fetched-and-summarized** — the WebFetch tool converted the page to markdown and a small
model answered questions about it, so quotes under that label are transcriptions, not verified
bytes. Where the difference could change a conclusion, it is said in place.

### 1 · The terms of service — read, and not a conflict

The terms live at `https://gitbook.com/docs/policies/terms` (the old
`policies.gitbook.com/legal/terms` route 302s into a 404 — the offline file's pointer was stale).
Fetched-and-summarized, twice, with consistent answers both times:

- **Ownership stays with the customer.** Section 5.2: _"Customer owns all right, title and interest
  in and to the Customer Data, and all intellectual property rights related to any of the
  foregoing."_
- **The grant is narrow.** Section 5.4: Customer _"grants GitBook a nonexclusive, worldwide license
  to use, display, and perform that Customer Data through the Service."_ Use, display, perform,
  through the Service — no adaptation right, no distribution beyond the Service.
- **No sublicence to GitBook.** The word "sublicense" appears once in the document, in section
  4.3(e), and it is a **prohibition on the customer** (_"resell, distribute, or sublicense the
  Service"_) — not a grant of sublicensing authority over content to GitBook.

**Verdict for a CC BY-NC-ND document:** no conflict found. The owner hosting their own document
exercises their own copyright; the ToS takes only what hosting mechanically requires and takes it
non-exclusively. Caveats that stay attached: the page showed no effective date; the reading is a
summarizer's transcription of the live page, not a lawyer's reading of verified bytes; and `LICENSE`
already says a lawyer has to settle its own open items — the same applies here if the stakes ever
justify it.

### 2 · The write-back — bidirectional, and no documented off-switch

Read this run (all fetched-and-summarized): `docs-as-code/git-sync.md`,
`git-sync/enabling-github-sync.md`, `git-sync/commits.md`, `git-sync/troubleshooting.md`,
`git-sync/content-configuration.md`, plus the docs sitemap (`llms.txt`).

- **Bidirectional, by design:** _"Git Sync is bi-directional, so changes you make directly in
  GitBook's editor are automatically synced, as are any commits made on GitHub or GitLab."_
- **The direction choice at setup is not a mode.** Enabling asks GitBook → GitHub or GitHub →
  GitBook, but _"for the initial sync, the selected source is authoritative"_ — it decides which
  side wins the first import, nothing ongoing.
- **One branch syncs**, chosen at setup: _"choose which branch you want commits to be pushed to and
  synced from."_
- **Web edits still land in the repo.** After Git Sync is enabled, _"live edits are now locked"_ —
  edits go through GitBook change requests, which on merge become commits on the synced branch,
  message format `GITBOOK-{change_request_number}: {change_request_subject}`.
- **No read-only or one-way mode is documented** on any page read this run. Stated as absence of
  documentation, not as proof of absence in the product.
- **No conflict-resolution protocol is documented either.** The troubleshooting page's nearest
  statement: _"GitBook may create new markdown files instead of using the existing ones … to ensure
  GitBook doesn't overwrite files that existed in your repository before"_ — a collision-avoidance
  behaviour, not a resolution rule, and one that can itself litter the repo with duplicate files.

What actually constrains the write-back, with each item's class:

1. **Membership** (fact about this account, not the product): the owner holds the GitBook account
   alone, so today the only person who can edit web-side is the owner. The bypass risk — `check.mjs`
   unrun, commit discipline skipped, GITBOOK-prefixed messages on main — is a self-discipline
   problem, not an intrusion problem, until a second member exists.
2. **GitHub branch protection** (inference, not documented): GitBook commits to the synced branch as
   an app; a protected branch would reject that push like any other. GitBook's docs do not say what
   Git Sync does when its push is rejected — expect sync errors. Test before relying.
3. **The API** (documented to exist, behaviour not read): explicit pull/push endpoints exist for a
   space's Git state, which implies sync can be driven manually — but nothing read this run
   documents disabling the automatic write-back.

**Verdict:** the repository cannot be made the only writer by any documented setting. A signed tag
still cannot be rewritten by GitBook — tags are not the synced branch — but `main` at HEAD is
writable from a web editor that runs no checks.

### 3 · The anchor question — settled, negative

Raw fetch, both served forms (full measurement in `AUDIT-2026-08-11.md`, second pass):

- Source: **35** literal `<a id>` anchors.
- Rendered HTML of `/sprite-design-datum` (3.1 MB): **zero** rule-id anchors; headings get
  re-derived slugs (`l1-aspect-ownership`); the contents section's links still point at `#L1`.
- GitBook's own `.md` export of the page: **zero** `<a id>` anchors, links to `#L1` intact.

**Every rule-id citation link on the live page is a dead fragment, and any external `…#L1`-style
citation against the GitBook URL silently lands at the top of the page.** The offline assessment's
own criterion — "if explicit anchors do not survive, GitBook fails need 2 outright and nothing else
about it matters" — is now a measured fact, not a hypothesis. The main-session check that called
this "probable but not proven" was reading a markdown conversion that re-synthesized what the
renderer had stripped; the caution it attached to itself was warranted.

### 4 · Found on the live site while measuring

- **The whole tracked tree is published**: `/claude`, `/.claude`, `/agents`, `/audit-2026-08-11`,
  `/governance`, `/revalidation`, `/errata` are all live pages (raw fetch of the site index). Agent
  instructions and caretaker machinery sit on the public site next to the standard. Whether any of
  that should be public is the owner's call — SUSPECTED over-publication, flagged, not judged. The
  documented scoping lever is `.gitbook.yaml` (`root:`, `structure:`); the docs read this run do
  **not** confirm that unlisted pages are excluded from publication, so a scoped configuration must
  be tested against the live site, not assumed.
- **A dead link on the landing page**: the rendered README links to
  `github.com/HetCreep/SpriteDesignDatum/tree/main/LICENSE/README.md` — a wrong-shaped path into a
  private repository, a 404 for every reader.

### Recommendation, revised — same conclusion, now measured

**The live GitBook site, as served today, breaks the standard's citation mechanism — all 35 anchors
are stripped from both the rendered page and GitBook's own markdown export — and no documented
setting makes the repository the only writer; the distribution gap is still closed by flipping the
repository public, with `blob/<tag>` permalinks as the canonical citation target.**

The offline recommendation reached this conclusion from structure; this run reached it again from
measurement. What changed: the ToS objection is retired (read, narrow, no conflict), and the site
being live changes the practical move from "don't adopt GitBook" to "decide what the site now is."
Three orderly outcomes, owner's choice:

1. **Repository public, GitBook retired.** Cleanest. The licence's "link to it and cite it" becomes
   executable against frozen bytes; `CITATION.cff` gains `repository-code` and its `url` moves to
   GitHub, per its own comment.
2. **Repository public, GitBook kept as a reading copy.** Workable **only** with all three of: (a) a
   visible statement on the site that the GitHub tag is canonical and rule-id citations must target
   it — the site's `#L1` links do not work and citations against the site are broken today; (b)
   `.gitbook.yaml` scoping tested and confirmed so operational files leave the public site; (c) the
   caretaker's standing duty list gains the render — anchors and fidelity re-checked after platform
   changes GitBook does not announce.
3. **Status quo** — private repo, GitBook as sole public face. The standard's citation discipline is
   broken at its only public address, `CITATION.cff` points readers at a render that cannot resolve
   a rule id, and web edits can reach `main` without a check run. If this is kept, option 2's
   mitigations are the minimum anyway, minus the permalink fix that only a public repository
   provides.

The decision is the owner's. This file now carries the evidence for it.
