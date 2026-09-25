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
