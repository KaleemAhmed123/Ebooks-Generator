## Recognition drills: Grids & Matrices <span class="lv lv1"></span>

Hide the right column. First decide whether the grid is a *table* (index math, rings, in-place state) or a *graph* (Chapter 16) or a *DP table* (Chapter 17). Then name the trick.

| Problem | Pattern & the deciding fact |
|---|---|
| 1. [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (LeetCode 54) | **Peel the layers;** re-check the rectangle before the bottom and left walks |
| 2. [Rotate Image](https://leetcode.com/problems/rotate-image/) (LeetCode 48) | **Transpose, then reverse rows;** in place, O(1) extra |
| 3. [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) (LeetCode 74) | **Coordinate keys:** one flat binary search, `mat[⌊k/n⌋][k % n]` |
| 4. [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) (LeetCode 240) | **Staircase search** from the top-right; rows and columns sorted separately |
| 5. [Row with Max 1s in Rowwise Sorted](https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1) (GFG) | **Staircase** from the top-right: left on 1, down on 0 |
| 6. [Sort the Matrix Diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally/) (LeetCode 1329) | **Coordinate keys:** group by `r − c` |
| 7. [Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse/) (LeetCode 498) | **Coordinate keys:** group by `r + c`, alternate direction |
| 8. [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) (LeetCode 36) | **Coordinate keys:** row, column and box `⌊r/3⌋·3 + ⌊c/3⌋` sets |
| 9. [Game of Life](https://leetcode.com/problems/game-of-life/) (LeetCode 289) | **State in the cell:** old in bit 0, new in bit 1 |
| 10. [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) (LeetCode 73) | **State in the cell:** row 0 and column 0 as markers, cleared last |
| 11. [Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) (LeetCode 329) | **Grid as a DAG:** DFS with memo (Module 06 caching, on Module 05's DAG view); increasing edges cannot cycle |

### Score yourself

- **9–11:** you separate grid-as-table from grid-as-graph at a glance
- **6–8:** reread 05-01; most misses are a missing coordinate key
- **0–5:** start again at 05-02 and redo drills 1–8 by hand on paper
