# Production Terms — start here

Resume point for a new session. Read this, then
`production-terms-writing-brief.md`.

## Where it stands

All eight booklets are written and build clean. **456 of 456 terms, 249 pages.**

| # | Booklet | Terms | Pages | State |
|---|---|---|---|---|
| 01 | AI Engineering | 101 / 101 | 105 | done |
| 02 | Design & Distributed | 75 / 75 | 36 | done |
| 03 | Engineering Practice | 57 / 57 | 30 | done |
| 04 | Data Stores | 52 / 52 | 28 | done |
| 05 | Reliability & Observability | 49 / 49 | 22 | done |
| 06 | Frontend & Realtime | 43 / 43 | 25 | done |
| 07 | Language, Runtime & Platform | 41 / 41 | 22 | done |
| 08 | Infra, Cloud & Security | 38 / 38 | 20 | done |
| — | **The Vocabulary of Production** (merged volume) | 456 | **287** | done |

"Done" means both checks pass: every allocated term present as an `##` heading,
and `node tools/build.mjs <booklet>` printing no overflow line.

Build the merged volume with `node tools/build.mjs the-vocabulary-of-production`.
Building `production-terms` still means the eight booklets and nothing else.

**The series total is 456, not 457.** An earlier count in this file said 457;
the per-booklet rows always summed to 456 and a scan of every `##` across the
eight booklets confirms 456 distinct terms, with **no term appearing in two
booklets**.

## The one remaining booklet

`books/tech/production-terms/03-engineering-practice/` — and it is the odd one
out. **53 of its 57 terms have no source material.** They must be researched
against primary sources and written from scratch, per the standard in the
project `CLAUDE.md`. The other seven booklets were transformations; this one is
not.

Four terms do have source data (Contract Testing, Egress Cost, NAT Gateway Cost,
Spot vs On-Demand vs Reserved) in
`production-terms-data/03-engineering-practice.json`.

The full list of 53, grouped, is in `production-terms-ebook.md` under
"The four new categories".

Cover data is already written in that booklet's `meta.json` — accent `#0d7a7a`,
"Booklet 3 of 8".

## Do this before writing any pages

**Generate the page split from the data, do not group terms by hand.** This is
the lesson from the seven booklets that came before, and it cost real rework
twice.

Sorting by eye produced two classes of error every time it was attempted:

- Four terms on a page instead of three. Three is the measured ceiling; four
  runs 220-250mm against a 186mm page.
- Wrong alphabetical order. `Critical Rendering Path` sorts before `CSRF`.
  `Read Concern` before `Redis Persistence`.

Booklet 06 was rebuilt with a script that collects every `##` block, sorts by the
source order, and regroups into triples. It took one command and caught a term
that had been silently dropped and missed on two visual passes.

### The split script

`tools/split-pages.mjs` does this. It collects every `## ` block already
written, sorts by the source order, regroups into pages of three, and rewrites
the filenames.

```
node tools/split-pages.mjs 03-engineering-practice --check   # report only
node tools/split-pages.mjs 03-engineering-practice           # rewrite the pages
node tools/build.mjs 03-engineering-practice                 # then build
```

**It refuses to write anything if a term is missing or unexpected**, so a
half-written booklet fails loudly instead of being quietly reshuffled. That is
how the dropped `Referential Equality` was caught in booklet 06, after two
visual passes had missed it.

Use `--check` on any booklet at any time — it is the coverage check.

`tools/check-draft.mjs` is its companion, used when a booklet is written by
several agents in parallel. It checks one category draft before the regroup:
term coverage, stray `#` headings, banned words, SVG viewBox conventions and
per-term word counts against the density budget.

```
node tools/check-draft.mjs testing "Testing & Quality"
```

## Density — now measured by the tool, not by you

The splitter renders every term in the real theme, measures it, and fills each
page to the printable height. Pages hold one to three terms depending on what is
in them. **Do not reason about terms-per-page any more; run the splitter.**

Current state across the volume: 261 term pages, average fill 76.4%, zero over
the 186mm line.

If the build still reports an overflow, fix it by cutting a sentence or
shrinking an SVG. **Never by moving a term to another page** — that breaks the
alphabetical filenames, and the splitter will undo it anyway.

Rewording rarely helps; it reflows to the same line count. Remove a paragraph,
or turn a table into prose.

## Then

1. Consistency pass across booklets — terms defined the same way in two places,
   glossary drift. The cross-booklet duplicate scan is clean, so this is about
   wording, not overlap.
2. Series front matter, glossary, merged volume.
3. Delete `tools/legacy/` once the merged volume builds from `books/`.

Fact-checking of booklet 03 was done at write time against primary sources, and
every claim that could not be sourced was cut. The list of what was cut and why
is in `production-terms-ebook.md` under the 2026-09-03 update.

## Files

| Path | What |
|---|---|
| `production-terms-ebook.md` | the full record — every decision, all 14 questions answered, dated updates |
| `production-terms-writing-brief.md` | the writing contract: voice, structure, SVG rules, verification |
| `production-terms-cut-list.md` | all 171 cut terms with the rule each failed |
| `production-terms-data/*.json` | the source terms per booklet — moved out of the session scratchpad so they survive |
| `../../CLAUDE.md` | project house rules |
| `../../todos/README.md` | parked items outside this task |
