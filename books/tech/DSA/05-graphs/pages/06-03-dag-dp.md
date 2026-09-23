## Dynamic Programming on DAGs 🟡

- We usually think of Dynamic Programming as operating on an array (e.g., `dp[i] = max(dp[i-1], dp[i-2])`) or a grid.
- However, you can run DP directly on a Graph, **as long as the graph is a Directed Acyclic Graph (DAG)**.

### The Connection between DAGs and DP

- If a graph has cycles, DP is impossible because states depend on each other infinitely (A depends on B, B depends on A).
- Because a DAG has no cycles, it has a strict **Topological Order**.
- This topological order is the exact equivalent of the `for (let i = 0; i < n; i++)` loop in a standard 1D array DP. It guarantees that when we process node `U`, all nodes that point to `U` (its prerequisites) have already been fully calculated.

### Example: Longest Path in a DAG

- Finding the shortest path in a DAG is easy. Finding the *longest* path in a general graph is NP-Hard (equivalent to the Hamiltonian Path problem).
- But finding the longest path in a DAG can be done in linear O(V + E) time using DAG DP.

**The DP State:** `dp[u]` = length of the longest path ending at node `u`.

```ts
function longestPathDAG(n: number, edges: number[][]): number {
  // 1. Get the topological order using Kahn's or DFS
  const topoOrder = kahnsBFS(n, edges);
  
  // 2. Initialize DP array
  const dp = new Array(n).fill(0);
  
  // 3. Process nodes strictly in Topological Order
  // (In this case, Kahn's guarantees that when we evaluate u,
  // we can safely push its value forward to v)
  const adj = buildAdj(n, edges);
  
  for (const u of topoOrder) {
    for (const v of adj[u]) {
      // The longest path ending at V is either its current known best,
      // or the longest path ending at U, plus the edge U -> V
      dp[v] = Math.max(dp[v], dp[u] + 1);
    }
  }
  
  return Math.max(...dp);
}
```

### The trap

- **Forgetting the topological sort:** You cannot just loop `for (let i = 0; i < n; i++)` on a graph. If you evaluate node `5` before node `2`, but node `2` points to node `5`, the calculation for node `5` will be based on incomplete data. 
- **The fix:** You must always process nodes in topological order. Alternatively, you can use **Memoized DFS**. In Memoized DFS, you just write a recursive function `dfs(u)` and cache the result in `memo[u]`. The recursive call stack organically forces the program to evaluate the topological order correctly!
