# The Algorithm Derivation Manual — Master Blueprint

> **Status:** Approved — ready to write  
> **Started:** 2026-09-23  
> **Approved:** 2026-09-23  
> **Target:** 300–400 pages across 8 modules + frontmatter + backmatter  
> **Format:** Multi-volume series, each module a standalone booklet + combined master volume  
> **Title:** The Algorithm Derivation Manual  
> **Cover accent:** `#2d6a4f` (forest green)

---

## What this book is

A DSA problem-solving **system** — not a LeetCode patterns cheat-sheet.

The reader learns to **recognise structure** in unfamiliar problems, **derive** algorithms from scratch, reason about correctness, optimise complexity, and apply that knowledge in high-end coding interviews and competitive programming.

**The thesis in one line:**

> Constraints are a fingerprint of the intended algorithm. Learn to read the fingerprint, and you will derive the solution instead of remembering it.

---

## Decisions (all resolved)

| Decision | Answer |
|---|---|
| Title | **The Algorithm Derivation Manual** |
| Cover accent colour | `#2d6a4f` (forest green) |
| Module count | **8** (merged from 10 — patterns+unnamed, problem-solving+interviews) |
| Language | Language-agnostic concepts, TypeScript implementations, C++ for CP-only tricks |
| Reader | Knows basic DSA → CP-level, with difficulty markers |
| Priority | Interview first, CP second |
| Math level | Practical interview math only |
| Matroid intuition | **Single paragraph + footnote** in greedy chapter, not a full section |
| Problem coverage | Yes — concept → canonical → variation → hard → follow-up |
| Theory:problems ratio | 50/50 |
| Wrong approach library | Comprehensive, per pattern (not a monolithic list) |
| Recognition drills | Per section, with real problem sketches |
| Company styles | Reasoning style descriptions, no specific questions |
| Implementation engineering | Concise dedicated chapter inside Module 07 |
| Advanced/CP topics | Yes, in clearly-marked CP track (Module 08) |
| Difficulty levels | 6 levels, markers on every page |
| Book feel | Field manual + deep technical reference |
| Master volume | Yes — all 8 booklets + frontmatter + glossary + author's closing page |

---

## The reader

- **Starting point:** Knows basic DSA (can write a loop, understands what a stack is, has seen Big-O)
- **Ending point:** Can solve hard interview problems at Google/Amazon/Atlassian level, and can compete in CP contests
- **Not for:** True beginners who need to learn what a variable is

Every page carries a **difficulty marker:**

| Marker | Meaning | Who needs it |
|---|---|---|
| 🟢 | Core | Everyone |
| 🟡 | Advanced | FAANG interviews, strong startups |
| 🔴 | CP-only | Competitive programming track |

---

## Writing style — the rules

Every page in this book follows the same DNA as the TypeScript and System Design books. **Read these rules before writing a single page.**

### Voice

- **Plain English, hyper-concise.** Short sentences. One idea per sentence. If a sentence carries no new information, delete it.
- **Kinda academic tone.** Professional, authoritative, confident. Not salesy. Not chatty. You are writing for peers.
- **Ban all AI tropes.** Never use: delve, foster, robust, demystify, embark, leverage, utilize, facilitate, comprehensive (in marketing sense), powerful, efficient (as adjectives — show the mechanism instead). Never throat-clear: "In this section we will...", "It is important to note...", "Let's explore...", "In conclusion..."
- **Show, don't tell.** Never say "this is a powerful technique." Show the code that makes it powerful and let the reader conclude.
- **Terms defined inline, instantly.** "A **monotonic stack** is a stack where elements are always in sorted order — every push that would break the order pops first." One line. Right where the term first appears.
- **Assertive.** "This is the single most useful DP pattern for interviews." Not hedged, not "arguably" or "many people think."

### Page structure

```
## [Page topic]                           ← this is what the contents page lists

- Core assertion in 1-3 bullets           ← no preamble, start with the claim
- Term definition if introducing one

:::mint
<svg ...>                                 ← diagram that replaces prose
</svg>
:::

- Explanation bullets (only what the diagram didn't cover)

### [Sub-point]

- Code template or worked example

\`\`\`ts
// the smallest code that proves the assertion
\`\`\`

### The trap / The failure / The wrong approach

- What goes wrong when you don't do this
- The subtle mistake nobody warns about

:::interview
"[Interview question]" — [Sharp one-paragraph answer with the key formula or reasoning step]
:::
```

### Diagrams

- Inline `<svg>` with `viewBox="0 0 470 ..."` (470px wide, variable height)
- Wrapped in `:::mint` blocks
- Style classes:
  - `.l` — label text (9-10px Consolas monospace or Georgia serif)
  - `.s` — small/secondary text (7.5-8.5px)
  - `.b` — box (white fill, `#1a1a1a` stroke)
  - `.a` — arrow (same stroke)
  - `.hot` / `.t` — danger/accent (`#ef476e`)
- Colours: `#1a1a1a` (text), `#6b6b6b` (secondary), `#e2fcf3` (mint fill), `#1d4e89` (accent), `#ef476e` (danger)
- Arrow markers in `<defs>` with unique IDs per SVG
- Every SVG has `role="img"` and `aria-label="..."`

### Wrong approach format (per pattern)

Signature feature. For every major technique, include:

```
### The wrong approach

- **Naive idea:** [what a beginner tries]
- **Why it looks right:** [it works on small inputs / obvious cases]
- **Why it breaks:** [the specific failure — TLE, wrong answer, edge case]
- **The trap:** [the subtle thing that makes smart people fall for it]
- **The fix:** [the insight that leads to the correct approach]
```

### Recognition drills format

At the end of each major section:

```
### Recognition drills

You have 20 seconds per problem. Do not solve. Identify the likely pattern.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array, find the longest subarray with at most k distinct elements | |
| 2 | ... | |

:::note
**Answers:** 1 → Sliding window (locality). 2 → ...
:::
```

### Interview blocks

```
:::interview
"How would you find the kth largest element?" — Quickselect. Average O(n), worst O(n²). For guaranteed O(n), use median-of-medians as pivot, but in practice randomised Quickselect is faster.
:::
```

### Page sizing

- **Target: 25-50 lines per page.** Average ~35.
- If a page exceeds ~50 lines, split into `-1.md` and `-2.md`
- **One markdown file = one printed page.** If the idea is too big, split the idea.

### File naming

```
pages/
  00-cover.md
  01-01-[topic-slug].md         ← chapter 01, page 01
  01-02-[topic-slug].md
  01-03-[topic-slug]-1.md       ← split page part 1
  01-03-[topic-slug]-2.md       ← split page part 2
  ...
```

---

## Research requirements

**Non-negotiable. Every page must be researched against primary sources.**

### Primary sources for DSA content

| Source | What to verify |
|---|---|
| **CLRS** (Cormen et al.) | Algorithm correctness, complexity proofs, formal definitions |
| **Jeff Erickson's *Algorithms*** | DP frameworks, graph algorithms, reduction techniques |
| **Competitive Programming Handbook** (Laaksonen) | CP techniques, implementation patterns |
| **Algorithm Design Manual** (Skiena) | Practical algorithm selection, war stories |
| **Codeforces editorials** | Real problem analyses, unnamed patterns, edge cases |
| **USACO training pages** | Progressive difficulty problems, tested solutions |
| **TopCoder editorials** | Classic technique explanations |
| **LeetCode discussions** (top-voted) | Interview-specific insights, company patterns |
| **CP-algorithms.com** | Implementation references, complexity analysis |
| **Language docs** (MDN, TypeScript handbook) | TypeScript-specific implementation correctness |

### What "researched" means

1. Every complexity claim verified against a textbook or formal analysis
2. Every code template actually run and tested
3. Every "wrong approach" verified to actually fail (not hypothetically)
4. Every constraint→algorithm mapping checked against real problem sets
5. Company-style descriptions based on aggregated interview reports, not anecdotes

### Verification process (per page)

From CLAUDE.md — do not skip:

1. **Fact pass** — subagent checks every claim against live primary sources
2. **Consistency pass** — subagent checks against other pages for contradictions
3. Fix what comes back. Cut anything unverified.

---

## Directory structure

```
books/tech/DSA/
├── meta.json                    ← series-level metadata + master volume config
├── PLAN.md                      ← this file
├── raw.txt                      ← original conversation (keep for reference)
│
├── frontmatter/
│   └── 01-preface.md            ← author's preface (personal voice, like TS-to-Deployment)
│
├── 01-foundations/
│   ├── meta.json
│   └── pages/
│
├── 02-pattern-recognition/      ← MERGED: named patterns + unnamed patterns
│   ├── meta.json
│   └── pages/
│
├── 03-data-structures/
│   ├── meta.json
│   └── pages/
│
├── 04-algorithms/
│   ├── meta.json
│   └── pages/
│
├── 05-graphs/
│   ├── meta.json
│   └── pages/
│
├── 06-dynamic-programming/
│   ├── meta.json
│   └── pages/
│
├── 07-problem-solving-and-interviews/  ← MERGED: toolkit + interview mastery
│   ├── meta.json
│   └── pages/
│
├── 08-competitive-track/
│   ├── meta.json
│   └── pages/
│
└── backmatter/
    ├── 00-00-how-to-use-this-reference.md
    ├── 01-00-glossary-header.md
    ├── 01-01-glossary-a-d.md          ← glossary pages (split alphabetically)
    ├── 01-02-glossary-e-k.md
    ├── 01-03-glossary-l-p.md
    ├── 01-04-glossary-q-z.md
    ├── 02-01-constraint-table.md      ← full constraint→algorithm decision table
    ├── 02-02-master-pattern-matrix.md ← pattern matrix by need + by operation
    ├── 02-03-fastest-operation-table.md
    ├── 03-01-final-note.md            ← author's closing words (YOUR personal voice)
    ├── 04-01-about-the-author.md      ← shared about-the-author from shared/
    └── 05-01-copyright.md
```

---

## Series-level meta.json

```json
{
  "title": "The Algorithm Derivation Manual",
  "subtitle": "Patterns · Structures · Proofs",
  "seriesLine": "The Algorithm Derivation Manual",
  "tocTitle": "Contents",
  "contents": "per-topic",
  "masterVolume": { "name": "dsa-complete" },
  "order": [
    "01-foundations",
    "02-pattern-recognition",
    "03-data-structures",
    "04-algorithms",
    "05-graphs",
    "06-dynamic-programming",
    "07-problem-solving-and-interviews",
    "08-competitive-track"
  ],
  "cover": {
    "accent": "#2d6a4f",
    "title": ["Algorithm", "Derivation", "Manual"],
    "banner": "DERIVE THE SOLUTION. DON'T REMEMBER IT.",
    "kicker": "PATTERNS · DATA STRUCTURES · GRAPHS · DP · INTERVIEWS · CP",
    "term": [
      ["n ≤ 10⁵ → O(n log n)", 0],
      ["sorted? → binary search", 0],
      ["repeated subproblem? → DP", 0],
      ["connectivity? → DSU or BFS", 0],
      ["$ _", 2]
    ],
    "stack": [
      "Foundations",
      "Pattern Recognition",
      "Data Structures",
      "Algorithms",
      "Graphs",
      "Dynamic Programming",
      "Problem Solving & Interviews",
      "Competitive Track"
    ],
    "label": "COMPLETE VOLUME",
    "setLine": "ALL 8 BOOKLETS IN ONE VOLUME",
    "face": { "brow": "sharp", "mouth": "flat", "tilt": -3 }
  }
}
```

---

## Module 01 — Foundations (~25 pages) 🟢

**Thesis:** Before you learn any pattern, learn to read the problem. Constraints tell you the algorithm. Brute force reveals the structure. The derivation path takes you from one to the other.

### Pages

```
pages/
  00-cover.md
  01-01-what-dsa-mastery-means.md
  01-02-constraints-are-fingerprints.md
  01-03-the-constraint-table.md
  01-04-big-o-what-it-actually-measures.md
  01-05-common-complexities.md
  01-06-amortised-analysis.md
  01-07-amortised-examples.md
  01-08-recurrences-and-master-theorem.md
  01-09-space-complexity.md
  01-10-time-vs-space-tradeoffs.md
  02-01-the-derivation-method.md
  02-02-brute-force-is-not-lazy.md
  02-03-what-is-being-repeated.md
  02-04-can-we-remember-it.md
  02-05-can-we-eliminate-candidates.md
  02-06-can-we-preprocess.md
  02-07-can-we-exploit-monotonicity.md
  02-08-derivation-worked-example-1.md
  02-09-derivation-worked-example-2.md
  03-01-invariants.md
  03-02-proving-correctness-informally.md
  03-03-when-the-obvious-pattern-is-wrong.md
  03-04-recognition-drills-foundations.md
```

### Key content per page

**01-01 What DSA mastery means**
- Not memorising 500 problems. Recognising structure in unfamiliar ones.
- The five layers: recognition → reasoning → implementation → optimisation → derivation
- What this book teaches vs what it doesn't

**01-02 Constraints are fingerprints**
- THE core thesis of the book
- n ≤ 20 → bitmask/brute force. n ≤ 10^5 → O(n log n). Not rigid rules — first diagnostics.
- Diagram: constraint ranges mapped to algorithm families

**01-03 The constraint table**
- Full decision table: constraint/structure → candidate approaches
- 20+ rows covering every common constraint pattern
- "And then teach the exceptions" — when the obvious mapping is wrong

**01-04 Big-O: what it actually measures**
- Not "how fast." How growth rate changes with input size.
- Upper bound, not exact count. Why constant factors matter in practice.
- The failure: O(n) that's slower than O(n log n) because of cache misses

**01-06 Amortised analysis**
- Dynamic array doubling: O(1) amortised even though individual push can be O(n)
- Monotonic stack: inner loop looks O(n²), is actually O(n) total
- "Nested while does not mean O(n²)" — the trap most people fall for

**02-01 The derivation method**
- The flowchart: Brute force → Why slow? → What's repeated? → Remember/eliminate/reorder/preprocess/exploit monotonicity/data structure → Optimised
- Full SVG diagram of the derivation path
- This is the book's teaching methodology — every worked problem follows this path

**02-02 Brute force is not lazy**
- Brute force is step 1 of derivation, not a failure
- It reveals the structure: what's being computed, what's repeated, what's redundant
- A candidate who says "let me start with brute force" in an interview is doing it right

**03-03 When the obvious pattern is wrong**
- Problems that look like sliding window but aren't
- Problems that look like DP but have a greedy solution
- The skill: pattern recognition is fast; pattern validation is careful

---

## Module 02 — Pattern Recognition (~70 pages) 🟢🟡

**Thesis:** Patterns are not techniques to memorise — they are families of structure. Learn why a technique works, and you'll recognise it in problems that look nothing like the textbook.

**This module merges the named pattern taxonomy with the "Patterns Nobody Named" section.** The unnamed patterns are a prominent chapter (Chapter 9) — the book's signature, not an afterthought.

### The taxonomy

Organised by the **underlying reason** the technique works:

```
A. Locality — answer depends on a small moving portion
B. Order / Ranking — sorting exposes structure
C. Repeated Extremum — need min/max/best repeatedly
D. Repeated State — same subproblem appears again (cross-ref to Module 06 DP)
E. Connectivity — elements are linked (cross-ref to Module 05 Graphs)
F. Dependency — elements depend on order
G. Range Interaction — queries/updates over ranges
H. Search Space Reduction — narrowing the candidates
I. UNNAMED — recurring structures nobody gave a LeetCode tag
```

### Pages

```
pages/
  00-cover.md
  01-01-why-patterns-not-techniques.md
  01-02-the-taxonomy-diagram.md

  # Chapter 2: Locality
  02-01-locality-family.md
  02-02-sliding-window-fixed.md
  02-03-sliding-window-variable.md
  02-04-two-pointers.md
  02-05-two-pointers-variations.md
  02-06-monotonic-stack.md
  02-07-monotonic-queue-deque.md
  02-08-locality-wrong-approaches.md
  02-09-locality-recognition-drills.md

  # Chapter 3: Order / Ranking
  03-01-order-family.md
  03-02-sort-then-scan.md
  03-03-greedy-via-sorting.md
  03-04-binary-search-sorted-input.md
  03-05-coordinate-compression.md
  03-06-sweep-line.md
  03-07-order-wrong-approaches.md
  03-08-order-recognition-drills.md

  # Chapter 4: Repeated Extremum
  04-01-repeated-extremum-family.md
  04-02-heap-for-top-k.md
  04-03-heap-for-merge.md
  04-04-monotonic-stack-next-greater.md
  04-05-segment-tree-range-queries.md
  04-06-sparse-table.md
  04-07-extremum-wrong-approaches.md
  04-08-extremum-recognition-drills.md

  # Chapter 5: Dependency
  05-01-dependency-family.md
  05-02-topological-sort.md
  05-03-dag-dp.md
  05-04-critical-path.md
  05-05-dependency-wrong-approaches.md

  # Chapter 6: Range Interaction
  06-01-range-family.md
  06-02-prefix-sum.md
  06-03-difference-array.md
  06-04-fenwick-tree.md
  06-05-segment-tree-basics.md
  06-06-lazy-propagation.md
  06-07-range-wrong-approaches.md
  06-08-range-recognition-drills.md

  # Chapter 7: Search Space Reduction
  07-01-search-space-family.md
  07-02-binary-search-on-answer.md
  07-03-meet-in-the-middle.md
  07-04-branch-and-bound.md
  07-05-pruning-and-bitmask.md
  07-06-search-wrong-approaches.md
  07-07-search-recognition-drills.md

  # Chapter 8: Cross-references
  08-01-repeated-state-see-dp.md           ← 1-page pointer to Module 06
  08-02-connectivity-see-graphs.md         ← 1-page pointer to Module 05

  # Chapter 9: Patterns Nobody Named (THE SIGNATURE)
  09-01-why-unnamed-patterns-matter.md
  09-02-maintain-the-frontier.md
  09-03-frontier-in-bfs-dijkstra.md
  09-04-frontier-in-greedy-beam.md
  09-05-frontier-worked-problems.md
  09-06-dominated-candidate-elimination.md
  09-07-monotonic-stack-as-elimination.md
  09-08-convex-hull-trick-as-elimination.md
  09-09-pareto-pruning-skyline.md
  09-10-elimination-worked-problems.md
  09-11-boundary-finding.md
  09-12-binary-search-as-boundary.md
  09-13-feasibility-and-capacity.md
  09-14-boundary-worked-problems.md
  09-15-precompute-pattern.md
  09-16-prefix-sum-as-precompute.md
  09-17-sparse-table-as-precompute.md
  09-18-precompute-worked-problems.md
  09-19-seeing-unnamed-patterns.md
  09-20-recognition-drills-unnamed.md
```

### Per-technique page template

Every technique page follows this structure:

1. **What it is** — one-line definition
2. **When to reach for it** — the signal in the problem statement
3. **Why it works** — the structural reason (not "because it's a known pattern")
4. **Diagram** — the mechanism visualised
5. **Template** — reusable TypeScript code
6. **Canonical problem** — the simplest problem that needs this technique
7. **Variation** — a twist that tests deeper understanding
8. **The wrong approach** — what most people try first and why it fails
9. **Interview block** — what to say on the whiteboard

### Key insights for unnamed patterns

**Frontier Maintenance:** Different-looking problems all become: known states → current frontier → expand → discard dominated → continue. Appears in BFS, Dijkstra, A*, state-space search, best-first search, some greedy algorithms, beam-like pruning.

**Dominated Candidate Elimination:** A candidate can never become optimal again → prove dominated → throw away permanently. Connects monotonic stack, convex hull trick, Pareto pruning, skyline problems, some DP optimizations, greedy elimination.

**Boundary Finding:** Many problems reduce to finding the boundary in a sorted boolean sequence: `FFFFFFTTTTTT`. The answer is at the boundary. Includes binary search, binary search on answer, first/last occurrence, threshold problems, feasibility, capacity, scheduling limits.

**Precompute for Cheap Queries:** Expensive repeated query → precompute/maintain → cheap query. Unifies prefix sum, hashing, sparse table, Fenwick tree, segment tree, suffix arrays, preprocessing.

---

## Module 03 — Data Structures (~40 pages) 🟢🟡🔴

**Thesis:** A data structure is a contract: give me your data in this shape, and I guarantee these operations will be fast. Choose the contract that matches the problem's bottleneck.

Organised by **what problem they solve**, not by name.

### Pages

```
pages/
  00-cover.md

  # Chapter 1: Linear
  01-01-array-the-foundation.md
  01-02-dynamic-array.md
  01-03-linked-list-when-it-matters.md
  01-04-stack.md
  01-05-queue-and-deque.md
  01-06-monotonic-stack-deep-dive.md
  01-07-monotonic-queue-deep-dive.md

  # Chapter 2: Hash-based
  02-01-hashmap-hashset.md
  02-02-frequency-map.md
  02-03-counting-structures.md
  02-04-custom-hashing.md

  # Chapter 3: Trees
  03-01-binary-tree-traversals.md
  03-02-bst-operations.md
  03-03-heap-priority-queue.md
  03-04-trie.md
  03-05-fenwick-tree.md
  03-06-segment-tree.md
  03-07-sparse-table.md
  03-08-binary-lifting.md                  🟡

  # Chapter 4: Graph structures
  04-01-adjacency-list-vs-matrix.md
  04-02-weighted-and-directed.md
  04-03-dsu-union-find.md

  # Chapter 5: Advanced
  05-01-ordered-set-ordered-map.md         🟡
  05-02-treap.md                            🔴
  05-03-persistent-segment-tree.md          🔴
  05-04-merge-sort-tree.md                  🔴

  # Chapter 6: Choosing the right structure
  06-01-the-decision-table.md
  06-02-wrong-structure-library.md
  06-03-recognition-drills-ds.md
```

---

## Module 04 — Algorithms (~35 pages) 🟢🟡

**Thesis:** An algorithm is a strategy for a specific class of problems. Choosing the right one starts with understanding what each one actually does — and when it fails.

### Pages

```
pages/
  00-cover.md

  # Chapter 1: Searching
  01-01-linear-search.md
  01-02-binary-search-mechanics.md
  01-03-binary-search-templates.md
  01-04-lower-bound-upper-bound.md
  01-05-binary-search-on-answer.md
  01-06-ternary-search.md                   🟡
  01-07-exponential-search.md               🟡
  01-08-searching-wrong-approaches.md

  # Chapter 2: Sorting
  02-01-merge-sort.md
  02-02-quick-sort-and-partition.md
  02-03-heap-sort.md
  02-04-counting-radix-bucket.md
  02-05-custom-comparators.md
  02-06-partial-sorting-quickselect.md
  02-07-sorting-wrong-approaches.md

  # Chapter 3: Greedy
  03-01-greedy-detection.md
  03-02-exchange-argument.md
  03-03-stays-ahead-argument.md
  03-04-interval-scheduling.md
  03-05-activity-selection-resource.md
  03-06-matroid-footnote.md                 ← single page, footnote-level depth
  03-07-greedy-wrong-approaches.md
  03-08-greedy-recognition-drills.md
```

### Matroid page (03-06)

**Reduced to a single page.** One paragraph explaining what a matroid is (a structure where the greedy algorithm is guaranteed to find the optimal solution), one paragraph on why it matters (it explains *why* Kruskal's algorithm works), and a footnote pointing to Korte & Vygen for readers who want the full theory. No proofs. No formal definitions. Just the intuition.

---

## Module 05 — Graphs (~45 pages) 🟢🟡🔴

**Thesis:** Half of hard interview problems are graph problems in disguise. The skill is not running Dijkstra — it's recognising that the problem IS a graph.

### Pages

```
pages/
  00-cover.md

  # Chapter 1: Representation & Recognition
  01-01-what-makes-a-graph.md
  01-02-adjacency-list-implementation.md
  01-03-graph-recognition.md
  01-04-implicit-graphs.md
  01-05-state-space-graphs.md

  # Chapter 2: Traversal
  02-01-dfs-mechanics.md
  02-02-dfs-applications.md
  02-03-bfs-mechanics.md
  02-04-multi-source-bfs.md
  02-05-bidirectional-bfs.md                🟡
  02-06-0-1-bfs.md                          🟡

  # Chapter 3: Shortest Paths
  03-01-dijkstra.md
  03-02-dijkstra-implementation.md
  03-03-bellman-ford.md
  03-04-floyd-warshall.md                   🟡
  03-05-shortest-path-variants.md

  # Chapter 4: MST
  04-01-kruskal.md
  04-02-prim.md

  # Chapter 5: Connectivity
  05-01-cycle-detection.md
  05-02-bipartite-graphs.md
  05-03-bridges-and-articulation-points.md  🟡
  05-04-scc-kosaraju.md                     🟡
  05-05-scc-tarjan.md                       🔴
  05-06-eulerian-path-circuit.md            🔴

  # Chapter 6: Topological Order
  06-01-kahn-bfs-topo.md
  06-02-dfs-topo.md
  06-03-dag-dp.md

  # Chapter 7: Graph Problem Solving
  07-01-converting-problems-to-graphs.md
  07-02-graph-wrong-approaches.md
  07-03-graph-recognition-drills.md
```

### Key content: Graph recognition (01-03)

The most important page in this module. Teach readers to convert:

- "states" → nodes
- "rooms" / "cities" → nodes
- "transformations" → edges
- "words differing by one letter" → edges
- "configurations" → state-space nodes
- "dependencies" → directed edges

Into a graph even when no graph is explicitly given in the problem.

---

## Module 06 — Dynamic Programming (~55 pages) 🟢🟡🔴

**Thesis:** DP is not a technique — it's a framework for problems with overlapping subproblems. The hard part is not coding the recurrence. It's inventing the state.

> "What information about the past is necessary to make the future independent of everything else?"
> That question is the entire skill of DP.

### Pages

```
pages/
  00-cover.md

  # Chapter 1: The Framework
  01-01-what-dp-actually-is.md
  01-02-the-dp-framework.md
  01-03-how-to-invent-a-state.md
  01-04-memoisation-vs-tabulation.md
  01-05-evaluation-order.md

  # Chapter 2: Classical DP
  02-01-1d-dp.md
  02-02-1d-dp-worked-problems.md
  02-03-2d-dp.md
  02-04-2d-dp-worked-problems.md
  02-05-grid-dp.md
  02-06-grid-dp-worked-problems.md

  # Chapter 3: Subsequence & Knapsack
  03-01-subsequence-dp.md
  03-02-lis-lds-lcs.md
  03-03-knapsack-01.md
  03-04-knapsack-unbounded.md
  03-05-partition-dp.md
  03-06-knapsack-wrong-approaches.md

  # Chapter 4: Structural DP
  04-01-interval-dp.md                      🟡
  04-02-interval-dp-worked-problems.md      🟡
  04-03-tree-dp.md                          🟡
  04-04-tree-dp-worked-problems.md          🟡
  04-05-dag-dp-revisited.md                 🟡

  # Chapter 5: State-space DP
  05-01-bitmask-dp.md                       🟡
  05-02-bitmask-dp-worked-problems.md       🟡
  05-03-digit-dp.md                         🔴
  05-04-probability-dp.md                   🔴
  05-05-game-dp-sprague-grundy.md           🔴

  # Chapter 6: DP Optimisation
  06-01-space-optimisation.md
  06-02-dp-with-monotonic-structures.md     🟡
  06-03-convex-hull-trick.md                🔴
  06-04-divide-and-conquer-dp.md            🔴

  # Chapter 7: DP Mastery
  07-01-dp-wrong-approaches.md
  07-02-dp-recognition-drills.md
  07-03-inventing-states-practice.md
```

### Key content: How to invent a state (01-03)

The deepest DP concept. Teach the reader to ask:

1. What decisions have I made so far?
2. What information from those decisions affects future choices?
3. Can I throw away anything? (the less state, the faster the DP)
4. Is this state sufficient? (can I compute the answer from here without knowing how I got here?)

Walk through 3-4 examples where the obvious state is wrong and the correct state requires insight.

---

## Module 07 — Problem Solving & Interviews (~50 pages) 🟢🟡

**Thesis:** The gap between knowing algorithms and passing interviews is filled by three skills: transforming problems into known shapes, avoiding implementation traps, and communicating your reasoning.

**This module merges problem transformation, wrong approach patterns, implementation craft, interview methodology, and company-style analysis.**

### Pages

```
pages/
  00-cover.md

  # Chapter 1: Problem Transformation
  01-01-what-is-transformation.md
  01-02-array-to-graph.md
  01-03-string-to-trie-automaton.md
  01-04-optimisation-to-decision.md
  01-05-recursive-to-dp.md
  01-06-dynamic-to-offline.md
  01-07-huge-range-to-compression.md
  01-08-connectivity-to-dsu.md
  01-09-subarray-to-prefix.md
  01-10-kth-to-heap-or-bisect.md
  01-11-transformation-worked-examples.md

  # Chapter 2: Implementation Craft
  02-01-integer-overflow.md
  02-02-off-by-one.md
  02-03-binary-search-boundaries.md
  02-04-wrong-comparator.md
  02-05-mutating-while-iterating.md
  02-06-shift-queue-trap.md
  02-07-stale-heap-entries.md
  02-08-visited-timing.md
  02-09-dp-initialisation.md
  02-10-debugging-and-stress-testing.md

  # Chapter 3: The Interview Method
  03-01-the-coding-round-flow.md
  03-02-understand-and-clarify.md
  03-03-constraints-to-algorithm.md
  03-04-brute-force-first.md
  03-05-optimise-and-prove.md
  03-06-implement-clean.md
  03-07-dry-run-and-edge-cases.md
  03-08-handling-follow-ups.md

  # Chapter 4: Company Styles
  04-01-google-style.md
  04-02-amazon-style.md
  04-03-microsoft-style.md
  04-04-apple-atlassian-startup-style.md

  # Chapter 5: The Master Reference
  05-01-constraint-to-algorithm-full-table.md
  05-02-master-pattern-matrix.md
  05-03-fastest-operation-table.md
  05-04-recognition-drills-final.md
```

### Company style descriptions

**Not** "Google asks question X." That ages immediately. Instead, the **type of reasoning** each company tends to test:

- **Google-style:** Expects you to derive the algorithm live, not recite. Heavy on graph modelling, DP state invention, and mathematical reasoning. Follow-ups push toward optimal. "Can you do it in O(n)?"
- **Amazon-style:** Practical, system-aware. Greedy approaches, data structure selection, scalability questions. "What if the data doesn't fit in memory?"
- **Microsoft-style:** Balanced. Clean implementations, good edge case handling. Less exotic algorithms, more solid fundamentals.
- **Atlassian/startup-style:** Clean, modular code. Readable implementations. Good naming. Tests understanding of trade-offs.

---

## Module 08 — Competitive Programming Track (~30 pages) 🔴

**Thesis:** Beyond interviews. For readers aiming at Codeforces, ICPC, or IOI.

### Pages

```
pages/
  00-cover.md

  # Chapter 1: Number Theory
  01-01-prime-sieve.md
  01-02-gcd-lcm.md
  01-03-modular-arithmetic.md
  01-04-fast-exponentiation.md
  01-05-modular-inverse.md

  # Chapter 2: Combinatorics
  02-01-ncr-modular.md
  02-02-chinese-remainder-theorem.md
  02-03-matrix-exponentiation.md

  # Chapter 3: String Algorithms
  03-01-kmp.md
  03-02-z-algorithm.md
  03-03-rolling-hash.md
  03-04-suffix-structures.md

  # Chapter 4: Geometry
  04-01-orientation.md
  04-02-convex-hull.md
  04-03-line-intersection.md

  # Chapter 5: Advanced Techniques
  05-01-coordinate-compression-deep.md
  05-02-sweep-line-deep.md
  05-03-offline-queries-mos-algorithm.md
  05-04-dsu-on-tree.md
  05-05-centroid-decomposition.md
  05-06-heavy-light-decomposition.md
  05-07-persistent-structures.md
  05-08-fft-ntt-concepts.md
```

---

## Frontmatter

### `frontmatter/01-preface.md`

Personal preface by Kaleem Ahmed. Same voice as the TypeScript-to-Deployment preface — first person, reflective, honest, no marketing language. Should cover:

- Why this book exists — what's missing from the existing DSA guides
- The "derive, don't memorise" philosophy and where it came from
- Who this book is for and who it is not for
- How to read it (track markers, difficulty levels, the multi-volume structure)
- Acknowledgement that some of it will be wrong, and an invitation to correct it

**This page must be written by the author (you) or heavily directed by you.** It's your personal voice, not the book's technical voice.

---

## Backmatter

### `backmatter/00-00-how-to-use-this-reference.md`

Brief guide to the reference tables that follow — constraint table, pattern matrix, operation table.

### `backmatter/01-XX-glossary-*.md`

Every term introduced in the series. One line each, never circular. Alphabetical, split across pages to fit one-page-per-file rule. Terms are logged here as each module is written.

### `backmatter/02-01-constraint-table.md`

The full decision table from Module 01, expanded with every pattern from the entire book. The ultimate revision tool.

| Constraint / structure | Candidate approaches |
|---|---|
| n ≤ 20 | Bitmask / brute force / MITM |
| n ≤ 40 | Meet-in-middle |
| n ≤ 500 | O(n²), sometimes O(n³) |
| ... | ... |

### `backmatter/02-02-master-pattern-matrix.md`

Two views:

**By need:**
```
Need contiguous → Sliding Window, Prefix Sum, Difference Array, Deque
Need ordering → Sorting, Greedy, Binary Search, Sweep Line
Need connectivity → DSU, BFS/DFS, MST
```

**By operation:**
```
Fastest lookup → HashMap / Set
Fastest min/max → Heap / Deque
Fastest range sum → Prefix / Fenwick
...
```

### `backmatter/02-03-fastest-operation-table.md`

Quick-reference table: "I need the fastest X → use Y."

### `backmatter/03-01-final-note.md`

**Author's closing words — YOUR personal voice.** Same format as the TypeScript book's final note:

- Thank the reader for reaching the end
- What to do next (pick one module, re-read it, solve the drills)
- Where this will be wrong (algorithms don't change, but implementation details and problem landscapes do)
- Invitation for corrections: **kaleemahmed.in**
- Edition stamp: `<p class="verified">First edition, 2026 · © Kaleem Ahmed · kaleemahmed.in</p>`

### `backmatter/04-01-about-the-author.md`

Uses `shared/about-the-author.md` (same across all books).

### `backmatter/05-01-copyright.md`

Standard copyright page.

---

## Master volume

The build system produces individual booklets per module AND a combined master volume.

**Master volume structure:**
```
Cover (master)
Preface (frontmatter/01-preface.md)
Table of Contents (auto-generated)
Module 01 pages
Module 02 pages
Module 03 pages
Module 04 pages
Module 05 pages
Module 06 pages
Module 07 pages
Module 08 pages
Glossary (backmatter/01-XX)
Constraint Table (backmatter/02-01)
Master Pattern Matrix (backmatter/02-02)
Fastest Operation Table (backmatter/02-03)
Final Note (backmatter/03-01)
About the Author (backmatter/04-01)
Copyright (backmatter/05-01)
```

Configured via `"masterVolume": { "name": "dsa-complete" }` in `meta.json`.

---

## Execution order

1. **Create meta.json files** — series-level + one per module
2. **Create directory structure** — all 8 module dirs + frontmatter + backmatter
3. **Write Module 01 (Foundations)** — establishes voice, thesis, derivation methodology
4. **Write Module 02 (Pattern Recognition)** — the core taxonomy + unnamed patterns, proves the format
5. **Write Module 06 (DP)** — the "book within the book," most complex
6. **Write Module 05 (Graphs)** — second most complex
7. **Write remaining modules** in order: 03, 04, 07, 08
8. **Write backmatter** — glossary, constraint table, master matrix, fastest operation table
9. **Write frontmatter** — preface (needs author direction)
10. **Write final note** — author's closing page (needs author's personal words)
11. **Verification passes** on all modules
12. **Build individual booklets** — `node tools/build.mjs 01-foundations`, etc.
13. **Build master volume** — `node tools/build.mjs DSA`

---

## Page count estimates

| Module | Pages | Markers |
|---|---|---|
| Frontmatter | ~3 | — |
| 01 Foundations | ~25 | 🟢 |
| 02 Pattern Recognition (named + unnamed) | ~70 | 🟢🟡 |
| 03 Data Structures | ~40 | 🟢🟡🔴 |
| 04 Algorithms | ~35 | 🟢🟡 |
| 05 Graphs | ~45 | 🟢🟡🔴 |
| 06 Dynamic Programming | ~55 | 🟢🟡🔴 |
| 07 Problem Solving & Interviews | ~50 | 🟢🟡 |
| 08 Competitive Track | ~30 | 🔴 |
| Backmatter | ~15 | — |
| **Total** | **~368** | |

---

## Notes for future agents

1. **Read this file first.** It is the source of truth for what to write and how.
2. **Read CLAUDE.md** at the repo root. It has the verification rules and the one-page-per-file rule.
3. **Read 3-4 pages from the system-design or typescript-to-deployment books** before writing your first page. Match the density, the voice, the diagram style.
4. **Research before drafting.** Never write from memory. Primary sources only.
5. **Every worked problem must follow the derivation path:** brute force → why slow → what's repeated → insight → optimised.
6. **Every pattern must include a wrong approach.** This is non-negotiable.
7. **Recognition drills at the end of every major section.** Real problem sketches, not toy examples.
8. **Log every term in the glossary** as you write each module. Do not leave it for later.
9. **Test every code template.** TypeScript, compiled and run.
10. **The preface and final note need the author's personal voice.** Do not write them without direction from the author. Everything else is the book's technical voice.
