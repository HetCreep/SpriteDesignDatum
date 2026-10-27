# Revalidation register

This file is the evidence that somebody looked.

A standard rots from the outside in. Every word of `SPRITE-DESIGN-DATUM.md` can stay exactly where
it was published while a vendor changes a default, a store moves a ceiling, or a specification is
reworded underneath it—and the document becomes wrong without changing. This register is where that
is caught in public, before a reader relies on it.

One section per sweep, dated, **append-only**. A verdict written here is never edited and never
deleted, including a verdict that later turned out to be wrong: a superseded finding is part of the
record, and the reasoning behind it is what stops the next person re-reporting it.

## What a verdict means

| verdict         | means                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **held**        | the source was fetched and read, and it still says what the standard says it says                                          |
| **moved**       | the content still exists but not where the locator pointed, or it exists in changed wording that does not change the claim |
| **unreachable** | the source could not be fetched—paywalled, 403, reorganised out of existence—with what was tried recorded                  |

**A row that still holds gets its date updated and nothing else.** That is not busywork. An
unchanged row with a fresh date is the only evidence a reader has that anyone looked, and a register
full of stale dates is indistinguishable from a register full of confirmed-current dates unless the
date is written down.

Never mark a row checked that was not fetched. Secondary corroboration is recorded as secondary and
never promoted to a primary verdict.

## Two vocabularies, kept apart on purpose

`held` / `moved` / `unreachable` above are **human verdicts**. They require someone to read the page
and compare it against what the standard claims.

`tools/watch-sources.mjs` cannot do that. It writes **machine verdicts**—`reachable` / `moved` /
`dead`—which say only whether a server answered on a given day. A `reachable` row is not a `held`
row. It is a locator that has not rotted, and a claim nobody has re-read yet.

The machine sweep exists to tell a caretaker where to spend an afternoon. It is not a substitute for
the afternoon.

## Why the first two sweeps disagree

Both ran on 2026-08-11. The first reported **2 moved**, the second **0**, and nothing about the
sources changed in between—the difference is one real correction and one fixed defect, and the
register keeps both runs because deleting the wrong one is how a register stops being evidence.

- `S-030` (Apple screenshot specifications) **had genuinely moved**. The locator in `SOURCES.md` was
  updated to the new path, so the second sweep found it where it now lives.
- `S-017` (Play texture compression) **had not moved at all**. Google bounced it to the same page
  with `?hl=he` appended, chosen from the caller's address. `res.redirected` cannot tell that from a
  real move, so the watch filed a finding against a row nothing was wrong with. Left unfixed it
  would have reported the same non-event every month, which is how a report teaches its readers to
  stop opening it. The watch now compares host and path and treats a query-only redirect as the same
  document.

An earlier revision of this section shipped with every one of those identifiers missing—`S-030`,
`S-017`, the filename, the query string—because the shell ate the backticks on the way in. It read
as "the locator in was updated". Recorded here rather than silently overwritten, since a register
that quietly repairs itself is the thing this file exists not to be.

## Sweeps

Machine sweeps are appended below by `tools/watch-sources.mjs`. Human verdicts are written by hand
in the same append-only way, in a section headed with the date and the caretaker who ran it.

**Two machine sweeps are recorded below; no human verdict exists yet.** The locators' reachability
has been checked by `tools/watch-sources.mjs`; whether any page still says what the standard says it
says has not—no row anywhere in this register carries **held**. The locators are alive, and the
claims behind them are unread since the day they were written.

_(An earlier revision of this paragraph said nothing had been swept and the section was empty—true
when written, false the moment the first sweep was appended below it, caught 2026-08-11 by the third
caretaker pass. The revision before that said `SOURCES.md` was still being built—stale since the day
it was written, caught the same day. Both kept: a register that quietly repairs its own prose is the
thing this file exists not to be.)_

## Sweep 2026-08-11

Run by `tools/watch-sources.mjs`. 46 rows in `SOURCES.md`, 36 fetched, 10 skipped (UNREACHABLE or
revalidate `never`). 34 reachable, 2 moved, 0 dead.

**This is a reachability sweep and nothing more.** No row below is marked **held**: whether a page
still says what the standard says it says is a judgement a person has to make by reading it. A
`reachable` verdict means a server answered on that day.

| id    | verdict   | http | url                                                                                                                      | note                                                                                                       |
| ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| S-001 | reachable | 200  | https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing                                 |                                                                                                            |
| S-002 | skipped   | -    | UNREACHABLE—403 on `iso.org/standard/66777.html` and on `iso.org/obp/ui`                                                 | marked UNREACHABLE                                                                                         |
| S-003 | skipped   | -    | UNREACHABLE—403 on `registry.khronos.org/webgl/specs/latest/1.0/`                                                        | marked UNREACHABLE                                                                                         |
| S-004 | reachable | 200  | https://docs.vulkan.org/spec/latest/chapters/samplers.html                                                               |                                                                                                            |
| S-005 | reachable | 200  | https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf                                               |                                                                                                            |
| S-009 | skipped   | -    | UNREACHABLE—403 on `registry.khronos.org/webgl/specs/latest/1.0/`                                                        | marked UNREACHABLE                                                                                         |
| S-011 | skipped   | -    | UNREACHABLE—403 across `registry.khronos.org`                                                                            | marked UNREACHABLE                                                                                         |
| S-018 | skipped   | -    | UNREACHABLE—403 on `registry.khronos.org/OpenGL/specs/gl/glspec10.pdf` and on `registry.khronos.org/OpenGL/index_gl.php` | marked UNREACHABLE                                                                                         |
| S-043 | skipped   | -    | https://www.rfc-editor.org/rfc/rfc9111.html                                                                              | revalidate never                                                                                           |
| S-006 | reachable | 200  | https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html                                       |                                                                                                            |
| S-007 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                                                                            |
| S-008 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                                                                            |
| S-010 | reachable | 200  | https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL                              |                                                                                                            |
| S-012 | skipped   | -    | https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-block-compression  | revalidate never                                                                                           |
| S-013 | reachable | 200  | https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html                                     |                                                                                                            |
| S-014 | reachable | 200  | https://gist.github.com/dacap/db18e5747a4b6e208d3c                                                                       |                                                                                                            |
| S-015 | reachable | 200  | https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/TextureAtlas.java                     |                                                                                                            |
| S-016 | reachable | 200  | https://docs.unity3d.com/ScriptReference/Sprite-pivot.html                                                               |                                                                                                            |
| S-019 | reachable | 200  | https://docs.unity3d.com/ScriptReference/SpriteAlignment.BottomCenter.html                                               |                                                                                                            |
| S-022 | reachable | 200  | https://docs.unity3d.com/ScriptReference/Sprite-pixelsPerUnit.html                                                       |                                                                                                            |
| S-023 | reachable | 200  | https://docs.godotengine.org/en/stable/classes/class_spritebase3d.html                                                   |                                                                                                            |
| S-031 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                                                                            |
| S-032 | reachable | 200  | https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine         |                                                                                                            |
| S-033 | reachable | 200  | https://docs.unity3d.com/Manual/texture-type-sprite.html                                                                 |                                                                                                            |
| S-034 | reachable | 200  | https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html                                       |                                                                                                            |
| S-035 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                                                                            |
| S-036 | reachable | 200  | https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html                                     |                                                                                                            |
| S-017 | moved     | 200  | https://developer.android.com/guide/playcore/asset-delivery/texture-compression                                          | now https://developer.android.com/guide/playcore/asset-delivery/texture-compression?hl=he                  |
| S-026 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                                                                            |
| S-027 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                                                                            |
| S-028 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                                                                            |
| S-029 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                                                                            |
| S-030 | moved     | 200  | https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/                                  | now https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications |
| S-037 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                                                                            |
| S-020 | reachable | 200  | https://docs.cocos2d-x.org/api-ref/cplusplus/v4x/d3/d5c/classcocos2d_1_1_sprite.html                                     |                                                                                                            |
| S-021 | reachable | 200  | https://doc.mapeditor.org/en/stable/manual/objects/                                                                      |                                                                                                            |
| S-038 | reachable | 200  | https://docs.unity3d.com/6000.3/Documentation/Manual/sprite/atlas/sprite-atlas-reference.html                            |                                                                                                            |
| S-039 | reachable | 200  | https://libgdx.com/wiki/tools/texture-packer                                                                             |                                                                                                            |
| S-040 | reachable | 200  | https://www.codeandweb.com/texturepacker/documentation/texture-settings                                                  |                                                                                                            |
| S-041 | skipped   | -    | UNREACHABLE—no such default located; see below                                                                           | marked UNREACHABLE                                                                                         |
| S-024 | reachable | 200  | https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator                                       |                                                                                                            |
| S-025 | reachable | 200  | https://github.com/wesnoth/wesnoth                                                                                       |                                                                                                            |
| S-042 | skipped   | -    | https://learn.microsoft.com/en-us/windows/win32/direct3d9/bilinear-texture-filtering                                     | revalidate never                                                                                           |
| S-044 | skipped   | -    | https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-coordinates        | revalidate never                                                                                           |
| S-045 | reachable | 200  | https://docs.vulkan.org/spec/latest/chapters/textures.html                                                               |                                                                                                            |
| S-046 | reachable | 200  | https://github.com/ARM-software/astc-encoder/blob/main/Docs/FileFormat.md                                                |                                                                                                            |

**Due for a human re-read**—`accessed` + `revalidate` is now in the past:

- none

**Classes outside the four-class schema**—noted, not errors. `SOURCES.md` states why each one is
filed the way it is; read that before changing anything here:

- S-024: class `EXTERNAL-MEASURED` is outside the four-class schema
- S-025: class `EXTERNAL-MEASURED` is outside the four-class schema

## Sweep 2026-08-11

Run by `tools/watch-sources.mjs`. 46 rows in `SOURCES.md`, 36 fetched, 10 skipped (UNREACHABLE or
revalidate `never`). 36 reachable, 0 moved, 0 dead.

**This is a reachability sweep and nothing more.** No row below is marked **held**: whether a page
still says what the standard says it says is a judgement a person has to make by reading it. A
`reachable` verdict means a server answered on that day.

| id    | verdict   | http | url                                                                                                                      | note                                            |
| ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| S-001 | reachable | 200  | https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing                                 |                                                 |
| S-002 | skipped   | -    | UNREACHABLE—403 on `iso.org/standard/66777.html` and on `iso.org/obp/ui`                                                 | marked UNREACHABLE                              |
| S-003 | skipped   | -    | UNREACHABLE—403 on `registry.khronos.org/webgl/specs/latest/1.0/`                                                        | marked UNREACHABLE                              |
| S-004 | reachable | 200  | https://docs.vulkan.org/spec/latest/chapters/samplers.html                                                               |                                                 |
| S-005 | reachable | 200  | https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf                                               |                                                 |
| S-009 | skipped   | -    | UNREACHABLE—403 on `registry.khronos.org/webgl/specs/latest/1.0/`                                                        | marked UNREACHABLE                              |
| S-011 | skipped   | -    | UNREACHABLE—403 across `registry.khronos.org`                                                                            | marked UNREACHABLE                              |
| S-018 | skipped   | -    | UNREACHABLE—403 on `registry.khronos.org/OpenGL/specs/gl/glspec10.pdf` and on `registry.khronos.org/OpenGL/index_gl.php` | marked UNREACHABLE                              |
| S-043 | skipped   | -    | https://www.rfc-editor.org/rfc/rfc9111.html                                                                              | revalidate never                                |
| S-006 | reachable | 200  | https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html                                       |                                                 |
| S-007 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                 |
| S-008 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                 |
| S-010 | reachable | 200  | https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL                              |                                                 |
| S-012 | skipped   | -    | https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-block-compression  | revalidate never                                |
| S-013 | reachable | 200  | https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html                                     |                                                 |
| S-014 | reachable | 200  | https://gist.github.com/dacap/db18e5747a4b6e208d3c                                                                       |                                                 |
| S-015 | reachable | 200  | https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/TextureAtlas.java                     |                                                 |
| S-016 | reachable | 200  | https://docs.unity3d.com/ScriptReference/Sprite-pivot.html                                                               |                                                 |
| S-019 | reachable | 200  | https://docs.unity3d.com/ScriptReference/SpriteAlignment.BottomCenter.html                                               |                                                 |
| S-022 | reachable | 200  | https://docs.unity3d.com/ScriptReference/Sprite-pixelsPerUnit.html                                                       |                                                 |
| S-023 | reachable | 200  | https://docs.godotengine.org/en/stable/classes/class_spritebase3d.html                                                   |                                                 |
| S-031 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                 |
| S-032 | reachable | 200  | https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine         |                                                 |
| S-033 | reachable | 200  | https://docs.unity3d.com/Manual/texture-type-sprite.html                                                                 |                                                 |
| S-034 | reachable | 200  | https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html                                       |                                                 |
| S-035 | reachable | 200  | https://docs.unity3d.com/Manual/ImportingTextures.html                                                                   |                                                 |
| S-036 | reachable | 200  | https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html                                     |                                                 |
| S-017 | reachable | 200  | https://developer.android.com/guide/playcore/asset-delivery/texture-compression                                          | redirected within the same document (?hl=pt-br) |
| S-026 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                 |
| S-027 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                 |
| S-028 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                 |
| S-029 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                 |
| S-030 | reachable | 200  | https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications                   |                                                 |
| S-037 | reachable | 200  | https://support.google.com/googleplay/android-developer/answer/9866151                                                   |                                                 |
| S-020 | reachable | 200  | https://docs.cocos2d-x.org/api-ref/cplusplus/v4x/d3/d5c/classcocos2d_1_1_sprite.html                                     |                                                 |
| S-021 | reachable | 200  | https://doc.mapeditor.org/en/stable/manual/objects/                                                                      |                                                 |
| S-038 | reachable | 200  | https://docs.unity3d.com/6000.3/Documentation/Manual/sprite/atlas/sprite-atlas-reference.html                            |                                                 |
| S-039 | reachable | 200  | https://libgdx.com/wiki/tools/texture-packer                                                                             |                                                 |
| S-040 | reachable | 200  | https://www.codeandweb.com/texturepacker/documentation/texture-settings                                                  |                                                 |
| S-041 | skipped   | -    | UNREACHABLE—no such default located; see below                                                                           | marked UNREACHABLE                              |
| S-024 | reachable | 200  | https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator                                       |                                                 |
| S-025 | reachable | 200  | https://github.com/wesnoth/wesnoth                                                                                       |                                                 |
| S-042 | skipped   | -    | https://learn.microsoft.com/en-us/windows/win32/direct3d9/bilinear-texture-filtering                                     | revalidate never                                |
| S-044 | skipped   | -    | https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-coordinates        | revalidate never                                |
| S-045 | reachable | 200  | https://docs.vulkan.org/spec/latest/chapters/textures.html                                                               |                                                 |
| S-046 | reachable | 200  | https://github.com/ARM-software/astc-encoder/blob/main/Docs/FileFormat.md                                                |                                                 |

**Due for a human re-read**—`accessed` + `revalidate` is now in the past:

- none

**Classes outside the four-class schema**—noted, not errors. `SOURCES.md` states why each one is
filed the way it is; read that before changing anything here:

- S-024: class `EXTERNAL-MEASURED` is outside the four-class schema
- S-025: class `EXTERNAL-MEASURED` is outside the four-class schema
