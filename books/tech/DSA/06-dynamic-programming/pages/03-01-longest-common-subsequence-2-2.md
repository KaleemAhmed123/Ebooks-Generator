### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) (LeetCode 1143) | The classic two-string DP problem |
| [Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/) (LeetCode 583) | Answer is len1 + len2 - 2*LCS |
| [Shortest Common Supersequence](https://leetcode.com/problems/shortest-common-supersequence/) (LeetCode 1092) | Build the supersequence using the LCS as backbone |
| [Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/) (LeetCode 1035) | LCS in disguise — matching elements without crossing |

### The rule of thumb

Any time an interview problem asks you to compare two strings, align two strings, find edits between two strings, or find patterns spanning two strings, immediately draw an (M+1) times (N+1) grid on the whiteboard. The state is almost always `dp[i][j]`.
