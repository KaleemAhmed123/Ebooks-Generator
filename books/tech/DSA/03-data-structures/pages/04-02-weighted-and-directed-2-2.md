### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) | Directed graph + indegree array for topological sort |
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210) | Kahn's algorithm outputs the valid ordering |
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743) | Weighted directed graph fed into Dijkstra |
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | Weighted directed edges with constrained BFS |

:::interview
"Can a directed graph have cycles?"

Yes. If you run Kahn's algorithm on a graph with a cycle, the nodes in the cycle will never reach an indegree of 0. When the queue empties, the number of processed nodes will be less than the total nodes $N$. This is the standard, O(V+E) way to detect cycles in a directed graph.
:::
