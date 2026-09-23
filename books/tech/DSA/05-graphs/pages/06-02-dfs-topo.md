## Topological Sort (DFS)

While Kahn's Algorithm (BFS) relies on In-Degrees, you can also perform a Topological Sort using a standard DFS by exploiting **Post-Order Traversal**.

### The Insight

- When a DFS finishes processing a node (i.e., all of its children and descendants have been fully explored and the recursive call is about to return), we are 100% certain that this node must come *before* its descendants in a dependency chain.
- Therefore, if we push nodes into an array right before they `return` from the DFS (post-order), the array will perfectly represent the **reverse** topological order.
- Reversing that array gives us the final valid Topological Sort.

### The Implementation

Notice how closely this mirrors Kosaraju's first pass for finding SCCs.

```ts
function dfsTopo(n: number, edges: number[][]): number[] {
  const adj = Array.from({ length: n }, () => [] as number[]);
  for (const [u, v] of edges) adj[u].push(v);

  const colors = new Array(n).fill(0); // 0: White, 1: Gray, 2: Black
  const order: number[] = [];

  // Returns true if cycle detected
  function dfs(u: number): boolean {
    colors[u] = 1; // Mark Gray (Visiting)
    
    for (const v of adj[u]) {
      if (colors[v] === 1) return true; // Cycle!
      if (colors[v] === 0) {
        if (dfs(v)) return true;
      }
    }
    
    colors[u] = 2; // Mark Black (Finished)
    order.push(u); // POST-ORDER PUSH
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (colors[i] === 0) {
      if (dfs(i)) return []; // Cycle detected
    }
  }

  return order.reverse();
}
```

### DFS vs Kahn's (BFS)

- **Which one to use?** In an interview, **Kahn's Algorithm is heavily preferred.** 
- Why? Kahn's handles cycle detection organically (if the output array length ≠ N, it's a cycle). DFS requires you to manually implement the 3-Color state system (`White`, `Gray`, `Black`) to detect cycles, otherwise the DFS will just infinite loop or return garbage data.
- However, the DFS post-order logic is the theoretical foundation of Kosaraju's SCC algorithm and DAG DP, so it is vital to understand.
