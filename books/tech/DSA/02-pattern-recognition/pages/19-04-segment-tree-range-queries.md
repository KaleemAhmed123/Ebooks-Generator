## Segment Tree for Range Queries 🔴

- **What it is:** A binary tree where each node represents an interval of the array, and stores the extremum (or sum) of that interval
- **When to reach for it:** "Find the max in range `[L, R]`... and also update `arr[i] = x`"
- **Why it works:** Precomputing the max for every possible range takes O(n²) space and time. A segment tree precomputes only O(n) specific ranges (power-of-two chunks). Any arbitrary range `[L, R]` can be constructed by combining at most O(log n) of these precomputed chunks

### The visual mechanism

- Array: `[2, 5, 1, 4]`

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="A segment tree showing range maximums. The root covers the whole array (max 5). Left child covers first half (max 5), right covers second half (max 4)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <!-- Level 0 (Root) -->
  <rect class="hi" x="200" y="10" width="70" height="20" rx="3" />
  <text x="235" y="24" class="lb" text-anchor="middle">Max: 5</text>
  <text x="235" y="40" class="sm" text-anchor="middle">Range [0, 3]</text>

  <!-- Level 1 -->
  <rect class="bx" x="110" y="55" width="60" height="20" rx="3" />
  <text x="140" y="69" class="lb" text-anchor="middle">Max: 5</text>
  <text x="140" y="85" class="sm" text-anchor="middle">[0, 1]</text>

  <rect class="bx" x="300" y="55" width="60" height="20" rx="3" />
  <text x="330" y="69" class="lb" text-anchor="middle">Max: 4</text>
  <text x="330" y="85" class="sm" text-anchor="middle">[2, 3]</text>

  <!-- Level 2 (Leaves) -->
  <rect class="bx" x="75" y="95" width="30" height="20" rx="2" />
  <text x="90" y="109" class="lb" text-anchor="middle">2</text>
  
  <rect class="bx" x="145" y="95" width="30" height="20" rx="2" />
  <text x="160" y="109" class="lb" text-anchor="middle">5</text>

  <rect class="bx" x="265" y="95" width="30" height="20" rx="2" />
  <text x="280" y="109" class="lb" text-anchor="middle">1</text>

  <rect class="bx" x="335" y="95" width="30" height="20" rx="2" />
  <text x="350" y="109" class="lb" text-anchor="middle">4</text>

  <!-- Edges -->
  <path class="a" d="M 235 30 L 140 55" />
  <path class="a" d="M 235 30 L 330 55" />
  <path class="a" d="M 140 75 L 90 95" />
  <path class="a" d="M 140 75 L 160 95" />
  <path class="a" d="M 330 75 L 280 95" />
  <path class="a" d="M 330 75 L 350 95" />
</svg>
:::

### The constraint fingerprint

- You have an array of size n ≤ 10⁵.
- You have Q ≤ 10⁵ queries.
- **The catch:** The queries are a mix of "find the max in range `[L, R]`" and "update `arr[i] = X`".
- If there were no updates, you could use a Sparse Table (O(1) query, O(n log n) build).
- If it were sums instead of max, you could use a Fenwick tree or Prefix sum (if no updates).
- The presence of *updates* combined with *range max/min* is the absolute, irrefutable fingerprint of a Segment Tree. It does both in O(log n) time.

### The trap

- **Implementing it for static data.** Segment trees are heavy to code and have a large constant factor. If the array never changes (no updates), a Sparse Table is fundamentally better for min/max queries because it answers them in O(1) time. A segment tree on static data is over-engineering
