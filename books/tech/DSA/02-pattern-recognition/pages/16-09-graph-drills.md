## Recognition drills: Graphs & Dependency 🟡

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
| 8. Minimum Steps by Knight (GFG) | **BFS;** the 8 knight jumps are the edges |
| 9. Snakes and Ladders (LeetCode 909) | **BFS over squares 1 … n²;** map a square to (row, col) with alternating direction per row |
| 10. Word Ladder (LeetCode 127) | **BFS;** generate one-letter mutations, never compare word pairs (Module 05, 01-03) |
| 11. Water Jug (GFG) / Water and Jug Problem (LeetCode 365) | **BFS over (a, b) states;** or Bézout: reachable iff target ≤ x + y and gcd(x, y) divides it |
| 12. Minimum Multiplications to reach End (GFG) | **BFS over residues mod 100000;** at most 100000 nodes |
| 13. Shortest Path to Get All Keys (LeetCode 864) | **BFS over (row, col, key bitmask)** |
| 14. Clone Graph (LeetCode 133) | **DFS with an old → new map;** the map doubles as the visited set |
| 15. Check if a graph is a tree (GFG) | **Exactly n − 1 edges and connected** |
| 16. Journey to the Moon (HackerRank) / Number of Operations to Make Network Connected (LeetCode 1319) | **Hidden edge + components** (16-02) |
| 17. Detonate the Maximum Bombs (LeetCode 2101) / Evaluate Division (LeetCode 399) | **Directed / weighted hidden edge** (16-02) |
| 18. Making A Large Island (LeetCode 827) | **Label islands, then sum distinct neighbour ids** per 0 (16-03) |
| 19. Last Day Where You Can Still Cross (LeetCode 1970) | **Binary search the day + BFS,** or add land backwards in time with DSU |
| 20. Is Graph Bipartite? (LeetCode 785) | **Two-colour BFS/DFS;** check every component |
| 21. Two Clique Problem (GFG) | **The complement graph must be bipartite** |
| 22. M-Coloring Problem (GFG) | **Place, check, undo** (13-10); not a traversal |
| 23. Course Schedule (LeetCode 207) / Possible to finish all tasks (GFG) | **Cycle check;** Kahn's queue empties early on a cycle (16-05) |
| 24. Course Schedule II (LeetCode 210) / Topological Sort (GFG) | **Kahn's order** (16-05) |
| 25. Alien Dictionary (GFG) | **Edge from the first differing letter** of each adjacent pair; a word before its own prefix is invalid |
| 26. Find Eventual Safe States (LeetCode 802) | **Reverse the edges, Kahn from the sinks;** or three-colour DFS |
| 27. Minimum time taken by each job, DAG (GFG) / Longest Path in a DAG (GFG) | **Critical path / DAG DP** (16-06, 16-07) |
| 28. Oliver and the Game (HackerEarth) | **Entry/exit times:** x is an ancestor of y iff tin[x] ≤ tin[y] and tout[y] ≤ tout[x] |
| 29. Minimum Fuel Cost to Report to the Capital (LeetCode 2477) | **Post-order subtree sizes;** each edge costs ⌈people / seats⌉ litres |
| 30. Dijkstra (GFG) / Path with Maximum Probability (LeetCode 1514) | **Dijkstra;** products of probabilities ≤ 1 only shrink, so a max-heap works |
| 31. Cheapest Flights Within K Stops (LeetCode 787) | **Bellman–Ford for k + 1 rounds,** copying the array each round; cost-only Dijkstra drops paths with fewer stops |
| 32. Minimum edges to reverse to make a path (GFG) | **0-1 BFS:** original edge 0, reversed edge 1 (Module 05, 02-06) |
| 33. Detect Negative Cycle (GFG) / Floyd–Warshall (GFG) | **A relaxation still succeeds in round n** / a negative `dist[i][i]` (Module 05, 03-03, 03-04) |
| 34. Kruskal / Prim (GFG) | **Minimum spanning tree** (Module 05, 04-01, 04-02) |
| 35. Total number of spanning trees (GFG) | **Kirchhoff:** any cofactor of the Laplacian matrix |
| 36. Bridges in a graph (GFG) / Critical Connections (LeetCode 1192) | **Low-link:** edge (u, v) is a bridge iff low[v] > tin[u] (Module 05, 05-03) |
| 37. Strongly Connected Components, Kosaraju (GFG) | **Two DFS passes,** the second on the reversed graph (Module 05, 05-04) |
| 38. Seven Bridges / Euler path (GFG) | **Degree test:** 0 or 2 odd vertices, one component with edges (Module 05, 05-06) |
| 39. Number of triangles (GFG) | **trace(A³) / 6** undirected, **/ 3** directed |
| 40. Travelling Salesman Problem (GFG) | **Bitmask DP** over (visited set, last city), O(n² · 2ⁿ) |
| 41. Minimize Cash Flow (GFG) | **Net balances;** repeatedly settle the largest creditor against the largest debtor |

### Score yourself

- **35–41:** you name the edge before the algorithm
- **24–34:** reread 16-02 and Module 05's recognition page; most misses are the wrong edge, not the wrong algorithm
- **0–23:** redo drills 1–14; each is one BFS with a different node
