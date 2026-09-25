## The Frontier in BFS and Dijkstra 🟡

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
