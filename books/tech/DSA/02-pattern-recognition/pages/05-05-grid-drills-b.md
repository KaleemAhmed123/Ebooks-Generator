## Recognition drills: Grids & Matrices 🟢 - continued

| Problem | Pattern & the deciding fact |
|---|---|
| 12. Common elements in all rows of a matrix (GFG) | **Count per value** with a map; mark a value at most once per row |
| 13. Find a specific pair in a matrix (GFG): max `a[c][d] − a[a][b]` with `c > a, d > b` | **Two passes, in 2-D:** suffix maximum from the bottom-right corner, then one scan (page 03-04) |
| 14. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Guess a value, count below it** (09-04) with a staircase count |
| 15. Median in a row-wise sorted matrix (GFG) | **Guess a value, count below it:** binary search per row for the count |
| 16. Maximal Rectangle (LeetCode 85) | **Stack the rows** (Chapter 10): each row becomes a histogram |
| 17. Largest subsquare surrounded by X (GFG) | **Two passes, in 2-D:** consecutive X counts to the left and upward per cell, then check each square's corners |
| 18. Longest Increasing Path in a Matrix (LeetCode 329) | **Grid as a DAG:** DFS with memo (Module 06 caching, on Module 05's DAG view); increasing edges cannot cycle |
| 19. The K Weakest Rows in a Matrix (LeetCode 1337) | **Binary search each row's 1-count,** then a size-k heap (Chapter 15) |
| 20. Sum of Matrix After Queries (LeetCode 2718) | **Process in reverse:** a later write to a row wins, so walk queries backwards and count only rows and columns not yet claimed |

### Score yourself

- **17–20:** you separate grid-as-table from grid-as-graph at a glance
- **11–16:** reread 05-01; most misses are a missing coordinate key
- **0–10:** start again at 05-02 and redo drills 1–11 by hand on paper
