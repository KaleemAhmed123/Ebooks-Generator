## Segment Tree Basics

- When you need to query ranges AND update points on dynamic data, and the operation is **not invertible** (like minimum or maximum), Fenwick Tree fails. You need a Segment Tree
- A Segment Tree provides **O(log N) point updates** and **O(log N) range queries** for *any* associative operation

### The Mechanism: Divide and Conquer

- A Segment Tree is a binary tree where:
  - The **leaves** represent the individual elements of the array
  - Every **internal node** represents the combined result (sum, min, max, etc.) of its two children
  - The **root** represents the result for the entire array
- The height of the tree is O(log N), meaning any point update only needs to update O(log N) ancestors to reach the root

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Segment Tree structure for Range Minimum. Leaves hold array values, parents hold the minimum of their children." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .node { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.2; }
    .edge { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .leaf { fill: #e5e7eb; }
  </style>

  <!-- Array: [5, 2, 7, 3] -->
  
  <!-- Root [0..3] -->
  <circle cx="235" cy="20" r="14" class="node" />
  <text x="235" y="23" class="lb" text-anchor="middle">2</text>
  <text x="260" y="23" class="sm">[0..3]</text>

  <!-- Level 1 -->
  <circle cx="150" cy="65" r="14" class="node" />
  <text x="150" y="68" class="lb" text-anchor="middle">2</text>
  <text x="120" y="68" class="sm">[0..1]</text>

  <circle cx="320" cy="65" r="14" class="node" />
  <text x="320" y="68" class="lb" text-anchor="middle">3</text>
  <text x="345" y="68" class="sm">[2..3]</text>

  <!-- Edges to Level 1 -->
  <path class="edge" d="M 225 30 L 160 55" />
  <path class="edge" d="M 245 30 L 310 55" />

  <!-- Level 2 (Leaves) -->
  <circle cx="110" cy="115" r="12" class="node leaf" /> <text x="110" y="118" class="lb" text-anchor="middle">5</text>
  <circle cx="190" cy="115" r="12" class="node leaf" /> <text x="190" y="118" class="lb" text-anchor="middle">2</text>
  <circle cx="280" cy="115" r="12" class="node leaf" /> <text x="280" y="118" class="lb" text-anchor="middle">7</text>
  <circle cx="360" cy="115" r="12" class="node leaf" /> <text x="360" y="118" class="lb" text-anchor="middle">3</text>

  <!-- Edges to Level 2 -->
  <path class="edge" d="M 141 75 L 119 105" />
  <path class="edge" d="M 159 75 L 181 105" />
  <path class="edge" d="M 311 75 L 289 105" />
  <path class="edge" d="M 329 75 L 351 105" />
</svg>
:::

### The Array Representation

- We do not build actual Node objects with `left` and `right` pointers. We use a flat array, exactly like a Binary Heap
- If a node is at index `v`:
  - Left child is at `2 * v`
  - Right child is at `2 * v + 1`
- The tree array needs to be size `4 * N` to safely contain all nodes

### The Query Logic

- When querying a range `[L, R]`, you start at the root (which represents `[0, N-1]`)
- **Case 1: Total Overlap.** The node's range is completely inside `[L, R]`. Return the node's value immediately. Do not traverse further down
- **Case 2: No Overlap.** The node's range is completely outside `[L, R]`. Return a neutral value (e.g. `Infinity` for minimum, `0` for sum)
- **Case 3: Partial Overlap.** The node intersects `[L, R]`. Recursively query the left and right children and combine their results

### The power of associativity

- Segment Trees work because we can safely break `[L, R]` into smaller disjoint pieces, query them independently, and merge the results
- This requires the operation to be **associative**: `(A + B) + C = A + (B + C)`
- It does not require invertibility. It does not require idempotence. This makes Segment Trees the most flexible range querying structure

:::interview
"What is the memory complexity of a Segment Tree?" — It requires O(N) memory, specifically a flat array of size 4N. A perfect binary tree with N leaves has 2N-1 total nodes, but because N is rarely a perfect power of 2, the bottom level might not be completely full. The 4N sizing safely guarantees we won't get out-of-bounds errors regardless of the shape of the array.
:::
