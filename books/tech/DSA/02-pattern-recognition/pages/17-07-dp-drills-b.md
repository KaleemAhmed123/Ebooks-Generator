## Recognition drills: DP & Games <span class="lv lv2"></span> - continued

| Problem | Signature · transition |
|---|---|
| 12. LCS / Edit Distance (LeetCode 1143, 72) | **Two strings** (Module 06, 03-01, 03-02) |
| 13. Longest Common Substring (GFG) | **Match: `dp[i−1][j−1] + 1`; mismatch: 0** |
| 14. Interleaving String (LeetCode 97) | **`f(i, j)`;** the next char of s3 is at `i + j` |
| 15. Regular Expression Matching (LeetCode 10) | **`f(i, j)`;** `x*` skips the pair, or eats one char and stays |
| 16. Word Break (LeetCode 139) / Extra Characters in a String (LeetCode 2707) | **`f(i)`:** try every dictionary word starting at i |
| 17. Longest Palindromic Subsequence (LeetCode 516) | **LCS of s and reverse(s),** or range DP |
| 18. Matrix Chain / Boolean Parenthesization / Optimal BST / Palindrome Partitioning II / Minimum Cost to Cut a Stick | **Try every split** (17-05) |
| 19. Egg Dropping (GFG / LeetCode 887) | **`f(eggs, floors)`** tries every floor; flip it to "floors checkable in m moves" for large n |
| 20. Buy and sell at most twice / k times (GFG / LeetCode 188) | **Track what you hold** (17-04) |
| 21. Optimal Strategy for a Game (GFG) / Predict the Winner (LeetCode 486) / Coin game with three choices (GFG) | **Assume the opponent is perfect** (17-06) |

### Score yourself

- **17–21:** you can name the signature from the statement alone
- **11–16:** reread 17-02; most misses pick a table before a signature
- **0–10:** redo drills 1–6; each is `f(i)` or `f(i, budget)`
