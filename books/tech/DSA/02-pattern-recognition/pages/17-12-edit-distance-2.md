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

### Where it appears

| Problem | The grid transition |
|---|---|
| Longest Common Subsequence (LeetCode 1143) | match adds 1 |
| Edit Distance (LeetCode 72) | min of insert, delete, replace |
| Delete Operation for Two Strings (LeetCode 583) | `m + n − 2·LCS` |
| Shortest Common Supersequence (LeetCode 1092) | build from the LCS path |

:::interview
"LCS and edit distance share a grid — what is the real difference?"

Both walk `f(i, j)` over two prefixes. On a match, both step diagonally. On a mismatch, LCS *maximises* over dropping one side (it counts matches); edit distance *minimises* over insert, delete, and replace (it counts changes, replace being the extra diagonal move). Same structure, opposite objective and one extra transition.
:::
