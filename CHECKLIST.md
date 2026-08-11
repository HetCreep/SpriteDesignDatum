# Delivery checklist

For the person drawing the sprites, and the person accepting them. Every line points at a rule in
[`SPRITE-DESIGN-DATUM.md`](SPRITE-DESIGN-DATUM.md); read the rule when the answer is not obvious.

**None of these fail loudly.** Not one produces an error, a red build, or a crash. Every single one
ships and is discovered later by someone who says the game "looks a bit off" and cannot say why.
That is the entire reason a checklist exists for something a compiler could otherwise catch.

---

## Before drawing

```
[ ] The canvas size for this set is written down and agreed BEFORE the first frame.
    No standard publishes one. Whatever you pick, every frame in the set shares it.        -> L1, E2

[ ] You know every renderer that will consume these files, and the box each one draws into.
    One set of files feeding several consumers with different boxes is the failure this
    whole document is about.                                                               -> L2

[ ] The foot line — where the character's feet meet the ground — is decided and marked.
    This is the datum. Everything else is located from it.                                 -> E1
```

## While drawing

```
[ ] Feet land on the same line in every frame of a pose-hold set (idle, turn, stationary
    cast). Within the tolerance for that animation kind — see the anchor tolerance
    register. A character standing still has no reason to change height.                   -> register

[ ] Locomotion and action sets may move the feet, because the animation depicts movement.
    Alignment error and depicted movement are DIFFERENT quantities with different bands.
    Do not merge them.                                                                     -> register

[ ] The horizontal centre is stable across directions. A character that shifts sideways
    when it turns is an anchor error, not a style choice.                                  -> E1
```

## Before delivering

```
[ ] Frame counts match what was agreed, exactly. A missing file is a 404 and a broken
    image; an extra file is art that ships and never renders.

[ ] Directional sets are ordered by the agreed convention, and you have checked it rather
    than assumed it. Getting this wrong produces NO error — the character simply faces
    the wrong way, forever.                                                                -> Layer C

[ ] Nothing was re-cropped or re-canvased to make one consumer look right. If a consumer
    needs a different framing, that is a conversation, not a silent edit — re-cropping for
    one consumer is exactly how a project ends up with several canvases nobody chose.      -> L2

[ ] Trimming, if your pipeline trims, preserves the untrimmed frame of reference. An
    anchor that does not survive trimming is not an anchor.                                -> E2

[ ] Any deviation from the agreed spec is STATED at delivery — different canvas, different
    count, different animation kind. All of it is acceptable if the code side knows in
    advance. What is not acceptable is a silent difference, because nothing in the system
    will catch it until a person notices something looks wrong.
```

## For the accepting side

```
[ ] Every rule in the standard has a row in your conformance record, including the ones
    you are choosing not to meet. A rule with no entry is a rule nobody is checking.

[ ] Sizes come from the art, not from the box. If a consumer's layout decides how big a
    character renders, two sheets of different sizes produce two different characters
    and nobody asked for that.                                                             -> E3

[ ] The foot offset travels with the size, in the same record. Scale alone puts a sprite
    at the right size in the wrong place.                                                  -> E1, E3

[ ] You measured. Not inferred, not eyeballed in one scene — ran an instrument over the
    shipped files and wrote down what it said.
```
