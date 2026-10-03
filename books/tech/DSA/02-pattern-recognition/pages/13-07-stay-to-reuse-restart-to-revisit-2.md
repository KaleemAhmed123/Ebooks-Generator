### Where it appears

| Problem | Stay or restart |
|---|---|
| [Combination Sum](https://leetcode.com/problems/combination-sum/) (LeetCode 39) | stay — reuse the same candidate |
| [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (LeetCode 518) | stay — memoise `(i, amount)` for combinations |
| [Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/) (LeetCode 377) | restart — memoise only the target, counts sequences |
| [Count All Possible Routes](https://leetcode.com/problems/count-all-possible-routes/) (LeetCode 1575) | restart — any city, memoise `(city, fuel)` |

:::interview
"Coin Change II (518) and Combination Sum IV (377) take the same input. Why do they give different answers?"

518 counts *combinations* (order does not matter): `[1, 2]` and `[2, 1]` are the same. 377 counts *sequences* (order matters): they are different. The difference is stay vs restart: staying at the same index forces a non-decreasing order, collapsing permutations into one; restarting at 0 allows every ordering.
:::
