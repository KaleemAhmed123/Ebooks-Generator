## Minimum Path Sum <span class="lv lv1"></span>

This is a direct evolution of Unique Paths. Instead of counting *how many* paths exist, we want to find the *best* path based on grid values.

- **The Setup:** Given a `m x n` grid filled with non-negative numbers, find a path from top-left to bottom-right, which minimizes the sum of all numbers along its path. You can only move down or right.
- **The State:** `dp[r][c]` = the minimum sum required to reach cell `(r, c)`.

### The Transition

To reach `(r, c)`, you must have come from either `(r-1, c)` or `(r, c-1)`.
You want the minimum sum, so you simply look at the accumulated cost of those two origins, pick the cheaper one, and add the current cell's cost.

`dp[r][c] = grid[r][c] + Math.min(dp[r-1][c], dp[r][c-1])`

### The Setup Trap

Unlike Unique Paths, where the edges are trivially `1`, the edges in Minimum Path Sum are accumulative.
- The top row can only be reached from the left. `dp[0][c] = dp[0][c-1] + grid[0][c]`.
- The left column can only be reached from above. `dp[r][0] = dp[r-1][0] + grid[r][0]`.
