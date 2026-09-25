## Sparse Table

- **What it is:** A 2D array that precomputes the minimum or maximum of every interval whose length is a power of 2
- **When to reach for it:** "Find the max in range `[L, R]` on an array that NEVER changes" (Range Minimum Query - RMQ)
- **Why it works:** Any interval of length L can be completely covered by exactly two overlapping intervals of length 2^k, where 2^k ≤ L. Because max(A cup B) = max(max(A), max(B)), the overlap doesn't matter

### The visual mechanism

- Query: Max of `[2, 7]` (length 6)
- The largest power of 2 that fits in 6 is 4 (2²)
- The range `[2, 7]` is covered by taking the max of `[2, 5]` (length 4 starting at 2) and `[4, 7]` (length 4 ending at 7)
- Notice they overlap at `[4, 5]`. For minimum or maximum, overlapping is harmless

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Sparse Table query mechanism. The range [2, 7] is covered by taking the max of [2, 5] and [4, 7], which overlap but safely cover the entire target range in O(1)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>

  <!-- Array Indices -->
  <text x="35" y="15" class="sm">0</text><text x="75" y="15" class="sm">1</text>
  <text x="115" y="15" class="sm">2</text><text x="155" y="15" class="sm">3</text>
  <text x="195" y="15" class="sm">4</text><text x="235" y="15" class="sm">5</text>
  <text x="275" y="15" class="sm">6</text><text x="315" y="15" class="sm">7</text>
  <text x="355" y="15" class="sm">8</text>

  <!-- Query Range -->
  <rect class="bx" x="100" y="25" width="240" height="20" rx="2" stroke-dasharray="2 2" />
  <text x="220" y="39" class="lb" text-anchor="middle">Target Query Range [2, 7]</text>

  <!-- Covering Intervals -->
  <rect class="hi" x="100" y="55" width="160" height="20" rx="2" />
  <text x="180" y="69" class="lb" text-anchor="middle">Precomputed [2, 5]</text>
  <text x="50" y="69" class="sm">Length 4</text>

  <rect class="hi" x="180" y="85" width="160" height="20" rx="2" />
  <text x="260" y="99" class="lb" text-anchor="middle">Precomputed [4, 7]</text>
  <text x="360" y="99" class="sm">Length 4</text>
</svg>
:::

### The Complexity

- **Build time:** O(n log n). There are log n rows, and we compute each row of length n by combining two elements from the previous row
- **Query time:** O(1). It's just two array lookups and a `Math.max()`
- **Space:** O(n log n) to store the table

### The trap

- **Using a Sparse Table for range sums.** Sparse tables rely on the property that overlapping coverage doesn't affect the answer. max(a, a) = a. But sum(a, a) = 2a. If you overlap sum ranges, you double-count the intersection. For static range sums, use a simple Prefix Sum array (O(n) build, O(1) query)

:::interview
"We need to query the maximum value between any two indices in a massive static log file, millions of times."

Since the data is static, we should build a Sparse Table. It takes O(N log N) to build, but every query is answered in O(1) time, which is optimal for a heavily query-bound system.
:::
