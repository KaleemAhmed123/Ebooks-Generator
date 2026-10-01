### Where it appears

| Problem | The transition |
|---|---|
| Minimum Path Sum (LeetCode 64) | cost + min(above, left) |
| Unique Paths (LeetCode 62) | above + left (counting) |
| Unique Paths II (LeetCode 63) | an obstacle cell contributes 0 |
| Maximal Square (LeetCode 221) | 1 + min of three neighbours if the cell is '1' |
| Dungeon Game (LeetCode 174) | fill bottom-right → top-left; health can't drop below 1 |

- **Go deeper:** grids with all four directions are a graph, not a DP (a cell can depend on itself) — see 16-11. Module 06 covers the space-optimisation proofs.

:::interview
"Why can Minimum Path Sum use one row of memory instead of the full grid?"

Each cell needs only the cell above (same column, previous row) and the cell to the left (same row, just computed). Sweeping left to right, `dp[c]` still holds the previous row's value when read, then is overwritten with this row's. One array of width n suffices; the m × n table is never all needed at once.
:::
