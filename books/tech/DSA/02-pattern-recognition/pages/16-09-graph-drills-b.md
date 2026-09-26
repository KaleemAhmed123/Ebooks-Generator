## Recognition drills: Graphs & Dependency <span class="lv lv2"></span> - continued

| Problem | Node · edge · move |
|---|---|
| 13. [Making A Large Island](https://leetcode.com/problems/making-a-large-island/) (LeetCode 827) | **Label islands, then sum distinct neighbour ids** per 0 (16-03) |
| 14. [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/) (LeetCode 785) | **Two-colour BFS/DFS;** check every component |
| 15. [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) / [Prerequisite Tasks](https://www.geeksforgeeks.org/problems/prerequisite-tasks/1) (GFG) | **Cycle check;** Kahn's queue empties early on a cycle (16-04) |
| 16. [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210) / [Topological Sort](https://www.geeksforgeeks.org/problems/topological-sort/1) (GFG) | **Kahn's order** (16-04) |
| 17. [Alien Dictionary](https://www.geeksforgeeks.org/problems/alien-dictionary/1) (GFG) | **Edge from the first differing letter** of each adjacent pair; a word before its own prefix is invalid |
| 18. [Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/) (LeetCode 802) | **Reverse the edges, Kahn from the sinks;** or three-colour DFS |
| 19. [Longest Path in a Directed Acyclic Graph](https://www.geeksforgeeks.org/problems/longest-path-in-a-directed-acyclic-graph/1) (GFG) | **Critical path / DAG DP** (16-04) |
| 20. [Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/) (LeetCode 1514) / [Dijkstra Algorithm](https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1) (GFG) | **Dijkstra;** products of probabilities ≤ 1 only shrink, so a max-heap works |
| 21. [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787) | **Bellman–Ford for k + 1 rounds,** copying the array each round; cost-only Dijkstra drops paths with fewer stops |
| 22. [Minimum Spanning Tree](https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1) (GFG) | **Minimum spanning tree** (Module 05, 04-01, 04-02) |
| 23. [Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/) (LeetCode 1192) / [Bridge Edge in a Graph](https://www.geeksforgeeks.org/problems/bridge-edge-in-graph/1) (GFG) | **Low-link:** edge (u, v) is a bridge iff low[v] > tin[u] (Module 05, 05-03) |

### Score yourself

- **19–23:** you name the edge before the algorithm
- **12–18:** reread 16-02 and Module 05's recognition page; most misses are the wrong edge, not the wrong algorithm
- **0–11:** redo drills 1–10; each is one BFS with a different node
