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
