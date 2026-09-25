# DSA 02 — Pattern Recognition expansion

**Status:** in progress
**Started:** 2026-09-25
**Branch:** `claude/bold-thompson-eb0v86` (based on `02-pattern-recognition-ebook-expansion`)

---

## What you asked for

> Expand the pattern recognition booklet with the patterns in `MyDSA sheet.xlsx`.
> Add, don't repeat. Order it linear → non-linear, easy → hard; segment tree,
> Fenwick and friends go last. Action-oriented names, not academic ones.
> Every pattern: what it is → signal → why it works → SVG → TS template →
> canonical problem → variation → wrong approach → interview block.
> Detailed drill page per chapter.

Decisions, in your words:

| # | Question | Your answer |
|---|---|---|
| 1 | Reorder existing files? | Yes. Change order, enhance quality, don't delete, don't repeat |
| 2 | Where do new patterns go? | Where they belong: array patterns with arrays, stack with stack… |
| 3 | Hard tail? | At the end: CP / tough-company patterns |
| 4 | The 16 thin pages from the earlier agent? | Branch-only, do whatever it takes for quality |
| 5 | Page budget | No cap; quality, rich diagrams, real problems |
| 6 | Depth | The full nine-part template, not just a template |
| 7 | Problem names | Real platform titles (LeetCode / GFG / SPOJ) |
| 8 | Red rows | Include, marked 🟡 |
| 9 | Difficulty markers | Yes, on every page |
| 10 | Overflow | Split pages that spill past one printed page |
| 11 | Drills | Detailed drill page per chapter |
| 12–14 | Names | Intuitive, action-oriented; mapping kept here, not in the book |
| 16 | Verification | Write first, verify at the end with subagents |
| 17 | Commits | Grouped, short human messages, at the end |

---

## Environment limits (this session)

- leetcode.com, geeksforgeeks.org, cp-algorithms.com, codeforces.com, spoj.com
  are denied by the network policy. Network changes apply to new sessions only.
- Substitute: every TypeScript template is executed and stress-tested against
  a brute force in the scratchpad. Claims that cannot be checked are cut.
- Push to GitHub returns 403 until the Claude GitHub App has repo access.

---

## Final chapter order

Chapter = file prefix. `NEW` = written in this pass. `was` = original file moved.
The 16 stub pages from the earlier pass (02-09…02-11, 03-09, 06-09, 06-10,
07-08, 10-*, 11-*, 12-*) were removed; each idea is covered properly by the page
named in brackets.

### Part A — Linear

| Ch | Title | Pages |
|---|---|---|
| 01 | Reading the structure | 01-01 was 01-01 · 01-02 was 01-02 (redrawn) · 01-03 NEW route map |
| 02 | Windows & Pointers | 02-01..03 was · 02-04 NEW count by right end · 02-05 NEW exactly-K by subtraction · 02-06 NEW flip the target (complement window) [was stub 02-09] · 02-07 NEW sort, then slide · 02-08 was 02-04 · 02-09 was 02-05 · 02-10 NEW fix one, collide two · 02-11 was 02-08 · 02-12 NEW drills |
| 03 | Prefix & Running State | 03-01 NEW family · 03-02 was 06-02 · 03-03 NEW equal prefixes [stub 06-09] · 03-04 NEW two passes, left and right · 03-05 NEW best partner so far · 03-06 NEW drop the baggage [stub 06-10] · 03-07 was 06-03 · 03-08 was 06-07 · 03-09 NEW drills |
| 04 | In-place & Index Tricks | 04-01 NEW family · 04-02 NEW send each value home [stub 02-10] · 04-03 NEW reverse to rotate · 04-04 NEW find the dip · 04-05 NEW vote and cancel · 04-06 NEW wrap around · 04-07 NEW drills |
| 05 | Grids & Matrices | 05-01 NEW coordinate keys [stub 10-02] · 05-02 NEW peel the layers · 05-03 NEW state in the cell · 05-04 was 07-04 · 05-05 NEW drills |
| 06 | Strings | 06-01 NEW signature key · 06-02 NEW grow from the centre · 06-03 NEW two-way map · 06-04 NEW walk the shared prefix · 06-05 NEW drills |
| 07 | Order & Intervals | 07-01..06 was 03-01..06 · 07-07 NEW sort by start to merge, by end to keep [stub 03-09] · 07-08 NEW count while you merge [stub 07-08] · 07-09 NEW let pairs decide the order · 07-10 was 03-07 · 07-11 was 03-08 · 07-12 NEW drills |
| 08 | Greedy Moves | 08-01 NEW family · 08-02 NEW extend the reach [stub 02-11] · 08-03 NEW take the latest free slot · 08-04 NEW pair the extremes · 08-05 NEW sort by regret · 08-06 NEW restart when you go broke · 08-07 NEW find the invariant · 08-08 NEW drills |
| 09 | Search Space | 09-01 was 07-01 · 09-02 was 07-02 · 09-03 NEW find the sorted half · 09-04 NEW guess a value, count below it · 09-05 was 07-05 · 09-06 was 07-06 · 09-07 was 07-07 · 09-08 NEW drills |
| 10 | Stacks & Queues | 10-01 NEW family · 10-02 NEW push the context · 10-03 NEW cancel against the top · 10-04 NEW count the balance · 10-05 was 02-06 · 10-06 was 04-04 · 10-07 NEW pop while it pays · 10-08 NEW count each element's reach · 10-09 NEW stack the rows · 10-10 was 02-07 · 10-11 NEW build one from another · 10-12 NEW drills |
| 11 | Bits | 11-01 NEW let pairs cancel · 11-02 NEW count each bit column · 11-03 NEW peel the lowest bit · 11-04 NEW drills |

### Part B — Non-linear

| Ch | Title | Pages |
|---|---|---|
| 12 | Linked Lists | 12-01 NEW family + dummy head · 12-02 NEW reverse in place · 12-03 NEW split, reverse, weave · 12-04 NEW meet inside the loop · 12-05 NEW keep a fixed gap · 12-06 NEW weave the copies · 12-07 NEW drills |
| 13 | Recursion & Backtracking | 13-01 NEW trust the smaller call · 13-02 NEW work before or after the call · 13-03 NEW recur on the index · 13-04 NEW walk the grid · 13-05 NEW pick or skip [stub 11-03] · 13-06 NEW loop and skip equal siblings · 13-07 NEW stay to reuse, restart to revisit · 13-08 NEW fill the slots · 13-09 NEW try every cut · 13-10 NEW place, check, undo · 13-11 NEW drills |
| 14 | Trees | 14-01 NEW which way does information flow · 14-02 NEW carry it down · 14-03 NEW return one, record another [stub 11-02] · 14-04 NEW walk level by level · 14-05 NEW give every node a coordinate [stub 10-03] · 14-06 NEW turn the tree into a graph · 14-07 NEW find the split point · 14-08 NEW read the BST in order · 14-09 NEW rebuild from traversals · 14-10 NEW drills |
| 15 | Heaps & Ordered Sets | 15-01..03 was 04-01..03 · 15-04 NEW balance two heaps · 15-05 NEW merge the two smallest · 15-06 NEW take now, regret later · 15-07 NEW keep it sorted as you go · 15-08 was 04-07 · 15-09 was 04-08 · 15-10 NEW drills |
| 16 | Graphs & Dependency | 16-01 was 08-02 · 16-02 NEW find the hidden edge [stubs 12-*] · 16-03 NEW flood from the border · 16-04..08 was 05-01..05 · 16-09 NEW drills |
| 17 | DP & Games | 17-01 was 08-01 · 17-02 NEW name the DP shape · 17-03 NEW pick, then jump · 17-04 NEW track what you hold · 17-05 NEW try every split · 17-06 NEW assume the opponent is perfect · 17-07 NEW drills |

### Part C — Signature

| 18 | Patterns Nobody Named | 18-* was 09-* (09-08 moved to 19-08) |

### Part D — Hard, rarely asked

| 19 | Range Structures & CP | 19-01 was 06-01 · 19-02 was 06-04 · 19-03 was 06-05 · 19-04 was 04-05 · 19-05 was 06-06 · 19-06 was 04-06 · 19-07 was 06-08 · 19-08 was 09-08 · 19-09 was 07-03 · 19-10 NEW thread back to the parent (Morris) · 19-11 NEW choose the opposite bit (XOR trie) · 19-12 NEW drills |

---

## Your sheet tags → book names

Kept here so you can find your own words; the book uses only the right column.

| Sheet tag (section) | Book name | Page |
|---|---|---|
| lookAhead (Arrays) | Extend the reach | 08-02 |
| TwoPointers | Two Pointers / Fix one, collide two | 02-08, 02-10 |
| slidingWindow | Sliding window + Count by right end + Exactly-K | 02-02..05 |
| kadanes | Drop the baggage | 03-06 |
| maxMin Len | Sort, then slide / variable window | 02-03, 02-07 |
| Arrangements | Send each value home, Dutch flag | 04-02, 02-09 |
| prefixSum and +1 −1 trick | Equal prefixes | 03-03 |
| merge | Count while you merge | 07-08 |
| no of operations | Find the invariant / Flip the target | 08-07, 02-06 |
| hashing | Best partner so far, Signature key | 03-05, 06-01 |
| hypothetical 2D_to_1D | Coordinate keys | 05-01 |
| Rotation / printing_in_diff_order | Peel the layers | 05-02 |
| binarySearchOnGrid | Staircase search | 05-04 |
| cycleSort | Send each value home | 04-02 |
| pivot / rotatedSorted | Find the sorted half | 09-03 |
| SearchSpace | Binary search on answer / Guess a value, count below it | 09-02, 09-04 |
| sortUsing Comparator | Let pairs decide the order | 07-09 |
| FirstX lastY | Pair the extremes | 08-04 |
| Intervals | Sort by start to merge, by end to keep | 07-07 |
| Mark X Busy | Take the latest free slot | 08-03 |
| Huffman | Merge the two smallest | 15-05 |
| Make sorted by DS | Keep it sorted as you go | 15-07 |
| Observation / parity | Find the invariant | 08-07 |
| EndToStart / PrefSuff | Two passes, left and right | 03-04 |
| Window (Greedy) | Sort, then slide | 02-07 |
| Reversal / Merge / Mid (LL) | Reverse in place / Split, reverse, weave | 12-02, 12-03 |
| SlowFast (cycle) | Meet inside the loop | 12-04 |
| PrevTrack | Dummy head | 12-01 |
| Adapters | Build one from another | 10-11 |
| Parentheses | Count the balance | 10-04 |
| Circlegames | Wrap around / Recur on the index (Josephus) | 04-06, 13-03 |
| indexGame | Recur on the index | 13-03 |
| zigZag preInPost | Work before or after the call | 13-02 |
| countWays / gridBases | Walk the grid | 13-04 |
| pickNonPick | Pick or skip | 13-05 |
| permutationCase | Fill the slots | 13-08 |
| partition (Recursion) | Try every cut | 13-09 |
| BackTracking | Place, check, undo | 13-10 |
| divideAndConquer | Count while you merge / Try every cut | 07-08, 13-09 |
| hypothesis | Trust the smaller call | 13-01 |
| Travel And Change | Return one, record another | 14-03 |
| views | Give every node a coordinate / Level by level | 14-05, 14-04 |
| leftRightTop | Turn the tree into a graph | 14-06 |
| handleRoot CallChild | Carry it down | 14-02 |
| Morris Pattern | Thread back to the parent | 19-10 |
| Identification (Graphs) | Find the hidden edge | 16-02 |
| minDist to 1's Multisource BFS | Module 05 + Flood from the border | 16-03 |
| GameStrategy (DP) | Assume the opponent is perfect | 17-06 |
| BinarySearch and pickSkip (DP) | Pick, then jump | 17-03 |
| Stocks DP | Track what you hold | 17-04 |
| Partition DP | Try every split | 17-05 |

---

## Log

- 2026-09-25 — moved 53 original pages to the new chapter numbers with `git mv`; removed the 16 stub pages.
- 2026-09-25 — wrote chapters 2–17 new pages and chapter 19 additions; every TS template extracted and stress-tested against a brute force under Node 22 strip-types.
