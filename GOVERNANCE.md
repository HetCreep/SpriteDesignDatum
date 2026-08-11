# GOVERNANCE.md — who decides, and what happens if nobody does

## Who decides

**The copyright holder. One person.** There is no committee, no maintainer group, and no vote, and
writing one into this file would be describing something that does not exist.

Everything below is either the evidence a decision needs, or an honest statement of what breaks when
there is only one person available to make it.

## What it takes to change a value

The standard already answers this better than most governance documents manage to, and it answers it
in the right place: in the layer table, next to the values themselves. Every value is filed under
**who locks it**, and that filing — not anyone's seniority, and not how well an argument is made —
determines what it takes to move it.

Restated as a change procedure. The layer table in `SPRITE-DESIGN-DATUM.md` is the authority; this
is the evidence column, not a second copy of the values.

- **`A`** — locked by the graphics API or the hardware. **Not movable by anyone here.** Violating it
  breaks at the API level, so there is nothing to rule on. If the API changes, the standard follows;
  that is a correction, not a decision.
- **`A-port`** — locked by the target device. **Not movable, and not carried forward.** It is
  re-measured per target. An `A-port` value argued rather than measured is already wrong.
- **`L1`–`L4`** — locked by the owner. **An owner ruling, and nothing else.** No evidence moves
  these, because nothing external locks them: they are choices, and the owner made them. Anyone else
  who needs one changed escalates and stops.
- **`B-ext`** — an external convention with real precedent. **A named counter-exemplar.** A real,
  shipped, nameable thing that does it differently, named specifically enough that someone else can
  go and look. Not an opinion, not a preference, and not "most projects".
- **`B`** — the adopting project's own measurement. **Re-measure the corpus and show the method.** A
  number that cannot be re-derived from stated inputs is the defect, however small it is.
- **`C`** — nobody locks it. **Free.** The only binding rule is that it must be stated as free and
  never quoted as spec.

That ladder is the governance model. What is unusual about it, and worth keeping: **the evidence
required is a property of the value, not of who is asking.** The owner cannot move a `B-ext` value
by ruling either; they would need the same counter-exemplar a stranger would. The one place
authority is personal is `L1`–`L4`, and those are exactly the values that have no external source to
appeal to.

## Proposing one

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for what a proposal needs and where to send it. A defect
found in a published version goes in [`ERRATA.md`](ERRATA.md).

## A released version does not change

**Corrections do not get edited into a version that has shipped.** A proven defect in `1.0.0` stays
in `1.0.0`; it is recorded in `ERRATA.md` and corrected in the next version.

The reason is the reader. A project that wrote a conformance record against `1.0.0` has to be able
to open `1.0.0` and find the same document. If the text moves underneath them, their record
documents a document that no longer exists, and neither they nor anyone auditing them can tell which
version they actually met.

This is the standard's own culture — annotate the error, do not delete it — applied after
publication, when annotating in place is no longer available.

## What a version bump does to a live conformance claim

`CHANGELOG.md` defines what MAJOR, MINOR, and PATCH mean for a standard. The consequence for someone
who has already claimed conformance:

- **A conformance record must name the version it was written against.** A record that says
  "conforms to Sprite Design Datum" with no version is not a claim; there is nothing in it that
  could be checked.
- **MAJOR** — a locked rule changed meaning or a published tolerance moved. A claim against the
  previous version is no longer a claim about the current one. Re-check the affected rules; do not
  re-badge the record.
- **MINOR** — existing conforming work still conforms, but the record is now **incomplete**: there
  are rules in the standard it has not answered for. Incomplete is a different status from failing,
  and the record should say which one it is.
- **PATCH** — wording and citations that move no value. A claim survives untouched.
- **An open erratum** against the version you conformed to is a known hole in **your** claim as much
  as in the standard's text. If E-00n touches a rule your record marks met, your record is met
  against a sentence that is under dispute, and the honest record says so.

## Two published surfaces, one normative

The standard is readable in two places, and they do not have equal standing.

**The repository is normative.** The text of a released version is `SPRITE-DESIGN-DATUM.md` at its
signed tag — `github.com/HetCreep/SpriteDesignDatum/blob/<tag>/SPRITE-DESIGN-DATUM.md` — and that
address is what a citation or a conformance record names. Rule ids resolve as anchors there; the tag
fixes the bytes.

**The documentation site (`hetcreep.gitbook.io/hetcreep-docs`) is a reading copy.** It is a
rendering of whatever the repository currently holds, republished on the hosting platform's own
schedule. It is not a second edition and it is not citable: its renderer strips the rule-id anchors,
so a citation ending `#L1` lands at the top of the page — measured, 0 of 13 rule anchors survive
there against 13 of 13 on the tagged file. The evidence and the decision behind this arrangement are
recorded in [`docs/gitbook-assessment.md`](docs/gitbook-assessment.md).

**If the two disagree, the repository is right.** A disagreement is a rendering defect, not an
ambiguity about what the standard says — report it like any other defect. And since the site tracks
the current state of the repository while a released version is fixed by its tag, the site saying
something a tagged version does not is not necessarily a defect at all; the tag is the record.

**The site is not a write surface.** No change to this standard is made through the site's editor.
The platform's sync is technically capable of carrying an edit back into the repository, and no
setting turns that off — so it is turned off by rule instead: every change enters through the
repository's own process, where the mechanical checks run, the reasoning lands in the commit
history, and a correction to released text goes through `ERRATA.md` rather than around it. A commit
on the synced branch bearing the platform's own prefix (`GITBOOK-…`) would mean this rule failed,
and is treated as a defect to be reported and rolled back, not as an edit to be merged.

## Single-maintainer risk, and the bind under it

One person maintains this. If they stop — and people stop for ordinary reasons — the document does
not gracefully pass to anyone.

The reason is not organisational, and no procedure written in this file can fix it: **the licence is
NoDerivatives.** Nobody else may publish a corrected version. Not a fork, not a successor edition,
not a patched copy with the errata folded in. The standing grant to Katomnoi Studio does not close
this either — by its own terms it permits modification but excludes distribution to third parties,
so the Studio may correct the document for itself and still may not publish the corrected one.

What a third party may still do, with the author gone: re-measure the corpora and publish their own
numbers (facts are not copyrightable; `LICENSE`'s scope section says so explicitly), cite it,
criticise it, and publish their own errata against it. What nobody may do is **fix it**.

So the failure mode is precise: a document that is publicly wrong, publicly known to be wrong, and
legally correctable by exactly one person who is not available. Standards rot on a schedule set by
vendors, not by maintainers, and this one names its own perishable claims — so the rot is not
hypothetical, only deferred.

**This is a licensing decision, not a process one, and it is not solved here.** A succession clause
saying "then X maintains it" is void unless the licence grants X the right to publish a modified
version. The instruments that would work are all licence changes — a fallback grant that converts
the terms on a defined trigger, a named successor holder, a stewardship licence to a named party —
and every one of them needs the lawyer that `LICENSE` already says has not read any of this.

Recorded as open. An unsolved problem stated is worth more than a solved-looking one that is void.

## Agents

An AI agent working on or from this document is bound by [`AGENTS.md`](AGENTS.md). The short version
for governance purposes: an agent conforms work to the standard and **never edits it**. A caretaker
that finds a defect writes it into `ERRATA.md` with the evidence and stops. A caretaker who quietly
fixes the standard has replaced it with their own opinion of it, and nobody downstream can tell
which of the two they are conforming to.
