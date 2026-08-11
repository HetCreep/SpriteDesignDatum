# Sprite Design Datum

**A geometry standard for 2D sprite art — and, more usefully, an honest map of which parts of that
geometry have a real external standard and which parts nobody has ever published.**

📄 **The standard itself: [`SPRITE-DESIGN-DATUM.md`](SPRITE-DESIGN-DATUM.md)**

🔗 **Published at
[https://hetcreep.gitbook.io/hetcreep-docs](https://hetcreep.gitbook.io/hetcreep-docs)** — that is
the address to link and to cite. Rule ids are stable anchors (`#L1`, `#E3`), so a conformance record
in another project can point at a single rule and keep working when a heading is reworded.

---

## Why this exists

Ask "what canvas size should my sprites be?" and you will get confident answers from a dozen
sources, none of which agree, none of which cite anything. Ask "how far may a character's feet drift
between the frames of one animation?" and you will get nothing at all — because **no engine, no
atlas packer, and no store publishes that number.** Four tools were checked; none stores a per-frame
anchor it could validate, so none can publish a tolerance on it.

That gap is the problem. A team fills it by guessing, the guess becomes a convention, the convention
becomes "the way it's done", and three renderers later nobody can say why the same character renders
noticeably taller standing than walking.

(That last one is a field report from the project this standard came out of, not a published value.
The measurement lives in that project's own conformance record, so it cannot be re-derived from
anything here — which is exactly why it is written as an anecdote rather than as a number.)

This document does two things about it:

1. **Separates what is genuinely locked from what is merely habit.** Every value is filed under _who
   locks it_ — a graphics API, a device target, an owner's ruling, an external convention with real
   precedent, your own measurement, or nobody. A value nobody locks is written as unlocked, never
   promoted to spec to make a table look complete.

2. **Recovers the numbers nobody published, by measuring instead of citing.** Where no authority
   exists, two large public sprite corpora were measured with a stated, re-runnable instrument, and
   the method is published alongside the result so you can check it rather than trust it.

## Why "datum"

In dimensioning and tolerancing (ASME Y14.5, ISO 1101), a **datum** is the theoretically exact
reference from which the location of every other feature is established. It is not a measurement —
it is the thing measurements are taken _from_. Get the datum wrong and every dimension downstream is
wrong while each one individually looks fine.

A 2D character has exactly such a reference and almost nobody writes it down: the **foot line**,
where the art meets the ground. How tall it renders, where its shadow sits, what order it draws in,
whether it appears to stand on the floor or hover above it — all of it is located from that line.

## Who it is for

**Artists and art leads** — the geometry your delivery has to satisfy, and the reason behind each
rule. Start with [`CHECKLIST.md`](CHECKLIST.md), then read the rules it points at.

**Engine and gameplay programmers** — which invariants belong in code, which belong in data, and
which are enforced by nothing but attention. `L1`–`L4` and `E1`–`E3` are the load-bearing ones.

**Technical directors and producers** — a written standard you can point a contractor at, and a
conformance record shape that makes "did we meet it?" a question with an answer.

**AI coding agents** — see [`AGENTS.md`](AGENTS.md), which states what an agent may and may not
change, and how to answer for each rule instead of quietly reinterpreting it.

## How to use it

1. **Read `SPRITE-DESIGN-DATUM.md` once, in order.** The layer table near the top is the key to
   everything after it.
2. **Write your own conformance record.** One file in your project that, for every rule, states your
   value, where it came from, and whether you meet it. The standard cannot see your project; the
   record is the only thing that makes it binding.
3. **Re-measure Layer B for yourself.** The tolerances here are real and externally derived, but the
   _constants_ — pixels per world unit, where your feet sit, your canvas — depend on your camera and
   your art. Anyone who hands you those numbers without measuring your corpus is guessing.

## What it deliberately does not do

- **It does not tell you what canvas size to use.** No standard does. It tells you what happens when
  one set of files is consumed by several renderers that each decide size differently, which is the
  actual failure.
- **It does not ship code, a linter, or a schema.** The numbers live in the document, once. A
  machine-readable copy would be a second source of truth for the same values — the exact defect the
  standard spends several pages warning about.
- **It does not claim completeness.** It names its own coverage gaps, including a large one: not a
  single web-platform source appears in its published-values register. `devicePixelRatio`, CSS box
  sizing, `object-fit`, and browser image decoding are _unsearched_, not absent.

## Provenance

The first edition was written from one person's measurement alone. It was then handed to an
adversarial verification pass over every claim it made — **96 claims: 44 held, 50 corrected, 2
unverifiable** — and the live product it came from was opened in a browser and measured. A second
sweep went looking for published external tolerances across engine importers, atlas packers, store
requirements, perceptual standards, community sprite standards, and graphics API specifications:
**172 published values found, 72 quantities with no published source, 12 overclaims caught by a
sceptic.**

Every point where an earlier edition was wrong is annotated as wrong rather than quietly deleted.
That is not modesty — a standard that hides its corrections cannot be audited.

## Licence

© 2026 HetCreep. Released under
[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

**Free to read, cite, and conform to, with attribution.** Conforming to this document does not make
your project a derivative work of it — build what you like from it and ship that freely,
commercially or otherwise. The restriction is on redistributing or adapting **the document**.

Commercial use, adaptation, or redistribution of the document as part of a paid product or service
requires a separate written licence. See [`LICENSE`](LICENSE).

## Supporting this

Measuring two public corpora, checking every claim against its source, and writing down the
quantities that have **no** source took considerably longer than writing the rules would have. If
the standard saved you that work, [GitHub Sponsors](https://github.com/sponsors/HetCreep) is where
to say so.

Nothing here is behind it. The document is free to read, cite, and conform to, sponsored or not, and
it always will be — the paid thing is a licence to redistribute or adapt the document itself, which
is a different transaction and is described in [`LICENSE`](LICENSE).

> ⚠️ The licence text is a **draft**, written by an AI assistant at the owner's direction and not
> reviewed by a lawyer. `LICENSE` states plainly what a lawyer still has to settle before it is
> relied on. Facts and measurements are not copyrightable in most jurisdictions; what copyright
> protects here is the expression — the prose, the structure, and the layer framework.
