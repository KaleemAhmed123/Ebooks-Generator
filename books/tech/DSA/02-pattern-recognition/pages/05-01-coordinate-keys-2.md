### Where it appears

| Problem | Which key formula |
|---|---|
| [Sort the Matrix Diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally/) (LeetCode 1329) | `r − c` groups each diagonal |
| [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) (LeetCode 74) | `r·C + c` flattens to a 1-D binary search |
| [Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse/) (LeetCode 498) | `r + c` groups anti-diagonals; reverse alternating |
| [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) (LeetCode 36) | `⌊r/3⌋·3 + ⌊c/3⌋` for box membership |
| [Shift 2D Grid](https://leetcode.com/problems/shift-2d-grid/) (LeetCode 1260) | flatten, rotate, unflatten with `k/C` and `k%C` |

:::interview
"Why can Search a 2D Matrix use a flat binary search but Search a 2D Matrix II cannot?"

In LeetCode 74, the first element of each row is greater than the last element of the previous row — the entire matrix is one sorted sequence. Flattening with `r·C + c` preserves order. In LeetCode 240, rows and columns are sorted independently — cell (1, 0) can be smaller than cell (0, 2) — so no single index orders all cells. Use staircase search (05-04) instead.
:::
