### Where it appears

| Problem | What gets placed and checked |
|---|---|
| [N-Queens](https://leetcode.com/problems/n-queens/) (LeetCode 51) | a queen per row — check column, both diagonals |
| [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) (LeetCode 37) | a digit per empty cell — check row, column, box |
| [Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (LeetCode 698) | each number into a bucket — check sum ≤ target |

:::interview
"Sudoku Solver can try cells in any order. Why does 'fewest options first' matter?"

A cell with 8 valid digits branches into 8 subtrees; a cell with 1 valid digit has no branching at all. Picking the most constrained cell first prunes the tree at the top, where each cut saves the most work. This is the Minimum Remaining Values (MRV) heuristic from constraint satisfaction — it does not change correctness, only speed.
:::
