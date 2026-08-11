# Revalidation register

This file is the evidence that somebody looked.

A standard rots from the outside in. Every word of `SPRITE-DESIGN-DATUM.md` can stay exactly where
it was published while a vendor changes a default, a store moves a ceiling, or a specification is
reworded underneath it — and the document becomes wrong without changing. This register is where
that is caught in public, before a reader relies on it.

One section per sweep, dated, **append-only**. A verdict written here is never edited and never
deleted, including a verdict that later turned out to be wrong: a superseded finding is part of the
record, and the reasoning behind it is what stops the next person re-reporting it.

## What a verdict means

| verdict         | means                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **held**        | the source was fetched and read, and it still says what the standard says it says                                          |
| **moved**       | the content still exists but not where the locator pointed, or it exists in changed wording that does not change the claim |
| **unreachable** | the source could not be fetched — paywalled, 403, reorganised out of existence — with what was tried recorded              |

**A row that still holds gets its date updated and nothing else.** That is not busywork. An
unchanged row with a fresh date is the only evidence a reader has that anyone looked, and a register
full of stale dates is indistinguishable from a register full of confirmed-current dates unless the
date is written down.

Never mark a row checked that was not fetched. Secondary corroboration is recorded as secondary and
never promoted to a primary verdict.

## Two vocabularies, kept apart on purpose

`held` / `moved` / `unreachable` above are **human verdicts**. They require someone to read the page
and compare it against what the standard claims.

`tools/watch-sources.mjs` cannot do that. It writes **machine verdicts** — `reachable` / `moved` /
`dead` — which say only whether a server answered on a given day. A `reachable` row is not a `held`
row. It is a locator that has not rotted, and a claim nobody has re-read yet.

The machine sweep exists to tell a caretaker where to spend an afternoon. It is not a substitute for
the afternoon.

## Sweeps

Machine sweeps are appended below by `tools/watch-sources.mjs`. Human verdicts are written by hand
in the same append-only way, in a section headed with the date and the caretaker who ran it.

**Nothing has been swept yet — this section is empty and that is the honest state.** The locators in
`SOURCES.md` were checked once, on the day they were written, by the pass that wrote them; that is
recorded there as each row's `accessed` date and is not a sweep. Until a dated section appears
below, no claim in the standard has been re-checked against its source since publication, and an
empty register says that far better than a green tick would.

_No sweep has been recorded yet. `SOURCES.md` exists and holds the locators; nothing has re-checked
them since the day they were written. (An earlier revision of this line said `SOURCES.md` was still
being built — stale since the day it was written, caught 2026-08-11.)_
