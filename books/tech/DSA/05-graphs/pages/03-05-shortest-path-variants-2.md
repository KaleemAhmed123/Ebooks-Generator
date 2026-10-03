### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | Shortest path with an edge-count constraint |
| [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) (LeetCode 1293) | BFS with state expansion: (r, c, wallsBroken) |
| [Shortest Path to Get All Keys](https://leetcode.com/problems/shortest-path-to-get-all-keys/) (LeetCode 864) | State = (r, c, bitmask of collected keys) |

### The rule of thumb

Whenever an interview problem introduces a "coupon", a "special ability", or a "stamina meter" to a shortest path problem, you are dealing with **State Space Expansion**. Add a dimension to your queue and your visited set. The underlying algorithm (BFS or Dijkstra) remains exactly the same.
