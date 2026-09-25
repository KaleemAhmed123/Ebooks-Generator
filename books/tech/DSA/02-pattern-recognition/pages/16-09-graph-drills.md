## Recognition drills: Graphs & Dependency <span class="lv lv2"></span>

Hide the right column. Name the node, the edge, and the traversal before you name the algorithm. Cues that a statement is a graph: items **numbered 0 to n − 1**, "X comes after Y", "X depends on Y", "X is related to Y", "minimum steps", "share something in common", "within range".

| Problem | Node · edge · move |
|---|---|
| 1. Flood Fill (LeetCode 733) | **DFS from one cell;** return at once if the new colour equals the old, or it loops forever |
| 2. Number of Islands (GFG / LeetCode 200) | **Components:** one flood per unvisited land cell |
| 3. Rotting Oranges (LeetCode 994) | **Multi-source BFS** from every rotten orange; answer = last level (Module 05, 02-04) |
| 4. 01 Matrix (LeetCode 542) / Distance of nearest cell having 1 (GFG) | **Multi-source BFS** from all targets at distance 0 |
| 5. Surrounded Regions (LeetCode 130) / Number of Enclaves (LeetCode 1020) | **Flood from the border** (16-03) |
| 6. Nearest Exit from Entrance in Maze (LeetCode 1926) | **BFS;** the first border cell dequeued that is not the entrance |
| 7. Shortest Path in Binary Matrix (LeetCode 1091) | **BFS, 8 directions;** the path length counts cells, so start at 1 |
| 8. Snakes and Ladders (LeetCode 909) | **BFS over squares 1 … n²;** map a square to (row, col) with alternating direction per row |
| 9. Word Ladder (LeetCode 127) | **BFS;** generate one-letter mutations, never compare word pairs (Module 05, 01-03) |
| 10. Clone Graph (LeetCode 133) | **DFS with an old → new map;** the map doubles as the visited set |
| 11. Journey to the Moon (HackerRank) / Number of Operations to Make Network Connected (LeetCode 1319) | **Hidden edge + components** (16-02) |
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
