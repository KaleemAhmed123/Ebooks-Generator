# Fact-pass addendum — read this AFTER BRIEF.md

This supersedes parts of `BRIEF.md` for the current wave.

## Run only passes 1 and 2

**Skip pass 3 (voice) and pass 4 (structure) entirely.** They are already done
for the whole book, mechanically, and reported in
`voice-and-structure-whole-book.md`. Do not repeat them. Do not report a banned
word, an exclamation mark, a heading pattern, or a diagram count — those are
covered.

The one structural thing still worth reporting is **a diagram that is wrong or
misleading**, because that is a fact finding, not a structure finding.

## Budget — this matters

A previous run of this audit died when eight agents exhausted the shared session
budget mid-pass and produced zero output. Do not repeat that. Work to a budget:

- **Cap yourself at roughly 25 web fetches.** Spend them on the highest-rot
  claims, listed in your prompt. Do not fetch a source to confirm something
  stable and well-known (that `Array.prototype.map` exists, that HTTP 404 means
  not found).
- **Read files with `grep`/`sed` in batches, not one Read call per file.** You
  are looking for claims: version numbers, API names, config keys, flags,
  defaults, numbers with units, prices. Grep for those shapes first, then read
  only the pages around the hits in full.
- **Append each finding to the report file the moment you verify it, before you
  move to the next claim.** This is not "write the file early" — two previous
  agents did exactly that, wrote a header saying `_(in progress)_`, held every
  finding in memory, ran out of budget and lost 24 fetches of completed work. A
  placeholder is not a partial report.

  Concretely: verify one claim, immediately append that finding to the file,
  then verify the next. If you die at any point, everything up to that moment is
  already on disk. Never batch findings to write "at the end" — there may be no
  end.

- If you feel yourself running long, stop fetching and mark the remainder NOT
  CHECKED in the file you have already been appending to.

## Reporting change

Your report must open with a **budget line**: how many web fetches you spent,
how many claims you verified, and — explicitly — **which claims you did not get
to**. "NOT CHECKED" is a legitimate and useful outcome. A silent gap is not.

Order findings: WRONG first, then UNVERIFIABLE, then contradictions, then
repeats. Do not list CORRECT verdicts one by one — summarise them in a single
line at the end ("checked and correct: 31 claims across X, Y, Z"). The reader
needs the problems, not the clean bill.

## The one rule that outranks the others

Do not report a WRONG unless you fetched the source that proves it and can paste
the URL. A confident wrong correction costs more than the ten real findings it
hides. If you are working from memory, the verdict is UNVERIFIABLE — say so.
