## Recognition drills: DP & Games <span class="lv lv2"></span>

Hide the right column. Say the signature first (17-02), then the transition. Module references point at Module 06.

| Problem | Signature · transition |
|---|---|
| 1. [Delete and Earn](https://leetcode.com/problems/delete-and-earn/) (LeetCode 740) | **Sum per value, then House Robber** over values (Module 06, 02-02) |
| 2. [0 - 1 Knapsack Problem](https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1) (GFG) / [Subset Sum Problem](https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1) (GFG) / [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) (LeetCode 416) | **`f(i, cap)`**, move on after a pick (Module 06, 03-03, 03-05) |
| 3. [Coin Change](https://leetcode.com/problems/coin-change/) (LeetCode 322) / [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (LeetCode 518) | **`f(i, amount)`**, stay at i after a pick; items in the outer loop count combinations (Module 06, 03-04) |
| 4. [Perfect Squares](https://leetcode.com/problems/perfect-squares/) (LeetCode 279) | **Unbounded:** `f(n) = 1 + min f(n − s²)` |
| 5. [Number of Dice Rolls With Target Sum](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/) (LeetCode 1155) | **`f(dice, target)`,** loop faces 1 … k |
| 6. [Greatest Sum Divisible by Three](https://leetcode.com/problems/greatest-sum-divisible-by-three/) (LeetCode 1262) | **`f(i, sum mod 3)`**: three numbers per index |
| 7. [Maximal Square](https://leetcode.com/problems/maximal-square/) (LeetCode 221) | **`1 + min(up, left, diag)`** |
| 8. [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) (LeetCode 300) | **`f(i)` or patience sorting** (Module 06, 02-04) |
| 9. [Max Sum Increasing Subsequence](https://www.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1) (GFG) | **LIS adding values** instead of 1 |
| 10. [Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence/) (LeetCode 376) / [Longest alternating subsequence](https://www.geeksforgeeks.org/problems/longest-alternating-subsequence5951/1) (GFG) | **Two states:** last move up, last move down |
| 11. [Maximum Number of Events That Can Be Attended II](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/) (LeetCode 1751) / [Weighted Job Scheduling](https://www.geeksforgeeks.org/problems/weighted-job-scheduling/1) (GFG) | **Pick, then jump** (17-03) |
