### The structural parallel

- **Frontier:** a queue vs a min-heap; pop the front vs pop the minimum
- **Relaxation:** `dist[node] + 1` vs `dist[node] + weight`
- **Skip rule:** already visited vs a stale entry, `d > dist[node]`
- **Cost:** O(V + E) vs O((V + E) log V)

- **Same skeleton, different frontier.** The unnamed pattern is the skeleton. BFS and Dijkstra are two instantiations of it

### The trap

- **Using BFS on weighted graphs.** BFS finds the path with fewest edges, not the path with lowest cost. If edges have different weights, BFS will confidently return a wrong answer. The constraint fingerprint: "edges have varying costs" → you need a heap frontier (Dijkstra), not a FIFO frontier (BFS)
