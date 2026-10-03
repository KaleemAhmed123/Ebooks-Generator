### Negative Weight Cycles

- If a graph contains a cycle where the sum of the edges is negative (e.g., `A -> B -> C -> A` costs `-2`), there is no "shortest path". You can just loop the cycle infinitely to get a cost of -infty.
- Bellman-Ford is the standard tool to **detect** these cycles.
- **The Detection:** After running the V - 1 sweeps, run one more single sweep. If any edge *still* relaxes, it means the path is still getting cheaper. This mathematically proves the existence of a negative weight cycle.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | Run exactly K+1 relaxation sweeps to enforce stop limit |
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743) | Single-source shortest path, solvable with Bellman-Ford |
| [Negative Weight Cycle Detection](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | Extra sweep after V-1 rounds proves a negative cycle exists |

### Complexity

- **Time:** O(V times E). This is much slower than Dijkstra's O(E log V). 
- You should *only* use Bellman-Ford if you suspect negative edges, or if the problem explicitly asks you to detect negative cycles (e.g., arbitrage in currency exchange rates).
