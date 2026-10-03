## State Reduction (Rolling Arrays) <span class="lv lv1"></span>

We have already seen State Reduction in the Fibonacci and Climbing Stairs problems, where we reduced an O(N) array down to two O(1) variables. 
This exact same principle applies to 2D DP matrices.

### The Problem with 2D DP

Consider the Edit Distance or Longest Common Subsequence problems.
- Both use an `(M+1) x (N+1)` matrix.
- If we are comparing two DNA strands that are 10,000 characters long, the matrix requires 10,000 times 10,000 = 100,000,000 integers. That is roughly 400 MB of RAM just to compare two strings. It will often trigger a `Memory Limit Exceeded` (MLE) error in competitive programming environments.

### The Rolling Array Optimization

Look at the Transition formula for LCS:
`dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`

Notice what `i` values we are accessing. To calculate the values for row `i`, we *only* ever look at row `i` (the current row) and row `i-1` (the row immediately above it). 
We **never** look at row `i-2`, `i-3`, or `0`.
Therefore, keeping the entire 10,000 times 10,000 matrix in memory is a massive waste. We only ever need **two rows** at any given time.
