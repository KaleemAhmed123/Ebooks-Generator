# Chapter 18 - Patterns Nobody Named

## Four Questions for an Unfamiliar Problem <span class="lv lv2"></span>

- **What it is:** Four structures sit underneath most of the named techniques in this book. They have no LeetCode tag, so nobody drills them, yet each one is a question you can ask of a problem you have never seen
- **Signal:** you have read the statement twice, no chapter title fits, and the brute force is clear but too slow
- **Why it works:** A named technique is one *answer* to a structural question. Ask the question and the answer follows, including answers no tag lists: BFS, Dijkstra and "Swim in Rising Water" are one frontier; a monotonic stack and Car Fleet are one domination argument

:::mint
<svg viewBox="0 0 470 196" role="img" aria-label="Four question cards. One: am I expanding from what I know into what I do not? Maintain the frontier, page 18-02: queue, heap or stack. Two: are some candidates never going to win? Throw out the dominated, page 18-06: monotonic stack, deque, Pareto front. Three: can I check a guess more easily than compute the answer? Find the boundary, pages 09-01 and 09-02: binary search on the answer. Four: am I asking the same kind of question many times? Precompute, pages 03-02 and 19-01: prefix array, sparse table, Fenwick tree." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .q { font: bold 9.5px Georgia, serif; fill: #1a1a1a; }
    .n { font: bold 16px Georgia, serif; fill: #1d4e89; }
    .p { font: bold 9px Consolas, monospace; fill: #2d6a4f; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .c2 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .c3 { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .c4 { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>
  <rect class="c1" x="6" y="6" width="226" height="88" rx="6"/>
  <text x="18" y="30" class="n">1</text><text x="36" y="24" class="q">Am I expanding from what I know</text><text x="36" y="37" class="q">into what I don't?</text>
  <text x="36" y="58" class="p">→ Maintain the frontier · 18-02</text>
  <text x="36" y="74" class="sm">queue = BFS · heap = Dijkstra / minimax</text><text x="36" y="86" class="sm">stack = DFS</text>
  <rect class="c2" x="238" y="6" width="226" height="88" rx="6"/>
  <text x="250" y="30" class="n">2</text><text x="268" y="24" class="q">Can some candidates never win,</text><text x="268" y="37" class="q">now or later?</text>
  <text x="268" y="58" class="p">→ Throw out the dominated · 18-06</text>
  <text x="268" y="74" class="sm">monotonic stack / deque · Pareto front</text><text x="268" y="86" class="sm">car fleet · patience tails</text>
  <rect class="c3" x="6" y="100" width="226" height="88" rx="6"/>
  <text x="18" y="124" class="n">3</text><text x="36" y="118" class="q">Is checking a guess easier than</text><text x="36" y="131" class="q">computing the answer?</text>
  <text x="36" y="152" class="p">→ Find the boundary · 09-01, 09-02</text>
  <text x="36" y="168" class="sm">answers look like F F F T T T</text><text x="36" y="180" class="sm">min of max, max of min</text>
  <rect class="c4" x="238" y="100" width="226" height="88" rx="6"/>
  <text x="250" y="124" class="n">4</text><text x="268" y="118" class="q">Am I asking the same kind of</text><text x="268" y="131" class="q">question many times?</text>
  <text x="268" y="152" class="p">→ Precompute · 03-02, 19-01</text>
  <text x="268" y="168" class="sm">undoable: prefix array · overlap-safe:</text><text x="268" y="180" class="sm">sparse table · with updates: trees</text>
</svg>
:::

### Combining them

- Hard problems stack two answers. "Shortest path when you may skip up to K edges" is a frontier (question 1) over an enlarged state `(node, skipsUsed)`. "Minimum largest segment sum" is a boundary (question 3) whose check is a greedy scan
- Ask all four before reaching for a named technique; the drills (18-20) practise exactly that

### The failure

- **Matching on words instead of structure.** "Maximum" does not mean heap and "subarray" does not mean sliding window. Car Fleet mentions neither a stack nor a front, yet it is question 2 from the first line
