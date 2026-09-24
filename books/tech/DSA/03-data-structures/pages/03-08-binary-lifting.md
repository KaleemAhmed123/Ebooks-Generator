## Binary Lifting

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

### Finding the K-th Ancestor in O(log N)

To jump up `K` steps, we look at the binary bits of `K`.
If `K = 13` (binary `1101`), the set bits are at indices 0, 2, and 3 (values 1, 4, 8).
We loop through the bits. If the $j$-th bit is set, we set `node = up[node][j]`.

```ts
function getKthAncestor(node: number, k: number): number {
  let curr = node;
  for (let j = 0; j < 20; j++) { // 2^20 > 10^6
    if ((k & (1 << j)) !== 0) {
      curr = up[curr][j];
      if (curr === -1) break;
    }
  }
  return curr;
}
```

### Lowest Common Ancestor (LCA)

Binary Lifting is the gold standard for answering multiple LCA queries on a static tree.
1. **Level them:** If `u` is deeper than `v`, use Binary Lifting to jump `u` up until they are at the exact same depth.
2. **Jump together:** If they aren't the same node, jump them both up simultaneously using the largest powers of 2 that *do not* cause them to meet.
3. Once you've checked down to $2^0$, they will be exactly one step below their LCA. The answer is `up[u][0]`.

:::interview
"Can we find LCA without Binary Lifting?"

Yes, for a single query, you can do a standard DFS which takes O(N). But if an interviewer asks you to answer $10^5$ LCA queries on a tree with $10^5$ nodes, O(N) per query will Time Limit Exceed. Binary Lifting reduces the query time to O(log N), completing all queries effortlessly.
:::
