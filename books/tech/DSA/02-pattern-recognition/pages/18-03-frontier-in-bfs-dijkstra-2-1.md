### Dijkstra: Min-Heap frontier

- **Selection rule:** Smallest accumulated distance. The cheapest candidate is always processed next
- **Why min-heap works:** If edges have varying costs, arrival order no longer guarantees shortest path. You need the *cheapest* path to be processed first. A min-heap gives you that in O(log n) per extraction

```ts
function dijkstra(graph: [number, number][][], start: number): number[] {
  const dist = new Array(graph.length).fill(Infinity);
  // Min-heap of [distance, node]; Heap is on 15-04
  const frontier = new Heap<[number, number]>((x, y) => x[0] < y[0]);
  frontier.push([0, start]);
  dist[start] = 0;

  while (frontier.size() > 0) {
    const [d, node] = frontier.pop()!;  // smallest distance first
    if (d > dist[node]) continue;         // stale entry — skip

    for (const [next, weight] of graph[node]) {
      const newDist = dist[node] + weight;
      if (newDist < dist[next]) {
        dist[next] = newDist;
        frontier.push([newDist, next]);
      }
    }
  }
  return dist;
}
```
