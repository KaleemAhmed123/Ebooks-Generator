## The Frontier in BFS and Dijkstra

- BFS and Dijkstra look different in textbooks but share identical structure. The only difference is how they select the next candidate from the frontier

### BFS: FIFO frontier

- **Selection rule:** First-in, first-out. The oldest candidate is always processed next
- **Why FIFO works:** If all edges cost 1, the first path to reach a node is the shortest. Earlier arrivals = shorter paths. FIFO preserves arrival order

```ts
function bfs(graph: number[][], start: number): number[] {
  const dist = new Array(graph.length).fill(-1);
  const frontier: number[] = [start];   // queue
  dist[start] = 0;

  let head = 0;
  while (head < frontier.length) {
    const node = frontier[head++];       // FIFO: take from front
    for (const next of graph[node]) {
      if (dist[next] === -1) {
        dist[next] = dist[node] + 1;
        frontier.push(next);             // add to back
      }
    }
  }
  return dist;
}
```

### Dijkstra: Min-Heap frontier

- **Selection rule:** Smallest accumulated distance. The cheapest candidate is always processed next
- **Why min-heap works:** If edges have varying costs, arrival order no longer guarantees shortest path. You need the *cheapest* path to be processed first. A min-heap gives you that in O(log n) per extraction

```ts
function dijkstra(graph: [number, number][][], start: number): number[] {
  const dist = new Array(graph.length).fill(Infinity);
  // Min-heap: [distance, node]
  const frontier: [number, number][] = [[0, start]];
  dist[start] = 0;

  while (frontier.length > 0) {
    const [d, node] = heapPop(frontier);  // smallest distance first
    if (d > dist[node]) continue;         // stale entry — skip

    for (const [next, weight] of graph[node]) {
      const newDist = dist[node] + weight;
      if (newDist < dist[next]) {
        dist[next] = newDist;
        heapPush(frontier, [newDist, next]);
      }
    }
  }
  return dist;
}
```

### The structural parallel

| BFS | Dijkstra |
|---|---|
| `frontier` is a queue | `frontier` is a min-heap |
| Pop from front | Pop the minimum |
| `dist[next] = dist[node] + 1` | `dist[next] = dist[node] + weight` |
| Skip if already visited | Skip if `d > dist[node]` (stale) |
| O(V + E) | O((V + E) log V) |

- **Same skeleton, different frontier.** The unnamed pattern is the skeleton. BFS and Dijkstra are two instantiations of it

### The trap

- **Using BFS on weighted graphs.** BFS finds the path with fewest edges, not the path with lowest cost. If edges have different weights, BFS will confidently return a wrong answer. The constraint fingerprint: "edges have varying costs" → you need a heap frontier (Dijkstra), not a FIFO frontier (BFS)
