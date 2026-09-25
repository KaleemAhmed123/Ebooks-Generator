## Recognition drills: Graphs & Dependency <span class="lv lv2"></span> - continued

| Problem | Node · edge · move |
|---|---|
| 12. Detonate the Maximum Bombs (LeetCode 2101) / Evaluate Division (LeetCode 399) | **Directed / weighted hidden edge** (16-02) |
| 13. Making A Large Island (LeetCode 827) | **Label islands, then sum distinct neighbour ids** per 0 (16-03) |
| 14. Is Graph Bipartite? (LeetCode 785) | **Two-colour BFS/DFS;** check every component |
| 15. Course Schedule (LeetCode 207) / Possible to finish all tasks (GFG) | **Cycle check;** Kahn's queue empties early on a cycle (16-04) |
| 16. Course Schedule II (LeetCode 210) / Topological Sort (GFG) | **Kahn's order** (16-04) |
| 17. Alien Dictionary (GFG) | **Edge from the first differing letter** of each adjacent pair; a word before its own prefix is invalid |
| 18. Find Eventual Safe States (LeetCode 802) | **Reverse the edges, Kahn from the sinks;** or three-colour DFS |
| 19. Minimum time taken by each job, DAG (GFG) / Longest Path in a DAG (GFG) | **Critical path / DAG DP** (16-04) |
| 20. Dijkstra (GFG) / Path with Maximum Probability (LeetCode 1514) | **Dijkstra;** products of probabilities ≤ 1 only shrink, so a max-heap works |
| 21. Cheapest Flights Within K Stops (LeetCode 787) | **Bellman–Ford for k + 1 rounds,** copying the array each round; cost-only Dijkstra drops paths with fewer stops |
| 22. Kruskal / Prim (GFG) | **Minimum spanning tree** (Module 05, 04-01, 04-02) |
| 23. Bridges in a graph (GFG) / Critical Connections (LeetCode 1192) | **Low-link:** edge (u, v) is a bridge iff low[v] > tin[u] (Module 05, 05-03) |

### Score yourself

- **19–23:** you name the edge before the algorithm
- **12–18:** reread 16-02 and Module 05's recognition page; most misses are the wrong edge, not the wrong algorithm
- **0–11:** redo drills 1–10; each is one BFS with a different node
