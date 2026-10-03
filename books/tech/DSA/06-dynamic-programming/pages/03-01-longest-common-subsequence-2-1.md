### Implementation (Tabulation)

```ts
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  
  // Create an (m+1) x (n+1) grid filled with 0s
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Match! Look diagonal-left-up
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        // No match. Max of left and up
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```
