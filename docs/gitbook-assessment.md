# The documentation site—what was measured, what was decided, what was done

**Status: decided and executed, 2026-08-11.** This file began the same day as an offline assessment
of an open question—the repository was private, distribution scored lowest of everything the audit
measured, and GitBook was a candidate for closing that gap. It grew a connected re-assessment that
measured the live product, and the owner then ruled on that evidence. This revision records the
decision, its execution, and how the execution was verified. The two earlier shapes are preserved at
the tags:
[the offline proposal at `v2.0.1`](https://github.com/HetCreep/SpriteDesignDatum/blob/v2.0.1/docs/gitbook-assessment.md),
[the connected re-assessment at `v2.0.2`](https://github.com/HetCreep/SpriteDesignDatum/blob/v2.0.2/docs/gitbook-assessment.md).
Nothing in them was deleted from the record; this file stopped being a proposal because the question
stopped being open.

Evidence classes, used throughout: **raw fetch**—bytes retrieved with node and searched directly;
**fetched-and-summarized**—a page converted to markdown and read by a model, so quotes are
transcriptions, not verified bytes; **read**—a file in this repository.

---

## What was measured

Three facts carried the decision, all from the connected run and re-confirmed where noted by the
third caretaker pass:

1. **The site cannot resolve a rule id.** Raw fetch, both served forms: the source file carries 35
   literal `<a id>` anchors, 13 of them rule ids; the site's rendered HTML carries **0 of 13**, and
   GitBook's own markdown export also carries 0—the renderer strips explicit anchors and derives its
   own heading slugs, while the links _to_ `#L1` survive as dead fragments. The file at a signed tag
   on GitHub keeps **13 of 13** (re-measured by the third pass: present in the rendered blob HTML in
   GitHub's `user-content-` form, and byte-exact in the raw file). A citation has to resolve to the
   rule inside the bytes it cites; only one of the two surfaces can do that.

2. **The site's write-back cannot be switched off.** GitBook's Git Sync is bidirectional by design—
   _"changes you make directly in GitBook's editor are automatically synced, as are any commits made
   on GitHub or GitLab"_—and no page read that run documents a read-only or one-way mode, nor a
   conflict-resolution protocol. (Fetched-and-summarized, across the git-sync, enabling, commits,
   troubleshooting, and content-configuration pages. Stated as absence of documentation, not proof
   of absence in the product.) Signed tags are out of its reach—a tag is not the synced branch— but
   `main` at HEAD is writable from an editor that runs no checks.

3. **The terms of service are not a conflict for a CC BY-NC-ND document.** The ToS at
   `gitbook.com/docs/policies/terms` keeps ownership with the customer (§5.2), takes a narrow
   nonexclusive licence—_"use, display, and perform that Customer Data through the Service"_
   (§5.4)—and grants GitBook no sublicensing over content (the word appears once, as a prohibition
   on the customer, §4.3(e)). Fetched-and-summarized, twice, consistent both times; the page showed
   no effective date; this is a summarizer's transcription, not a lawyer's reading—the same lawyer
   `LICENSE` says has not reviewed anything here.

## What was decided

The owner ruled, 2026-08-11, taking the connected run's option 2: **the repository is public and
normative; the site stays, as a reading copy that is explicitly not citable.** Citations point at
`SPRITE-DESIGN-DATUM.md` at a signed tag—`blob/<tag>`—because that is where the anchors resolve.

## What was done, and how each piece was verified

All of it shipped in v2.0.2 and the commits around it; every verification below is a raw fetch by
the third caretaker pass unless marked otherwise.

- **The repository is public, with issues on.** GitHub API: `"private": false`,
  `"has_issues": true`; the issues page fetches 200. `CONTRIBUTING.md` and `LICENSE` now route
  reports there.
- **Citations moved to tag permalinks.** The front matter, `README.md`, and `CITATION.cff` all point
  at `blob/v2.0.2/SPRITE-DESIGN-DATUM.md` (read); the URL fetches 200 with all 13 rule anchors
  present. All five release tags resolve as permalinks, each fetched 200.
- **The site is described as what it is**—a reading copy, convenient and not citable—in the front
  matter, `README.md`, and `CITATION.cff`'s comment, each stating the anchor measurement rather than
  asserting a policy (read).
- **The over-publication is closed, and the closure was tested rather than assumed.** The connected
  run found the site publishing every tracked file—agent instructions, the audit, this assessment
  —and flagged it SUSPECTED, noting that GitBook's docs never confirm that unlisted pages are
  excluded. `.gitbook.yaml` + `SUMMARY.md` now bound the site to eleven reader-facing pages. Proof
  it works: `/claude`, `/audit-2026-08-11`, and `/docs/gitbook-assessment`—this very file—return
  **404**, while `/agents`, `/governance`, `/errata` (all SUMMARY-listed) serve pages and
  `/sprite-design-datum` serves the **2.0.2** text. The 404s arrive alongside current content, so
  they are the filter working, not a stale sync. Measured on the day of the change and re-measured
  by the third pass.
- **The write-back is closed by governance, since no setting closes it.** `GOVERNANCE.md` now states
  which surface is normative and that the site is not a write surface—see its two-surfaces section.
  `.gitbook.yaml` itself says honestly that scoping is a publication filter, not a privacy control:
  the repository is public either way.

## What is still true about the site's limits

- **It cannot carry a citation.** The anchor stripping is the renderer's behaviour, not a
  configuration miss; nothing here changes it. Every rule-id link on the site lands at the top of
  the page, silently.
- **It re-renders on the platform's schedule.** The render—anchors still absent, scoping still
  holding, fidelity—is a perishable surface the caretaker re-checks after platform changes GitBook
  does not announce. The 404s above are measured behaviour, not a documented guarantee; GitBook's
  docs still do not promise that unlisted pages are excluded.
- **The write path still exists mechanically.** Nothing technical stops a web edit reaching `main`;
  what stops it is policy (`GOVERNANCE.md`) and the fact that the account has one member. A commit
  prefixed `GITBOOK-` on `main` would mean the policy failed.
- **It serves current `main`, not a version.** A released version is fixed by its tag; the site
  names no version boundary and simply tracks the synced branch.

## Still unverified, with reasons

- **The ToS reading** is a transcription, undated on the page, and unreviewed by a lawyer—adequate
  for a reading copy, revisit if the stakes change.
- **GitHub branch protection versus GitBook's push**—inferred to block it like any push; GitBook's
  docs do not say what Git Sync does when rejected. Untested, and moot while the policy above holds.
- **Rendered-view deep-linking on GitHub** rests on GitHub's `user-content-` fragment convention—
  anchor **presence** in the served HTML is measured (13/13); the scroll-to behaviour is the
  platform's JavaScript, taken as GitHub's long-standing convention rather than re-proven per
  fragment. The raw URL cannot fail this way.
