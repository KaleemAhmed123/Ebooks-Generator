## Recognition drills: Graphs & Dependency 🟡 - continued

| Problem | Node · edge · move |
|---|---|
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
