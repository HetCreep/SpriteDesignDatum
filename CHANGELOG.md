# Changelog

Versions follow [Semantic Versioning](https://semver.org/) applied to a standard:

- **MAJOR** — a locked rule changes meaning, or a published tolerance moves. Conforming work may
  stop conforming.
- **MINOR** — a rule or register entry is added; existing conforming work still conforms.
- **PATCH** — wording, citations, corrections that do not move a value.

## 2.0.2 — 2026-08-11

**The address this document told everyone to cite could not resolve a single rule.** 2.0.1 published
at a documentation site and said "rule ids are stable anchors: `#L1`, `#E3`, `#A2`". They are not,
there. That renderer strips explicit anchors and generates its own slugs, so every `#L1` in a
citation landed at the top of the page — silently, which is the worst way for a link to fail.

Measured on the served HTML of both surfaces, not inferred:

```
documentation site, rendered      0 of 13 rule anchors present
the file at a signed tag         13 of 13 present
```

An earlier check appeared to show the anchors surviving. It was wrong, because the tool used
converts a page to markdown before anyone looks at it — so it was reading the source both times
rather than the render. That is recorded because the mistake is the instructive part: a measurement
is only as good as the thing it actually touched.

**Changed**

- Citations now point at `SPRITE-DESIGN-DATUM.md` **at a signed tag**, which is where the anchors
  resolve. `CITATION.cff`, the front matter and `README.md` all say the same thing.
- The documentation site is described as what it is: a reading copy, convenient and **not** citable.
  Not hidden, not apologised for — a reader is told which surface answers which need.
- The repository is **public**. That is what makes a tagged file a citable address at all, and it
  closes the oldest gap here: a document that has instructed readers to "LINK to it and cite it"
  since 1.0.0 finally has somewhere to point that works.
- `.gitbook.yaml` and `SUMMARY.md` bound what the site publishes. It had been publishing every
  tracked file — including the caretaker's own seat definition and an internal audit report — as
  public pages nobody wrote for readers.
- The `check.yml` header is repaired. It had been wrong twice in opposite directions, first claiming
  no remote existed and then left half-written during that repair, and now records both.

PATCH — the fix is to citations and to how two files are described, not to any locked value.

## 2.0.1 — 2026-08-11

The standard is now published at **https://hetcreep.gitbook.io/hetcreep-docs**, which is the first
time the instruction it has carried since 1.0.0 — _"LINK to it and cite it"_ — has had anything to
point at. The front matter and `CITATION.cff` now carry that address, and the front matter states
what a citation should look like: the id, the version, never the heading text.

Sponsors is wired where it can actually be seen. `FUNDING.yml` exists and says plainly in its own
comment that it is nearly inert — a private repository has no page for anyone to see a sponsor
button on, and the readers this standard is written for arrive at the documentation site instead.
The ask lives in `README.md`, which the site publishes, and it says there is no paywall behind it:
the document is free to read, cite and conform to, sponsored or not. The paid thing is a licence to
redistribute or adapt the document, which is a different transaction. Nothing was added to the
normative text but the address — a standard that asks for money inside its own rules is worth less
than one that does not.

PATCH, and the version moves at all only because `GOVERNANCE.md` says a released version is
immutable. 2.0.0 was tagged and pushed before these edits; changing its text and leaving the number
alone would have made the tag and the document disagree, which is precisely the failure the
immutability rule exists to prevent.

**Corrected — four places where a document described a world that had changed**

- `ERRATA.md`'s summary table still marked `E-001` and `E-002` as **reported** while their own
  entries said **corrected in 1.1.0**, and `E-003`'s state cell was empty. The table is what a
  reader scans first, so it was the copy most worth keeping right and the one that drifted.
- `.github/workflows/check.yml` opened by declaring the repository had no remote and the workflow
  had never run. Both stopped being true the moment it was pushed.
- `CITATION.cff` warned that nothing enforced the three copies of the version string. `check.mjs`
  check 4 has enforced it since the day it was written.
- `REVALIDATION.md` had an empty Sweeps section and said nothing about being empty. It now says so
  outright: no claim has been re-checked since publication, and an empty register states that better
  than a green tick would.

All four were found by the caretaker running offline, and all four are the same species — a sentence
that was true when written and quietly stopped being true. That is the thing this repository exists
to catch, so finding four of them inside its own files on day one is the expected number, not an
embarrassing one.

## 2.0.0 — 2026-08-11

**`E-003`.** Layer B and the unbounded register were sorted on two different axes and the document
never said so, which made three quantities appear in both lists and read as a contradiction. For two
of them it was not one.

An opinion board of four independent seats — one deliberately blind to the framing, the options, and
the proposal on the table — was asked where the three belonged. All four rejected the question. The
discriminator in use, _did you measure it_, is not what separates these cases.

**Changed — the Layer B entry condition**

Was: a value enters Layer B only with a corpus measurement behind it. Now: a value enters Layer B
only if a **wrong** value would be a demonstrable error against something that exists independently
of the declaration.

A canvas declared at 63 px when the file ships 64 px is wrong, and anyone can open the file and show
it. Eight frames rather than twelve is not a wrong count — it is a different animation. The old test
admitted the second, because you can always count files; the new one does not, because counting them
proves nothing about which count was right.

The document also now states the axis outright: **Layer B asks whether the adopting project can
measure a value; the unbounded register asks whether anyone outside bounds it. A value may sit on
both**, and a frame count does.

**Changed — the slot list**

The direction-to-index mapping is no longer a Layer B slot. Nothing in the art can be measured to
produce "0 means south"; it is a label. It carries a warning the board surfaced that nobody had
raised: it is **free of external constraint and not free of cost**, because every filename already
delivered encodes it. Changing it is a breaking migration.

Each remaining slot now states its answer on both axes instead of sitting in a bare list.

**Changed — the promotion clause**

Promotion out of Layer C now takes the same evidence the entry condition asks for, so the two cannot
drift apart. And it says plainly that **promotion is not exclusion** — a value that earns Layer B
still belongs in the unbounded register if nobody outside bounds it. Without that sentence, the old
wording quietly recreated the same mis-sorting from the other direction.

**Added**

- A register row for the **number of directions in a set**. It had appeared exactly once in the
  whole document, in the slot list, and any repair that only moved slots would have lost it
  entirely.

**Why MAJOR**

The stated test is that a locked rule changes meaning **or** a published tolerance moves. The first
clause fires: the Layer B entry condition admits and excludes different values than it did. The
second fires too — a project that filed the direction-to-index mapping at Layer B, which the slot
list told it to do, stops conforming.

An earlier draft of this entry called it MINOR by arguing only the second clause and skipping the
first. The rule uses _or_, not _and_. Calling it MINOR because the document is one day old and
nobody outside has adopted it yet would have been choosing the number by convenience rather than by
the test — which is the habit this document exists to make harder.

## 1.1.0 — 2026-08-11

Two errata verified against their primary sources and corrected, plus the taxonomy defect that let
one of them hide. `ERRATA.md` keeps both entries permanently — 1.0.0's text still says the wrong
thing, and anyone holding that version needs to be able to find out why.

**Corrected**

- **E-001** — the Unreal texture-ceiling row said 8192 was available "without an engine
  configuration change". Epic's own documentation says the opposite: it needs `MaxLODSize` set in
  `BaseDeviceProfiles.ini`, and without that an imported 8192 texture renders at 4096 **silently**.
  The row now states the condition and names the silence.
- **E-002** — the half-texel row attributed its explanation to Microsoft Learn's _Bilinear Texture
  Filtering_, a Direct3D 9 conceptual page that does not contain it. The statement was correct; the
  citation was not. Now sourced to _Coordinate Systems_ (Direct3D 10), which states
  `Left Texel # = floor(U − 0.5)` verbatim, and to the Vulkan specification. This was the second
  occurrence of a failure this document already records committing once, which is why both rows now
  carry their citation class.

**Changed — the taxonomy that let E-001 hide**

- The register section headed _"Hard — a gatekeeper or an API rejects violations"_ is now _"Hard —
  the violating result cannot exist"_, and states which of two mechanisms each row relies on: a
  gatekeeper refusing the upload, or the engine silently overriding you. The old wording tested for
  **rejection**, so a row whose engine quietly clamps you to half the size read as correctly filed.
  It was not, and that wording is what let it sit there unnoticed.
- The pixel-exact rendering row moved from _Hard_ to _Recommendation_. Nothing rejects, clamps, or
  detects a mismatched Pixels Per Unit — it renders, and it looks wrong. That is the Recommendation
  tier's definition, not Hard's.

**Why MINOR and not MAJOR**

The stated test for MAJOR is that a published tolerance moves and conforming work may stop
conforming. Neither happened. 8192 is still 8192; what changed is the condition attached to it and
the honesty of its strength class. Moving a row out of _Hard_ makes it **less** binding, so a
project that met the stricter reading still conforms. A correction that only loosens, or that adds
information about a third party's behaviour, does not break anyone downstream.

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
