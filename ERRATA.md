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

| state                         | meaning                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **reported**                  | Written down with its evidence. Nobody has ruled on it yet.                                                                                |
| **verified**                  | The owner has read the evidence and agrees the standard is wrong. What to do about it is not yet decided.                                  |
| **rejected**                  | The owner has ruled that the standard stands — the source is wrong, not authoritative enough, or read wrong. Reasoning stays in the entry. |
| **held for the next version** | Verified, correction decided, waiting on a release. Until that release the published text still says the wrong thing.                      |

---

## Register

| id              | location in `1.0.0`          | what it is                                                                                                                             | state    |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [E-001](#e-001) | `SPRITE-DESIGN-DATUM.md:625` | Unreal's 8192 ceiling **requires** a `BaseDeviceProfiles.ini` change, and an oversized import is silently clamped rather than rejected | reported |
| [E-002](#e-002) | `SPRITE-DESIGN-DATUM.md:668` | The half-texel explanation is attributed to a page that does not contain it. The statement itself is correct                           | reported |

---

<a id="e-001"></a>

### E-001 · Unreal's texture ceiling needs an `.INI` change, and nothing rejects you if you skip it

| field        | value                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| **state**    | reported                                                                                                        |
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
| **state**    | reported                                                                                          |
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
