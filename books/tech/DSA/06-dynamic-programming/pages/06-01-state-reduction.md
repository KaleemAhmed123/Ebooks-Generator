## State Reduction (Rolling Arrays)

We have already seen State Reduction in the Fibonacci and Climbing Stairs problems, where we reduced an O(N) array down to two O(1) variables. 
This exact same principle applies to 2D DP matrices.

### The Problem with 2D DP

Consider the Edit Distance or Longest Common Subsequence problems.
- Both use an `(M+1) x (N+1)` matrix.
- If we are comparing two DNA strands that are 10,000 characters long, the matrix requires 10,000 times 10,000 = 100,000,000 integers. That is roughly 400 MB of RAM just to compare two strings. It will often trigger a `Memory Limit Exceeded` (MLE) error in competitive programming environments.

### The Rolling Array Optimization

Let's look at the Transition formula for LCS:
`dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`

Notice what `i` values we are accessing. To calculate the values for row `i`, we *only* ever look at row `i` (the current row) and row `i-1` (the row immediately above it). 
We **never** look at row `i-2`, `i-3`, or `0`.
Therefore, keeping the entire 10,000 times 10,000 matrix in memory is a massive waste. We only ever need **two rows** at any given time.

### Implementation

Instead of `dp[m][n]`, we use `dp[2][n]`. 
We use the modulo operator `% 2` to toggle back and forth between row 0 and row 1.

```ts
function longestCommonSubsequenceOptimized(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  
  // A 2 x (n+1) matrix
  const dp = Array.from({ length: 2 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    // Current row is i % 2. Previous row is (i - 1) % 2.
    const curr = i % 2;
    const prev = (i - 1) % 2;

    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[curr][j] = 1 + dp[prev][j - 1];
      } else {
        dp[curr][j] = Math.max(dp[prev][j], dp[curr][j - 1]);
      }
    }
  }

  // The final answer is in the row we just finished calculating
  return dp[m % 2][n];
}
```

This reduces the space complexity from O(M times N) to O(min(M, N)), dropping our memory usage from 400 MB down to a few kilobytes.

### The Rule of Thumb

If your Tabulation transition only relies on `i` and `i-1`, you can instantly optimize the space complexity using the `i % 2` trick. This is the single most common follow-up question an interviewer will ask after you write a 2D Tabulation solution.
