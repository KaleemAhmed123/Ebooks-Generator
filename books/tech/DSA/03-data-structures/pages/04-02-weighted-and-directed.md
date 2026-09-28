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

### Directed Graphs & Indegrees

In an undirected graph, an edge `A - B` means you can go from A to B, and B to A. 
In a directed graph, an edge `A -> B` means you can go from A to B, but **not** backward.

- **The Build Change:** You only write `adj[u].push(v)`. You do not write the reverse.
- **The Indegree Array:** The most important auxiliary data structure for directed graphs is the Indegree array. It counts how many edges point *into* a node.

```ts
function buildDirectedGraph(n: number, edges: number[][]) {
  const adj: number[][] = Array.from({ length: n }, () => []);
  const indegree: number[] = new Array(n).fill(0);
  
  for (const [u, v] of edges) {
    adj[u].push(v);
    indegree[v]++; // Node v has one more prerequisite
  }
  
  return { adj, indegree };
}
```

### Topological Sort (Kahn's Algorithm)

- The Indegree array is the engine behind **Dependency Resolution**.
- If `indegree[X] === 0`, it means node `X` has no prerequisites. You can process it immediately.
- Once you process `X`, you virtually "remove" it from the graph by decrementing the indegree of all its neighbors. If any neighbor's indegree hits 0, they are now free to be processed.
- This Queue-based algorithm (Kahn's) requires the Adjacency List (to know who to decrement) AND the Indegree Array (to know who is free).

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) | Directed graph + indegree array for topological sort |
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210) | Kahn's algorithm outputs the valid ordering |
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743) | Weighted directed graph fed into Dijkstra |
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | Weighted directed edges with constrained BFS |

:::interview
"Can a directed graph have cycles?"

Yes. If you run Kahn's algorithm on a graph with a cycle, the nodes in the cycle will never reach an indegree of 0. When the queue empties, the number of processed nodes will be less than the total nodes $N$. This is the standard, O(V+E) way to detect cycles in a directed graph.
:::
