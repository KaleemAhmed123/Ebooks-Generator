## Recognition drills: Graphs & Dependency 🟡 - continued

| Problem | Node · edge · move |
|---|---|
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
