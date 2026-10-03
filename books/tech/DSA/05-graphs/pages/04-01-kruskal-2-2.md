### Kruskal's Implementation

```ts
function kruskalMST(n: number, edges: number[][]): number {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const uf = new UnionFind(n);
  let mstCost = 0;
  let edgesAdded = 0;

  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mstCost += weight;
      edgesAdded++;
      if (edgesAdded === n - 1) break; // Optimization: We are done
    }
  }

  // If we couldn't add n-1 edges, the graph is disconnected
  return edgesAdded === n - 1 ? mstCost : -1;
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) (LeetCode 1584) | Sort all point-pair edges by Manhattan distance, union greedily |
| [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684) | Union-Find detects the edge that closes a cycle |
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) (LeetCode 721) | Union-Find to merge overlapping email sets |

- **Time Complexity:** O(E log E) heavily dominated by sorting the edges. The Union-Find operations take O(E alpha(V)) which is virtually linear.
