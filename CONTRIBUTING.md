# CONTRIBUTING.md—what is actually wanted here, and what is not

Read this section before you write anything. This is not a codebase, and the usual contributing file
would waste your afternoon.

This document is licensed **CC BY-NC-ND 4.0** and has a single owner. **NoDerivatives** means nobody
else may publish an adapted version of it, and a pull request that edits the text is an adaptation.
So the ordinary open-source loop—fork, edit, PR—is not the model here, and there is no point
pretending otherwise. Sending one is not rude; it is just something that cannot be merged.

What **is** wanted is narrower and considerably more valuable: **evidence that something in it is
wrong.**

The standard makes falsifiable claims about vendor behaviour, store requirements, and API
guarantees. Every one of those is a hostage to a vendor who can change it without telling anyone. A
document that was correct the day it was published goes quietly wrong while every word of it stays
exactly where it was. Catching one is the most useful thing a reader outside this repository can do,
and it is the thing this project cannot do for itself at scale.

---

## Three things worth sending

### 1 · A correction, with evidence

The unit of a useful report is not "this is wrong". It is:

- **the location**—the rule ID or the register row, and what the document says today, **quoted**;
- **the source**—a URL to the vendor's or standards body's own page. Not a tutorial, not a forum
  answer, not a second-hand document that cites the first one;
- **its class**—specification · vendor documentation · tool default · recommendation. These do not
  weigh the same, and a report that does not say which one it is has skipped the hard part;
- **the exact wording you found there**, quoted rather than summarised;
- **how the two differ**, in a sentence;
- **the date you fetched it**, because the next reader needs to know how old your check is.

**A report with no source cannot be acted on.** Not because it is unwelcome—because there is nothing
to act on. "The Unity limit is different now" leaves the owner to do the whole job from scratch and
to guess which page you were looking at. "Unity Manual, _Import a texture_, fetched 2026-08-11, says
X, the register says Y" is a decision someone can make in two minutes.

A verified defect is worth more than a polite one. If a number in here is wrong, say so bluntly and
show the page.

### 2 · A named counter-exemplar

For a `B-ext` value—an external convention with real precedent—the standard's own rule is that it
moves **only with a named counter-exemplar**. Not "most projects do it differently". Not "in my
experience". A real, shipped, nameable thing that does it another way, named specifically enough
that someone else can go and look at it.

That rule exists because "everyone knows" is how the conventions this document is trying to
disentangle got established in the first place.

### 3 · A re-measurement

`LICENSE`'s scope section says it directly: measurements, numbers, and facts are not copyrightable,
and **anyone may independently re-measure the same public corpora and publish their own numbers.**
That is expected. It needs no permission and you should not ask for any.

The method is published in the standard precisely so it can be re-run rather than trusted. Run it,
publish your figures in your own repository under your own name, and send a link. Independent
re-measurement is not a threat to a standard; it is the only way one earns the right to be believed.
If your numbers disagree with the published ones, that is a correction under item 1 and the more
interesting outcome of the two.

---

## What will not be accepted

- **Rewordings, restructuring, and style.** The expression is the part the licence actually
  protects, and it is the owner's.
- **New rules proposed without evidence.** A rule with no source is a Layer C value with ambitions,
  and promoting one to spec to make a table look complete is the specific failure this document was
  written against.
- **Anything that requires your text to be incorporated.** This is an **open question, not a
  policy**: `LICENSE` says what the world may do with this document and says nothing at all about
  what rights the owner would hold over text a contributor sends in. That gap is not something this
  file gets to fill by inventing a CLA. Until a lawyer settles it—the same lawyer `LICENSE` already
  says has not looked at any of this—**send evidence and let the owner write the words.** It
  sidesteps the question entirely and costs you nothing, because the valuable part of your report
  was never the prose.

---

## Where a report goes

**Open an issue.** https://github.com/HetCreep/SpriteDesignDatum/issues

That is the route to use for a correction, a counter-exemplar, or a re-measurement. It is public, it
is harder to lose than a message, and a report anyone can read is a report anyone can check.

For a **licence request**—commercial use, adaptation, redistribution of the document—either an issue
or a direct approach through **github.com/HetCreep** works. `LICENSE` names both.

> An earlier revision of this section said there was no issue tracker, because there was no public
> remote, and instructed that it "gets updated in the same commit that adds the remote". The remote
> was added and this section was not updated in that commit. It is recorded rather than quietly
> replaced, because a file that predicts its own staleness and goes stale anyway is a better
> argument for checking than any rule about it.

## What happens to it

A correction with evidence is written into [`ERRATA.md`](ERRATA.md) as **reported**, whether or not
anyone agrees with it yet. The owner then rules: **verified**, **rejected**, or **held for the next
version**.

**Entries are never removed, including rejected ones.** A rejected report keeps its evidence and its
reasoning, which is what stops the next person re-reporting the same thing. If yours is rejected you
will be able to read exactly why, and if the reasoning is wrong, that is itself reportable.

Two things worth knowing before you expect a fast fix:

- **A released version does not change.** A defect found in `1.0.0` is corrected in the next
  version, not edited out of `1.0.0`. Someone conforming to `1.0.0` has to be able to open it and
  find the same document. See [`GOVERNANCE.md`](GOVERNANCE.md).
- **Being listed in `ERRATA.md` is not being fixed.** It is being on the record, which is a
  different and slower thing, and the register says which state each entry is in so nobody has to
  guess.
