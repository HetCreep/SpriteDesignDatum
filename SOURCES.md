# SOURCES

**The locator register for `SPRITE-DESIGN-DATUM.md`.** One row per external citation in the
standard: where the claim lives, where the source lives, which version, and when someone last
looked.

It exists because the standard's own instruction—_"VERIFY ANY VERSION-SENSITIVE CLAIM AGAINST ITS
CITED SOURCE BEFORE RELYING ON IT"_ (`LICENSE`)—was unexecutable. Every citation in the standard is
a bare title. A reader could not click through, and both factual defects the first audit found
survived precisely because of that.

## What this file deliberately does not contain

**No values.** Not a pixel dimension, not a tolerance, not a ceiling, not a percentage, not a
default. The standard is the one home for every number, and a second copy of a number is the exact
defect that document spends several pages warning about. The columns here are locators and dates.

**No verdicts.** A row records where a source is, not whether the standard read it correctly. A
proven defect belongs in `ERRATA.md`; a held/moved/unreachable verdict belongs in the caretaker's
re-validation record. Two rows below carry locators for claims an audit has questioned—the evidence
is filed there, not here.

## How to re-run this

Fetch every `url` in order. Confirm the cited content is still on the page, then set `accessed` to
the date you looked. A source that has moved gets its `url` corrected in place. A source that has
died gets marked `UNREACHABLE` **with what was tried**—never deleted, and never replaced by a
guessed URL. A row saying "could not reach, tried X and Y" is worth more than a plausible link that
404s for the next reader. `id` is stable and is never renumbered.

**Line numbers drift.** The `line` column was taken against the working tree at commit `3ad1e55`
with uncommitted edits present on 2026-08-11—an anchor-insertion pass had already shifted every line
number in the second half of the file by roughly a hundred. Re-check the column whenever the
standard's line count changes.

**Full re-derivation, 2026-09-03.** Every row's `line` below was re-derived against the CURRENT
`SPRITE-DESIGN-DATUM.md` working copy (788 lines; the file has grown and reorganized substantially
since 08-11—several prose citations moved into consolidated tables), by `grep -n` for the row's own
distinguishing citation text, not by offsetting the old numbers. Method: for each row, the shortest
substring of its `cited as` text that is unique in the file was located, and the line it resolves to
today is recorded. Two rows could not be re-derived this way and are marked `UNRESOLVED` in
place—see their notes.

## Class

The standard's third standing rule: every citation states whether it is a **specification**, a
**vendor document**, a **tool default**, or a **recommendation**. They do not weigh the same. The
standard itself tags only seven of its citations inline, all of them `VENDOR_DOC` or
`RECOMMENDATION`; `SPECIFICATION` and `TOOL_DEFAULT` appear zero times as a citation tag, though
`TOOL_DEFAULT` names a register heading. Every class assignment below not carried by an inline tag
in the standard was made here, by the caretaker, and is open to the owner's correction.

**One value outside the four.** The corpus rows (S-024, S-025) are classed `EXTERNAL-MEASURED`—the
standard's own fourth evidence class. A corpus is material a measurement was taken from, not a
document making a claim, and forcing it into one of the four would be the mis-attribution this
register exists to prevent. This is a fifth enum value and a checker built to the four-value schema
will reject it. That rejection is the intended signal, not an oversight.

## Re-validation intervals, by class of source

Chosen by how fast each class actually moves, not per row:

| class of source                                                        | interval | why                                                                                |
| ---------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Store and console policy (Google Play, App Store, Android)             | `90d`    | Fastest-moving class here. Accepted sizes and serving rules change without notice. |
| Engine documentation (Unity, Godot, Unreal)                            | `180d`   | Moves per release. Unity docs are per-version; Godot's `/en/stable/` is a pointer. |
| Rolling specifications (Vulkan `latest`, Metal MSL)                    | `1y`     | Versioned, but the URL tracks the newest revision rather than a frozen one.        |
| Tool defaults and atlas packers                                        | `1y`     | Move quietly at point releases; a changed default is never announced loudly.       |
| Corpora (rolling repositories)                                         | `1y`     | Content grows; licence structure and credit files are what matter and rarely move. |
| Purchasable standards on an edition cycle (ASME, ISO)                  | `5y`     | Edition cycles are long and publicly announced.                                    |
| Frozen specifications (OpenGL 1.0, WebGL1/GLES2, D3D9/D3D10, RFC 9111) | `never`  | Published and closed. They do not move; only their hosting does.                   |

`UNREACHABLE` is a state, not a schedule—such a row keeps its class's interval.

---

## Standards named in prose

| id    | cited as   | line | class         | url                                                                                      | version                | accessed   | revalidate |
| ----- | ---------- | ---- | ------------- | ---------------------------------------------------------------------------------------- | ---------------------- | ---------- | ---------- |
| S-001 | ASME Y14.5 | 69   | SPECIFICATION | https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing | 2018 (reaffirmed 2024) | 2026-08-11 | 5y         |
| S-002 | ISO 1101   | 69   | SPECIFICATION | UNREACHABLE—403 on `iso.org/standard/66777.html` and on `iso.org/obp/ui`                 | unverified             | 2026-08-11 | 5y         |

S-001's catalogue page is public; the standard's text is sold, not published. S-002 could not be
reached at all: ISO's catalogue and its Online Browsing Platform both returned 403. The edition is
therefore recorded as unverified rather than guessed.

## Graphics API specifications

| id    | cited as                                                 | line | class         | url                                                                                                                      | version                 | accessed   | revalidate |
| ----- | -------------------------------------------------------- | ---- | ------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ---------- | ---------- |
| S-003 | "the only one WebGL/WebGPU exposes" (UV 0–1)             | 185  | SPECIFICATION | UNREACHABLE—403 on `registry.khronos.org/webgl/specs/latest/1.0/`                                                        | WebGL 1.0               | 2026-08-11 | never      |
| S-004 | `VkSamplerCreateInfo::unnormalizedCoordinates = VK_TRUE` | 186  | SPECIFICATION | https://docs.vulkan.org/spec/latest/chapters/samplers.html                                                               | spec `latest` (rolling) | 2026-08-11 | 1y         |
| S-005 | `constexpr sampler s(coord::pixel, …)`                   | 187  | SPECIFICATION | https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf                                               | unversioned at the URL  | 2026-08-11 | 1y         |
| S-009 | "On WebGL1 specifically"—NPOT sampling restrictions      | 227  | SPECIFICATION | UNREACHABLE—403 on `registry.khronos.org/webgl/specs/latest/1.0/`                                                        | WebGL 1.0 / GLES 2.0    | 2026-08-11 | never      |
| S-011 | "could not reach a Khronos _specification_" (ASTC)       | 252  | SPECIFICATION | UNREACHABLE—403 across `registry.khronos.org`                                                                            | —                       | 2026-08-11 | 2y         |
| S-018 | OpenGL 1.0 (1992)                                        | 380  | SPECIFICATION | UNREACHABLE—403 on `registry.khronos.org/OpenGL/specs/gl/glspec10.pdf` and on `registry.khronos.org/OpenGL/index_gl.php` | 1.0 (1992)              | 2026-08-11 | never      |
| S-043 | HTTP standards define the `max-age` **mechanism**        | 750  | SPECIFICATION | https://www.rfc-editor.org/rfc/rfc9111.html                                                                              | RFC 9111 (June 2022)    | 2026-08-11 | never      |

**`registry.khronos.org` blocks automated fetches.** Four distinct URLs on that host returned 403,
including the one the standard's own honest-weakness note at line 252 (re-derived 2026-09-03; was
line 236 at 08-11) says the sweep could not reach. The standard was right about the reach; the block
is at the host, not the document. S-004 is reachable only because Khronos also publishes the Vulkan
specification on `docs.vulkan.org`, which does not block. No equivalent unblocked mirror was found
for WebGL 1.0, GLES 2.0, or OpenGL 1.0.

S-005 resolves and serves a PDF, but the file exceeds the fetch size limit, so its content and
version string are unread. The locator is confirmed live; the citation is not confirmed present.

## Engine and runtime vendor documentation

| id    | cited as                                                     | line           | class          | url                                                                                                                     | version                  | accessed   | revalidate |
| ----- | ------------------------------------------------------------ | -------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------- | ---------- |
| S-006 | Unity 2D Pixel Perfect package 5.0, _Pixel Perfect Camera_   | 203            | VENDOR_DOC     | https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html                                      | package 5.0.3            | 2026-08-11 | 180d       |
| S-007 | Unity Manual, _Import a texture_                             | 215            | RECOMMENDATION | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                  | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-008 | Unity Manual, _Import a texture_                             | 225            | VENDOR_DOC     | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                  | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-010 | "MDN tutorial prose"                                         | 231            | VENDOR_DOC     | https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL                             | unversioned              | 2026-08-11 | 180d       |
| S-012 | BCn on **Direct3D 11 and earlier**                           | 249            | VENDOR_DOC     | https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-block-compression | page updated 2025-04-15  | 2026-08-11 | never      |
| S-013 | Godot 4 documentation, _Multiple resolutions_                | 297            | RECOMMENDATION | https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html                                    | `/en/stable/` serves 4.7 | 2026-08-11 | 180d       |
| S-014 | Aseprite (`sourceSize` / `spriteSourceSize`)                 | 338            | VENDOR_DOC     | https://gist.github.com/dacap/db18e5747a4b6e208d3c                                                                      | unversioned              | 2026-08-11 | 1y         |
| S-015 | libGDX (`offsetX` / `originalWidth`)                         | 338            | VENDOR_DOC     | https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/TextureAtlas.java                    | `master`                 | 2026-08-11 | 1y         |
| S-016 | Unity (`Sprite.pivot` in import metadata)                    | 338            | VENDOR_DOC     | https://docs.unity3d.com/ScriptReference/Sprite-pivot.html                                                              | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-019 | `SpriteAlignment.BottomCenter`—Unity ScriptReference         | 396            | VENDOR_DOC     | https://docs.unity3d.com/ScriptReference/SpriteAlignment.BottomCenter.html                                              | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-022 | `Sprite.pixelsPerUnit`—Unity ScriptReference                 | 433            | VENDOR_DOC     | https://docs.unity3d.com/ScriptReference/Sprite-pixelsPerUnit.html                                                      | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-023 | `SpriteBase3D.pixel_size`—Godot 4 documentation              | 436            | VENDOR_DOC     | https://docs.godotengine.org/en/stable/classes/class_spritebase3d.html                                                  | `/en/stable/` serves 4.7 | 2026-08-11 | 180d       |
| S-031 | Unity Manual, _Import a texture_ (texture dimension ceiling) | 680            | VENDOR_DOC     | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                  | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-032 | Unreal Engine, _Texture Format Support and Settings_         | 681            | VENDOR_DOC     | https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine        | UE 5.8 documentation     | 2026-08-11 | 180d       |
| S-033 | Unity Manual, _Sprite texture type reference_                | 682            | VENDOR_DOC     | https://docs.unity3d.com/Manual/texture-type-sprite.html                                                                | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-034 | Unity 2D Pixel Perfect 5.0                                   | **UNRESOLVED** | VENDOR_DOC     | https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html                                      | package 5.0.3            | 2026-08-11 | 180d       |
| S-035 | Unity, corroborated by Godot and Unreal                      | 699            | RECOMMENDATION | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                  | Unity 6.5 (6000.5)       | 2026-08-11 | 180d       |
| S-036 | Godot 4, _Multiple resolutions_                              | 700            | RECOMMENDATION | https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html                                    | `/en/stable/` serves 4.7 | 2026-08-11 | 180d       |

**Godot's `/en/stable/` is a moving pointer, not a version.** On the access date it serves **Godot
4.7**. A reader following these URLs a year from now will be reading a different engine release
under the same URL; that is why the version column records what `stable` resolved to rather than
repeating the word.

**Unity's versionless URLs redirect to the current release**, which on the access date is **Unity
6.5 (6000.5)**. Pinning a version into the path (`/6000.5/Documentation/Manual/...`) freezes the
content but eventually 404s as old versions age out, so the versionless form is recorded and the
resolved version noted beside it.

**S-034 is UNRESOLVED.** Its old citation text, "Unity 2D Pixel Perfect 5.0," is no longer findable
as a distinct second occurrence in the standard—only S-006's citation of the same package (line 203,
`_Pixel Perfect Camera_`) remains. Either the standard's own reorganization since 08-11 merged this
second citation away, or it was consolidated into the dimension/atlas tables under different wording
this pass could not identify by substring search. Recorded unresolved rather than pointed at a
guessed line; the url is left as-is since the SOURCE itself is not in question, only where the
standard cites it a second time.

Two title mismatches, neither of them a defect in substance. S-033's page is titled _"Sprite (2D and
UI) texture Import Settings window reference"_, not _"Sprite texture type reference"_. S-035's
attribution names Godot and Unreal as corroborating the Unity recommendation but names no Godot or
Unreal page; only the Unity locator can be supplied without guessing.

## Store and platform policy

| id    | cited as                                                              | line | class          | url                                                                                                    | version     | accessed   | revalidate |
| ----- | --------------------------------------------------------------------- | ---- | -------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ---------- | ---------- |
| S-017 | "An Android App Bundle that targets texture compression formats…"     | 369  | VENDOR_DOC     | https://developer.android.com/guide/playcore/asset-delivery/texture-compression                        | unversioned | 2026-08-11 | 90d        |
| S-026 | Google Play Console Help, _Add preview assets_ (screenshot, per side) | 675  | VENDOR_DOC     | https://support.google.com/googleplay/android-developer/answer/9866151                                 | unversioned | 2026-08-11 | 90d        |
| S-027 | Google Play Console Help (screenshot, aspect)                         | 676  | VENDOR_DOC     | https://support.google.com/googleplay/android-developer/answer/9866151                                 | unversioned | 2026-08-11 | 90d        |
| S-028 | Google Play Console Help (listing icon)                               | 677  | VENDOR_DOC     | https://support.google.com/googleplay/android-developer/answer/9866151                                 | unversioned | 2026-08-11 | 90d        |
| S-029 | Google Play Console Help (feature graphic)                            | 678  | VENDOR_DOC     | https://support.google.com/googleplay/android-developer/answer/9866151                                 | unversioned | 2026-08-11 | 90d        |
| S-030 | Apple, App Store Connect Help (screenshot sizes)                      | 679  | VENDOR_DOC     | https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications | unversioned | 2026-08-11 | 90d        |
| S-037 | Google Play Console Help (listing aspect targets)                     | 701  | RECOMMENDATION | https://support.google.com/googleplay/android-developer/answer/9866151                                 | unversioned | 2026-08-11 | 90d        |

All four Google Play rows resolve to one page. Neither store versions or dates its help pages, so
`accessed` is the only handle a reader has on when the policy was read—which is why this class
carries the shortest interval in the register.

## Tool defaults and atlas packers

| id    | cited as             | line | class        | url                                                                                           | version                | accessed   | revalidate |
| ----- | -------------------- | ---- | ------------ | --------------------------------------------------------------------------------------------- | ---------------------- | ---------- | ---------- |
| S-020 | cocos2d-x            | 407  | TOOL_DEFAULT | https://docs.cocos2d-x.org/api-ref/cplusplus/v4x/d3/d5c/classcocos2d_1_1_sprite.html          | v4.x                   | 2026-08-11 | 1y         |
| S-021 | Tiled                | 411  | TOOL_DEFAULT | https://doc.mapeditor.org/en/stable/manual/objects/                                           | `/en/stable/` → 1.12   | 2026-08-11 | 1y         |
| S-038 | Unity Sprite Atlas   | 709  | TOOL_DEFAULT | https://docs.unity3d.com/6000.3/Documentation/Manual/sprite/atlas/sprite-atlas-reference.html | Unity 6.3 LTS (6000.3) | 2026-08-11 | 180d       |
| S-039 | libGDX TexturePacker | 710  | TOOL_DEFAULT | https://libgdx.com/wiki/tools/texture-packer                                                  | unversioned (wiki)     | 2026-08-11 | 1y         |
| S-040 | TexturePacker        | 711  | TOOL_DEFAULT | https://www.codeandweb.com/texturepacker/documentation/texture-settings                       | unversioned            | 2026-08-11 | 1y         |
| S-041 | Godot                | 712  | TOOL_DEFAULT | UNREACHABLE—no such default located; see below                                                | —                      | 2026-08-11 | 180d       |

S-038 is the one row that had to be version-pinned: the versionless
`docs.unity3d.com/Manual/sprite-atlas-reference.html` returns 404, and the page lives under a
version-and-section path. Expect this locator to need repair sooner than its siblings.

⚠️ **INCONSISTENCY, flagged not resolved (2026-09-03 re-derivation).** The standard now prints a
Godot row at line 712 ("Atlas padding · 1 px · Godot") in the same table this row's `cited as` text
matches—a specific value that did not exist there at 08-11, when this row was written as
UNREACHABLE. This unit's scope is line re-derivation only; finding S-041 a URL is new research, not
performed here. The owner/caretaker should re-check whether S-041 is still genuinely unreachable now
that the standard itself asserts a value for it.

**S-041 could not be located** (as of 08-11). Godot's `ResourceImporterTextureAtlas` documents four
import properties and none of them is a padding; the _Importing images_ tutorial documents no atlas
padding; a site-restricted search of `docs.godotengine.org` surfaced no page stating one. What the
search did surface was community guidance, which is not a tool default and must not be promoted to
one. The row is recorded as unreachable rather than filled with a plausible URL. It is a third
citation without a findable source, alongside the two the audit already named.

S-040's page states the "at least" guidance the standard quotes but publishes no default value for
it, which makes `TOOL_DEFAULT` the weaker of the two possible classes for that row; `RECOMMENDATION`
is arguably the truer one. Owner's call—the register does not reclassify a citation on its own.

## Corpora

| id    | cited as                                        | line | class             | url                                                                                | version               | accessed   | revalidate |
| ----- | ----------------------------------------------- | ---- | ----------------- | ---------------------------------------------------------------------------------- | --------------------- | ---------- | ---------- |
| S-024 | Universal LPC Spritesheet (Liberated Pixel Cup) | 629  | EXTERNAL-MEASURED | https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator | unversioned (rolling) | 2026-08-11 | 1y         |
| S-025 | Battle for Wesnoth                              | 635  | EXTERNAL-MEASURED | https://github.com/wesnoth/wesnoth                                                 | unversioned (rolling) | 2026-08-11 | 1y         |

Both repositories exist, both ship the per-file credit files the standard names (`CREDITS.csv`,
`copyrights.csv`), and both describe the per-file licence structure the standard describes. The
standard already prints these two locators inline as bare `github.com/...` paths—they are the only
two citations in the whole document that carry any locator at all.

## Locators for claims the standard makes without naming a source

These rows are **not** citations in the standard. Each supplies the locator for a claim the standard
states with no attribution, or with an attribution an audit has questioned. They are recorded here
so the owner has the right URL in hand when deciding what, if anything, to do about the frozen text.

| id    | cited as                                                                  | line           | class         | url                                                                                                               | version                 | accessed   | revalidate |
| ----- | ------------------------------------------------------------------------- | -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------- | ---------- |
| S-042 | Microsoft Learn, _Bilinear Texture Filtering_                             | **UNRESOLVED** | VENDOR_DOC    | https://learn.microsoft.com/en-us/windows/win32/direct3d9/bilinear-texture-filtering                              | page updated 2025-03-11 | 2026-08-11 | never      |
| S-044 | _(not attributed)_—Coordinate Systems (Direct3D 10)                       | 729            | VENDOR_DOC    | https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-coordinates | page updated 2025-03-11 | 2026-08-11 | never      |
| S-045 | _(not attributed)_—Vulkan sampling coordinate systems                     | 729            | SPECIFICATION | https://docs.vulkan.org/spec/latest/chapters/textures.html                                                        | spec `latest` (rolling) | 2026-08-11 | 1y         |
| S-046 | _(not attributed)_—"block-compression documentation from tooling vendors" | 253            | VENDOR_DOC    | https://github.com/ARM-software/astc-encoder/blob/main/Docs/FileFormat.md                                         | `main`                  | 2026-08-11 | 1y         |

**S-042's `line` is UNRESOLVED as of 2026-09-03**—no distinct citation of "Bilinear Texture
Filtering" was found anywhere in the current standard; the half-texel-offset discussion this row
used to sit beside (old line 668) has been consolidated into the single derived-arithmetic table row
now carrying S-044/S-045 (line 729), and that row cites Coordinate Systems + Vulkan by name but not
this URL. The url itself is not in question—only whether the standard still cites it at all. Left
unresolved rather than pointed at the merged row it may no longer belong to.

S-042 is live and the page is exactly what its title says, but the substance the standard attributes
to it is not on it. S-044 and S-045 are where that substance actually lives—now consolidated into
one table row (line 729) rather than the separate prose line each held at 08-11.

S-046 supplies the vendor-level locator for the ASTC padding correction. The standard states at line
253 (re-derived 2026-09-03; was line 237 at 08-11) that the correction is "corroborated at **vendor
level only** (block-compression documentation from tooling vendors)" and names no vendor—this is
Arm's own encoder documentation, and it states the padding behaviour directly. The standard's honest
weakness at line 252 (was 236) stands unchanged: this is vendor documentation, not the Khronos
specification, and it must keep being cited as such.
