### Where it appears

| Problem | What extra state you track |
|---|---|
| [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) (LeetCode 188) | `hold[j]` / `free[j]` for j transactions |
| [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) (LeetCode 122) | unlimited: sum every rise, no k needed |
| [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) (LeetCode 123) | k = 2 |
| [with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) (LeetCode 309) | a third state: "just sold" (can't buy next day) |
| [with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) (LeetCode 714) | subtract the fee on the sell edge |

:::interview
"Stock II is 'unlimited transactions'. Why not just DP it?"

You can — but unlimited means `free` and `hold` are just two variables, no k dimension. Even simpler: sum every positive difference `prices[i] − prices[i−1]`. Every rise is a profit you would have captured by buying the day before and selling today. O(n) time, O(1) space, one line of logic.
:::
