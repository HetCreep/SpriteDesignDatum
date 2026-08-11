# ERRATA.md — defects found in published versions

The standard's culture is to annotate a point where it was wrong rather than quietly delete it.
Before publication that was done in place, in the text. After publication it cannot be: a released
version is frozen, because a project that wrote a conformance record against `1.0.0` has to be able
to open `1.0.0` and find the same document it conformed to. This file is where that culture goes
once annotating in place is no longer available.

**Entries are never removed. Not even rejected ones.** A rejected erratum keeps its evidence and the
reasoning that rejected it, and that reasoning is the only thing standing between the next reader
and an afternoon spent re-reporting something already settled. A register that quietly drops what it
decided against is a register nobody can audit — which is the failure this whole document exists to
avoid.

**Being listed here is not being fixed.** Nothing in this file changes `SPRITE-DESIGN-DATUM.md`. The
released text still says whatever it says; corrections ship in the next version. See
[`GOVERNANCE.md`](GOVERNANCE.md). To report something, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

**Every entry pins the version it was found in and quotes the text**, because line numbers move. A
line number on its own is a reference that rots at the next edit, and an erratum nobody can locate
is an erratum that gets re-filed. The line numbers below were read against the working tree on
2026-08-11 — and had already shifted by roughly a hundred lines between these two entries being
written and being filed, which is the argument for this rule rather than a hypothetical version of
it. **The quoted text is the locator. The line number is a convenience.**

## States

| state                         | meaning                                                                                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **reported**                  | Written down with its evidence. Nobody has ruled on it yet.                                                                                                                                       |
| **verified**                  | The owner has read the evidence and agrees the standard is wrong. What to do about it is not yet decided.                                                                                         |
| **rejected**                  | The owner has ruled that the standard stands — the source is wrong, not authoritative enough, or read wrong. Reasoning stays in the entry.                                                        |
| **corrected in `X.Y.Z`**      | The correction has shipped in that version. The entry stays here forever: the published text of every earlier version still says the wrong thing, and a reader holding one needs to find out why. |
| **held for the next version** | Verified, correction decided, waiting on a release. Until that release the published text still says the wrong thing.                                                                             |

---

## Register

| id              | location in `1.0.0`                          | what it is                                                                                                                                                                                                      | state    |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [E-001](#e-001) | `SPRITE-DESIGN-DATUM.md:625`                 | Unreal's 8192 ceiling **requires** a `BaseDeviceProfiles.ini` change, and an oversized import is silently clamped rather than rejected                                                                          | reported |
| [E-002](#e-002) | `SPRITE-DESIGN-DATUM.md:668`                 | The half-texel explanation is attributed to a page that does not contain it. The statement itself is correct                                                                                                    | reported |
| [E-003](#e-003) | `SPRITE-DESIGN-DATUM.md:464-470`, `:687-694` | Layer B and the unbounded register are sorted on **two different axes**, printed as though they were one. Three quantities appear in both lists, and for two of them that is correct rather than contradictory. |

---

<a id="e-001"></a>

### E-001 · Unreal's texture ceiling needs an `.INI` change, and nothing rejects you if you skip it

| field        | value                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| **state**    | **corrected in 1.1.0** — verified against the primary source, then fixed                                        |
| **reported** | 2026-08-11, by the datum-caretaker, against primary sources                                                     |
| **found in** | 1.0.0                                                                                                           |
| **location** | `SPRITE-DESIGN-DATUM.md:625` — the tolerance register, under _Hard — a gatekeeper or an API rejects violations_ |
| **kind**     | **wrong fact**, and **wrong strength class** — two defects on one row                                           |

**What the standard says**

```
| Texture dimension ceiling | **8192 × 8192 px** without an engine configuration change | Unreal Engine, _Texture Format Support and Settings_ |
```

**What the source says** — vendor documentation. Epic Games, _Texture Format Support and Settings in
Unreal Engine_, fetched 2026-08-11 from
`https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine`:

> Unreal Engine supports texture resolutions from 1x1 up to 8192x8192 with some slight modifications
> to .INI files.

> With the release of UE 4.8 you can now modify your projects to use Textures up to 8192 in size
> without having to modify the C++ code by adding the following text to your projects
> **BaseDeviceProfiles.ini** file and setting the **MaxLODsize** to **8192**

> This has the side-effect that imported 8192 textures will only render up to mip1 of 4096.

The page gives the setting itself as
`TextureLODGroup_World=(MinLODSize=1,MaxLODSize=8192,LODBias=0,MinMagFilter=aniso,MipFilter=point)`
under `[/Script/Engine.TextureLODSettings]`, and says the editor must be restarted afterwards.

**The difference, on two axes**

1. **The fact is inverted.** The register offers the ceiling as available _without an engine
   configuration change_. Epic's own sentence is that reaching it takes "some slight modifications
   to .INI files" — specifically `MaxLODSize` in `BaseDeviceProfiles.ini`, then a restart. The
   register states the opposite of the source it cites.

2. **The row is in the wrong strength class.** It sits under _Hard — a gatekeeper or an API rejects
   violations_, and **nothing here rejects anything.** An oversized import is accepted and then
   silently clamped: in Epic's words it "will only render up to mip1 of 4096", half the dimension
   the artist delivered, with no error at the point of failure. The Unity row immediately above it
   (`:624`) is a genuine rejection — "importer will not accept larger" — and filing the two together
   tells a reader they will be stopped when in fact they will be quietly downscaled.

   This is the more expensive half of the defect. A rejection is found in minutes by the person who
   caused it. A silent clamp is found weeks later by someone asking why the art looks soft, and the
   register is what they consulted to decide it would be fine.

**Not resolved here.** Epic's page is internally awkward: it also says the 14-mip default
"effectively limits the largest rendered texture to 8192 (1x1 to 8192x8192 is 14 mips)" one sentence
before saying an imported 8192 renders at 4096. Nothing above rests on that sentence. The `.INI`
requirement and the silent clamp are each stated unambiguously and are what this entry reports;
reconciling Epic's mip arithmetic with itself is not this register's job.

---

<a id="e-002"></a>

### E-002 · The half-texel row cites a page that does not contain the explanation

| field        | value                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------- |
| **state**    | **corrected in 1.1.0** — verified against the primary source, then fixed                          |
| **reported** | 2026-08-11, by the datum-caretaker, against primary sources                                       |
| **found in** | 1.0.0                                                                                             |
| **location** | `SPRITE-DESIGN-DATUM.md:668` — the tolerance register, under _Derived arithmetic_                 |
| **kind**     | **wrong citation, correct substance** — a lesser defect than E-001, and deliberately filed as one |

**What the standard says**

```
| Half-texel offset | index-space `n − 0.5` and continuous texel-space `n` are the same point; a 0.5 gap between the two conventions is the half-texel offset, not a discrepancy (Microsoft Learn, _Bilinear Texture Filtering_) |
```

**What the cited page says** — vendor documentation. Microsoft Learn, _Bilinear Texture Filtering
(Direct3D 9)_, fetched 2026-08-11 from
`https://learn.microsoft.com/en-us/windows/win32/direct3d9/bilinear-texture-filtering` (page
metadata: Direct3D 9, conceptual, 513 words, last updated 2025-03-11).

The full text was fetched and read. It is a Direct3D 9 conceptual article that walks one 4×4 texture
through point and bilinear sampling and shows the weighted colour averages at three UV coordinates.
Its nearest approach to the subject is:

> Each texel is defined at the exact center of a grid cell

It contains **no index space, no continuous texel space, no statement that the two are the same
point, no 0.5 gap between conventions, and no `floor(U − 0.5)`.** The explanation attributed to it
is not on it.

**Where the substance actually comes from** — vendor documentation, and the closest thing to a
normative statement Microsoft publishes on this. Microsoft Learn, _Coordinate Systems
(Direct3D 10)_, fetched 2026-08-11 from
`https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-coordinates`:

> For a normalized coordinate:
>
> - Point sampling: Texel # = floor(U \* Width)
> - Linear sampling: Left Texel # = floor(U \* Width), Right Texel # = Left Texel # + 1
>
> For a scaled coordinate:
>
> - Point sampling: Texel # = floor(U)
> - Linear sampling: Left Texel # = floor(U - 0.5), Right Texel # = Left Texel # + 1

That is the register's claim, stated where the register should have pointed.

**Severity, stated plainly.** The register's statement is **true**, and this entry does not dispute
it. What is wrong is the attribution. That is a smaller defect than E-001, where the fact itself is
false and a reader acting on it ships broken art. It is not nothing, though: a reader who follows
the citation to check the claim lands on a Direct3D 9 tutorial about colour blending, verifies
nothing, and is left trusting the document instead of checking it. Trust is the one thing this
document declines to run on.

**This is the second occurrence of the same failure.** The standard's own third standing rule, at
`SPRITE-DESIGN-DATUM.md:142-144`, records that it "has already mis-attributed a tutorial sentence to
'the spec' once". This is that again — a Direct3D 9 tutorial cited for a coordinate-system rule — in
the register the rule was written to protect. Filed as a repeat rather than an isolated slip,
because one is an error and two is a class, and a class is something the release check should be
catching rather than a reader.

**What was not checked.** The register's substance is also supportable from the Vulkan
specification's texel-coordinate section, and that was **not verified**: Khronos returned HTTP 403
to the chunked spec build on 2026-08-11. The Direct3D 10 page above was fetched and is quoted
verbatim. The Vulkan half is recorded as unverified rather than assumed.

---

<a id="e-003"></a>

### E-003 · Layer B and the unbounded register sort on different axes, and the document never says so

| field        | value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| **state**    | **corrected in 2.0.0** — the board reported it, the owner ruled, the standard changed            |
| **reported** | 2026-08-11, by an opinion board of four independent seats, one of them blind to the framing      |
| **found in** | 1.0.0, 1.1.0                                                                                     |
| **location** | `SPRITE-DESIGN-DATUM.md:464-470` (the Layer B slot list) and `:687-694` (the unbounded register) |
| **kind**     | **structural** — not a wrong value, a wrong question                                             |

**What the standard says**

Layer B lists five slots and closes with an entry condition:

> A value enters Layer B only with a corpus measurement behind it, not a rationale.

Three of those five also appear as rows in the unbounded register, which is Layer C. Read as a
contradiction, that looks like three rows filed in two places at once.

**What is actually wrong**

It is not a filing error. **The two lists are answering different questions**, and the document
prints them as though they were the same question.

```
Layer B asks             can the ADOPTING PROJECT measure this against its own material?
the unbounded register   does any EXTERNAL BODY bound this?
```

Those are orthogonal. The register's own stated reasons prove it — every one of them is about
external non-boundedness and none is about internal non-measurability:

> "An animation-density choice traded against file count and RAM. Tools publish frame _ordering_
> support and never a frame _count_ — there is no interoperation surface."

That says no vendor cares. It does not say the project cannot count its own files.

So a value can be **internally measurable and externally unbounded at the same time**, and two of
the three overlaps are exactly that. Their appearance in both lists is correct. What is missing is
the sentence saying it is allowed.

**The three, separated**

| quantity                   | can the project measure it?                                                             | does anything external bound it?                                             | belongs                                 |
| -------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| direction-to-index mapping | **no** — no instrument can output "index 0 means north" from pixels; it is a bare label | no                                                                           | **C only.** The one genuine mis-filing. |
| frame count per direction  | **yes** — `ls                                                                           | wc -l`, fewer free parameters than reading a canvas size out of a PNG header | no                                      | **both, legitimately** |
| playback cadence           | **yes** — a stored, re-derivable configuration value                                    | no                                                                           | **both, legitimately**                  |

**Evidence the "measurable" half of the obvious fix does not hold either**

The obvious repair — keep the two slots that are "genuinely measurable" and move the other three out
— fails on its own premise. `EXAMPLE-CONFORMANCE.md:718` files **canvas dimensions at C**, not B,
and says why at `:736-738`:

> Canvas dimensions are a milder case of the same thing: a canvas is agreed before the first frame
> exists, so there is no corpus to measure at the moment the decision is made. Ours are measurable
> now, after the fact, and that is not the same as having been derived from a measurement.

So the repository's own worked record already disagrees that canvas dimensions sit cleanly at B.
Anchor position is the only slot with an uncontested chain, and even that has a stated failure case
in the same file: a hovering character has no ground contact for the instrument to find.

**A second mechanism keeps the ambiguity alive whatever the slot list says**

`SPRITE-DESIGN-DATUM.md:482-483`:

> **Promoting a value from C to B requires a corpus measurement. Promoting it to B-ext requires a
> named external exemplar. Neither can be done with an argument alone.**

Move frame count to C and this clause immediately licenses a reader to move it back, because
counting the shipped files **is** a corpus measurement on its face. Two readers, the same frozen
text, two defensible answers — which is the divergence the Conformance section exists to forbid.
Editing the slot list alone cannot close it.

**Smaller defects found while establishing the above**

- `EXAMPLE-CONFORMANCE.md:713` says the project "could not file three of them where we were told
  to". Its table two paragraphs later files **four** of five at C. Off by one, in the repository's
  only worked model. `tools/check.mjs`'s count-word check cannot see it: the count word is followed
  by a table, and the check only fires on an ordered list.
- **`direction count`** — 4 directions versus 8, as distinct from the index mapping — appears
  exactly once in the whole document, in the Layer B slot list. The unbounded register has no row
  for it. Any repair that only moves slots out of B leaves it with no home at all.
- Nothing mechanical depends on any of this. `tools/check.mjs` matches rule ids with `[APLE]\d`, so
  **`B` and `C` cannot match by construction** — no check has ever inspected Layer B or C content.
  Verified by applying the slot-list edit to a scratch copy: `6/6 checks pass`, before and after,
  identically.

**What the board converged on**

Four seats, one of which never saw the options or the proposal, and all four landed on the same
diagnosis: the discriminator in use — _did you measure it_ — is not the discriminator that separates
these cases. The blind seat put the real one plainly:

> A wrong value is either a bug against a fact that exists independent of the declaration, or it is
> a different, equally legitimate design. If every candidate value is an equally legitimate design,
> the quantity cannot be measured into Layer B no matter how mandatory it is to pick one.

Eight frames or twelve, digit 2 or digit 5 for "down", 12 fps or 8 — none of these has a fact behind
it to be wrong against. They are chosen, not measured well or badly. A canvas of 63 px when the file
ships 64 px **is** a bug; feet declared at row 10 that render at row 40 **is** a bug. That test
separates the cases; "did you measure it" does not.

**One consequence nobody had raised**

The direction-to-index mapping is **load-bearing at rest**. Shipped filenames already encode it, so
Layer C's "free to change" is true about external constraint and false about cost: changing it
invalidates every file already delivered under the old mapping. If it moves to C, that has to move
with it, or the document tells someone a migration is free when it is not.

**For the owner**

This is frozen content and the fix is a judgement about what the standard means, not a correction of
a fact. Reported, not proposed. Three things a ruling would need to settle: whether appearing in
both lists is legitimate and should be said out loud; whether the Layer B entry condition should be
re-cut on "would a wrong value be a bug" rather than "did you measure it"; and where
`direction count` lives, since today it lives in exactly one sentence.
