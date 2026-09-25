## Recognition drills: Grids & Matrices 🟢

Hide the right column. First decide whether the grid is a *table* (index math, rings, in-place state) or a *graph* (Chapter 16) or a *DP table* (Chapter 17). Then name the trick.

| Problem | Pattern & the deciding fact |
|---|---|
| 1. Spiral Matrix (LeetCode 54) | **Peel the layers;** re-check the rectangle before the bottom and left walks |
| 2. Rotate Image (LeetCode 48) | **Transpose, then reverse rows;** in place, O(1) extra |
| 3. Search a 2D Matrix (LeetCode 74) | **Coordinate keys:** one flat binary search, `mat[⌊k/n⌋][k % n]` |
| 4. Search a 2D Matrix II (LeetCode 240) | **Staircase search** from the top-right; rows and columns sorted separately |
| 5. Row with max 1s (GFG) | **Staircase** from the top-right: left on 1, down on 0 |
| 6. Reshape the Matrix (LeetCode 566) | **Coordinate keys:** flat index shared by both shapes |
| 7. Sort the Matrix Diagonally (LeetCode 1329) | **Coordinate keys:** group by `r − c` |
| 8. Diagonal Traverse (LeetCode 498) | **Coordinate keys:** group by `r + c`, alternate direction |
| 9. Valid Sudoku (LeetCode 36) | **Coordinate keys:** row, column and box `⌊r/3⌋·3 + ⌊c/3⌋` sets |
| 10. Game of Life (LeetCode 289) | **State in the cell:** old in bit 0, new in bit 1 |
| 11. Set Matrix Zeroes (LeetCode 73) | **State in the cell:** row 0 and column 0 as markers, cleared last |
| 12. Common elements in all rows of a matrix (GFG) | **Count per value** with a map; mark a value at most once per row |
| 13. Find a specific pair in a matrix (GFG): max `a[c][d] − a[a][b]` with `c > a, d > b` | **Two passes, in 2-D:** suffix maximum from the bottom-right corner, then one scan (page 03-04) |
| 14. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Guess a value, count below it** (09-04) with a staircase count |
| 15. Median in a row-wise sorted matrix (GFG) | **Guess a value, count below it:** binary search per row for the count |
| 16. Maximal Rectangle (LeetCode 85) | **Stack the rows** (Chapter 10): each row becomes a histogram |
| 17. Largest subsquare surrounded by X (GFG) | **Two passes, in 2-D:** consecutive X counts to the left and upward per cell, then check each square's corners |
| 18. Longest Increasing Path in a Matrix (LeetCode 329) | **Grid as a DAG:** DFS with memo (Chapter 13 → Chapter 17); increasing edges cannot cycle |
| 19. The K Weakest Rows in a Matrix (LeetCode 1337) | **Binary search each row's 1-count,** then a size-k heap (Chapter 15) |
| 20. Sum of Matrix After Queries (LeetCode 2718) | **Process in reverse:** a later write to a row wins, so walk queries backwards and count only rows and columns not yet claimed |

### Score yourself

- **17–20:** you separate grid-as-table from grid-as-graph at a glance
- **11–16:** reread 05-01; most misses are a missing coordinate key
- **0–10:** start again at 05-02 and redo drills 1–11 by hand on paper
