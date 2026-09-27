# DSA 02 — Pattern Recognition: quality audit

**Status:** report delivered; fixes not started (awaiting your picks)
**Started:** 2026-09-27
**Last updated:** 2026-09-27
**Branch:** `claude/bold-thompson-eb0v86`

---

## What you asked for

> Rate the PDF out of 10: how helpful people will find it, where it can do better
> on every parameter, and what would add uniqueness, diagrams or anything else to
> elevate it. Audit it as a neurologist, a DSA expert and a content ghostwriter.
> Form a great prompt before passing it to the actual audit.

## How the audit ran

- Brief written first: `scratchpad/audit/BRIEF.md` (session scratch; the rubric is
  reproduced below). Three lenses, named on every finding:
  - learning science (load, dual coding, retrieval, interleaving, spacing, transfer);
  - senior interviewer (correctness, real signals, real failure modes, coverage);
  - editor (voice, density, prose that should be a picture).
- Five read-only auditors in parallel: Ch 1–4, Ch 5–9, Ch 10–13, Ch 14–19, and the
  whole book + market comparison.
- Evidence required: page references, ≥6 rendered screenshots per chunk, and every
  TypeScript template run against a brute force.
- **64 templates executed, 0 failures** (11 + 18 + 12 + 23, 500–3,000 random cases each).
- I re-checked the claims that drive the recommendations (see "Verified by me").

## Verdict

**7 / 10 today. Realistic ceiling: 9 / 10.**

The mechanics layer is excellent: correct, compact, and every failure mode comes with a
tiny input you can check by hand. The recognition layer — the reason this book exists —
is weaker than the mechanics layer. Readers can learn every pattern here; the book does
not yet train them to *pick* the pattern in a problem they have never seen, and its
routing breaks on the first cross-reference because page IDs are not printed.

| Auditor | Scope | Score |
|---|---|---|
| A | Ch 1–4 | 7 |
| B | Ch 5–9 | 7 |
| C | Ch 10–13 | 7 |
| D | Ch 14–19 | 7.5 |
| E | Whole book, reader journey, market | 6 (8 after its top 3 fixes) |

## Scores by parameter

Mean of the five auditors, rounded to 0.5, after the fixes already made this session.

| # | Parameter | Score | Why, in one line |
|---|---|---|---|
| 1 | Technical accuracy | 8.5 | 64/64 templates pass; every failure counterexample reproduces. A few wrong claims (list below) |
| 2 | Recognition transfer | 6.5 | Signals often quote the problem title; drills retest the chapter's own problems |
| 3 | Learning design | 5.5 | Practice is fully blocked by chapter, answers sit beside questions, nothing is spaced |
| 4 | Diagrams | 6.5 | The best show the mechanism (02-08, 07-08, 13-07, 15-06, 18-06); ~10 repeat the text or have overlapping labels |
| 5 | Code templates | 9 | Short, correct, guarded, writable from memory |
| 6 | Interview relevance | 7.5 | Right core; LC 347, 190, 371, 24 missing from the whole series; a few filler rows |
| 7 | Voice and concision | 7 | Newer pages are house voice; ~11 older pages read as generic tutorial / AI text |
| 8 | Navigation | 5.5 | 446 references to page IDs that no printed page shows; ~22 patterns unreachable from 01-04/01-05 |
| 9 | Uniqueness | 7.5 | Failure inputs, deciding-fact drills, statement-phrase index: no free resource has them |
| 10 | Print design | 6.5 | Clean hierarchy; overlapping SVG labels, near-empty split pages, orphan headings |

## What people will value (keep these)

1. **Failure sections with a checkable counter-input** (02-05, 03-03, 06-03, 07-07, 08-05,
   10-08, 14-03, 17-05 …). Every one tested was exact. This is the book's signature.
2. **01-04 decision chart and 01-05 keyword index.** Statement phrase → page. The market
   comparison found nothing like it in Grokking, NeetCode, Striver A2Z or Tech Interview
   Handbook (the last one says outright that intuition "will develop").
3. **Transferable framing pages:** 02-04/02-05 shrink-safe vs grow-safe, 14-01 "which way
   does information flow", 13-05→13-08 as one start-index family, 18-01's four questions.
4. **Finer sub-patterns than any free list:** count by right end, exactly-K by
   subtraction, flip the target, pop while it pays, return one / record another, take now
   / regret later.
5. **Interview blocks that answer the follow-up**, with the proof sentence (07-09, 08-05,
   12-04, 15-03).

## Cross-cutting findings (most severe first)

1. **Page IDs are not printed** (verified). Pages cite "→ 09-02" 446 times; the page, its
   footer and the contents page never show an ID, and the PDF has no internal links.
   Every route in 01-04 and 01-05 stalls at the first lookup.
2. **The first schema contradicts the chapters.** 01-02's eight families omit Running
   State, In-place, Greedy and Stack & Queue; Two Pointers is "Order" on 01-02 but
   "Locality" on 02-01; the monotonic stack has four homes (01-02, 15-01, 18-01, cover).
   Readers learn a messy map — exactly the heap-vs-stack confusion the book should prevent.
3. **Drills test recall, not recognition** (all five auditors). 14/15 rows in 02-12,
   16/16 in 13-11, 9/9 in 11-04 are the chapter's own worked problems; the chapter name
   in the title gives away the family; no drill revisits earlier chapters.
4. **Router gaps** (verified). ~22 pattern pages are on neither 01-04 nor 01-05,
   including palindromes, valid parentheses, sliding-window maximum, LRU, trees (zero
   tree entries), copy-random-list, gas station.
5. **Chapter openers are inconsistent.** Ch 5, 6, 11, 12, 13 have no routing page;
   13 needs one most (six backtracking templates differ by one argument).
6. **Voice drift** on 01-01, 01-02, 05-04, 07-01, 09-01, 09-02-1, 10-05, 10-10, 15-01,
   17-01, 18-20: "you/we", "Found it!", "Unfortunately", Title Case cells, meta-headings.
7. **Diagrams that show the result, not the mechanism:** 02-03 (only the shortest-window
   loop, while 4 of 5 variations are longest), 03-04, 10-05, 10-10, 12-02, 14-01, 17-02.
8. **Rendering defects:** overlapping labels on 07-06, 09-02-1, 05-02-2-1, 05-04, 12-04;
   misaligned indices on 04-06; invisible shading on 09-04.
9. **Coverage gaps (series-wide, verified):** Top K Frequent (LC 347), Reverse Bits
   (190), Sum of Two Integers (371), Swap Nodes in Pairs (24). No pointer to LC 560 from
   03-03. State-augmented BFS (LC 1293) is one sentence.
10. **Series overlap:** 18-01 re-derives Module 01 02-05..02-08; 10-05's definition is
    Module 03 01-06 almost word for word; backmatter 05-02 is a second router.

### Specific errors to fix

| Page | Error |
|---|---|
| 01-02 | "99% of interview problems": invented statistic; "Greedy Beam", "Convex Hull" off-topic |
| 18-20 row 4 | Labelled "Boundary Finding", then says it is not monotonic. LC 395: split on rare chars, or window per distinct-count |
| 09-01 | Predicate "flips true to false" (minimise problems flip F→T); "O(N)→O(log N)" should be log(range) checks × O(n) |
| 09-02 | Signal "min the max" does not describe its own Koko/Ship examples; loop idiom contradicts Module 04's |
| 04-06 | Signal "houses in a circle" is House Robber II, which the page says is DP |
| 15-05 | Signal mixes Huffman (optimal merge) with Last Stone Weight (simulation) |
| 18-02 | "DFS is this one loop": shares the loop, not the settle guarantee |
| 12-03 | LC 2095 recipe throws on a 1-node list |
| 11-02 | Second failure is not a failure |
| 07-01-2 | "Every technique starts with a sort" (Insert Interval, difference array do not); JS sort is not O(1) space |
| 05-01-2-2 | U+2212 minus inside copyable code |
| 08-03 | `Math.max(...deadline)` throws at n = 2·10⁵ |
| 14-08-2 | Same failure stated twice |
| 19-01 | "03-07" means two different pages in one table |
| 01-04 vs 07-01-2 | n ≥ 10⁶ "one pass" vs sort "affordable up to 10⁶" |
| Cover / 01-01 | "Booklet 3 of 10", "an 10 booklet set", "this module" |

Fixed already this session: stray second heading (02-12-a, 04-07-a, 13-11-a), 08-08
"drills 8 and 9", 13-11 "index recurrence", 17-01 "59 named problems".

## Elevation roadmap (ranked by impact ÷ effort)

### Tier 1 — make it work as promised (≈ 2 days) → 8 / 10

1. **Print and link page IDs.** A small ID chip beside every `##` title, IDs in the
   contents, footer "09-02 · 110/266", and every `NN-MM` reference turned into a PDF
   link. One change in `tools/build.mjs` — shared by every book, so it needs your go.
2. **Close the router gaps.** New 01-05-c with ~30 phrases (list in auditor E + D
   reports: palindrome, valid parentheses, max of every window, LRU/min-stack, LCA,
   distance k, views, construct from traversals, car fleet, O(1)-space traversal …),
   chips for Ch 4 on 01-04, and a check script that fails if any pattern page is unrouted.
3. **One schema.** Redraw 01-02 as a matrix: chapters × the four questions of 18-01 plus
   "information flow"; give the monotonic stack one home (Ch 10) with a pointer from
   18-06; cut the 99% claim.
4. **Fix the specific errors** (table above) and the rendering defects.
5. **Voice pass** on the 11 drifted pages.

### Tier 2 — make it unlike anything free (≈ 1 week) → 9 / 10

6. **"Which page?" checkpoints** after Ch 4, 8, 11, 14, 17: 12 paraphrased statements,
   no titles, mixed across all earlier chapters (⅓ from two or more chapters back),
   answers overleaf as page ID + the deciding word. Trains discrimination, adds spacing.
7. **"Looks like X, is Y" contrast pages**, one per Part, as a two-column diagram with
   the deciding fact on the arrow: variable window ↔ equal prefixes (negatives), heap ↔
   monotonic deque (expiry by index), greedy ↔ 0/1 DP (can an item split?), pick-or-skip
   ↔ fill-the-slots (order matters?), BFS ↔ Dijkstra ↔ 0-1 BFS (weights), Huffman ↔ Last
   Stone (optimum vs simulation), Course Schedule III ↔ Weighted Job Scheduling.
8. **"Not this page if…" line under every Signal**, and a matching column in 01-05.
   One line per page; turns failure knowledge into recognition knowledge.
9. **Chapter routers** for Ch 5, 6, 11, 12, 13. 13-03 becomes "Which backtracking
   template?": order matters? reuse? duplicates? contiguous pieces? global constraint?
   Under it, one input `[1,1,2]`, target 3, run through every template with its output.
10. **Rebuild the drills:** disguised one-line statements instead of titles, answers on
    the `-b` page, half unseen problems, two rows from earlier chapters on every page;
    drill titles "Drills A/B", not the chapter name.
11. **Mechanism diagrams** (each sketched in the auditor reports):
    - 02-03: two loops side by side, LONGEST vs SHORTEST, record point marked.
    - 03-04: leftMax (blue, rising) and rightMax (red, falling) step lines; water = min − bar.
    - 09-02: one axis of X with F…FT…T (minimise → first T) and T…TF…F (maximise → last T),
      lo/hi rule under each.
    - 10-10: expiry trace table over `[1,3,-1,-3,5,3,6,7]`, k = 3, the front expiry in red.
    - 12-02: four-frame pointer film strip with `groupPrev/prev/cur/next`.
    - 14-01: one tree, four coloured overlays (down / up / level band / parent map).
    - 17-01: "greedy, regret heap, or DP?" flowchart.
    - 17-02: n-constraint axis → DP signature (≤20 mask, ≤500 range, ≤5000 two strings, ≤10⁵ f(i)).
    - 07-07: three-leaf interval tree (union → start; keep/stab → end; how many → sweep).
    - 08-01-2: greedy counter-example gallery (4 tiny inputs).

### Tier 3 — coverage and series hygiene

12. Add LC 347 (15-10, bucket beats heap), 190 and 371 (11-03), 24 (12-02), a 560
    pointer (03-03), 1293 (18-02 variation), one ordered-set drill (LC 729 or 220).
13. Trim series overlap: 18-01 cites Module 01 02-05..02-08; 10-05's definition becomes a
    pointer to Module 03 01-06; backmatter 05-02 points to 01-04.
14. Fill near-empty pages: 12-01-1 (Ch 12 routing table), 15-11-2 ("heap traps"),
    16-04-2 (Kahn levels diagram), 05-01-1 / 07-01-1 re-pack.
15. Drop remaining low-yield rows: Zig-zag (13-02 template → "Add 1 to a linked list"),
    Knight's Tour, M-Coloring, middle of a stack, Candy Crush (723).

## Market position (auditor E, primary pages read)

| Resource | Better than this book at | This book does what it cannot |
|---|---|---|
| Grokking (designgurus.io) | Runnable code, scale, a mixed unlabelled test section | Finer sub-patterns, statement-phrase index, a failure mode per pattern, why each greedy move is safe |
| NeetCode 150 | A small trusted core list, progress tracking | Any guidance on *when* a pattern applies |
| Striver A2Z | Revision lists, spacing, beginner on-ramp | Decision chart, signal contrasts |
| Tech Interview Handbook | Mixed-topic study schedule | A recognition guide (it admits it has none) |

The edge is recognition reasoning. The gap is interleaved, unlabelled practice and
revision. Tier 2 items 6–8 close exactly that gap, in print.

## Verified by me

- Page IDs: 446 `NN-MM` references in pages; build emits the ID only as `data-src`.
- LC 347, 190, 371, 24: zero hits across `books/tech/DSA`.
- 01-05 index: zero "tree" or "palindrom" entries.
- 18-20 row 4 contradiction: confirmed on the page.
- The four regressions I introduced earlier (doubled headings, 08-08, 13-11, 17-01): fixed.

## Open questions

| # | Question | My recommendation |
|---|---|---|
| 1 | Change `tools/build.mjs` to print and link page IDs (affects every book's output)? | Yes: behind a per-book `meta.json` flag so other books are unchanged |
| 2 | Which tier first? | Tier 1 in full, then Tier 2 items 6–8 |
| 3 | Merge the branch to main before or after Tier 1? | After: Tier 1 fixes errors a reader would hit |

## Updates

- 2026-09-27 — audit run (5 agents), report merged; four regressions from the earlier
  drill work fixed and committed (`bb8e064`, `eca57c2`, `1a291f9`).

---

## Your answers (2026-09-27)

| # | Question | Answer |
|---|---|---|
| 1 | Aim | 9–10 / 10, mostly on content quality |
| 2 | Too many patterns? | Group, do not remove. 40–50 groups, never mix two concerns; a flat "20 patterns" loses the USP |
| 3 | Grouping doubts | Flip the Target and Sort-then-Slide inside Sliding Window; Collide and Reader/Writer stay separate; all five monotonic pages one group; Morris joins traversal-order; no extra merges → 54 |
| 4 | Print page IDs via `build.mjs`? | Yes, behind a per-book switch |
| 5 | Order | Tier 1, then Tier 2, then Tier 3, then re-audit |

## Plan

Grouping rule: a group shares one mechanism (same state, invariant, template shape) and
differs only in the question asked. A different mechanism is a different group.

| Phase | What | Who | Status |
|---|---|---|---|
| 1 | Page IDs printed, in the contents, and linked (`pageIds` in meta.json) | me | done `ed44ed4` |
| 2 | 54 pattern groups in meta.json `patterns`; label under every title; Morris → 14-10, tree drills → 14-11 | me | done `7677dd0` |
| 3 | Per-chapter content pass: every audit fix, voice pass, "Not this page if" line on every pattern page, Signals as statement features, mechanism diagrams, chapter routers (Ch 5, 6, 11, 12, 13), drills rebuilt (disguised statements, answers overleaf, half unseen, two rows from earlier chapters), coverage adds | 4 agents: A Ch 2–4, B Ch 5–9, C Ch 10–13, D Ch 14–19 | running |
| 4 | Front of book: 01-02 becomes the 54-pattern map (one schema); 01-04 routes every pattern; 01-05 index gaps; 01-01 voice | me | |
| 5 | "Which page?" checkpoints after Ch 4, 8, 11, 14, 17; "Looks like X, is Y" contrast pages | me, after phase 3 | |
| 6 | Series hygiene: backmatter 05-02 points to 01-04; glossary for new terms; cover text | me | |
| 7 | Verify: PDF build 0 overflow, checker, links re-verified live, fact + consistency passes, then re-run the five-lens audit | me + agents | |

Rejected: cutting to 20 patterns (loses the USP); a new "core path" page (the 54-pattern
map on 01-02 does that job); agents running `--split` (it re-cuts every page).

## Tasks

- [x] 1. Page IDs
- [x] 2. Pattern groups and labels
- [x] 3. Chapter passes A–D
- [x] 4. Front of book
- [x] 5. Checkpoints and contrast pages
- [x] 6. Series hygiene (glossary, back-matter matrix)
- [ ] 7. Re-audit: cut to one cheap pass to save tokens; full five-lens re-audit only if you ask

## Updates (continued)

- 2026-09-27 — phases 1–2: page IDs printed, listed in the contents and linked
  (272 links, 0 dangling); 54 pattern labels from meta.json; Morris → 14-10.
- 2026-09-27 — phase 4: 01-01 rewritten; 01-02 is the 54-pattern map; 01-04 is a
  two-page chart that routes all 87 pattern pages plus the new routers; 01-05 index
  has 85 phrases over 6 pages; 01-06 Look-alikes (11 pairs, titles checked live).
  The three generators live in the session scratchpad (chart, index, map).
- 2026-09-27 — phase 3: four chapter agents hit the API session limit mid-run and
  were resumed with their context. Each chunk verified by me (full PDF build, checker,
  book-wide duplicate-problem grep, screenshots) and committed: `80cd4e8` (Ch 2–4),
  `a550fdd` (Ch 10–13), `0cc73e9` (Ch 5–9, 14–19).
  - New pages: 02-11, 05-00, 06-00, 11-00, 13-03.
  - Every pattern page has a "Not this page if" line; Signals rewritten as statement
    features where they were titles.
  - About 20 diagrams rebuilt to show the mechanism.
  - Every drill is rebuilt as disguised statements with answers on the next page.
  - Coverage added: LC 190, 371, 24, 347, 560 pointer, 795, 729, 864, 1293.
  - Paid-only problems removed: 253, 291, 723, 1136.
  - Badges recalibrated.
  - My brief was wrong on 10-10: the example input never expired a front element.
    Agent C switched to an input that does and verified it.
- 2026-09-27 — phase 5: five checkpoints (04-08, 08-09, 11-05, 14-12, 17-08),
  10 disguised statements each, 50 problems, none in any drill, none repeated.
- 2026-09-27 — phase 6: six glossary terms added (Bijection, Huffman Coding,
  Look-alike, Monotone Predicate, Move, Pattern); back-matter matrix points here.
- Build: 290 pages, 0 overflow.
- Not done / known limits:
  - The merged `dsa-complete` volume has pre-existing overflows in other booklets
    (Foundations and others). They are out of scope and untouched.
  - The GFG title "Reverse a linked list in groups of given size" is no longer in
    GFG's practice list, so the title was cut and the fact kept.
  - Huffman tie rule, Alien Dictionary and RMQSQ wording were not re-fetched live.

## Explanation

1. **What changed:** the booklet now routes by 54 named patterns (each with its
   moves) instead of 90 loose pages. It prints page IDs and links them. The front
   routes every pattern. Every pattern page names its look-alike. Every drill and
   five checkpoints test recognition from disguised statements.
2. **Why:** the audit scored recognition training 5.5–6.5 and navigation 5.5; the
   mechanics (templates, failures) were already 9.
3. **How it works:** statement → 01-04 chart or 01-05 index → page ID (printed,
   linked) → the page's Signal and "Not this page if" confirm or redirect. The
   01-06 look-alikes and the checkpoints train the choice. The drills add spacing
   by mixing in earlier chapters.
4. **Files:**
   - `tools/build.mjs`: `linkIds()`, page-ID corner label, contents prefix,
     pattern label under each `##`, all opt-in via `pageIds`.
   - `books/tech/DSA/theme.css`: styles for the page ID and the pattern label.
   - `02-pattern-recognition/meta.json`: `pageIds` and `patterns`.
   - Pages: `01-*` front; chapter pages as listed in the commits.
5. **Decisions:**
   - Group, don't cut; the reasons are recorded above.
   - Labels live in meta.json, so renaming a pattern never touches 87 pages.
   - The pattern label sits inside the title's bottom margin, so it adds no height.
   - The front-page generators fail loudly if a page has no route.
6. **Verification:** full PDF build 290 pages 0 overflow; checker has no banned
   words, no throat-clearing and no visual limits exceeded; the drill duplicate
   grep is empty; every new or changed template was run against a brute force by
   its agent; 66 GFG links fetched (200) earlier; LeetCode titles come from the
   official list.
7. **Limits:**
   - `check-pages.mjs` still reports its structural false positives.
   - The generators are in the scratchpad, not the repo. Re-running them after a
     rename needs them moved into `tools/`, if you want that.
