### Implementation (Tabulation)

```ts
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Base Cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Transition
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j - 1], // Replace
          dp[i - 1][j],     // Delete
          dp[i][j - 1]      // Insert
        );
      }
    }
  }
  return dp[m][n];
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Edit Distance](https://leetcode.com/problems/edit-distance/) (LeetCode 72) | The classic three-operation string transform |
| [One Edit Distance](https://leetcode.com/problems/one-edit-distance/) (LeetCode 161) | Simplified to checking exactly one operation |
| [Minimum ASCII Delete Sum for Two Strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) (LeetCode 712) | Edit distance weighted by character ASCII values |
