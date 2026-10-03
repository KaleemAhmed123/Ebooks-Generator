## Bellman-Ford <span class="lv lv2"></span>

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
