### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Unique Paths](https://leetcode.com/problems/unique-paths/) (LeetCode 62) | The standard grid path-counting problem |
| [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/) (LeetCode 63) | Same problem with obstacle cells |
| [Unique Paths III](https://leetcode.com/problems/unique-paths-iii/) (LeetCode 980) | Must visit every non-obstacle cell — backtracking variant |
| [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/) (LeetCode 118) | Same additive recurrence in triangular form |

### Unique Paths II (Obstacles)

- **The Twist:** The grid contains obstacles (represented by `1`). You cannot walk on an obstacle.
- **The Fix:** If `grid[r][c] === 1`, it is a dead end. Set `dp[r][c] = 0` (there are 0 ways to reach an obstacle).
- **The Trap:** If there is an obstacle in the top row, every cell to the right of it is unreachable. If you blindly fill the top row with `1`s, you will fail. You must initialize the top row with `1` *only until you hit the first obstacle*, then the rest are `0`. 
  - An easier way to handle this is to pad the `dp` array with an extra top row and left column of `0`s, set `dp[0][1] = 1`, and run the standard loop with `dp[r][c] = (grid[r-1][c-1] === 1) ? 0 : dp[r-1][c] + dp[r][c-1]`.
