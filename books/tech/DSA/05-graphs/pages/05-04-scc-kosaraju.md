## Strongly Connected Components (Kosaraju) 🟡

- In an undirected graph, connected components are trivial to find (just run a DFS).
- In a **Directed Graph**, connectivity is much stricter. A **Strongly Connected Component (SCC)** is a maximal subgraph where *every* node can reach *every other* node in that subgraph. (If `A -> B`, then `B` must also have a path back to `A`).
- **Kosaraju's Algorithm** finds all SCCs in O(V + E) time using two passes of DFS.

### The Insight

1. If you run a DFS, nodes that finish their post-order processing last are structurally "upstream" (closer to the source). 
2. If you reverse the direction of every single edge in the graph, the SCCs themselves remain internally perfectly intact (because they form cycles), but the overarching directed pathways between different SCCs are reversed.
3. Therefore, if you process the nodes in decreasing order of their original finish times on the *reversed* graph, the DFS will get "trapped" perfectly inside one SCC at a time.

### Implementation

```ts
function kosaraju(n: number, edges: number[][]): number[][] {
  const adj = Array.from({ length: n }, () => [] as number[]);
  const revAdj = Array.from({ length: n }, () => [] as number[]);
  
  for (const [u, v] of edges) {
    adj[u].push(v);
    revAdj[v].push(u); // Build the reversed graph simultaneously
  }

  // Pass 1: Record post-order finish times
  const visited = new Set<number>();
  const order: number[] = [];
  
  function dfs1(u: number) {
    visited.add(u);
    for (const v of adj[u]) {
      if (!visited.has(v)) dfs1(v);
    }
    order.push(u); // Post-order push
  }
  
  for (let i = 0; i < n; i++) if (!visited.has(i)) dfs1(i);

  // Pass 2: Traverse reversed graph in decreasing finish time
  visited.clear();
  const sccs: number[][] = [];
  
  function dfs2(u: number, currentSCC: number[]) {
    visited.add(u);
    currentSCC.push(u);
    for (const v of revAdj[u]) {
      if (!visited.has(v)) dfs2(v, currentSCC);
    }
  }

  // Pop from the end of the order array (highest finish time first)
  while (order.length > 0) {
    const u = order.pop()!;
    if (!visited.has(u)) {
      const currentSCC: number[] = [];
      dfs2(u, currentSCC);
      sccs.push(currentSCC);
    }
  }

  return sccs;
}
```

### When to use Kosaraju

Kosaraju is incredibly easy to memorize because it's just a standard DFS written twice. If an interview requires SCCs (or compressing a cyclic directed graph into a DAG), Kosaraju is the most reliable tool to reach for.
