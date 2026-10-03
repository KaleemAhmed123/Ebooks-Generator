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
