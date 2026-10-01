### Edit distance — same grid, one more move

```ts
// Edit Distance (LeetCode 72): insert, delete, replace
function editDistance(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;            // delete all of a's prefix
  for (let j = 0; j <= n; j++) dp[0][j] = j;            // insert all of b's prefix
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = a[i - 1] === b[j - 1]
      ? dp[i - 1][j - 1]                                 // match: free
      : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]); // del, ins, replace
  return dp[m][n];
}
```

- **Watch out:** seed the first row and column — an empty prefix costs `i` deletions or `j` insertions. Skipping them makes every distance too small. LCS length relates to deletions: `edits to equalise = m + n − 2·LCS` when only insert/delete are allowed
