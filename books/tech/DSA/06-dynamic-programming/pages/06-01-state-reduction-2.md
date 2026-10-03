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
