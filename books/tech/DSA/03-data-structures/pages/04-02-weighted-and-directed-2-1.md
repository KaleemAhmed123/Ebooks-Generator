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
