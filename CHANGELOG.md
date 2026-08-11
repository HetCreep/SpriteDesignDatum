# Changelog

Versions follow [Semantic Versioning](https://semver.org/) applied to a standard:

- **MAJOR** — a locked rule changes meaning, or a published tolerance moves. Conforming work may
  stop conforming.
- **MINOR** — a rule or register entry is added; existing conforming work still conforms.
- **PATCH** — wording, citations, corrections that do not move a value.

## 1.0.0 — 2026-08-11

First standalone publication. The document existed before this as an internal design lock inside one
game project; this release is that document with every project-specific reference removed, so it
stands on its own.

**Added**

- `README.md`, `AGENTS.md`, `CHECKLIST.md` — one entry point each for a human reader, an AI agent,
  and the person actually delivering art.
- The `datum` framing: the term is taken from dimensioning and tolerancing (ASME Y14.5, ISO 1101),
  where a datum is the exact reference every other feature is located from. A 2D character's is its
  foot line.

**Changed**

- `E2` and `E3` restored to reading order. `E3` had been appended ahead of `E2` in the source
  document.
- Layer B is now described as the _adopting project's_ measurement rather than one specific
  project's.
- The conformance section now describes how any project builds its own record, instead of pointing
  at one particular file.

**Licence**

- Standalone CC BY-NC-ND 4.0 rather than a carve-out from a surrounding MIT repository. The standing
  grant to Katomnoi Studio carries over unchanged, still without the right to sublicense or
  redistribute.
- Two limits added to the scope section that the earlier draft did not state: facts and measurements
  are not copyrightable, so independent re-measurement is expected and welcome; and short quoted
  passages from vendor documentation remain their owners' property, cited under fair dealing.

**Carried over unchanged from the source document**

Every number, every citation, every layer assignment, and every annotation of a point where an
earlier edition was wrong. The provenance is in `README.md`: 96 claims through adversarial
verification (44 held, 50 corrected, 2 unverifiable), then a second sweep finding 172 published
values, 72 quantities with no published source, and 12 overclaims caught.
