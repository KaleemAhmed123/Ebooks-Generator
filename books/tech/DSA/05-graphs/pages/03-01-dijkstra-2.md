### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743) | Textbook single-source shortest path on a weighted digraph |
| [Path with Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) (LeetCode 1631) | Dijkstra where edge weight is the absolute height difference |
| [Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/) (LeetCode 778) | Min-heap BFS tracking the max elevation along the path |
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | Modified Dijkstra with a stop-count constraint |

### The trap

- **Missing the `visited` check:** A node can be pushed into the Priority Queue multiple times with different distances (e.g., we found a path of cost 10, then later found a path of cost 8). The PQ will pop the cost 8 version first. When the cost 10 version eventually bubbles up and pops, we must completely ignore it, because we already processed that node optimally.
- **The fix:** When you pop `[cost, node]`, immediately check if `cost > dist[node]`. If it is, `continue`. This prevents processing stale, outdated paths and saves massive amounts of time.
