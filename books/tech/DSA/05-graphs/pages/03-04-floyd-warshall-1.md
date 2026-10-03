## Floyd-Warshall <span class="lv lv2"></span>

- Dijkstra and Bellman-Ford are **Single-Source Shortest Path (SSSP)** algorithms. They find the distance from one specific `start` node to all other nodes.
- What if you need to know the shortest path from *every* node to *every other* node?
- **The Solution:** Floyd-Warshall. It is an **All-Pairs Shortest Path (APSP)** algorithm.

### The Mechanics

- It uses Dynamic Programming.
- **The Insight:** The shortest path from `A` to `B` either goes directly from `A` to `B`, or it goes through some intermediate node `K`. 
- `dist[A][B] = Math.min(dist[A][B], dist[A][K] + dist[K][B])`
- By systematically testing every possible node `K` as an intermediate pit-stop for every pair of `A` and `B`, we build up the global shortest paths.
