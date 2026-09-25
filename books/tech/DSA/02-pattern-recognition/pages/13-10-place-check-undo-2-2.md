### The failure

- **Scanning the board to check a placement.** Walking up the column and both diagonals is O(n) per check; the sets make it O(1). For Sudoku, rescanning row, column and box costs 27 reads per try instead of three lookups
- **Undoing the wrong amount.** If "place" updates four structures, "undo" must revert all four in the same call. One forgotten `delete` leaves a phantom queen that silently blocks every later branch

:::interview
"Why is backtracking faster than brute force for N-Queens?" — Brute force would try all nⁿ (or n!) placements and check each at the end. Backtracking places one queen per row and rejects a square the moment it conflicts, so most partial boards die after a few rows. With column and diagonal sets each check is O(1); the search is still exponential, but n = 8 finishes in about 2,000 calls.
:::
