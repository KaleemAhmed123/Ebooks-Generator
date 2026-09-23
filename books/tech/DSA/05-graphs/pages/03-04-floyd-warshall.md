## Floyd-Warshall 🟡

- Dijkstra and Bellman-Ford are **Single-Source Shortest Path (SSSP)** algorithms. They find the distance from one specific `start` node to all other nodes.
- What if you need to know the shortest path from *every* node to *every other* node?
- **The Solution:** Floyd-Warshall. It is an **All-Pairs Shortest Path (APSP)** algorithm.

### The Mechanics

- It uses Dynamic Programming.
- **The Insight:** The shortest path from `A` to `B` either goes directly from `A` to `B`, or it goes through some intermediate node `K`. 
- `dist[A][B] = Math.min(dist[A][B], dist[A][K] + dist[K][B])`
- By systematically testing every possible node `K` as an intermediate pit-stop for every pair of `A` and `B`, we build up the global shortest paths.

### Implementation

Unlike most graph algorithms, Floyd-Warshall requires an **Adjacency Matrix**, not a List.

```ts
function floydWarshall(n: number, edges: number[][]): number[][] {
  // Initialize matrix with Infinity
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  
  // Distance to self is 0
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  
  // Populate initial edges
  for (const [u, v, weight] of edges) {
    dist[u][v] = weight;
    // dist[v][u] = weight; // If undirected
  }

  // The DP loops: k must be the OUTER loop
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  return dist;
}
```

### Complexity

- **Time:** O(V³) due to the three nested loops.
- **Space:** O(V²) for the matrix.
- Because of the V³ time complexity, Floyd-Warshall is only viable for extremely small graphs (usually V ≤ 400).

### The trap

- **Loop Order:** The most common mistake is writing the loops as `for i`, `for j`, `for k`. The `k` loop (the intermediate node) **must** be the outermost loop. If it isn't, the DP state fails to build correctly because it hasn't established the base paths before trying to combine them.
