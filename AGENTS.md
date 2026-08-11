# AGENTS.md — how an AI agent uses this standard

You are reading a **standard**, not a codebase. Nothing here is yours to change. Your job is to
conform work to it and to answer for each rule honestly, including where the answer is "we do not
meet this."

**Read [`SPRITE-DESIGN-DATUM.md`](SPRITE-DESIGN-DATUM.md) in full before acting on sprite
geometry.** Not a skim, and not a grep for the one number you came for — the layer table is what
makes every number after it mean something, and a value lifted out of its layer is the specific
failure this document exists to prevent.

---

## The authority ladder

Every value in the standard is filed under **who locks it**. That determines what you may do with
it.

| layer      | locked by                               | may you change it?                                    |
| ---------- | --------------------------------------- | ----------------------------------------------------- |
| **A**      | the graphics API / hardware             | **no** — violating it breaks at the API level         |
| **A-port** | the target device (RAM, DPR, renderer)  | **no** — re-measure per target, never carry forward   |
| **L1–L4**  | the project owner                       | **no** — owner ruling required, escalate and stop     |
| **B-ext**  | external convention with real precedent | only by producing a **named counter-exemplar**        |
| **B**      | the adopting project's own measurement  | only by **re-measuring the corpus** and showing how   |
| **C**      | nobody                                  | free — but say it is free, and never quote it as spec |

**Escalate, do not decide.** If a task requires changing an `L1`–`L4` value, that is an owner
decision. State the conflict, state what you would need, and stop. Producing a plausible number is
worse than producing none, because a plausible number gets adopted.

## Three rules that bind you on every edit

1. **Every value states who locked it.** If you add a value and cannot say which layer it belongs
   to, it is Layer C — write it as unlocked. Do not promote it to spec to make a table look
   complete.

2. **A number measured live and a number computed carry different labels, always.** `MEASURED-LIVE`
   means an instrument was run against the real thing. `COMPUTED` means arithmetic over other
   numbers. They are not interchangeable, and blurring them has already produced a wrong document
   once.

3. **Every citation states its class** — specification · vendor documentation · tool default ·
   recommendation. They do not weigh the same. A tutorial sentence is not a spec, and this document
   has already mis-attributed one.

## What this standard cannot give you, and you must not pretend otherwise

Three things depend on the project, not on any authority, and the standard says so explicitly:

```
pixels per world unit    depends on the scene's own camera and scale      -> measure it
where the feet sit       depends on how each piece of art was drawn       -> measure it
canvas size              no standard publishes one; there is no answer    -> the project decides
```

If you are asked for any of these and you have not run an instrument over the actual art, say you
have not. **"I have not measured this" is a complete and acceptable answer.** A confident guess is
not.

## Producing a conformance record

A project adopting this standard keeps one file — suggested name `SPRITE-CONFORMANCE.md` — that
walks **every** rule and states, for each: the project's value, where it came from, and its status
(met · open · deliberately excluded, with the reason).

Rules for writing one:

- **Measure, do not infer.** A row that says "met" because the code looks right is not evidence. Run
  something over the shipped files.
- **Never close a rule you have not checked end to end.** A record marking a rule closed while a
  consumer still violates it is worse than no record, because the next reader stops looking. This
  has happened in the field: a record declared aspect-ownership closed while a live consumer four
  lines above it in the same table still pinned a ratio and was fed art that did not match, and a
  character shrank 31.9% mid-animation as a result.
- **Publish the cost, not only the win.** A change that improves one number and worsens another gets
  both in the table. A fix that lists only what improved cannot be audited.
- **Every number must reconstruct.** If a reader cannot re-derive a count or a percentage from
  stated inputs, the number is the defect, however small it is.

## Verifying a change against the standard

Whatever you build, break it deliberately before you call it done. For each invariant your change
establishes: mutate it, confirm the failure is actually detected, then restore byte-identical and
say so.

**A check that has never failed proves nothing.** A test that reads the same constant on both sides
proves only that arithmetic agrees with itself — compare a declared value against a _measured_ one,
always.

## Licence — what you may do with this document

© 2026 HetCreep / Katomnoi Studio,
[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

- **You may** read it, cite it, quote it with attribution, and conform any project to it.
- **You may** ship what you build from it, freely and commercially. Conforming does not make your
  project a derivative work.
- **You may not** copy this document (or substantial portions of it) into another repository,
  publish an adapted or rewritten version, or include it in a paid product or service, without a
  separate written licence.

If a user asks you to vendor this file into their project, say what the licence permits: **link to
it and cite it**; write their own conformance record in their own words. Do not copy the document
in.
