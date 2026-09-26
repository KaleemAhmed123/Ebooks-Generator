## Recognition drills: Graphs & Dependency <span class="lv lv2"></span>

Hide the right column. Name the node, the edge, and the traversal before you name the algorithm. Cues that a statement is a graph: items **numbered 0 to n − 1**, "X comes after Y", "X depends on Y", "X is related to Y", "minimum steps", "share something in common", "within range".

| Problem | Node · edge · move |
|---|---|
| 1. [Flood Fill](https://leetcode.com/problems/flood-fill/) (LeetCode 733) | **DFS from one cell;** return at once if the new colour equals the old, or it loops forever |
| 2. [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200) / [Count Islands](https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1) (GFG) | **Components:** one flood per unvisited land cell |
| 3. [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) (LeetCode 994) | **Multi-source BFS** from every rotten orange; answer = last level (Module 05, 02-04) |
| 4. [01 Matrix](https://leetcode.com/problems/01-matrix/) (LeetCode 542) / [Distance of nearest cell having 1](https://www.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1) (GFG) | **Multi-source BFS** from all targets at distance 0 |
| 5. [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) (LeetCode 130) / [Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/) (LeetCode 1020) | **Flood from the border** (16-03) |
| 6. [Nearest Exit from Entrance in Maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/) (LeetCode 1926) | **BFS;** the first border cell dequeued that is not the entrance |
| 7. [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) (LeetCode 1091) | **BFS, 8 directions;** the path length counts cells, so start at 1 |
| 8. [Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders/) (LeetCode 909) | **BFS over squares 1 … n²;** map a square to (row, col) with alternating direction per row |
| 9. [Word Ladder](https://leetcode.com/problems/word-ladder/) (LeetCode 127) | **BFS;** generate one-letter mutations, never compare word pairs (Module 05, 01-03) |
| 10. [Clone Graph](https://leetcode.com/problems/clone-graph/) (LeetCode 133) | **DFS with an old → new map;** the map doubles as the visited set |
| 11. [Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) (LeetCode 1319) | **Hidden edge + components** (16-02) |
| 12. [Detonate the Maximum Bombs](https://leetcode.com/problems/detonate-the-maximum-bombs/) (LeetCode 2101) / [Evaluate Division](https://leetcode.com/problems/evaluate-division/) (LeetCode 399) | **Directed / weighted hidden edge** (16-02) |
