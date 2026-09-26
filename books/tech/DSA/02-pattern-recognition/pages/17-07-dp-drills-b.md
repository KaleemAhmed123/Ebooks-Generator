## Recognition drills: DP & Games <span class="lv lv2"></span> - continued

| Problem | Signature · transition |
|---|---|
| 12. [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) (LeetCode 1143) / [Edit Distance](https://leetcode.com/problems/edit-distance/) (LeetCode 72) | **Two strings** (Module 06, 03-01, 03-02) |
| 13. [Longest Common Substring](https://www.geeksforgeeks.org/problems/longest-common-substring1452/1) (GFG) | **Match: `dp[i−1][j−1] + 1`; mismatch: 0** |
| 14. [Interleaving String](https://leetcode.com/problems/interleaving-string/) (LeetCode 97) | **`f(i, j)`;** the next char of s3 is at `i + j` |
| 15. [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) (LeetCode 10) | **`f(i, j)`;** `x*` skips the pair, or eats one char and stays |
| 16. [Word Break](https://leetcode.com/problems/word-break/) (LeetCode 139) / [Extra Characters in a String](https://leetcode.com/problems/extra-characters-in-a-string/) (LeetCode 2707) | **`f(i)`:** try every dictionary word starting at i |
| 17. [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) (LeetCode 516) | **LCS of s and reverse(s),** or range DP |
| 18. [Matrix Chain Multiplication](https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1) (GFG) / [Boolean Parenthesization](https://www.geeksforgeeks.org/problems/boolean-parenthesization5610/1) (GFG) / [Optimal binary search tree](https://www.geeksforgeeks.org/problems/optimal-binary-search-tree2214/1) (GFG) / [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/) (LeetCode 132) / [Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/) (LeetCode 1547) | **Try every split** (17-05) |
| 19. [Super Egg Drop](https://leetcode.com/problems/super-egg-drop/) (LeetCode 887) / [Egg Dropping Puzzle](https://www.geeksforgeeks.org/problems/egg-dropping-puzzle-1587115620/1) (GFG) | **`f(eggs, floors)`** tries every floor; flip it to "floors checkable in m moves" for large n |
| 20. [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) (LeetCode 188) / [Stock Buy and Sell – Max 2 Transactions Allowed](https://www.geeksforgeeks.org/problems/buy-and-sell-a-share-at-most-twice/1) (GFG) | **Track what you hold** (17-04) |
| 21. [Predict the Winner](https://leetcode.com/problems/predict-the-winner/) (LeetCode 486) / [Optimal Strategy For A Game](https://www.geeksforgeeks.org/problems/optimal-strategy-for-a-game-1587115620/1) (GFG) | **Assume the opponent is perfect** (17-06) |

### Score yourself

- **17–21:** you can name the signature from the statement alone
- **11–16:** reread 17-02; most misses pick a table before a signature
- **0–10:** redo drills 1–6; each is `f(i)` or `f(i, budget)`
