# EXAMPLE — a worked conformance record

> ⚠️ **The project below does not exist.** _Lanternfall_, its art, its commits, its file paths and
> every number attached to them are **invented** for this example. Nothing here is a measurement of
> anything real, and no figure in it may be cited as evidence for anything. What is real is the
> **shape**: this is what a conformance record looks like when it is written honestly.

This file exists because [`SPRITE-DESIGN-DATUM.md`](SPRITE-DESIGN-DATUM.md) requires every adopting
project to keep a record and never shows one. A reader who has finished the standard knows they owe
a record and has never seen the thing they owe.

**This is an example, not the standard.** It does not restate, extend, reinterpret or add to any
rule. Every rule is referred to by its id; the rule text lives in the standard, once. Each answer
heading below links to that rule's own anchor, which is what the anchors are for — a record cites
the id, never the heading text, so the link survives a rewording. If this file and the standard ever
disagree, the standard is right and this file is a defect.

---

## How to read a row

Every answer below carries four things. They are the standard's own conventions, applied — the
standard states them, and a record is where a reader gets to see them used.

```
layer     who locks the value        A · A-port · L1–L4 · B-ext · B · C
label     how the number was made    MEASURED-LIVE · COMPUTED · CITED
class     for CITED rows only        SPECIFICATION · VENDOR_DOC · TOOL_DEFAULT · RECOMMENDATION
status    where we stand             met · open · deliberately excluded
```

Three of those need saying out loud, because they are the ones a record gets wrong:

**`MEASURED-LIVE` and `COMPUTED` are never the same word.** `MEASURED-LIVE` means an instrument was
run over the shipped files or the running game and this is what it printed. `COMPUTED` means
arithmetic over other numbers in this record. A row that says `MEASURED-LIVE` and was actually
derived is a lie that survives review, because both look like numbers.

**A `CITED` row states its class, every time.** A vendor recommending something and a gatekeeper
rejecting a file are not the same evidence, and the class column is the only place the difference
survives.

**A stricter rule we chose is labelled as ours.** Where we hold ourselves to more than the standard
asks, the row says so and files the value under Layer B or C — never under the standard's authority.
Borrowing the standard's authority for a house rule is how a project ends up unable to say which of
its constraints it may relax.

---

## The project

```
name            Lanternfall — a small top-down 2D action-RPG
team            one artist, two programmers
engine          Godot 4
targets         desktop native (Steam, Windows + Linux) and a web build (itch.io, WebGL2)
                there is no WebGL1 fallback build and no mobile build
art pipeline    one Aseprite source per character family
                build script exports a grid sheet + JSON per family, keeping the untrimmed frame
                of reference (sourceSize / spriteSourceSize) in the JSON
world           2D scene tree, sprites sorted by ground position
3D surface      one — the campfire screen, where the party is drawn as billboards in a 3D scene
tile grid       32 px = 1 world unit
record against  SPRITE-DESIGN-DATUM.md v1.0.0
record date     2026-08-11 · shipped corpus at commit c41e0b7
```

**The shipped corpus.** Six character families, 292 frames, four directions each.

| family     | canvas   | sets                              |  frames | character height |
| ---------- | -------- | --------------------------------- | ------: | ---------------: |
| `hero`     | 48 × 64  | idle 4, walk 8, slash 6 (×4 dirs) |      72 |            54 px |
| `villager` | 32 × 48  | idle 4, walk 6 (×4 dirs)          |      40 |            40 px |
| `wisp`     | 32 × 32  | float 8, burst 5 (×4 dirs)        |      52 |            22 px |
| `warden`   | 96 × 128 | idle 4, slam 7 (×4 dirs)          |      44 |           112 px |
| `merchant` | 32 × 48  | idle 6 (×4 dirs)                  |      24 |            40 px |
| `hound`    | 48 × 32  | idle 4, run 8, bite 3 (×4 dirs)   |      60 |            28 px |
|            |          |                                   | **292** |                  |

Character height is alpha top to alpha bottom, `MEASURED-LIVE`. Canvas is a project decision; frame
counts are a project decision. Both are covered below in their own rows.

---

## The instrument

Our numbers come from `tools/footline.py`, which implements the instrument the standard's anchor
tolerance register publishes: alpha threshold 8, foot line = lowest opaque row, foot centre =
horizontal centre of the alpha inside the foot band, foot band = the bottom 3.75% of character
height, two axes reported separately (`inDir`, `xDir`).

Run: 2026-08-10, over all 292 shipped frames at commit `c41e0b7`.

**One input the standard does not publish, so we chose it and say so.**

```
foot band rounding    3.75% of character height, rounded DOWN to whole rows, minimum 1 row
layer                 C — nobody locks this; the standard's instrument does not state a
                      rounding rule, so this is our choice and must not be quoted as spec
effect on our corpus  hero 2.025 -> 2 rows    warden 4.20 -> 4 rows
                      villager 1.50 -> 1 row  merchant 1.50 -> 1 row   hound 1.05 -> 1 row
sensitivity check     re-ran with round-to-NEAREST (villager and merchant become 2 rows).
                      MEASURED-LIVE: the villager's xDir foot centre moved 0.5 px on 2 of its
                      24 walk frames. No verdict in this record changed. Reported upstream.
```

That block is the shape of the honest answer when a project needs a number the standard does not
publish: name it, file it under Layer C, say it is ours, and show what it would cost if it were
wrong.

---

## Status at a glance

| rule                      | status                                         | see                                |
| ------------------------- | ---------------------------------------------- | ---------------------------------- |
| `A1`                      | met                                            | geometry carries aspect            |
| `A2`                      | met — condition not triggered                  | no WebGL1 target; NPOT cost taken  |
| `A3`                      | **deliberately excluded**                      | no compressed containers shipped   |
| `P1`                      | met                                            | 4,022,272 B ceiling, budget 8 MiB  |
| `P2`                      | **open**                                       | fractional scale at 2560 × 1440    |
| `P3`                      | met                                            | per-frame metadata carried         |
| `L1`                      | met via (b)                                    | portrait control, provenance noted |
| `L2`                      | met                                            | hero canvas change, cost published |
| `L3`                      | met                                            | answered once, both targets        |
| `L4`                      | met (textures) / **excluded** (listing assets) | not our stores                     |
| `E1`                      | met — provisional for `wisp`                   | blocked behind `E2`                |
| `E2`                      | **open**                                       | `wisp` trim, loader ignores source |
| `E3`                      | met                                            | `pixel_size` 0.03125, derived      |
| anchor tolerance register | 10 of 11 sets met, **1 open**                  | `hero` slash                       |
| published-values register | answered row by row                            | most rows do not bind us           |
| quantities nobody locks   | listed as Layer C                              | our values, written as unlocked    |

Three rules are open. That is not a failure of the record; it is the record working. A version of
this file with fifteen "met" rows and no evidence would be worth less than nothing, because the next
reader would stop looking.

---

## Layer A

### [`A1`](SPRITE-DESIGN-DATUM.md#A1) — our answer

**Status: met.** Layer A. Nothing in our pipeline attaches an aspect ratio to a file and expects it
to survive; the geometry carries it. Three consumers exist and all three were walked:

| consumer                  | what pins the aspect                     | how A1 is satisfied                       |
| ------------------------- | ---------------------------------------- | ----------------------------------------- |
| 2D world sprite           | nothing — the quad takes the source size | fed matching art by construction          |
| campfire billboard        | nothing — size derived, see `E3`         | fed matching art by construction          |
| party-panel portrait (UI) | box is square, stretch mode covers       | compensated + provenance stated, see `L1` |

The invariant A1 names is the same one the published-values register carries as _one identical
Pixels Per Unit across every sprite in a scene_ (`CITED`, VENDOR_DOC, Unity 2D Pixel Perfect 5.0).
We do not use that vendor's engine. We adopt the mechanism, not the product: one px→world conversion
(32 px = 1 unit) is shared by the 2D world and the campfire scene, and no sprite carries its own.

> A1's rule paragraph and `L1` state the same obligation under two ids. We answer the invariant here
> and the consumer walk under `L1`, and we have reported the duplication upstream rather than
> deciding which id owns it.

### [`A2`](SPRITE-DESIGN-DATUM.md#A2) — our answer

**Status: met — the condition A2 makes it conditional on is not triggered.** Layer A.

Our render targets are Vulkan (desktop) and WebGL2 (web). We ship no WebGL1 fallback, so A2's hard
half does not bind. What remains is the recommendation, and we take its cost rather than pretend we
comply:

```
POT compliance          NOT claimed. Four of six canvases are NPOT on at least one side:
                        48 x 64, 32 x 48, 96 x 128, 48 x 32
packed sheets           also NPOT — the hero sheet is 402 x 596 (COMPUTED, see P1)
cost accepted           the documented one: slightly more memory, possibly slower sampling
                        CITED, class RECOMMENDATION
re-opens                the day a WebGL1 fallback build is added. Nobody has proposed one.
```

We did not round the canvases up to powers of two. A 48 × 64 canvas padded to 64 × 64 would add 16
px of dead width to every one of the hero's 72 frames — `COMPUTED`: 72 × 16 × 64 × 4 = 294,912 bytes
of decode ceiling, a 33.3% rise on that family, to satisfy a recommendation whose stated cost is
smaller than the fix.

### [`A3`](SPRITE-DESIGN-DATUM.md#A3) — our answer

**Status: deliberately excluded.** Layer A.

Reason: we ship uncompressed PNG on both targets and use no GPU-compressed container — no ASTC, no
BCn, no ETC. A3's subject does not appear anywhere in our pipeline, so there is nothing to conform.

This is the shape of a legitimate exclusion, and it is legitimate only because it names the
condition that ends it:

```
re-opens on    any of: a mobile port, a move to a GPU-compressed container, or shipping a
               .ktx2/.basis asset for any reason
and on that day  the specification is re-read, not trusted from the standard's page — the
                 standard says its own A3 correction is corroborated at vendor level only
owner          the programmer who takes the port task; recorded in art/GEOMETRY.md
```

An exclusion without a trigger is a dodge. The difference between this row and a dodge is the four
lines above.

---

## Layer A-port

### [`P1`](SPRITE-DESIGN-DATUM.md#P1) — our answer

The rule text itself, quoted from the tagged citation above — a mirror, not a replacement; if this
block ever disagrees with the tagged file, the tagged file wins.

---

{% @github-files/github-code-block url="https://github.com/HetCreep/SpriteDesignDatum/blob/v2.0.2/SPRITE-DESIGN-DATUM.md#L272-L280" %}

**Status: met.** Layer A-port. `COMPUTED` — this is arithmetic, and the standard is explicit that it
is a theoretical ceiling and never a measurement of usage. We have not observed our real decoded
footprint and do not claim to have.

`frames × width × height × 4` at RGBA8:

| family     | frames | canvas   |         bytes |
| ---------- | -----: | -------- | ------------: |
| `hero`     |     72 | 48 × 64  |       884,736 |
| `villager` |     40 | 32 × 48  |       245,760 |
| `wisp`     |     52 | 32 × 32  |       212,992 |
| `warden`   |     44 | 96 × 128 |     2,162,688 |
| `merchant` |     24 | 32 × 48  |       147,456 |
| `hound`    |     60 | 48 × 32  |       368,640 |
| **total**  |        |          | **4,022,272** |

4,022,272 B = 3,928 KiB = 3.84 MiB.

**Acceptability of that ceiling has no external source** — the standard says so and we have not
found one either. Our budget is therefore ours:

```
decoded-texture budget   8 MiB          layer C — nobody locks this, it is our number
where it came from       MEASURED-LIVE: the web build was run on a 4 GB-RAM Chromebook, our
                         lowest declared target, with eight browser tabs open. Above roughly
                         9 MiB of decoded texture we saw first-load stutter on that machine.
                         8 MiB is that observation with a margin, not a derived figure.
headroom                 3.84 MiB of 8 MiB — 48% used
```

**Two honest notes on this number, because both would otherwise mislead.**

1. `wisp` is exported trimmed today (see `E2`), so its real sheet is smaller than 212,992 B. The
   ceiling is computed on the declared canvas, which makes it conservative for that family. That is
   the correct direction for a ceiling to be wrong in, and we state it rather than adjust it.
2. **What actually uploads is larger than this formula, not smaller.** The formula counts frame
   pixels; the GPU receives a packed sheet including its padding. Our packer takes 8 columns and
   `ceil(frames / 8)` rows, with 2 px between cells and at every edge. Worked for `hero`: 8 columns
   × 9 rows of 48 × 64 cells gives 8×48 + 9×2 = 402 wide and 9×64 + 10×2 = 596 high, so 402 × 596 ×
   4 = **958,368 B** against the formula's 884,736 B — 73,632 B more, +8.3%, all of it padding
   (239,592 sheet pixels − 221,184 frame pixels = 18,408 px × 4 B). All `COMPUTED`. The other five
   families are in `tools/atlas_report.json` and are not reproduced here. We report the formula's
   figure because that is what the standard asks for, and we report the gap because a reader
   budgeting RAM off the formula alone would be 8% short on this family.

### [`P2`](SPRITE-DESIGN-DATUM.md#P2) — our answer

**Status: open.** Layer A-port. This is our largest unresolved defect.

P2 has two halves for us and they behave differently, so both are answered.

**The floor half.** `COMPUTED` from stated inputs:

```
web       itch.io embed box 960 x 540 CSS px, base viewport 480 x 270
          DPR 1 -> 960/480 = 2x      DPR 2 -> 1920/480 = 4x        integer, both
desktop   1920 x 1080 window -> 1920/480 = 4x                      integer
          2560 x 1440 window -> 2560/480 = 5.333x                  NOT integer
campfire  fixed camera, no depth ramp. The scale factor has one value, not a range, so
          "compute at the end of the range that demands most pixels" collapses to that value.
```

Read literally, the comparison "required device pixels vs source width" fails for us at every scale:
our art has fewer source pixels than the box demands, always, on purpose. That is what pixel art is.
We do not claim to have met a floor we deliberately sit under, and we flag that the floor comparison
as stated does not describe deliberately-upscaled art — reported upstream.

**The integer half, which does bind us, and which we fail.** `MEASURED-LIVE`, screenshots at 2560 ×
1440 diffed against a 4× reference:

```
hero destination width   48 source columns -> 256 destination columns at 5.333x
distribution             16 columns get 6 destination px, 32 columns get 5   (16x6 + 32x5 = 256)
consequence              33.3% of the hero's columns render one-third wider than the rest,
                         and the sprite's vertical origin lands off the destination pixel grid
                         (64 x 5.333 = 341.33)
```

This is exactly the defect the published-values register carries as a RECOMMENDATION from Godot 4,
_Multiple resolutions_ (`CITED`, class RECOMMENDATION) — fractional scaling distorts pixel-exact
art, which is why engines ship a floor().

**What it would take to close it.** An integer-scale display mode: render 480 × 270 at 4× = 1920 ×
1080 and letterbox inside 2560 × 1440, leaving 320 px bars left and right and 180 px top and bottom
(`COMPUTED`). The cost is 25% of the window's width and 25% of its height given to bars, which is a
product decision nobody has taken yet. Estimated at one day. Owner unassigned. Opened 2026-08-10.

### [`P3`](SPRITE-DESIGN-DATUM.md#P3) — our answer

**Status: met.** Layer A-port.

We already ship the two targets P3 distinguishes — a browser build and a desktop native build — and
the contract did not change between them. Per-frame metadata (`sourceSize` / `spriteSourceSize`) is
exported for every family and is present in every sheet's JSON at `c41e0b7`, `MEASURED-LIVE` by
`tools/check_metadata.py` (292 frames checked, 292 carry both fields). Our loader reads it for five
of six families; the sixth is `E2`, open.

> P3 asks for a judgement about ports rather than a value, so this row states a position rather than
> a number. We have flagged upstream that P3 is the one rule in the standard for which we could not
> identify a thing to measure.

---

## The locked rules

### [`L1`](SPRITE-DESIGN-DATUM.md#L1) — our answer

**Status: met, via (b).** Layer L1 — owner-locked; nothing below may be changed by an agent or a
contributor without an owner ruling.

One consumer in Lanternfall pins an aspect ratio: the party-panel portrait control, whose box is 64
× 64 and whose stretch mode covers rather than contains. It is fed the `hero` sheet's idle frame at
48 × 64 — a 3:4 source into a 1:1 box. Half (a) is not satisfied and we do not claim it is.

Half (b) is satisfied, and this is the whole of it, in the scene file at `ui/party_panel.tscn`:

```
# source canvas 48 x 64 (hero idle frame 0; family canvas, not a crop)
# this box pins 1:1 deliberately — a portrait shows the head
# cover-fit therefore discards 25.0% of the image height, taken from the BOTTOM,
# i.e. from the feet. That is intended. Feet are the world view's job, not this box's.
# changing the hero canvas changes this number — see art/GEOMETRY.md 2026-07-22
```

The pinned number states its provenance, which is the half of `L1` that a record most often skips.
`COMPUTED`: cover scale = max(64/48, 64/64) = 1.3333; the source renders 64 × 85.33 into a 64 × 64
box; (85.33 − 64)/85.33 = **25.0%** of image height discarded.

> The published-values register's contain-fit derivation, `min(boxW/srcW, boxH/srcH)`, does not
> describe this consumer — we fit by cover, which takes the max. The register publishes contain and
> not cover, and cover is the mode that destroys art. Reported upstream. The arithmetic above is
> ours and is labelled `COMPUTED`, not cited.

### [`L2`](SPRITE-DESIGN-DATUM.md#L2) — our answer

**Status: met.** Layer L1–L4.

One event in this project's history is an `L2` event, and it is the reason this row is worth
reading.

```
2026-07-22   the hero canvas changed from 48 x 56 to 48 x 64 to stop the slash lunge
             clipping at the top of the frame
```

`L2` obliges two things in the same commit. Both were done, in commit `7b2c084`:

**1 — the original geometry recorded outside version-control history.** `art/GEOMETRY.md` carries
the entry: previous canvas 48 × 56, new canvas 48 × 64, 8 px added at the TOP, foot line unchanged
at 3 px above the bottom edge, character height unchanged at 54 px. A reader of that file does not
need the git history to know what the art used to be, which is the point of the requirement.

**2 — every consumer enumerated, with the effect on each.**

| consumer             | effect                                                          |
| -------------------- | --------------------------------------------------------------- |
| 2D world sprite      | none — size derived from the source, foot line unmoved          |
| campfire billboard   | none — same, see `E3`                                           |
| party-panel portrait | **changed** — the pinned 1:1 box now discards more of the image |
| atlas packing        | **changed** — sheet grew, see the cost table                    |

**The cost, published rather than buried.**

| what improved                                                             | what got worse                                                                     |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| slash frames with alpha touching row 0: **2 of 24 → 0** (`MEASURED-LIVE`) | hero decode ceiling **774,144 B → 884,736 B**, +110,592 B, **+14.3%** (`COMPUTED`) |
|                                                                           | portrait cover-crop **14.3% → 25.0%** of image height, **+10.7 pp** (`COMPUTED`)   |

The two worsened numbers reconstruct: 72 × 48 × 56 × 4 = 774,144 and 72 × 48 × 64 × 4 = 884,736; a
cover fit scaled by 64/48 discards 1 − 48/56 = 14.3% of a 48 × 56 source and 1 − 48/64 = 25.0% of a
48 × 64 one. The portrait crop was accepted by the artist on the reasoning already quoted in the
`L1` comment. It was not discovered later; it was found by the consumer walk this rule requires,
which is the only reason it is in a table instead of in a bug report.

### [`L3`](SPRITE-DESIGN-DATUM.md#L3) — our answer

**Status: met.** Layer L1–L4.

We ship two of the three targets in `L3`'s table — browser (WebGL2) and native — and we answer `L1`
and `L2` once each, for both, rather than per target. Nothing in either answer is target-specific,
which is the claim `L3` makes.

The one thing that genuinely differs is the one `L3` names: per-frame metadata matters more on the
native side, and that is where `E2`'s open row bites hardest. It is recorded there, not here.

### [`L4`](SPRITE-DESIGN-DATUM.md#L4) — our answer

**Status: split — met on textures, deliberately excluded on listing assets.** Layer L1–L4.

**Textures — met, trivially, and stated rather than skipped.** No store publishes a dimension or
aspect requirement for in-app textures, so there is nothing to violate. The one hard failure `L4`
names is the Android App Bundle that targets texture-compression formats without a default-format
directory. We ship no App Bundle and target no compression formats (see `A3`), so the failure mode
is unreachable. `re-opens on`: a Play Store port, at which point this row is re-read alongside `A3`.

**Listing assets — deliberately excluded.**

```
reason      the published numbers in the standard's register are Google Play's and Apple's.
            Lanternfall ships on Steam and itch.io. Neither of those numbers describes an
            asset we submit anywhere.
what is NOT excluded
            the MECHANISM L4 states. Our stores do publish listing-asset geometry, our art
            side does answer to it, and that answer lives in art/STORE-ASSETS.md — outside
            this record, because it is outside the standard's register.
re-opens on a mobile port. The standard is explicit that L4's facts move and must be re-checked
            at the moment a port is decided rather than trusted from the page, so this row is
            an exclusion with an expiry, not a permanent one.
```

Excluding the numbers is legitimate. Excluding the rule would not be, and the two lines above are
where that distinction is made visible.

---

## Layer B-ext

### [`E1`](SPRITE-DESIGN-DATUM.md#E1) — our answer

**Status: met, provisional for `wisp` pending `E2`.** Layer B-ext, with the values themselves at
Layer B.

We adopt bottom-centre-on-the-feet, and we adopt it **on the y-sort argument, not on the citation**.
Our 2D world sorts sprites by ground position; sorting by bounding-box centre would make the 112 px
`warden` and the 28 px `hound` swap depth against each other while their feet were correctly
ordered. That is a property of our renderer, checkable in our code, and it would hold if every
citation vanished.

The citation is corroboration and is labelled as such: `SpriteAlignment.BottomCenter` (`CITED`,
class VENDOR_DOC). We do **not** claim bottom-centre is an industry default, and we do not cite
Tiled — the standard records that Tiled argues the other way, and Lanternfall's view is not
isometric.

Anchor position per family, `MEASURED-LIVE` by `tools/footline.py`, Layer B:

| family     | canvas   | foot line, rows above bottom edge | foot centre, px from left | canvas centre | horizontal offset |
| ---------- | -------- | --------------------------------: | ------------------------: | ------------: | ----------------: |
| `hero`     | 48 × 64  |                                 3 |                      23.5 |          23.5 |                 0 |
| `villager` | 32 × 48  |                                 2 |                      15.5 |          15.5 |                 0 |
| `warden`   | 96 × 128 |                                 4 |                      49.0 |          47.5 |              +1.5 |
| `merchant` | 32 × 48  |                                 2 |                      15.5 |          15.5 |                 0 |
| `hound`    | 48 × 32  |                                 1 |                      23.5 |          23.5 |                 0 |
| `wisp`     | 32 × 32  |                see the note below |                         — |          15.5 |       provisional |

Canvas centre is `(width − 1)/2` on a zero-indexed grid, which is why it is a half-pixel on every
even canvas. The `warden`'s +1.5 px is real — the boss's weight is on its right leg and the artist
drew it that way — and it is carried in the family's declared offset rather than corrected in the
art. One family, one scale, one offset, read together.

> **The `wisp` hovers, and the standard has no row for that.** Its own art never touches the ground,
> so "lowest opaque row" measures the bottom of a floating creature and not its ground contact. We
> resolved it without inventing anything: the `wisp` ships a paired shadow sheet (32 × 16, 8
> frames), the instrument runs on the **shadow**, and the `wisp` body carries a hover offset of 6 px
> above the shadow's foot line — 6 px being a Layer C authoring choice, ours, chosen for feel and
> not derived from anything. That answer is sound and its measurement is currently unusable, because
> `E2` is open on this family. This row is provisional until it is not.

### [`E2`](SPRITE-DESIGN-DATUM.md#E2) — our answer

**Status: open.** Layer B-ext. Opened 2026-08-10 by the run that produced this record.

Five of six families export untrimmed and the loader places them by their canvas. The sixth does
not.

```
what happened   commit 9d2ea41 added --trim to the wisp family's export line to shrink its
                sheet. The export JSON still carries spriteSourceSize; our loader does not
                read it and places trimmed frames by their trimmed bounding box.
measured        MEASURED-LIVE. The wisp pulses: its alpha bounding-box height varies from
                18 px to 22 px across the 8 float frames. Trimming removes exactly that
                variation, so the placement error equals the per-frame delta —
                22 - 18 = 4 px of vertical drift on the declared anchor, worst case.
consequence     the wisp separates from its own shadow by up to 4 px during the float cycle.
                Nothing errors. Nothing logs. It reads as the shadow being slightly wrong.
```

Two ways to close it, and the cheaper one is also the better one:

1. **Read `spriteSourceSize` in the loader.** The field is already in the JSON — `MEASURED-LIVE`,
   `tools/check_metadata.py` confirms it is present on all 8 float frames. No asset changes, no size
   cost. Estimated half a day.
2. Drop `--trim` for consistency with our own shared-canvas choice (see the Layer C register). This
   would raise the `wisp` sheet toward its 212,992 B ceiling and is the fallback, not the plan.

Until one ships, `E1`'s `wisp` row is provisional and this record says so in both places. A record
that closed `E1` on five families and stayed quiet about the sixth would be the exact failure the
standard describes: the next reader stops looking.

### [`E3`](SPRITE-DESIGN-DATUM.md#E3) — our answer

**Status: met.** Layer B-ext, with the constant at Layer B and its input at Layer C.

The campfire screen draws the party as billboards in a 3D scene, so `E3` binds there. Nothing is
hand-authored.

```
conversion         1 world unit = 32 texture px  ->  pixel_size = 1/32 = 0.03125
                   COMPUTED. The 32 is our 2D tile size, a Layer C choice — nobody locks a
                   tile size, we picked one, and this record does not present it as a spec.
                   The engine's own default for this field is 0.01 (CITED, VENDOR_DOC,
                   Godot 4). We are not conforming to that default; we are using the
                   mechanism it exposes, which is what E3 asks for.
```

World sizes, every one of them `COMPUTED` from a measured character height and the constant above —
not one is typed anywhere:

| family     | character height | world height   | foot offset | world offset |
| ---------- | ---------------: | -------------- | ----------: | -----------: |
| `hero`     |            54 px | 54/32 = 1.6875 |        3 px |      0.09375 |
| `villager` |            40 px | 40/32 = 1.25   |        2 px |       0.0625 |
| `warden`   |           112 px | 112/32 = 3.5   |        4 px |        0.125 |

Verified `MEASURED-LIVE` in the campfire scene: the hero passes under the 2.0-unit doorway prop with
0.3125 of clearance, which is what 2.0 − 1.6875 predicts.

**The pivot travels in the same record**, as `E3` requires: the foot offset column above lives in
the same per-family entry as the scale, in `data/sprite_families.json`, and neither is readable
without the other.

**And it is checked mechanically.** `tools/check_no_hand_sizes.py` fails the build on any literal
size assignment to a sprite node. 0 hits at `c41e0b7`.

> **We broke it deliberately before trusting it.** A literal `size = Vector2(48, 64)` was added to
> the campfire scene, the check went red naming that line, and the file was restored byte-identical
> (`git status` clean, verified). A check that has never failed proves nothing, and we would not
> have known that this one greps a node type our campfire scene does not use until we tried it — it
> initially passed. The check was widened, then re-broken, then it failed correctly.

---

## [The anchor tolerance register](SPRITE-DESIGN-DATUM.md#the-anchor-tolerance-register-measured-from-external-corpora)

Layer: the register's ceilings are the standard's, derived by measuring external corpora. Our
numbers below are ours, `MEASURED-LIVE`, and are compared against those ceilings.

Kind classification is ours and is stated so a reader can disagree with it: `idle` → pose-hold,
`walk`/`run`/`float` → locomotion, `slash`/`slam`/`bite`/`burst` → action.

| family     | set   | kind       | `xDir` | `inDir` align | `inDir` depicted | as % of char height | against   | verdict  |
| ---------- | ----- | ---------- | -----: | ------------: | ---------------: | ------------------: | --------- | -------- |
| `hero`     | idle  | pose-hold  |      0 |             0 |                — |                   — | ±1 / ±1   | met      |
| `hero`     | walk  | locomotion |      1 |             — |             9 px |    9/54 = **16.7%** | ±2 / ≤27% | met      |
| `hero`     | slash | action     |      1 |             — |            13 px |   13/54 = **24.1%** | ±3 / ≤23% | **open** |
| `villager` | idle  | pose-hold  |      0 |             0 |                — |                   — | ±1 / ±1   | met      |
| `villager` | walk  | locomotion |      0 |             — |             6 px |    6/40 = **15.0%** | ±2 / ≤27% | met      |
| `warden`   | idle  | pose-hold  |      1 |             1 |                — |                   — | ±1 / ±1   | met      |
| `warden`   | slam  | action     |      2 |             — |            21 px |  21/112 = **18.8%** | ±3 / ≤23% | met      |
| `merchant` | idle  | pose-hold  |      0 |             0 |                — |                   — | ±1 / ±1   | met      |
| `hound`    | idle  | pose-hold  |      0 |             0 |                — |                   — | ±1 / ±1   | met      |
| `hound`    | run   | locomotion |      1 |             — |             7 px |    7/28 = **25.0%** | ±2 / ≤27% | met      |
| `hound`    | bite  | action     |      1 |             — |             5 px |    5/28 = **17.9%** | ±3 / ≤23% | met      |
| `wisp`     | float | —          |     \* |            \* |               \* |                   — | —         | blocked  |

\* Measured on the paired shadow sheet, not the body sheet — see `E1`. The figures are withheld from
this table rather than reported, because `E2` is open on this family and a measurement taken through
a known-broken placement path is not evidence. Reporting it with a footnote would have been the
tidier-looking choice and the wrong one.

**The one open row.** `hero` slash depicts 13 px of foot travel at a 54 px character height. The
action ceiling is 23% of character height, which is 12.42 px here — so 12 px in whole pixels, and we
measure 13. Over by 0.58 px. To close: the artist re-plants frame 4 of the lunge to bring peak foot
travel to ≤ 12 px. This is one frame of one set. It is open because it is not done, not because it
is hard. Opened 2026-08-10, owner: the artist.

Note that every `xDir` figure sits inside its band. The alignment axis — the one with no excuse — is
clean across the corpus. What we fail is the depicted-movement axis on a single lunge, and the
distinction matters: merging the two axes would have hidden a clean result behind a dirty one.

### A stricter target we set for ourselves, and did not get from the standard

**Layer B. Ours, not the standard's.** The register's pose-hold ceiling is ±1 px. Our internal
acceptance for pose-hold is **0 px**, on both axes.

```
why            MEASURED-LIVE: 4 of the 5 families the instrument applies to already measure 0
               on both axes for pose-hold (hero, villager, merchant, hound). Only warden
               measures 1. Zero is demonstrably achievable in our pipeline, on our corpus.
what this is   our own target, derived from our own best work. It is NOT a claim that the
               standard's ±1 is wrong, and it is not a number anyone may cite from here.
where we still quote ±1
               when judging incoming contractor art. Holding an outside artist to our house
               target rather than the published ceiling would be using the standard's
               authority for a preference of ours, which is precisely what the layer table
               exists to prevent.
consequence    warden idle is inside the standard's ceiling and outside our own target. It is
               on the artist's list as a polish item, not as a conformance failure, and this
               record does not count it among its open rules.
```

---

## [The published-values register](SPRITE-DESIGN-DATUM.md#the-tolerance-register-published-external-values)

Every row answered. Most do not bind us, and saying so is the answer.

**Hard**

| register row                       | our answer                                                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Store screenshot, per side         | **excluded** — not our stores, see `L4`                                                                                          |
| Store screenshot, aspect (≤ 2:1)   | **excluded** — same                                                                                                              |
| Store icon                         | **excluded** — same                                                                                                              |
| Store feature graphic              | **excluded** — same                                                                                                              |
| Apple screenshot sizes             | **excluded** — same                                                                                                              |
| Texture ceiling, 16384 (Unity)     | not applicable — not our engine. Our largest sheet is the `warden`'s, 786 × 782, `COMPUTED`                                      |
| Texture ceiling, 8192 (Unreal)     | not applicable — not our engine, same figure                                                                                     |
| Minimum size for tight sprite mesh | not applicable — not our engine, and we use no tight meshes                                                                      |
| One identical PPU per scene        | **met, as a mechanism** — 32 px = 1 unit is shared by the 2D world and the campfire scene, `CITED` VENDOR_DOC, see `A1` and `E3` |

> The register publishes texture ceilings for two engines and not for the engine it cites three
> times elsewhere. We could not answer this row against our own engine from the standard alone. The
> question is moot at 786 px and would not be at 8,000; noted upstream as a coverage gap rather than
> an error. (`COMPUTED` from the packer rule under `P1`: 8×96 + 9×2 = 786 wide, ceil(44/8) = 6 rows,
> 6×128 + 7×2 = 782 high, with 4 empty cells — the `hero` sheet is the one with no grid slack.)

**Recommendation**

| register row                 | our answer                                                                  |
| ---------------------------- | --------------------------------------------------------------------------- |
| Power-of-two dimensions      | not met, cost accepted and stated — see `A2`                                |
| Integer upscale factors      | **open** at 2560 × 1440 — see `P2`. Met at every other supported resolution |
| Store listing aspect targets | **excluded** — not our stores, see `L4`                                     |

**Tool default**

| register row  | our answer                                                                                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Atlas padding | **2 px.** Layer B — ours, by measurement. The register's spread (4 / 2 / "at least 2" / 1) is `CITED` TOOL_DEFAULT and informed the choice; it did not make it. See the cost table below. |

> We spent this number on the quantity it measures. Our 2 px is the gap **between cells sharing one
> sheet**. The 3 px of empty canvas under the `hero`'s feet is a different quantity that happens to
> share the word "padding"; it is Layer C, ours, and it appears in the Layer C register below and
> nowhere near this row.

**Derived arithmetic**

| register row          | our answer                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Decode footprint      | applied — 4,022,272 B, see `P1`                                                                                                                                                                               |
| Block-compressed size | **excluded** with `A3` — no compressed containers shipped                                                                                                                                                     |
| Contain-fit scale     | does not describe our consumer; the portrait control fits by **cover**. Our cover arithmetic is under `L1`, `COMPUTED`, and is ours rather than cited                                                         |
| Half-texel offset     | acknowledged, nothing to answer — we ship no bespoke sampling code and rely on engine defaults. This row is a definition rather than a tolerance, and a record cannot do more with it than say it has read it |

---

## [The register of quantities nobody locks](SPRITE-DESIGN-DATUM.md#the-unbounded-register-quantities-with-no-published-external-value) — our Layer C values

**Every value in this section is Layer C: nobody locks it, we chose it, and none of it may be quoted
as specification by anyone, including us.** That sentence is the reason the section exists.

| quantity nobody locks                  | Lanternfall's value                                                                                                                                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Per-frame anchor consistency           | not Layer C for us — the standard recovered it by measuring external corpora. Our numbers are in the anchor tolerance register above                                                                                                    |
| Anchor tolerance in general            | same                                                                                                                                                                                                                                    |
| Frame count per direction              | idle 4 · walk 8 · slash 6 · float 8 · burst 5 · slam 7 · run 8 · bite 3 · merchant idle 6. Four directions everywhere. Chosen by the artist for feel. No external source, none sought                                                   |
| Direction-to-index mapping             | `0 = south (toward camera) · 1 = west · 2 = north · 3 = east`. This is the order our Aseprite tags happen to sit in. Nothing external bounds it. Getting it wrong produces no error — the character simply faces the wrong way, forever |
| Filename templates                     | `{family}_{set}_{dir}_{frame:02}.png`. A private contract between our artist and our loader                                                                                                                                             |
| Playback cadence                       | idle 200 ms/frame (0.8 s cycle) · walk 100 ms (0.8 s) · slash 60 ms (0.36 s). Feel-tuning. Changing these changes how the game feels and violates nothing                                                                               |
| Component box geometry and margins     | party-panel portrait box 64 × 64 · in-frame margin under the `hero`'s feet 3 px, headroom 7 px (3 + 54 + 7 = 64)                                                                                                                        |
| Cache lifetime for shipped assets      | content-hashed asset URLs at `max-age=31536000, immutable` (365 days); the HTML entry point at `no-cache`. A function of our deploy cadence, nothing else                                                                               |
| Art payload budget                     | **6 MB** compressed. Derived from a 3 s first-load target on a 20 Mbit/s link = 2.5 MB/s × 3 s = 7.5 MB, minus headroom. Shipped art at `c41e0b7` is **1.8 MB** on disk                                                                 |
| Image format choice                    | PNG on both targets                                                                                                                                                                                                                     |
| Acceptability of a RAM ceiling         | **8 MiB** decoded. See `P1` — an observation on one Chromebook plus a margin, not a derivation                                                                                                                                          |
| Every frame of one set shares a canvas | **we require it — as our own stricter choice.** See below                                                                                                                                                                               |
| Device-fleet format support            | **excluded** with `A3` and `L4`. Telemetry that moves monthly; we will re-check at port-decision time and will not carry a number forward                                                                                               |

> The 1.8 MB on disk and the 4,022,272 B decode ceiling measure different things and are not
> comparable. PNG compresses sprite art heavily; the GPU receives none of that compression. A record
> that put both in one column would invite exactly the wrong subtraction.

### The stricter rule we adopted as our own

**Layer B. Our choice, not the standard's requirement.** This is the row the standard's unbounded
register explicitly leaves open to a project, and the labelling is the whole point of it.

```
what we require   every frame of one animation set shares one canvas
what the standard says
                  no format requires this, and the industry answer is the opposite: carry the
                  untrimmed frame of reference per frame and let frames differ
why we chose it   our loader is a grid reader. It addresses frame n as a cell in a fixed grid
                  and never consults per-frame metadata to place a sprite. A shared canvas is
                  therefore a property our pipeline already relies on, and adopting it as a
                  rule made an existing assumption checkable instead of implicit.
what it costs, published
                  MEASURED-LIVE: the hero's idle frames have a mean alpha bounding box of
                  31 x 54 px inside a 48 x 64 canvas. That is 1,674 of 3,072 px = 54.5%
                  occupancy, so 45.5% of every idle frame is transparent and still decodes.
                  Across the corpus that is the largest single line item in our P1 ceiling.
where it is NOT met
                  the wisp family, because commit 9d2ea41 added --trim without anyone noticing
                  it contradicted this choice. That is E2, and it is open.
what it is not    a standard. If someone reads this record and adopts a shared canvas because
                  Lanternfall does, they have adopted a preference of ours. The standard does
                  not ask for it and we are not entitled to lend it authority we borrowed.
```

---

## [The Layer B slots](SPRITE-DESIGN-DATUM.md#layer-b-locked-by-the-adopting-project-s-own-measurement)

The standard names four slots a project fills at Layer B, and one thing that looks like a slot and
is not. We answer all five, and two of them are answered in two places on purpose.

| slot                                       | our answer                                  | filed at               |
| ------------------------------------------ | ------------------------------------------- | ---------------------- |
| the anchor's position inside the canvas    | the per-family table under `E1`             | **B**, `MEASURED-LIVE` |
| canvas dimensions, per animation set       | the six canvases in the project table       | **B**                  |
| frame count per direction, direction count | the frame table, four directions everywhere | **B and C**            |
| animation-set lengths, playback cadence    | the cadence row                             | **B and C**            |
| direction-to-index mapping                 | `0=S · 1=W · 2=N · 3=E`                     | **C only**             |

> **Two rows are filed in both registers, and that is the correct answer, not a hedge.** The
> standard sorts Layer B and the unbounded register on different axes: Layer B asks whether we can
> measure a value against our own material, the register asks whether anyone outside bounds it. Our
> frame count answers yes to the first and no to the second, so it belongs in both, and this record
> says so rather than picking one and hoping.
>
> **Canvas dimensions sit at B under the entry test as written.** An earlier revision of this record
> filed them at C, reasoning that a canvas is agreed before any frame exists so there is nothing to
> measure at the moment of the decision. That reasoning was answering the old entry condition, which
> asked whether a measurement stood behind the value. The test asks something else now: whether a
> **wrong** value would be a demonstrable error. Ours would be — declare 47 px, ship 48 px, and
> anyone can open the file and show it. So they are Layer B, and the earlier hedge is recorded here
> rather than deleted, because the reasoning was sound against the rule it was written for.
>
> **The direction-to-index mapping is not a Layer B slot at all**, and the standard now says so
> outright. Nothing in the art can be measured to produce "0 means south" — it is a label. We note
> what the standard notes: changing it is free of external constraint and **not** free of cost,
> since every filename we have already delivered encodes it.

---

## Changes made because of this record, and what they cost

Two changes. Both improved one number and worsened another, and both worsened numbers are here.

| change                                                | what improved                                                                                                                                                   | what got worse                                                                                                     |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| hero canvas 48 × 56 → 48 × 64 (`7b2c084`, 2026-07-22) | slash frames clipping at canvas top: **2 of 24 → 0** (`MEASURED-LIVE`)                                                                                          | hero decode ceiling **+110,592 B / +14.3%**; portrait cover-crop **14.3% → 25.0%**, **+10.7 pp** (both `COMPUTED`) |
| atlas padding 1 px → 2 px (`c41e0b7`, 2026-08-10)     | neighbour bleed at 5.333× on the hero's silhouette: a 1-px fringe present at 1 px padding, **absent** at 2 px (`MEASURED-LIVE`, screenshot diff at 2560 × 1440) | hero sheet decode **921,192 B → 958,368 B**, **+37,176 B / +4.0%** (`COMPUTED`)                                    |

The padding figures reconstruct from the sheet geometry: at 1 px, 8×48 + 9×1 = 393 wide and 9×64 +
10×1 = 586 high → 921,192 B at RGBA8; at 2 px, 402 × 596 → 958,368 B.

Note what the second row admits: we raised padding to fix a symptom of the `P2` fractional-scale
defect, and the defect is still open. Two pixels of padding make the bleed invisible; they do not
make the scaling integer. If `P2` closes, this cost was spent on a problem that no longer exists,
and we would rather write that down now than discover it later.

---

## Open items

| id                    | what                                                          | opened     | to close                                             | owner      |
| --------------------- | ------------------------------------------------------------- | ---------- | ---------------------------------------------------- | ---------- |
| `P2`                  | fractional 5.333× scale at 2560 × 1440                        | 2026-08-10 | integer-scale display mode with letterboxing, ~1 day | unassigned |
| `E2`                  | `wisp` trimmed; loader ignores `spriteSourceSize`; 4 px drift | 2026-08-10 | read `spriteSourceSize` in the loader, ~0.5 day      | programmer |
| anchor / `hero` slash | 13 px depicted travel against a 12.42 px ceiling              | 2026-08-10 | re-plant frame 4 of the lunge to ≤ 12 px             | artist     |

`E1`'s `wisp` row is provisional and is not counted as a fourth open item; it unblocks when `E2`
closes.

---

## What we have not measured

Named here because the standard names its own gaps, and a record that claimed a clean sweep would be
claiming more than it did.

- **The web coverage gap applies to us directly.** The standard's published-values register contains
  no web-platform source at all, and Lanternfall ships a web build. Any tolerance concerning
  `devicePixelRatio`, CSS box sizing, `object-fit`, or browser image decoding is unsearched for us
  as much as for the standard. Our `P2` answer computes cleanly from arithmetic and rests on no
  external authority whatsoever, because there is none to rest on.
- **We have not measured real decoded texture usage.** `P1` is a ceiling, as it is required to be.
  We have never observed what the browser actually holds, and browsers evict.
- **Five of six packed sheet geometries are not reproduced in this record.** They are in
  `tools/atlas_report.json`. Only `hero` is worked through here.
- **The `wisp`'s anchor figures are not reported at all**, on purpose, because they would be
  measured through a placement path we know is broken.
- **We have not re-measured the standard's external corpora.** We use its ceilings as published. If
  a third corpus moves the base by a pixel, our `hero` slash row is the only one close enough to
  change verdict.
