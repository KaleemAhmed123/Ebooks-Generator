## Interval DP <span class="lv lv2"></span>

- **Interval DP** solves problems where the answer for a range `[i, j]` depends on answers for smaller sub-ranges within it. The state is the interval itself: `dp[i][j]` = the optimal answer for the subproblem spanning indices `i` to `j`
- **The signal:** the problem involves merging, splitting, or collapsing contiguous elements — stones, balloons, matrices, parenthesisations. Whenever you combine two adjacent pieces and the cost depends on what remains, think interval DP

### The evaluation order

- Unlike standard 2D DP where you fill row by row, interval DP fills by **interval length**. You must solve all intervals of length 1 before length 2, length 2 before length 3, and so on
- The outer loop iterates `len` from 1 to n. The inner loop iterates the start index `i`, and `j = i + len - 1`

```ts
// Skeleton for interval DP
for (let len = 1; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    // Base case: dp[i][i] is a single element
    if (i === j) { dp[i][j] = base; continue; }
    // Try every split point k between i and j
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.min(dp[i][j],
        dp[i][k] + dp[k + 1][j] + mergeCost(i, j, k));
    }
  }
}
```
