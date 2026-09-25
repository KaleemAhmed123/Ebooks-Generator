## Recognition drills: DP & Games 🟡

Hide the right column. Say the signature first (17-02), then the transition. Module references point at Module 06.

| Problem | Signature · transition |
|---|---|
| 1. Largest Sum Contiguous Subarray (GFG / LeetCode 53) | **Kadane:** best ending here = max(x, x + best before) (Module 06, 02-05) |
| 2. Smallest sum contiguous subarray (GFG) | **Kadane with `min`** |
| 3. Maximum difference of zeros and ones in a binary string (GFG) | **Kadane** on 0 → +1, 1 → −1 |
| 4. Delete and Earn (LeetCode 740) | **Sum per value, then House Robber** over values (Module 06, 02-02) |
| 5. Maximum sum, no three consecutive (GFG) | **`f(i, run)`** with run < 2 before a pick |
| 6. Friends Pairing (GFG) | **`f(n) = f(n−1) + (n−1) · f(n−2)`**: stay single, or pair with one of n − 1 |
| 7. Count Derangements (GFG) | **`D(n) = (n−1) · (D(n−1) + D(n−2))`** |
| 8. Painting the Fence (GFG) | **Two states:** last two same, last two different; `diff' = (same + diff)(k − 1)`, `same' = diff` |
| 9. Nth Catalan Number (GFG) | **`C(n) = Σ C(i) · C(n−1−i)`**: pick the root, split the rest |
| 10. Binomial Coefficient (GFG) | **Pascal:** `C(n, r) = C(n−1, r−1) + C(n−1, r)` |
| 11. Count Balanced Binary Trees of Height h (GFG) | **`f(h) = f(h−1)² + 2 · f(h−1) · f(h−2)`** |
| 12. Count All Valid Pickup and Delivery Options (LeetCode 1359) | **`f(n) = f(n−1) · n · (2n − 1)`**: choose 2 of the 2n positions for the new pair |
| 13. Mobile Numeric Keypad (GFG) | **`f(len, digit)`** = sum over the digit's neighbours and itself |
| 14. 0/1 Knapsack (GFG) / Subset Sum (GFG) / Partition (LeetCode 416) | **`f(i, cap)`**, move on after a pick (Module 06, 03-03, 03-05) |
| 15. Coin Change (GFG / LeetCode 322, 518) / ways to reach a score (GFG) | **`f(i, amount)`**, stay at i after a pick; items in the outer loop count combinations (Module 06, 03-04) |
| 16. Perfect Squares (LeetCode 279) | **Unbounded:** `f(n) = 1 + min f(n − s²)` |
| 17. Maximize the Cut Segments (GFG) | **Unbounded:** `f(n) = 1 + max(f(n−x), f(n−y), f(n−z))`; impossible = −∞, not 0 |
| 18. Minimum cost to fill a given weight in a bag (GFG) | **Unbounded knapsack;** a cost of −1 means the packet does not exist |
| 19. Number of Dice Rolls With Target Sum (LeetCode 1155) | **`f(dice, target)`,** loop faces 1 … k |
| 20. Greatest Sum Divisible by Three (LeetCode 1262) | **`f(i, sum mod 3)`**: three numbers per index |
| 21. Count subsequences with product < K (GFG) | **Pick/skip with the running product;** prune when it reaches K |
| 22. Painting the Walls (LeetCode 2742) | **Knapsack:** a paid wall covers `time[i] + 1` walls; `f(i, wallsLeft)` |
| 23. Gold Mine (GFG) | **Grid, column by column,** three moves in |
| 24. Maximal Square (LeetCode 221) | **`1 + min(up, left, diag)`** |
| 25. Assembly Line Scheduling (GFG) | **`f(station, line)`**: stay, or switch and pay the transfer |
| 26. Cherry Pickup (LeetCode 741) | **Two walkers at once:** `(r1, c1, r2)`, with `c2 = r1 + c1 − r2` |
| 27. Maximum sum rectangle (GFG) | **Fix a pair of rows, Kadane on column sums,** O(n²m) |
| 28. Largest zero-sum / equal 0-and-1 rectangle (GFG) | **Fix a pair of rows,** then equal prefixes on column sums (03-03) |
| 29. Longest Increasing Subsequence (LeetCode 300) | **`f(i)` or patience sorting** (Module 06, 02-04) |
| 30. Maximum Sum Increasing Subsequence (GFG) | **LIS adding values** instead of 1 |
| 31. Longest alternating subsequence (GFG) / Wiggle Subsequence (LeetCode 376) | **Two states:** last move up, last move down |
| 32. Maximum Alternating Subsequence Sum (LeetCode 1911) | **Two states:** next element is added, or subtracted |
| 33. Longest subsequence with adjacent difference one (GFG) | **`best[v] = 1 + max(best[v−1], best[v+1])`** |
| 34. Longest Arithmetic Subsequence of Given Difference (LeetCode 1218) | **`best[v] = best[v − d] + 1`** |
| 35. Longest Arithmetic Subsequence (LeetCode 1027) | **`dp[i]` = map diff → length** ending at i |
| 36. Maximum Length Chain of Pairs (GFG / LeetCode 646) | **Greedy by end;** weights make it 17-03 |
| 37. Maximum Number of Events That Can Be Attended II (LeetCode 1751) / Weighted Job Scheduling (GFG) | **Pick, then jump** (17-03) |
| 38. Minimum Difficulty of a Job Schedule (LeetCode 1335) | **`f(i, days)`:** try the day's last job j, cost `max(a[i..j])` |
| 39. Minimum removals so that max − min ≤ K (GFG) | **Not DP:** sort, keep the longest window, remove the rest (02-07) |
| 40. Minimum jumps to reach the end (GFG) | **Greedy reach** (08-02) |
| 41. LCS / Edit Distance (LeetCode 1143, 72) | **Two strings** (Module 06, 03-01, 03-02) |
| 42. Longest Repeating Subsequence (GFG) | **LCS of s with itself,** matching only when i ≠ j |
| 43. LCS of three strings (GFG) | **`f(i, j, k)`** |
| 44. Longest Common Substring (GFG) | **Match: `dp[i−1][j−1] + 1`; mismatch: 0** |
| 45. Interleaving String (LeetCode 97) | **`f(i, j)`;** the next char of s3 is at `i + j` |
| 46. Regular Expression Matching (LeetCode 10) | **`f(i, j)`;** `x*` skips the pair, or eats one char and stays |
| 47. Word Break (LeetCode 139) / Extra Characters in a String (LeetCode 2707) | **`f(i)`:** try every dictionary word starting at i |
| 48. Word Wrap (GFG) | **`f(i)`:** try every line end j, pay the line's cost |
| 49. Longest Palindromic Subsequence (LeetCode 516) | **LCS of s and reverse(s),** or range DP |
| 50. Count palindromic subsequences (GFG) | **Range:** equal ends `f(i+1,j) + f(i,j−1) + 1`; else subtract `f(i+1,j−1)` |
| 51. Longest Palindromic Substring (LeetCode 5) | **Grow from the centre** (06-02) |
| 52. Matrix Chain / Boolean Parenthesization / Optimal BST / Palindrome Partitioning II / Minimum Cost to Cut a Stick | **Try every split** (17-05) |
| 53. Egg Dropping (GFG / LeetCode 887) | **`f(eggs, floors)`** tries every floor; flip it to "floors checkable in m moves" for large n |
| 54. Number of Music Playlists (LeetCode 920) | **`f(len, distinct)`:** new song `(n − j + 1)` ways, replay `max(j − k, 0)` ways |
| 55. Count All Possible Routes (LeetCode 1575) | **`f(city, fuel)`** |
| 56. Largest Independent Set (GFG) | **Tree DP,** take or skip each node (Module 06, 04-01) |
| 57. Count of Integers (LeetCode 2719) | **Digit DP:** `count(≤ num2) − count(≤ num1 − 1)` (Module 06, 05-03) |
| 58. Buy and sell at most twice / k times (GFG / LeetCode 188) | **Track what you hold** (17-04) |
| 59. Optimal Strategy for a Game (GFG) / Predict the Winner (LeetCode 486) / Coin game with three choices (GFG) | **Assume the opponent is perfect** (17-06) |

### Score yourself

- **50–59:** you can name the signature from the statement alone
- **35–49:** reread 17-02; most misses pick a table before a signature
- **0–34:** redo drills 1–20; each is `f(i)` or `f(i, budget)`
