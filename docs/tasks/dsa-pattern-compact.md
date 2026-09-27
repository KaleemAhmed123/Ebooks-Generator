# DSA 02 — Pattern Recognition: compact pass

**Status:** in progress — Chapter 2 pilot
**Started:** 2026-09-27 · **Last updated:** 2026-09-27
**Branch:** `claude/bold-thompson-eb0v86`

## What you asked for

> The book is too big (69 pages on main, ~286 on the branch). Same knowledge, taught
> more compactly; 150–180 pages. Keep all 54 patterns, diagrams and short templates.
> The nine fixed headings are overkill; a page uses only what it needs, and a hard
> concept may take two pages. A reader should get the idea in seconds.

## Decisions (your answers)

| # | Question | Answer |
|---|---|---|
| 1 | Front matter | Drop the keyword index and look-alikes; "The 54 patterns" replaces the generated contents page |
| 2 | Page style | Compact and flexible, not nine fixed headings; keep diagrams and templates |
| 3 | Templates | Keep, short and crisp (the core loop) |
| 4 | Drills | Back to linked titles, fewer rows, the most-asked problems; no disguised statements |
| 5 | Checkpoints | Drop |
| 6 | Interview block | Only where it adds a real follow-up |
| 7 | Rollout | Pilot Chapter 2, with a PDF of those pages for review, then the rest |
| 8 | Ch 18–19 | Keep, compacted |

## Plan

Page shape (a guide, not a rule):
- **What** (one line) · **Spot it** (statement cues; "not this if" folded in) · **Why** (the invariant)
- Diagram, where it shows the mechanism
- Template: the core loop, about 10–15 lines
- **Watch out:** the one failure, with its tiny input
- **Also solves:** 2–3 linked problems on one line
- Interview block only where it adds a real follow-up

Budget: front ~4 · pattern pages ~115 · openers ~12 · drills ~18 → about 150–155.

## Tasks

- [x] 1. Pilot: Chapter 2 in the compact style; PDF of its pages for review
- [ ] 2. You approve or adjust the style
- [ ] 3. Chapters 3–19 in the approved style
- [ ] 4. Front: drop the index and look-alikes; turn off the contents (per-book switch); make the 54-pattern map clickable
- [ ] 5. Drop the checkpoints; rebuild the drills as linked titles, 8–10 rows
- [ ] 6. Build 0 overflow, checker, duplicate check, re-run the front generators

## Updates

- 2026-09-27 — task opened; decisions recorded.
- 2026-09-27 — Chapter 2 pilot: 25 files → 11 pages. 02-11's decision chart moved
  into the 02-01 opener (the 01-04 chip now points to 02-01). Each pattern is one page:
  What · Spot it (with "not this" folded in) · Why, diagram, template, Watch out,
  Also solves. The interview block is kept only on 02-03 (as a one-line follow-up).
  Drills: 11 most-asked problems, titled and linked. Two templates tightened (02-05,
  02-10) and re-run against a brute force: 3,000 cases, 0 failures. Book 276 pages,
  0 overflow. Review PDF: `dist/tech/DSA/02-pattern-recognition-ch02-pilot.pdf`.
- 2026-09-27 — pattern intro pages, at the level of well-known patterns (your call),
  modelled on the main-branch family page: Sliding Window (02-01, 2 pages) and Two
  Pointers (02-08-0). `tools/build.mjs` lets a label be keyed by file stem, so an intro
  sharing an ID shows "overview". Chapter 2 is 13 pages; pilot PDF is
  `dist/tech/DSA/02-pattern-recognition-ch02-pilot.pdf`. Helpers and lookup tables
  are copied to `docs/tasks/reference/dsa/scripts/`. Continuation prompt:
  `dsa-pattern-compact-HANDOFF.md`.
- 2026-09-27 — Chapter 3 in the compact style: 16 files → 8 pages. New Prefix Sum intro
  (03-01, label "Pattern 4 · Prefix and Suffix · overview"): What / Signal / Mechanism,
  the moves table, a prefix-map skeleton, the trap. The old family diagram was dropped
  (the skeleton shows the same read-then-write loop) to fit one page. Six move pages
  (03-02 … 03-07; IDs unchanged, so no references moved), interview blocks cut to
  one-line follow-ups on 03-03, 03-04, 03-06. Drills: 11 linked problems, none repeated
  elsewhere (disguised statements gone). Templates reused unchanged; only 03-03's two
  comments moved inline. The new skeleton was run against a brute force: 3,000 cases,
  0 failures. Book 266 files; chapters 2–3 have 0 overflow (01-02 still 2mm over, fixed
  in the front-matter step). Spec: `reference/dsa/scripts/spec-ch03.py`.
- 2026-09-27 — Chapter 3–19 approved ("looks good, go on with the entire PDF").
  Chapter 4: 16 files → 7 pages. In-Place Tricks intro (04-01, a sign-flag skeleton run
  against a brute force, 3,000 cases, 0 failures; the old diagram dropped to fit), five
  compact move pages, 10 drills, the 04-08 checkpoint deleted (nothing referred to it).
  New helper `reference/dsa/scripts/measure.mjs` measures page heights from the `--html`
  build exactly as the PDF build does (126mm column), so overflow is checked without a
  full PDF pass.
- 2026-09-27 — Chapters 5 and 6: 15 → 6 pages and 11 → 5 pages. Intros "Matrix" (05-00)
  and "String Keys" (06-00) keep their IDs; each folds its old routing table ("table,
  graph or DP?", "owned by another chapter") into one line. Templates unchanged except
  comments moved inline (05-01, 05-03) and two boundary updates joined to their loop
  line (05-02). The new grid skeleton (directions, bounds, flat index) was run: 0
  failures. Drills: 10 each; 1351 stays with Chapter 9's drills, 1329 used instead.
- 2026-09-27 — Chapters 7 and 8: 12 → 6 pages and 16 → 7 pages. Intros "Sorting &
  Intervals" (07-01, whose skeleton is the three sort keys) and "Greedy" (08-01, which keeps the
  counter-input table as its trap). 07-06 had no template (it pointed to Module 04); it
  now has the 2406 event sweep, run against a brute force: 3,000 cases, 0 failures.
  The 08-09 checkpoint is deleted. Other templates: only comments moved inline and one
  signature joined (08-03). Drills 11 and 10; Jump Game (55) stays a graph drill.
- 2026-09-27 — Chapters 9 and 10: 13 → 5 pages and 26 → 11 pages. Intros "Binary Search"
  (09-01; the skeleton holds both the minimise and the maximise loop) and "Stack &
  Monotonic Stack" (10-01, nine moves). 10-05 and 10-10 had no template (they pointed to
  Module 03); they now have Daily Temperatures and a head-index Sliding Window Maximum.
  Both, plus the two binary-search loops, were run against brute force: 12,000 checks,
  0 failures. 10-09's code keeps only the histogram helper; the per-row wrapper is a
  two-line comment. New helper `inline-comments.py` moves a lone comment onto the code
  line below it (formatting only). Drills 11 and 11; 410, 1552, 20 and 394 are left to
  the later chapters that already list them.
- 2026-09-27 — Chapters 11 and 12: 11 → 5 pages and 21 → 9 pages. Intros "Bit
  Manipulation" (11-00; the skeleton is the four identities) and "Linked List Pointers"
  (12-01, which absorbs the dummy-head move, so its skeleton is Merge Two Sorted Lists).
  Two pages each for 12-01 (intro + the dummy-head move) and 12-02 (Reverse Nodes in
  k-Group, a hard problem whose four-frame diagram shows the stitching). `compact.py`
  gained a `SPLIT` option for this. The 11-05 checkpoint is deleted. 12-03's code lost
  three lines to formatting and was re-run: 10 lengths, 0 failures. Drills 11 and 11.
