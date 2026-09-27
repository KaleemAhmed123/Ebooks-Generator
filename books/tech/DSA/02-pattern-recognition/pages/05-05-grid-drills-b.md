## Recognition drills after Chapter 5 - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Shift 2D Grid](https://leetcode.com/problems/shift-2d-grid/) (LeetCode 1260) | 05-01 | "last of a row moves to the next row": one flat list, index `(i + k) mod m·n` |
| 2 | [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) (LeetCode 695) | 16-01 | "joined through neighbours": a graph; flood each component and count it |
| 3 | [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) (LeetCode 240) | 05-04 | rows and columns sorted *separately*: staircase from the top-right |
| 4 | [Count Submatrices with Top-Left Element and Sum Less Than k](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/) (LeetCode 3070) | 03-02 | "contains the top-left cell": each such submatrix is one 2-D prefix sum `P[r][c]` |
| 5 | [Rotate Image](https://leetcode.com/problems/rotate-image/) (LeetCode 48) | 05-02 | "without allocating": transpose, then reverse each row |
| 6 | [Toeplitz Matrix](https://leetcode.com/problems/toeplitz-matrix/) (LeetCode 766) | 05-01 | "diagonal": key `r − c`; each cell equals its upper-left neighbour |
| 7 | [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) (LeetCode 73) | 05-03 | "in place": row 0 and column 0 hold the flags, cleared last |
| 8 | [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) (LeetCode 64) | 17-02 | "only right or down": one-way moves, so a DP table fills row by row |
| 9 | [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) (LeetCode 74) | 05-01 | "first value greater than the previous row's last": one flat binary search |
| 10 | [Find Missing and Repeated Values](https://leetcode.com/problems/find-missing-and-repeated-values/) (LeetCode 2965) | 04-02 | "1 to n² once each": flatten, send each value home |
| 11 | [Determine Whether Matrix Can Be Obtained By Rotation](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/) (LeetCode 1886) | 05-02 | "steps of 90°": at most four transpose-and-reverse turns, compare after each |
| 12 | [Game of Life](https://leetcode.com/problems/game-of-life/) (LeetCode 289) | 05-03 | "at the same moment" and "in place": old state in bit 0, new state in bit 1 |

### Score yourself

- **11–12:** you split table, graph and DP before reading the details
- **8–10:** reread the row you missed on its page, then its "Not this page if" line
- **5–7:** reread 05-00, then 05-01 and 05-04 side by side
- **0–4:** redo 05-01 to 05-04, then this drill in a week
