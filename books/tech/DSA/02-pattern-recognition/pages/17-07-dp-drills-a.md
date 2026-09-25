## Recognition drills: DP & Games <span class="lv lv2"></span>

Hide the right column. Say the signature first (17-02), then the transition. Module references point at Module 06.

| Problem | Signature · transition |
|---|---|
| 1. Delete and Earn (LeetCode 740) | **Sum per value, then House Robber** over values (Module 06, 02-02) |
| 2. 0/1 Knapsack (GFG) / Subset Sum (GFG) / Partition (LeetCode 416) | **`f(i, cap)`**, move on after a pick (Module 06, 03-03, 03-05) |
| 3. Coin Change (GFG / LeetCode 322, 518) / ways to reach a score (GFG) | **`f(i, amount)`**, stay at i after a pick; items in the outer loop count combinations (Module 06, 03-04) |
| 4. Perfect Squares (LeetCode 279) | **Unbounded:** `f(n) = 1 + min f(n − s²)` |
| 5. Number of Dice Rolls With Target Sum (LeetCode 1155) | **`f(dice, target)`,** loop faces 1 … k |
| 6. Greatest Sum Divisible by Three (LeetCode 1262) | **`f(i, sum mod 3)`**: three numbers per index |
| 7. Maximal Square (LeetCode 221) | **`1 + min(up, left, diag)`** |
| 8. Longest Increasing Subsequence (LeetCode 300) | **`f(i)` or patience sorting** (Module 06, 02-04) |
| 9. Maximum Sum Increasing Subsequence (GFG) | **LIS adding values** instead of 1 |
| 10. Longest alternating subsequence (GFG) / Wiggle Subsequence (LeetCode 376) | **Two states:** last move up, last move down |
| 11. Maximum Number of Events That Can Be Attended II (LeetCode 1751) / Weighted Job Scheduling (GFG) | **Pick, then jump** (17-03) |
