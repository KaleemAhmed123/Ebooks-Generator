## Bellman-Ford 

- **The Problem with Dijkstra:** If an edge has a negative weight (e.g., traversing a road actually gives you $5 of fuel), Dijkstra breaks. Its core assumption—that paths only get more expensive—is violated.
- **The Solution:** Bellman-Ford can handle negative edge weights.

### The Mechanics

- Instead of greedily picking the closest node using a Priority Queue, Bellman-Ford takes a sledgehammer approach.
- It iterates through **every single edge in the entire graph** and tries to relax it.
- It repeats this full-graph sweep V - 1 times.
- Why V - 1? Because the absolute longest possible shortest path in a graph with V nodes (without going in circles) has exactly V - 1 edges. By relaxing every edge V - 1 times, we guarantee that the shortest path has fully propagated from the start node to the furthest node.

### Implementation

```ts
function bellmanFord(n: number, edges: number[][], start: number): number[] {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  // Relax all edges V - 1 times
  for (let i = 0; i < n - 1; i++) {
    let relaxedAnything = false;

    for (const [u, v, weight] of edges) {
      if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        relaxedAnything = true;
      }
    }
    
    // Optimization: If a full sweep produced no changes, we're done early
    if (!relaxedAnything) break;
  }

  return dist;
}
```

### Negative Weight Cycles

- If a graph contains a cycle where the sum of the edges is negative (e.g., `A -> B -> C -> A` costs `-2`), there is no "shortest path". You can just loop the cycle infinitely to get a cost of -infty.
- Bellman-Ford is the standard tool to **detect** these cycles.
- **The Detection:** After running the V - 1 sweeps, run one more single sweep. If any edge *still* relaxes, it means the path is still getting cheaper. This mathematically proves the existence of a negative weight cycle.

### Complexity

- **Time:** O(V times E). This is much slower than Dijkstra's O(E log V). 
- You should *only* use Bellman-Ford if you suspect negative edges, or if the problem explicitly asks you to detect negative cycles (e.g., arbitrage in currency exchange rates).
