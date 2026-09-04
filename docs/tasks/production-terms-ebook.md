# Production Terms — "The Vocabulary of Production"

**Status:** in progress — cut done, series scaffolded, format proven on one page
**Started:** 2026-09-01
**Last updated:** 2026-09-01

---

## What you asked for

> "I wanna start with another ebook and base content is in production-terms
> folder inside tech. Based on the way we write ebook, the content style, let us
> start working for preparation. It has actually a lot of things, the terms very
> rare, so maybe we can skip the rare ones and transform rest according to our
> style."

Then, after the first round of questions:

> "That would be too time consuming. You as an expert senior tech architect with
> 10+ years of experience decide what comes in and what gets dropped (the
> uncommon ones people don't talk and use in convo) so things that mid-senior
> engineers know for production. In short decide the list, and also you can add
> more categories if you think so."

## The source

`books/tech/production-terms/production-terms.html` — a 572KB single-page
artifact titled *Production Engineering Glossary*. The content lives in a
`const TERMS` array of 607 objects.

Two formats inside it, which is the fact that shaped everything after:

| | Terms | Fields |
|---|---|---|
| AI cluster — AI Engineering, LLMs, RAG, Prompting, OCR | **141** | `means` `example` `diagram` **`how`** **`more`** **`diagram2`** |
| Everything else | **466** | `means` `example` `diagram` |

The AI terms run about four times longer. That is not a quality signal — those
categories were simply written to a bigger template.

Diagrams throughout are ASCII, median five lines.

---

## Open questions

| # | Question | Your answer |
|---|---|---|
| 1 | One book, a series, or a hard cut? | **Series by category, and drop the weak terms** |
| 2 | What to do about the 141 vs 466 depth gap? | **Keep the gap, use it structurally** |
| 3 | Overlap with the existing twelve books? | **Overlap is the point** |
| 4 | 607 ASCII diagrams — convert to SVG? | **Only the ones that earn it** |
| 5 | What makes a term not worth keeping? | **All four rules, and: if it is thin but important, expand it rather than drop it** |
| 6 | Who runs the cut? | First "you mark it up", then changed to **"you decide"** |
| 7 | Whole categories to drop? | **DSA (20) and Git & GitHub (13)** |
| 8 | Where does verification bite? | **Only what survives the cut** |
| 9 | How should categories become booklets? | **Merge into themed booklets** |
| 10 | What is a `##` in a glossary? | **Every term is a `##`** — contents lists all of them |
| 11 | Positioning? | **The vocabulary of production** |
| 12 | Add new categories? | **Yes — the four real gaps** |
| 13 | How hard to cut? | **Hard, around 350** — landed at 403, see below |
| 14 | Salesforce — keep it? | **Keep.** See the note below |

### Salesforce

I first proposed cutting it: vendor-locked, and it sits oddly next to
distributed systems. Then I read `shared/author/sources/`. Salesforce is the
**third most-mentioned technology in your own resume and portfolio**, ahead of
React, Node and AWS, and you shipped a Salesforce-to-SAP integration platform.

It is not vendor bloat for this author, it is a credential, and no competing
glossary covers it. Kept, all twelve terms.

### The 350 that became 403

You asked for roughly 350 survivors. Applying your four rules strictly stops at
**403**. Getting to 350 would mean cutting about fifty terms that pass every
rule — Bloom Filter, Presigned URL, Design Tokens, Window Function — on taste
rather than on a reason.

The artifact was less padded than I estimated when I proposed the number. The
error was in the estimate, not in the cut. You accepted 403.

---

## Plan

### The cut

| | Terms |
|---|---|
| Started with | 607 |
| Whole categories dropped | −33 |
| Individual terms cut | −171 |
| **Kept** | **403** |
| New terms to write | +54 |
| **Final** | **457** |

Why terms died:

| Rule | Cut | Examples |
|---|---|---|
| `niche` — too rare to come up in a working year | 58 | Vector Clock, PACELC, Gossip Protocol, IVF / Product Quantisation, Binarisation, VRAM Budgeting |
| `basic` — the reader knows it cold | 57 | Box Model, Closure, CORS, ACID, Index, SQL Injection, WebSocket, Token |
| `dup` — another term already covers it | 30 | Rate Limiter Design, QPS Estimation, P99, Two-Phase Commit |
| `thin` — nothing beyond the name | 10 | Design for Failure, Redundancy, Toil, Observability |
| `toy` — an interview exercise, not vocabulary | 4 | URL Shortener, News Feed, Chat System, Autocomplete Design |
| `dated` / `vendor` / `trivia` | 12 | Lazy Queue (removed in RabbitMQ 4), Tailwind JIT, Temporal Dead Zone |

Two judgment calls worth recording:

- **The entire AI training side is gone** — DPO, RLHF, Instruction Tuning,
  Fine-Tune vs Adapter, GPU/MFU, VRAM Budgeting. You build on provider APIs. A
  production AI engineer does not say "catastrophic forgetting" out loud.
- **Five of seven WebRTC internals are gone** — ICE, STUN, SDP Offer/Answer,
  Simulcast, Jitter Buffer. Kept TURN and SFU vs Mesh, the two that actually get
  argued about.

Full record, every cut with its reason: `production-terms-cut-list.md`.

### The eight booklets

| # | Booklet | Categories folded in | Terms |
|---|---|---|---|
| 01 | AI Engineering | AI Eng 49, LLMs 20, RAG 14, Prompting 9, OCR 9 | 101 ◆ |
| 02 | Design & Distributed | System Design 49, Distributed 26 | 75 |
| 03 | Engineering Practice | Testing, Performance, Cost, Team & Process | 58 (new) |
| 04 | Data Stores | Postgres 20, RabbitMQ 13, Redis 11, Mongo 8 | 52 |
| 05 | Reliability & Observability | Reliability 35, Observability 14 | 49 |
| 06 | Frontend & Realtime | React 17, Frontend 15, Realtime 11 | 43 |
| 07 | Language, Runtime & Platform | JS/TS 14, Node 9, Python 6, Salesforce 12 | 41 |
| 08 | Infra, Cloud & Security | AWS 10, Security 10, Docker 10, Nginx 8 | 38 |

◆ already written at full depth.

**Salesforce sits in booklet 07 on purpose.** Twelve terms is a four-page
pamphlet, not a book. Apex governor limits are runtime traps — the same family
as Node's event loop and Python's GIL. It belongs with them.

### The four new categories — 54 terms to research and write

- **Testing & Quality (18)** — Flaky Test · Test Pyramid · Test Double ·
  Fixture vs Factory · Snapshot Test · Mutation Testing · Coverage Is Not
  Confidence · Golden File Test · Property-Based Testing · Integration vs
  End-to-End · Test Isolation · Deterministic Test · Smoke Test · Testing in
  Production · Test Data Management · Arrange-Act-Assert · Flaky Test
  Quarantine *(+ Contract Testing, moved from System Design)*
- **Performance Engineering (13)** — Flame Graph · Sampling vs Instrumentation
  Profiling · GC Pressure & Allocation Rate · Microbenchmark Trap · Load vs
  Stress vs Soak · Connection Pool Sizing · Warm-Up & JIT Effects · Amdahl's
  Law · Async Overhead · Batch Size Tuning · Heap Snapshot vs Memory Profile ·
  Resource Saturation · Tail-at-Scale
- **Cost & FinOps (11 + 3 moved)** — Unit Economics of a Feature · Right-Sizing ·
  Idle Spend · Cost Attribution & Tagging · Showback vs Chargeback · Storage
  Class Lifecycle · Log Volume Cost · The Observability Bill · Committed Use
  Discount · Cost Anomaly Detection · CI Minutes Cost *(+ Egress Cost, NAT
  Gateway Cost, Spot vs On-Demand vs Reserved, moved from AWS)*
- **Team & Process (12)** — ADR · RFC / Design Doc · Incident Command · On-Call
  Rotation & Handover · Code Review Latency · Trunk-Based Development ·
  Definition of Done · Bus Factor · Tech Debt Register · Change Freeze · Release
  Train · Escalation Policy

### The page format

Terms run **alphabetically** inside each booklet. That makes the contents page a
real index: every term is an `##`, so it is listed with its page number, and
alphabetical page order means the contents reads A to Z.

Each term gets, and only gets:

1. What it means — one or two sentences
2. Where it bites — the failure mode nobody warns you about
3. A picture, when a picture is faster than a sentence

**Diagrams split two ways.** About half the source "diagrams" are really
two-column comparisons — those become quiet markdown tables. The ones that show
real structure or flow become hand-written inline SVG. Nothing stays as ASCII.

**Measured density: three terms with two SVGs fills exactly one page** —
186mm of 186mm printable. That is the ceiling to write to.

### The series theme

`books/tech/production-terms/theme.css` is the fourth cascade layer in use for
the first time. A teaching page wants centred, underlined section titles with
air around them. A glossary wants dictionary entries. The series theme changes
only that: `h2` goes left-aligned with a hairline rule, paragraph and diagram
spacing tightens, tables are set quietly, and the contents page shrinks because
it now lists every term.

Nothing else in the tech domain is touched.

### Rejected alternatives

| Rejected | Why |
|---|---|
| One 300-page reference volume | No natural stopping points, and a 574-entry contents page |
| Levelling all 466 terse terms up to the AI depth | ~466 pages of new writing, larger than the whole rest of the project |
| Levelling the 141 AI terms down | Throws away the best-written material in the artifact |
| Converting all 607 ASCII diagrams to SVG | Half of them are formatted lists, not diagrams. A table serves those better |
| Cutting terms because another booklet covers them | You decided overlap is the point — different job, different length |
| Salesforce as its own booklet | Twelve terms is four pages |
| Keeping DSA | Interview algorithms, not production engineering, and the most over-served topic in existence |

---

## Tasks

- [x] 1. Parse the artifact, establish real counts and the 141/466 split
- [x] 2. Interview — 13 questions across three rounds
- [x] 3. Run the cut: 607 → 403, every cut carrying its reason
- [x] 4. Verify no cut name was a typo — 0 unmatched
- [x] 5. Scaffold the series and eight booklet folders with `meta.json`
- [x] 6. Write the series `theme.css`
- [x] 7. Prove the page format end to end — cover, contents, one real terms page
- [x] 8. Measure the density ceiling — 3 terms + 2 SVGs = 186mm of 186mm
- [x] 9. Booklet 02 in full — 75 terms, 29 pages, zero overflow
- [ ] 10. Booklets 04, 05, 06, 07, 08 — the remaining terse ones
- [x] 11. Booklet 01 — 101 AI terms at full depth, 105 pages, zero overflow
- [ ] 12. Booklet 03 — research and write the 54 new terms
- [ ] 13. Cover data for the remaining seven booklets
- [ ] 14. Verification pass — fact and consistency, per `CLAUDE.md`
- [ ] 15. Glossary in `backmatter/`
- [ ] 16. Series preface and copyright

---

## Updates

### 2026-09-01 — cut done, format proven

The cut ran clean: 607 → 403, with a check that every term name in the cut list
matched a real term, so nothing was silently missed by a typo. That check caught
nothing, which is the point of running it.

Scaffolded the series and built one booklet end to end with three real pages to
prove the format before writing 457 of them. Three findings from that:

1. **A glossary needs its own theme.** The tech theme centres and underlines
   every `##`, which reads as a chapter heading. Three of those on one page
   looks wrong. The series theme makes them left-aligned dictionary entries.
2. **Density is three terms and two diagrams per page.** First attempt measured
   198mm against a 186mm page. Tightening the series theme brought it to exactly
   186. That is the number to write to.
3. **Two cover bugs, both fixed.** The series line overflowed its panel, so it
   was shortened to "The Vocabulary of Production". And the footer read "PART OF
   A 8 BOOKLET SET" — `books/tech/cover.mjs` now picks "AN" when the count needs
   it.

One limitation found: the computed page count printed on the cover is only right
when no page overflows. A page that spills onto a second sheet makes the cover
under-report. It self-corrects once density is right, and the build already
warns on every overflow.

---

## Explanation

*Written when the booklets ship.*

### 2026-09-01 — booklet 02 shipped

Design & Distributed is written: 75 terms across 25 pages, alphabetical, plus a
cover, a two-page contents and an opener. 29 pages, no overflow warnings.

Checked mechanically rather than by reading: extracted every `##` heading from
the page files and diffed against the 75 terms allocated to this booklet.
75 expected, 75 written, 0 missing, 0 unexpected. Worth doing — with terms
spread over 25 files, a dropped one is invisible on a read-through.

The contents page came out as a genuine A-Z index. Because every term is an `##`
and the pages run alphabetically, the generated contents is a lookup table with
page numbers, which is what the whole book is for.

Visuals split three ways in practice: 14 hand-written inline SVGs where the
picture shows real structure, 9 markdown tables where the source "diagram" was a
two-column comparison, and prose where neither earned its space. No ASCII
survived.

Two density facts, measured:

- Three terms with two SVGs is exactly one page — 186mm of 186mm.
- Three terms with a code fence *and* a table overflows. `02-10` hit 195mm and
  the code block came out.

**Known imperfection:** pages carrying three short entries leave roughly a third
of the page empty. Filling them means four terms on light pages and rebalancing
every page boundary, which breaks the alphabetical-range filenames. Left as is —
consistent and predictable beats five pages saved.

### 2026-09-02 — booklet 01 shipped

AI Engineering is written: 101 terms, one per page, 105 pages including cover,
a two-page contents and the opener. No overflow warnings.

Coverage checked mechanically, same as booklet 02 — every `##` extracted from
the page files and diffed against the 101 allocated terms. 101 expected, 101
written, 0 missing, 0 unexpected.

**The deep page format, settled.** Four parts: what it means (two sentences),
where it bites (the concrete failure), *How it works* (three or four short
paragraphs on the mechanism), *In practice* (what to watch once it runs). A
closing table where the material has one.

Calibrating it took three attempts on the Agent Loop page. First version left a
third of the page empty. Adding a table overshot to 193mm. Trimming twice landed
at 186mm exactly, and moving the closing point above the table rather than below
it stopped the last line spilling to a second sheet.

**Visuals stayed sparse on purpose.** The source "diagrams" in the AI categories
are overwhelmingly decision rules and checklists — trigger lists, cap lists,
threshold bounds — not flows. Those became tables. SVG was reserved for the few
with genuine structure: the agent loop, the HNSW layer descent, CDC fan-out,
hybrid parent-child retrieval, the ingestion pipeline, layout analysis,
contextual retrieval, ANN recall, batching.

**One SVG bug worth recording.** The agent loop's return arrow was masked with a
white rectangle so its caption could sit on the line. It rendered as two
disconnected stubs with a floating label. Fix: move the caption below the path
and drop the mask. Masking a line to write on it is never right — route the line
around the text instead.

**Scope stated in the opener**, so the cut is visible to the reader rather than
looking like an omission: the training side is out (fine-tuning, preference
optimisation, distillation, GPU and VRAM) and so are inference-server internals.

### Speed

The user asked whether a smaller model would finish this faster. Answer given:
`/fast` is the right lever — same Opus, faster output — and it turned out to
need usage credits they do not have. A smaller model would show in the voice,
which is the specific thing `CLAUDE.md` exists to prevent. The real bottleneck
is that booklets are being written serially; parallel subagents would be the
large win, and are available on request.

### 2026-09-02 — status at handoff

**Five of eight booklets are complete and verified.** Every term allocated to
them is present as an `##` heading; checked with a script, not by eye.

| # | Booklet | Terms | Pages | State |
|---|---|---|---|---|
| 01 | AI Engineering | 101 / 101 | 105 | done, no overflow |
| 02 | Design & Distributed | 75 / 75 | 29 | done, no overflow |
| 05 | Reliability & Observability | 49 / 49 | 20 | done, no overflow |
| 07 | Language, Runtime & Platform | 41 / 41 | 17 | **3 pages overflow — see below** |
| 08 | Infra, Cloud & Security | 38 / 38 | 16 | done, no overflow |
| 03 | Engineering Practice | 0 / 57 | — | not started; 53 need research |
| 04 | Data Stores | 0 / 52 | — | not started |
| 06 | Frontend & Realtime | 0 / 43 | — | not started |

**304 of 457 terms written.**

**Known defect — booklet 07.** Three pages exceed the 186mm printable area and
must be trimmed:

- `02-01-asgi-to-asynchronous-apex` — 188mm
- `02-07-graceful-shutdown-to-microtask` — 199mm
- `02-09-platform-events-to-sharing-model` — 197mm

All three were written by the first agent, before it died. Fix by cutting a
sentence or shrinking an SVG — never by moving a term to another page, which
would break the alphabetical filenames.

### The subagent run — what actually happened

Six agents were launched in parallel, then six more after the first batch died.
Both batches hit account session limits mid-run. The outcome is worth recording
because it was not what the failure notices implied.

**The notices said "failed". Three of those agents had in fact finished the
writing** and died during their own verification step. Booklets 05 and 07 were
complete on disk despite being reported as failures, and 08 completed cleanly.

The lesson: when a background agent reports failure, **check the disk before
assuming nothing happened**. Two full booklets would have been rewritten
needlessly.

**The brief worked.** Agent-written pages match the house voice, use tables
where the source diagram was a comparison, hand-write SVG where there is real
structure, and carry concrete numbers. Spot-checked a full page of booklet 07
before building on it rather than trusting the file count.

### Working data moved into the repo

The per-booklet term JSONs were generated into a session scratchpad, which does
not survive into a new session. They now live in
`docs/tasks/production-terms-data/` so the work can be resumed at any time from
any session. `kept.json` and `cut.json` are there too.

### 2026-09-02 (later) — seven of eight booklets complete

| # | Booklet | Terms | Pages |
|---|---|---|---|
| 01 | AI Engineering | 101 / 101 | 105 |
| 02 | Design & Distributed | 75 / 75 | 29 |
| 04 | Data Stores | 52 / 52 | 21 |
| 05 | Reliability & Observability | 49 / 49 | 20 |
| 06 | Frontend & Realtime | 43 / 43 | 18 |
| 07 | Language, Runtime & Platform | 41 / 41 | 17 |
| 08 | Infra, Cloud & Security | 38 / 38 | 16 |
| 03 | Engineering Practice | 0 / 57 | — |

**400 of 457 terms written.** Every finished booklet passes both checks: every
allocated term present as an `##`, and a build with no overflow warnings.

**Booklet 07's three overflowing pages are fixed** — 188mm, 199mm and 197mm,
all trimmed under 186 without moving a term between pages.

### What the parallel run actually cost

Both subagent batches died on account session limits. Three agents had finished
their booklets before dying and were reported as failures; checking the disk
rather than believing the notice saved rewriting two complete booklets.

Booklets 04 and 06 were then written directly rather than delegated, because a
third agent batch was not worth the risk.

**Two recurring mistakes, both mine, both mechanical:**

1. **Four terms on a page instead of three.** Three terms is the measured
   ceiling; four is 220-250mm against a 186mm page. Happened three times.
2. **Alphabetical order assumed rather than derived.** `Critical Rendering Path`
   sorts before `CSRF`; `Read Concern` before `Redis Persistence`. Both were
   wrong on the first pass.

The fix for both was the same and should have been the first move: **regenerate
the page split programmatically from the source JSON's own ordering** rather
than grouping by hand. Booklet 06 was rebuilt that way in one command, which
also caught a term (`Referential Equality`) that had been silently dropped.

For any remaining booklet, split the pages with a script first, then write into
the generated files.

---

## Update — 2026-09-03: booklet 03 written, the series is complete

`03-engineering-practice` is written, built and clean. **57 terms, 23 pages.**
All eight booklets now build with covers drawn and no overflow: **456 terms,
249 pages.**

This booklet was the odd one out. The other seven transformed existing source
material; 53 of these 57 terms had none and were researched from scratch.

### How it was written

Four agents in parallel, one per category, each writing a single draft file it
alone owned — `02-draft-testing.md`, `02-draft-performance.md`,
`02-draft-cost.md`, `02-draft-process.md`. No two agents could touch the same
file. `tools/split-pages.mjs` then collected all 57 `##` blocks, sorted them
A–Z across category boundaries and regrouped them into 19 pages of three.

Agents never chose page grouping or alphabetical order. Both are the mistakes
this project has already paid for twice, and both are now the script's job.

**The first batch of four agents died on a session limit mid-research, having
written nothing.** The disk was checked rather than the failure notice trusted —
the same lesson as the earlier batches. The relaunch added two things: the
highest-value primary sources fetched in advance and pasted into the prompts
(HikariCP's pool-sizing page, Google's code-review speed guidance, Fowler on
test doubles, trunkbaseddevelopment.com), and an explicit instruction to budget
time so that finishing all entries beat exhausting every source. All four then
completed.

### New tool

`tools/check-draft.mjs` — checks one category draft before the regroup: term
coverage against the data file, stray `#` headings, banned words, SVG viewBox
conventions, and per-term word counts against the density budget. It exists
because four self-reports are four things to verify, and verifying them by eye
is how errors get through.

All four drafts passed it. A cross-booklet scan of every `##` across the eight
booklets then confirmed **456 distinct terms with no term appearing twice**.

### Correction to the record

Earlier notes said the series held 457 terms. The per-booklet rows always summed
to 456, and the full scan confirms 456. The count was wrong, not the allocation.

### What was cut for want of a source

This is the part worth keeping. Every agent was told to cut rather than invent,
and each reported what it dropped.

**Cost & FinOps** — the category where a fabricated number is least visible:

- Every S3 per-GB price. The fetched Glacier Deep Archive figure looked wrong,
  so the whole column was distrusted. The table is built from minimum billed
  durations and minimum billable object sizes instead — facts that age better in
  print anyway.
- All Google committed-use discount percentages. The page returned "1-year: up
  to 55%", which contradicts Google's own lower-1-year/higher-3-year structure.
  Judged a misread. Only the two verbatim-quotable facts were kept: the
  commitment is billed whether or not the resources are used, and it cannot be
  cancelled.
- AWS internet-egress and cross-region per-GB rates. Not retrievable. The entry
  uses ordered bands anchored on the one verified figure, cross-AZ at $0.01/GB
  in each direction.
- Datadog's per-custom-metric overage rate. No list price exists; the page directs
  to sales.

Every price that survived states its basis in the text — "AWS list price,
us-east-2, 2026", "CloudWatch Logs, us-east-1, 2026".

**Team & Process:**

- The bus factor origin story. It appears only in Wikipedia and blogs.
- Every DORA threshold. `dora.dev` no longer publishes elite/high/medium/low
  values.
- Any trunk-based branch lifetime in days. The site states none.
- Calendar and holiday freeze figures. The entry is anchored instead on the
  Google SRE workbook error-budget policy, which was verified verbatim.

**Testing & Quality:**

- The widely-repeated Google flakiness percentages (≈16% of tests, ≈1.5% of
  runs). Neither post returned them on fetch. Kept only the 4.2M continuously-run
  test count and the finding that flakiness rises with binary size.
- Any coverage percentage or threshold. The *Coverage Is Not Confidence* entry
  argues the mechanism instead — delete every assertion and the number does not
  move.

**Performance Engineering:**

- Historical framing of Amdahl's 1967 paper. The formula is stated as
  mathematics; the table rows were computed directly.
- Any claim that Go's 100 Hz CPU sample rate is a documented API guarantee. It
  is in the runtime source comment, and is attributed that way.
- All cross-runtime async cost claims. Only V8's own measured numbers are used.

The *Tail-at-Scale* figures were verified the hard way: the CACM page returns
403 and the PDFs would not convert, so the agent downloaded the reprint and
inflated its content streams to read the text. The "63% of user requests take
more than one second" line is quoted from the paper itself.

### Page fits

Three pages overflowed on first build and were fixed by cutting, never by moving
a term between pages:

| Page | Was | Cut |
|---|---|---|
| `02-01-adr-to-arrange-act-assert` | 199mm | a paragraph that repeated its own table, plus four tightened sentences |
| `02-10-incident-command-to-load-vs-stress-vs-soak` | 188mm | one line off the Incident Command opener |
| `02-16-storage-class-lifecycle-to-tech-debt-register` | 192mm | the second Cunningham quote, which the bold line already made |

`Test Double` keeps a five-row table, one over the brief's guidance. Meszaros's
taxonomy is meaningless truncated, and its prose was cut to compensate. Its page
fits.

---

## Update — 2026-09-03: new identity, height-aware pages, one merged volume

Three changes, all driven by a source PDF you shared as the reference: a big
bold term name, an obvious start to each entry, and a small "TERM x/y" counter.

### 1. Terms are packed by measured height, not by a fixed count

`tools/split-pages.mjs` used to group three terms to a page. It now renders
every term in the real theme at the real column width, measures it, and fills
each page to the printable height.

Entries are not the same size. One with a five-row table and an SVG is three
times the height of a two-sentence one, so a fixed count either overflows the
dense pages or wastes a third of the sparse ones. Measured packing gives two
terms on a heavy page and three or four on a light one.

Measured across the whole volume afterwards: **255 term pages, average fill
77.6%, zero pages over the 186mm line.**

Booklet 01 stays one term per page, which is correct — its entries are ~350
words with `###` sub-sections, and the packer arrives at that on its own rather
than being told.

### 2. A new series identity, one colour per topic

`books/tech/production-terms/theme.css` was rewritten.

| Element | Now |
|---|---|
| Term name | 14pt heavy sans, against the light sans body |
| Under it | a 16mm rule in the topic's colour, then a hairline to the measure |
| Counter | `TERM 35/57` — a small tinted pill in the topic's colour |
| Failure line | accent bar and tint, picked out with `p:has(> strong:first-child)` |
| Table header | rule in the topic's colour |

**Every topic owns a colour**, taken from the `cover.accent` each booklet's
`meta.json` already declared. The build sets it as `--accent` on each page
section, so in the merged volume the furniture changes colour when the subject
changes and you can tell where you are without reading a word.

The counter is **per topic, not per volume** — "35 of 57" tells a reader
something; "312 of 456" does not. It is counted by the build from the pages
themselves, so it cannot disagree with what is printed.

The failure-mode callout needed **no change to any of the 456 markdown files**.
Every entry already ends on a paragraph opening in bold, and `:has()` finds it.

### 3. The merged volume is built

`masterVolume` had been declared in the series `meta.json` and never
implemented. It now is.

```
node tools/build.mjs the-vocabulary-of-production
```

**281 pages: a cover, 9 contents pages, 8 topic dividers, and every term.**

- The volume is discovered as its own book with its own name, so building
  `production-terms` still means the eight booklets and nothing else.
- Each topic gets a generated divider page — number, title, subtitle, an even
  spread of nine term names sampled across its alphabet, and its term count.
  Nothing typed; nothing to keep in sync.
- The volume names its own cover generator, `volume-cover.mjs`. This is the one
  place the cascade's deepest-wins rule gives the wrong answer — a volume must
  not wear a booklet's cover.

### The cover

Numbers as the hook, per your call. A 456 set as large as the trim allows, over
"TERMS ENGINEERS ACTUALLY NEED TO KNOW", then all eight topics with their counts
in their own colours, and the eight colours as a spine down the left edge.

**You asked for "450+". The cover says 456.** A specific number reads as counted
rather than rounded, and this book's whole argument is that it counted. Every
figure on it — the term total, the per-topic counts, the page count — is
computed at build time.

### New tools

| Tool | What |
|---|---|
| `tools/preview.mjs` | renders one page of a built book to PNG at the real trim, so a styling change can be looked at instead of guessed at |
| `tools/check-draft.mjs` | checks one category draft before the regroup |

`preview.mjs` earned itself immediately: the first version of the topic divider
looked broken, and the fault was the preview tool forcing `display:block` over
the theme's flex centring — not the theme.

### Revision, same day — type and cover

Three corrections after seeing it printed.

**The term name was too heavy, too small and too tight.**

| | Was | Now |
|---|---|---|
| Size | 14pt | 15.5pt |
| Colour | `#1a1a1a`, the body ink | `#33343a` |
| Tracking | `-0.015em` | `+0.012em` |

Full black at display size read as a slab and pulled the eye off the prose it
introduces. Negative tracking is the right default for large display type and
the wrong one here, because these are technical terms full of slashes,
capitals and short words — `Groundedness / Faithfulness Score` closed up into a
single block. Positive tracking separates them.

**The volume wears the domain's yellow cover, not one of its own.**
`volume-cover.mjs` was deleted. The tech domain's manga cover already had the
slots — `label`, `setLine`, `title`, `banner`, `kicker`, `term`, `stack` — so
the volume is now cover *data* in the series `meta.json` rather than a second
generator to keep in step with the first.

Two small changes made the domain generator volume-capable, both defaulting to
exactly the old behaviour:

- The topics panel was laid out for six rows and a volume lists eight. Step and
  size are now derived from the row count; six or fewer are unchanged.
- `+ N MORE TOPICS INSIDE` takes a `moreWord`, so a volume whose stack lists
  topics can say `TERMS`. For a merged volume, `more` counts from the term
  total rather than the heading list, which otherwise double-counts each
  topic's opener — `+ 448 MORE TERMS INSIDE` against 456 and a stack of 8.

**The packer's safety margin went from 2mm to 4mm.** One page in 255 landed
1mm over: the packer sums terms measured alone, the build measures the
assembled page, and margin collapsing differs between the two by a hair.

Final state: **287 pages, 261 term pages, average fill 76.4%, zero pages over
the 186mm line**, and all eight booklets build clean at the new type.

### Revision — one accent for the merged volume

You looked at the volume and asked why it had eight themes. Fair: the per-topic
colour was my idea and it was wrong. A single book that changes colour every
thirty pages reads as eight books stapled together, and the divider page had
already announced the topic — the colour was carrying no information the reader
did not already have.

**The volume now uses one accent, `#0d7a7a`, on all 287 pages.** The eight
standalone booklets keep their own accents, because each one matches its own
drawn cover and is internally consistent.

### The part CSS could not fix

Setting `--accent` recolours the badge, the rule, the callout and the table
header. It does **not** touch a diagram, because a diagram's accent is written
into the inline SVG as a literal hex colour where no stylesheet can reach it.
There are **295 such colours across 80 files** in eight different hues.

Rewriting them would have forced a choice between the volume and the booklets —
whichever one the markdown was coloured for, the other would be wrong.

Instead the build remaps them at render time. A booklet declares the accent its
diagrams were drawn in; when it is printed inside the volume, that colour is
substituted for the volume's. The markdown keeps a real, previewable colour and
the build decides what is actually printed.

Verified after the change: **zero occurrences of any of the seven other booklet
accents anywhere in the volume**, and booklet 02 built standalone still carries
70 of its own `#2b5fa8` and none of the volume's teal.

### The cover follows the interior

The ground was the domain's fixed yellow. It is now a `burst` pair in the cover
data, defaulting to exactly the old yellow, so all eight booklet covers are
unchanged. The volume sets a mint-to-sage ground so the cover and the 287 pages
behind it belong to the same object.

The deep teal stays for the banner and the second title line — the ground had to
go lighter than the accent for those to hold their contrast.

### Revision — openers removed, contents compressed, h1 recoloured

**The opener pages are gone.** `01-00-how-to-read.md` was removed from all eight
booklets. The writing is not deleted — it moved to
`docs/tasks/production-terms-openers/`, one file per booklet, so it can come
back as a single volume introduction if that is wanted. The volume now runs
cover → contents → topic divider → terms, with no prose introduction anywhere.

**`h1` was still the domain's pink-with-yellow-shadow.** That is the teaching
books' display style and it was the one thing in the series still fighting the
green. It now takes the accent, no shadow.

**The contents went from nine pages to three.** Three columns at 5.6pt, leader
dots removed, and entries set in ink rather than the domain's link blue — 456
entries in blue is a wall of blue.

Two real bugs surfaced doing it:

- **`column-fill: auto` broke every page number in the book.** The build
  measures the contents element to work out how many printed pages it needs, and
  every subsequent page number is computed from that. Under `column-fill: auto`
  the measured height does not match what Chrome prints: the build reported 277
  pages against an actual 273. `column-fill: balance` reports a height that
  agrees with the print, and build-reported and actual page counts match again.
  **Anything that changes the contents layout must be checked this way** — build
  output against `page_count` of the finished PDF.
- The leader dots and the blue links were both inherited from the domain theme
  and neither had ever been looked at in this series.

**Three pages, not the two asked for.** Two would need roughly 4.5pt type, which
is below what prints comfortably at this trim. Three columns of 5.6pt is the
tightest setting that stays readable.

**Cover:** "NOT FOR RESALE" removed. The banner names what kind of terms these
are — "PRODUCTION TERMS ENGINEERS NEED TO KNOW." *Production* is the series' own
word and echoes the title, so the banner and the book agree.

The count came off the banner. "456 terms engineers need to know" reads as a
claim that these are the only ones, which turns a reference into a closed list.
The number stays in the terminal panel and the topic counts, where it is
inventory rather than an assertion.

Final: **volume 273 pages** (1 cover, 3 contents, 8 dividers, 261 term pages),
all eight booklets clean, no overflow anywhere.

---

## Update — 2026-09-03: consistency pass applied, volume gains an introduction

A review agent read booklet 03 against the other seven and reported findings
only. Twenty-six edits followed.

### Contradictions the volume was carrying

| Where | Was | Now |
|---|---|---|
| Log Volume Cost | "sampling at the emitter is the control that works" | says it is head sampling and names what it discards, which is what booklets 01 and 05 warn about |
| Tail-at-Scale | ruled out the median, named no remedy | names cutting fan-out and hedging, matching booklet 05 |
| Change Freeze | "the preceding four-week window" | "a rolling four-week window", so it reads as a policy window and not booklet 05's monthly SLO period |
| Egress Cost | warned against the zone spread booklet 08 tells you to buy | separates the query path from the replication path |
| Testing in Production | required a kill switch for everything, including shadow traffic, which booklet 02 calls risk-free | scopes the kill switch to canaries and flags |

### Entries that were doing the same job

- **Deterministic Test** ended on the retry habit, which is **Flaky Test**'s
  point one page later. It now ends on its own material: the leak is usually in
  code you did not write.
- **Snapshot Test** repeated **Golden File Test**'s regeneration risk. Golden
  keeps the update flag; Snapshot keeps unreviewable size.
- **Fixture vs Factory** ended on sharding, which **Test Isolation** owns. It
  now ends on the seeded row nobody dares change.
- **Integration vs End-to-End** restated the 70/20/10 mix that **Test Pyramid**
  already carries. Dropped, and its failure mode now shows the cost rather than
  asserting it.

### Terms used and never explained

JMH, NIMS, SAFe, `effective_spindle_count`, "branch by abstraction", "flame
chart" and Google's "CL" all now carry a one-line gloss at first use.

### Numbers

- **The GitHub CI minute prices were re-checked against GitHub's own billing
  docs and are correct**: $0.006 Linux, $0.010 Windows, $0.062 macOS. The review
  had flagged them against a 2x Windows multiplier GitHub no longer publishes —
  it publishes these per-minute rates instead. **No change made.** This is the
  one finding that was wrong.
- Connection Pool Sizing said nine "rounded to ten". Nine does not round to ten;
  it now attributes the ten to HikariCP's own worked example.
- Storage Class Lifecycle had two units under one column head. Split.
- Committed Use Discount's 66% and the Spot table's 72% were the same row
  collapsing two products. The table now reads 66-72%.
- Tail-at-Scale used 10ms as two different statistics on one page. The second is
  now labelled as Google's own measured service.
- The Observability Bill's cardinality magnitude now states its assumption, so
  it and booklet 05's 960,000,000 describe one mechanism at two scales.

### Voice

"Genuinely powerful" in Event Sourcing (the brief bans telling the reader a
thing is powerful), "simply" in Smoke Test, and one American "utilization" three
lines from two British ones. Three slips in 456 terms.

### The volume has an introduction again

Removing the per-booklet openers left the volume opening straight onto an entry.
The build now prints anything in the series' `front/` folder after the contents
and before the first topic; a booklet ignores it.

`front/01-how-to-read.md` is one page: what the three parts of an entry are,
what is deliberately not in the book, and that unverifiable claims were cut
rather than softened.

**Front matter contributes only its title to the contents.** Its sub-headings
would otherwise sit above the index as three lines pointing at the same page.

The first draft ran 204mm against the 186mm page, which also put the build's
page count one out from the PDF's — a one-file-one-page violation shows up as
wrong page numbers throughout. Trimmed to fit; build-reported and actual are 274
either way now.

Final: **274 pages** — cover, 3 contents, 1 introduction, 8 dividers, 261 term
pages. All eight booklets rebuilt clean.

---

## Update — 2026-09-04 — booklet 01 rewritten to house format

**The problem.** Booklet 01 (AI Engineering) was the only one of eight using
`### How it works` / `### In practice` subheadings. Git shows why: it was
written first, before the format settled, to an early "one page per term" idea
copied from the source PDF. Those headings were scaffolding to fill 186mm.

| | words/term | `###` | pages |
|---|---|---|---|
| booklet 01, before | 273 | 203 | 101 for 101 terms |
| booklets 02–08 | ~130 | 0 | 2–3 terms per page |
| booklet 01, after | ~135 | 0 | 59 for 116 terms |

`split-pages.mjs` was not at fault. It measured each term and packed correctly —
one per page, because each term genuinely was a page tall. The tool reported
success, which is why this went unnoticed. **A height-aware packer cannot detect
content that is uniformly too long.**

**What was done.** Four subagents, partitioned by file, working from one shared
brief (`production-terms-01-rewrite-brief.md`). Every term rewritten to the
house shape: meaning, where it bites, optional SVG, one bold failure-mode
paragraph.

**Accuracy, not just length.** The rewrite uncovered invented figures in the
shipped text — "nine-point accuracy drop", "forty-minute provider degradation",
"cut manual review volume by 70%", "3.2s vs 0.4s", "97%/71%/94% field
accuracies", "94% extraction accuracy". None traceable to a primary source; all
plausible-sounding padding the page-filling format encouraged. All cut. One
outright error corrected: Anthropic's deprecation notice is **at least 60 days**,
not the "three months" the book claimed.

Verified replacements include Anthropic cache-write multipliers (1.25× on the
5-minute TTL, 2× on the 1-hour, 0.1× read), the 28×28-pixel image patch formula,
llama.cpp's Llama 3 8B quantization scoreboard, pgvector HNSW defaults
(`m=16`, `hnsw.ef_search=40`), vLLM PagedAttention 2–4× throughput, LoRA's
10,000× parameter reduction, Elasticsearch `rank_constant` 60, and MCP spec
revision 2026-07-28.

Two illustrative figures the agents kept but could not source were also cut
(Hallucination, Guardrails). The Latency Budget example was kept — its numbers
are arithmetic inside a stated hypothetical, not a claim about the world.

**15 terms added.** The booklet used these words throughout and never defined
them: Retrieval-Augmented Generation (the acronym appeared everywhere, the term
did not), Embedding (though `Embedding Drift` and `Embedding Model Migration`
both existed), Vector Database (though `Vector Index Rebuild` existed),
Tokenization (though `Token Accounting` and `Context Window` existed), plus
BM25, Chain of Thought, Cosine Similarity, Distillation, Few-Shot Prompting,
Model Context Protocol, Quantization, Reasoning Model, Speculative Decoding,
Streaming Response, System Prompt.

**Diagrams.** 56 across 116 terms, up from roughly one in five. All on the
460-wide grid, all four-colour palette.

**A latent rendering bug fixed on the way.** The old text carried off-palette
SVG hexes — `#b32d2b`, `#e2fcf3`, `#e0e0e0`. The build rewrites only the
booklet's declared accent (`#c25a35`) to the volume's green, so those would have
printed off-colour inside the merged volume. The whole booklet is now
four-colour clean.

**Result, verified.**

```
terms          456 -> 471, all unique, no cross-booklet duplication
booklet 01      101 -> 59 term pages (61 with cover and contents)
volume          274 -> 232 pages, build-reported == actual
PDF grep        "How it works" 0, "In practice" 0
palette         #1a1a1a #c25a35 #6b6b6b #fdece5 only
```

Stale "456" references updated in `meta.json`, `front/01-how-to-read.md` and
`theme.css`.

### 2026-09-04 — the tint colour was wrong in booklet 01

The rewrite brief told the agents to use `#fdece5`, a peach tint, to sit beside
booklet 01's orange accent. That was my mistake and it cost a rebuild.

The build remaps only one colour: a booklet's `cover.accent` becomes the
volume's accent. The tint is not remapped, because until now it never needed to
be — **all seven other booklets use `#e2fcf3`**, a mint that reads as neutral
next to any accent. Booklet 05 pairs it with red, 07 with purple, 02 with blue.

So booklet 01's diagram boxes printed peach inside the green volume while their
strokes correctly turned teal. Fixed by replacing all 70 occurrences with
`#e2fcf3` and correcting the brief.

**The rule for anyone adding a booklet:** the accent is per-booklet and gets
remapped; the tint is `#e2fcf3` everywhere and does not.

Final state: booklet 01 is 116 terms over 59 term pages, 61 printed pages
standalone. The volume is 232 pages, down from 274, with 471 terms. Build-reported
and actual page counts match in both.
