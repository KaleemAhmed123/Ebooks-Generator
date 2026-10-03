## Weighted and Directed Graphs <span class="lv lv1"></span>

- **What it is:** Adding metadata (weights/costs) and directionality (one-way streets) to edges
- **The Contract:** Requires modifying the Adjacency List to store objects or tuples instead of just node IDs
- **Why it matters:** Standard BFS can only find the shortest path in an *unweighted* graph. If edges have different weights, the data structure must change so we can feed it into Dijkstra's Algorithm

### Weighted Adjacency List

When an edge `[u, v]` has a weight `w`, the Adjacency List must store both the destination node and the cost to get there.

```ts
// edges: [u, v, weight]
function buildWeightedGraph(n: number, edges: number[][]): { to: number; weight: number }[][] {
  const adj: { to: number; weight: number }[][] = Array.from({ length: n }, () => []);
  
  for (const [u, v, w] of edges) {
    adj[u].push({ to: v, weight: w });
    adj[v].push({ to: u, weight: w }); // Undirected
  }
  
  return adj;
}
```

When traversing this graph (e.g., using a Min-Heap for Dijkstra), you extract both the neighbor and the edge cost to calculate the total path cost.
