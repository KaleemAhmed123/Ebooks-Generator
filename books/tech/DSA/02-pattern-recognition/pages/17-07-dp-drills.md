## Recognition drills: DP & Games <span class="lv lv2"></span>

Hide the right column. Say the signature first (17-02), then the transition. Module references point at Module 06.

| Problem | Signature · transition |
|---|---|
| 1. Largest Sum Contiguous Subarray (GFG / LeetCode 53) | **Kadane:** best ending here = max(x, x + best before) (Module 06, 02-05) |
| 2. Delete and Earn (LeetCode 740) | **Sum per value, then House Robber** over values (Module 06, 02-02) |
| 3. 0/1 Knapsack (GFG) / Subset Sum (GFG) / Partition (LeetCode 416) | **`f(i, cap)`**, move on after a pick (Module 06, 03-03, 03-05) |
| 4. Coin Change (GFG / LeetCode 322, 518) / ways to reach a score (GFG) | **`f(i, amount)`**, stay at i after a pick; items in the outer loop count combinations (Module 06, 03-04) |
| 5. Perfect Squares (LeetCode 279) | **Unbounded:** `f(n) = 1 + min f(n − s²)` |
| 6. Number of Dice Rolls With Target Sum (LeetCode 1155) | **`f(dice, target)`,** loop faces 1 … k |
| 7. Greatest Sum Divisible by Three (LeetCode 1262) | **`f(i, sum mod 3)`**: three numbers per index |
| 8. Maximal Square (LeetCode 221) | **`1 + min(up, left, diag)`** |
| 9. Longest Increasing Subsequence (LeetCode 300) | **`f(i)` or patience sorting** (Module 06, 02-04) |
| 10. Maximum Sum Increasing Subsequence (GFG) | **LIS adding values** instead of 1 |
| 11. Longest alternating subsequence (GFG) / Wiggle Subsequence (LeetCode 376) | **Two states:** last move up, last move down |
| 12. Maximum Number of Events That Can Be Attended II (LeetCode 1751) / Weighted Job Scheduling (GFG) | **Pick, then jump** (17-03) |
| 13. LCS / Edit Distance (LeetCode 1143, 72) | **Two strings** (Module 06, 03-01, 03-02) |
| 14. Longest Common Substring (GFG) | **Match: `dp[i−1][j−1] + 1`; mismatch: 0** |
| 15. Interleaving String (LeetCode 97) | **`f(i, j)`;** the next char of s3 is at `i + j` |
| 16. Regular Expression Matching (LeetCode 10) | **`f(i, j)`;** `x*` skips the pair, or eats one char and stays |
| 17. Word Break (LeetCode 139) / Extra Characters in a String (LeetCode 2707) | **`f(i)`:** try every dictionary word starting at i |
| 18. Longest Palindromic Subsequence (LeetCode 516) | **LCS of s and reverse(s),** or range DP |
| 19. Longest Palindromic Substring (LeetCode 5) | **Grow from the centre** (06-02) |
| 20. Matrix Chain / Boolean Parenthesization / Optimal BST / Palindrome Partitioning II / Minimum Cost to Cut a Stick | **Try every split** (17-05) |
| 21. Egg Dropping (GFG / LeetCode 887) | **`f(eggs, floors)`** tries every floor; flip it to "floors checkable in m moves" for large n |
| 22. Buy and sell at most twice / k times (GFG / LeetCode 188) | **Track what you hold** (17-04) |
| 23. Optimal Strategy for a Game (GFG) / Predict the Winner (LeetCode 486) / Coin game with three choices (GFG) | **Assume the opponent is perfect** (17-06) |

### Score yourself

- **19–23:** you can name the signature from the statement alone
- **12–18:** reread 17-02; most misses pick a table before a signature
- **0–11:** redo drills 1–7; each is `f(i)` or `f(i, budget)`
