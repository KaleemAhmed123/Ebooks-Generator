# Pattern Recognition — coverage audit

- **Status:** audit done, awaiting approval to write pages
- **Started:** 2026-10-01
- **Last updated:** 2026-10-01

## What you asked for

- Audit `books/tech/DSA/02-pattern-recognition` for **missing patterns** a DSA
  learner needs to clear interviews and solve the first 2–3 problems of a contest.
- Scope: **02 only.**
- Deliverable: **this gap report first**, approve before any pages are written.
- Ceiling: **interview + light contest** (up to LeetCode Hard, Codeforces Div2 A–C).
- Placement: anything in scope goes **into 02**.
- Tier to actually add: **interview-core only** (light- and borderline-contest
  items recorded but not planned).
- Also flag **named-but-under-built** patterns, not only fully missing ones.
- Each gap gets a **full page plan**.

## How the audit was done

- Read the 78-pattern taxonomy from `meta.json` and the route map.
- Compared it against the standard interview + light-contest pattern set.
- **Grep-verified every candidate gap against the actual pages** before listing it,
  to avoid reporting a false gap. Two candidates were dropped this way:
  - **Dutch national flag / sort colors** — already fully taught in `02-09`
    (worked LeetCode 75, diagram, interview block). Not a gap.
  - **Two-sum (sorted and the f(i)+g(j) split)** — already in `02-08` and `03-05`.
    Not a gap.

## The book is strong

78 patterns across Ch 2–19 already cover: sliding window and its six moves, all
two-pointer forms, prefix/difference arrays, Kadane, cyclic sort, Boyer–Moore,
matrix geometry, tries, rolling hash, intervals/sweep, greedy, binary-search-on-
answer, rotated search, quickselect, full monotonic stack/queue, bit tricks,
linked-list pointers, backtracking (subsets/perms/combos/board/cuts), trees
(LCA, tree DP, Morris), heaps (top-k, two-heap median, merge-k, regret), graphs
(BFS/DFS/topo/Dijkstra/MST/union-find/bipartite/state-BFS), and DP (linear,
interval, grid, knapsack, LIS, LCS/edit, bitmask, game). The gaps below are the
exceptions, not the rule.

---

## Findings — interview-core

### Missing patterns

#### G1 · Ordered-set operations — Chapter 15

- **Why needed:** Chapter 15's title is "Heaps & Ordered Sets" but **no page
  teaches the ordered set.** A balanced BST / TreeMap / multiset answers what a
  heap cannot: floor, ceil, nearest neighbour, rank/k-th, and delete-arbitrary,
  each O(log n). Several standard interview problems need exactly this and nothing
  else solves them cleanly.
- **Moves:**
  1. **Floor / ceil on a dynamic set** — nearest value ≤ x and ≥ x as items arrive.
  2. **k-th / rank (order statistic)** — the k-th smallest of a changing set.
  3. **Multiset as a mutable window** — sliding-window median; keep a window whose
     max − min stays within a limit.
- **Anchor problems:** LeetCode 220 Contains Duplicate III · LeetCode 480 Sliding
  Window Median · LeetCode 1649 Create Sorted Array through Instructions.
- **Note:** JS has no built-in ordered set — same "paste a class" treatment as the
  heap (15-11), or a note pointing to one. Flag this in the page.
- **Badge:** lv2. **Suggested number:** 79.

#### G2 · Median of two sorted arrays — Chapter 9 (Search Space)

- **Why needed:** the canonical "binary search on the partition" problem
  (LeetCode 4, Hard). It is **not** any existing binary-search move — not
  answer-search, not count-the-kth, not rotated, not quickselect. The idea: binary
  search the cut position in the **shorter** array so the two left halves together
  hold exactly the first ⌈(m+n)/2⌉ elements.
- **Moves:** one move — partition both arrays with a single cut; check the four
  border values; move the cut.
- **Anchor problems:** LeetCode 4 Median of Two Sorted Arrays; generalises to
  "k-th element of two sorted arrays".
- **Badge:** lv3 (hard round). **Suggested number:** 80.

#### G3 · Coordinate compression — Chapter 19

- **Why needed:** maps huge or sparse coordinates (values up to 1e9) onto 0..n−1 so
  a Fenwick/segment tree or a bucket array fits in memory. It is the **prerequisite
  step** for count-smaller-after-self, skyline, and interval-counting problems.
  Currently **zero mention anywhere** in the book.
- **Moves:** collect values → sort unique → replace each by its rank; then run the
  range structure over ranks instead of raw values.
- **Anchor problems:** LeetCode 315 Count of Smaller Numbers After Self ·
  LeetCode 327 Count of Range Sum · LeetCode 218 The Skyline Problem.
- **Badge:** lv2. **Suggested number:** 81 (sits right before the range structures).

### Named but under-built

#### U1 · Segment tree — Chapter 19

- **Current state:** a **single table row** in `19-01` ("point updates, min/max/
  mergeable → segment tree, O(log n)"). No build/query/update code, no diagram,
  no worked problem. Pattern 78's own table points the reader at a structure the
  book never teaches.
- **Needs its own move page:** build, point update, range query; the half-overlap
  recursion (fully inside / fully outside / split); and the contrast with Fenwick
  — segment tree does min/max/gcd and range-assign, which a Fenwick cannot.
- **Anchor problems:** LeetCode 307 Range Sum Query – Mutable · LeetCode 2407
  Longest Increasing Subsequence II · range-minimum queries.
- **Badge:** lv3. **Suggested number:** 82.

#### U2 · Fenwick tree (BIT) — Chapter 19

- **Current state:** appears only as a **code snippet inside the `19-01` overview**,
  with no worked application page. The reader sees the class but never the problem
  that makes it necessary.
- **Needs a move page:** the `i & -i` lowest-bit jump drawn as a diagram, and the
  count-inversions / count-smaller application — the real reason it beats a prefix
  array (it supports updates between queries).
- **Anchor problems:** LeetCode 315 Count of Smaller Numbers After Self ·
  LeetCode 493 Reverse Pairs · LeetCode 307.
- **Badge:** lv2–lv3. **Suggested number:** 83.

### Minor / optional (flagged, not asserted)

- **M1 · Explicit "seen-set / complement hashing" recognition page.** Two-sum
  (unsorted), Longest Consecutive Sequence (LeetCode 128), and group-by-key are
  scattered implicitly across `03-05` and the drills; **LeetCode 128 has no home.**
  This is small — it may belong as a drill addition rather than a new pattern. Your
  call whether to list it as G4 or fold it into the Ch 3 drills.

---

## Excluded by your tier choice (recorded, not planned)

- **Light-contest:** 0-1 BFS (deque) · sparse table for static range min/max (also
  an under-built table row in `19-01`) · submask enumeration · ternary search.
- **Borderline-contest:** digit DP · Floyd–Warshall / Bellman–Ford · meet-in-the-
  middle.
- **Already owned by 08-competitive-track** (correctly out of 02): KMP · Z-algorithm
  · suffix structures · convex hull · Mo's algorithm · DSU-on-tree · centroid and
  heavy-light decomposition · persistent structures · FFT/NTT · matrix exponentiation.

---

## Plan (pending approval)

Five pages to write, all in Chapter 15 and Chapter 19:

| # | Pattern | Chapter | Kind | Badge |
|---|---|---|---|---|
| 79 | Ordered-set operations | 15 | new | lv2 |
| 80 | Median of two sorted arrays | 9 | new | lv3 |
| 81 | Coordinate compression | 19 | new | lv2 |
| 82 | Segment tree | 19 | build out | lv3 |
| 83 | Fenwick tree | 19 | build out | lv2 |

Each page follows the existing anatomy (what / spot it / why / inline SVG /
template / one trap / where it appears + `:::interview`), keeps the `pattern`
titles in `meta.json`, and respects the no-repeat + one-page rules. Open question
before writing: confirm pattern numbers 79–83 and whether M1 is in or out.

## Tasks

- [x] Read taxonomy and route map
- [x] Compare against interview + light-contest set
- [x] Grep-verify each candidate against real pages
- [x] Drop false gaps (Dutch flag, two-sum)
- [x] Write this report
- [x] Get approval on scope + pattern numbers + M1 (all three approved; M1 = new page)
- [x] Write pages 79–84 (+ update `meta.json` `patterns`)
- [x] Update local overview move-tables (09-01, 15-01, 19-01)
- [x] Build-verify: all 6 render, labels + anchors resolve, no overflow
- [x] Master-list resync — Option A (trailing numbers), both SVGs re-laid, counts fixed
- [x] Full PDF build-check: master-list pages fit; new pages overflow in the book's normal band (user allows overflow)
- [ ] Verification pass (fact + consistency), per project rules — deferred/batched

## Pages written

| Pattern | Page id | Chapter |
|---|---|---|
| 79 Ordered Set | `15-07-ordered-set.md` | 15 |
| 80 Partition Two Sorted Arrays | `09-06-median-of-two-sorted.md` | 9 |
| 81 Coordinate Compression | `19-02-coordinate-compression.md` | 19 |
| 82 Segment Tree | `19-03-segment-tree.md` | 19 |
| 83 Fenwick for Counting | `19-04-fenwick-count.md` | 19 |
| 84 Keep a Set of What You've Seen | `03-08-seen-so-far.md` | 3 |

## Open question — master-list numbering

The book numbers patterns 1–78 **in reading order**. The new pages slot into
Chapters 3, 9, 15, 19 but carry the trailing numbers 79–84. So in the master
list (`01-02`, a hand-laid SVG titled "The 78 patterns") and the route map,
either:

- **(A) Keep trailing numbers** — list each new pattern in its chapter but with
  its 79–84 number. Ch 9 would read 25, 26, 27, 80; Ch 19 reads 78, 81, 82, 83.
  Numbers no longer ascend within a chapter. Smaller change, matches what's
  already shipped on the pages.
- **(B) Renumber into reading order** — insert the new patterns where they sit
  (e.g. ordered set becomes 54, pushing graphs/DP/etc. up by 6). Clean ascending
  order, but every downstream pattern number changes, touching ~40 pages and the
  whole master SVG.

My recommendation: **(A)** — it's the shortest correct diff and the page labels
are already live. Left unactioned until you choose.

## Updates

- **2026-10-01:** Audit created. Five interview-core gaps found (3 missing, 2
  under-built), one minor optional. Two candidate gaps dropped after grep showed
  they were already covered.
- **2026-10-01:** All three approvals given. Wrote pages 79–84, added their
  `meta.json` labels, updated the 09-01/15-01/19-01 overview move-tables, and
  build-verified (labels, anchors, no overflow). Master-list SVG + "78"-count
  references left pending the numbering decision above. Fact/consistency
  verification pass still to run.
- **2026-10-01:** Numbering decision = **Option A**. Re-laid both master-list
  SVGs (`01-02-a`: +pattern 84 in Ch 3, +80 in Ch 9, height 321→335; `01-02-b`:
  +79 in Ch 15, +81/82/83 in Ch 19, height 374→414), fixed all four "78"→"84"
  prose references, and appended the new numbers to the Ch 9 / Ch 15 overview
  labels. Full PDF build: both master-list pages fit; the six content pages
  overflow in the book's normal 248–314mm band (user confirmed overflow is OK).
  Tallest is `19-03` segment tree at 314mm — left as-is, flagged. Only the
  fact/consistency verification pass remains, deferred per workflow.
