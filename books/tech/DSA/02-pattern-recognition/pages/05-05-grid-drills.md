## Recognition drills: Grids & Matrices <span class="lv lv1"></span>

Hide the right column. First decide whether the grid is a *table* (index math, rings, in-place state) or a *graph* (Chapter 16) or a *DP table* (Chapter 17). Then name the trick.

| Problem | Pattern & the deciding fact |
|---|---|
| 1. Spiral Matrix (LeetCode 54) | **Peel the layers;** re-check the rectangle before the bottom and left walks |
| 2. Rotate Image (LeetCode 48) | **Transpose, then reverse rows;** in place, O(1) extra |
| 3. Search a 2D Matrix (LeetCode 74) | **Coordinate keys:** one flat binary search, `mat[⌊k/n⌋][k % n]` |
| 4. Search a 2D Matrix II (LeetCode 240) | **Staircase search** from the top-right; rows and columns sorted separately |
| 5. Row with max 1s (GFG) | **Staircase** from the top-right: left on 1, down on 0 |
| 6. Sort the Matrix Diagonally (LeetCode 1329) | **Coordinate keys:** group by `r − c` |
| 7. Diagonal Traverse (LeetCode 498) | **Coordinate keys:** group by `r + c`, alternate direction |
| 8. Valid Sudoku (LeetCode 36) | **Coordinate keys:** row, column and box `⌊r/3⌋·3 + ⌊c/3⌋` sets |
| 9. Game of Life (LeetCode 289) | **State in the cell:** old in bit 0, new in bit 1 |
| 10. Set Matrix Zeroes (LeetCode 73) | **State in the cell:** row 0 and column 0 as markers, cleared last |
| 11. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Guess a value, count below it** (09-04) with a staircase count |
| 12. Maximal Rectangle (LeetCode 85) | **Stack the rows** (Chapter 10): each row becomes a histogram |
| 13. Longest Increasing Path in a Matrix (LeetCode 329) | **Grid as a DAG:** DFS with memo (Module 06 caching, on Module 05's DAG view); increasing edges cannot cycle |

### Score yourself

- **11–13:** you separate grid-as-table from grid-as-graph at a glance
- **7–10:** reread 05-01; most misses are a missing coordinate key
- **0–6:** start again at 05-02 and redo drills 1–8 by hand on paper
