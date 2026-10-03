## Binary Lifting <span class="lv lv2"></span>

- **What it is:** A technique to jump up a tree (or a directed graph) in powers of 2. It is the tree equivalent of a Sparse Table
- **The Contract:** O(N log N) precomputation to allow finding the K-th ancestor of any node, or the Lowest Common Ancestor (LCA) of two nodes, in O(log N) time
- **Why it works:** Every integer `K` can be represented as a sum of powers of 2 (binary representation). To jump up 13 steps, you don't climb node-by-node. You jump 8 steps, then 4 steps, then 1 step

### The Ancestor Table

Similar to a Sparse Table, we build a 2D array `up[node][j]` which stores the $(2^j)$-th ancestor of `node`.
- `up[node][0]` is the 1st ancestor (the direct parent).
- To find the $2^j$-th ancestor, we find the $2^{j-1}$-th ancestor, and then find *their* $2^{j-1}$-th ancestor.
- Transition: `up[node][j] = up[ up[node][j - 1] ][j - 1]`.

```ts
// DP table to precompute 2^j ancestors
let up: number[][]; // [n][maxJ]

function buildBinaryLifting(n: number, parent: number[]) {
  const maxJ = Math.floor(Math.log2(n)) + 1;
  up = Array.from({ length: n }, () => new Array(maxJ).fill(-1));

  // Base case: 2^0 = 1st ancestor (immediate parent)
  for (let i = 0; i < n; i++) {
    up[i][0] = parent[i];
  }

  // DP phase
  for (let j = 1; j < maxJ; j++) {
    for (let i = 0; i < n; i++) {
      if (up[i][j - 1] !== -1) {
        up[i][j] = up[ up[i][j - 1] ][j - 1];
      }
    }
  }
}
```
