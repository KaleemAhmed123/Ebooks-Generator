## Longest Common Subsequence (LCS)

String DP problems almost universally use a 2D state representing the lengths of prefixes of the two strings.

- **The Setup:** Given two strings `text1` and `text2`, return the length of their longest common subsequence.
- **Example:** `text1 = "abcde"`, `text2 = "ace"`. Result: 3 (`"ace"`).
- **The State:** `dp[i][j]` = the length of the longest common subsequence of `text1` up to index `i-1` and `text2` up to index `j-1`. (We use `i-1` so that index `0` can represent the empty string).

### The Transition

Look at the last characters of the current prefixes: `text1[i-1]` and `text2[j-1]`.
There are exactly two possibilities:

1. **They Match:** `"abc"` and `"aec"`. 
   - The `'c'` matches. This automatically extends the longest common subsequence of the remaining prefixes (`"ab"` and `"ae"`) by 1.
   - `dp[i][j] = 1 + dp[i-1][j-1]`

2. **They Do Not Match:** `"abc"` and `"acd"`.
   - The `'c'` and `'d'` do not match. We cannot use both.
   - We must either drop the `'c'` and compare `"ab"` against `"acd"`, OR drop the `'d'` and compare `"abc"` against `"ac"`. We want the maximum of these two paths.
   - `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`

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

### The rule of thumb

Any time an interview problem asks you to compare two strings, align two strings, find edits between two strings, or find patterns spanning two strings, immediately draw an (M+1) times (N+1) grid on the whiteboard. The state is almost always `dp[i][j]`.
