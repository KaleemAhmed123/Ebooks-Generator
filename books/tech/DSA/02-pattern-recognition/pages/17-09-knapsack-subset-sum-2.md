### Where it appears

| Problem | The budget dimension |
|---|---|
| Partition Equal Subset Sum (LeetCode 416) | reach sum total/2 (0/1) |
| Coin Change (LeetCode 322) | fewest coins for amount (unbounded → ascend) |
| Target Sum (LeetCode 494) | count subsets summing to a target |
| Ones and Zeroes (LeetCode 474) | two budgets: zeros and ones |
| Last Stone Weight II (LeetCode 1049) | split into two nearest-equal piles |

- **Go deeper:** unbounded knapsack, bounded (count-limited) items, and the value-form proofs are in Module 06.

:::interview
"0/1 knapsack in one array — why iterate the capacity downward?"

Downward means when you compute `dp[s]` you read `dp[s - w]` from the *previous* item's pass, so item i is counted at most once. Iterating upward reads `dp[s - w]` already updated by item i in this same pass, which reuses it — correct only for unbounded knapsack, wrong for 0/1.
:::
