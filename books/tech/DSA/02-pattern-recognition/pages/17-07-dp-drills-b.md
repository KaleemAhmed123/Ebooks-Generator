## Recognition drills after Chapter 17 <span class="lv lv2"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Minimum Number of Work Sessions to Finish the Tasks](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/) (LeetCode 1986) | 17-02 | "at most 14": `f(mask)` over the tasks already done |
| 2 | [Maximum Length of Subarray With Positive Product](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/) (LeetCode 1567) | 03-06 | "product": longest positive and negative runs ending here |
| 3 | [Maximize the Profit as the Salesman](https://leetcode.com/problems/maximize-the-profit-as-the-salesman/) (LeetCode 2830) | 17-03 | "contiguous block": sort by start; pick jumps past the end |
| 4 | [Stone Game VII](https://leetcode.com/problems/stone-game-vii/) (LeetCode 1690) | 17-06 | "maximises … minimises": one lead per range |
| 5 | [Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/) (LeetCode 115) | 17-02 | "`s` … equals `t`": `f(i, j)`, one index per string |
| 6 | [Minimum Cost Tree From Leaf Values](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/) (LeetCode 1130) | 17-05 | "fixed order", 40 leaves: the root splits the range, O(n³) |
| 7 | [Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) (LeetCode 714) | 17-04 | "one share at a time": hold and free; the fee sits on the sell edge |
| 8 | [Delete and Earn](https://leetcode.com/problems/delete-and-earn/) (LeetCode 740) | 17-02 | "one above and one below": sum per value, then House Robber |
| 9 | [Minimize Maximum of Array](https://leetcode.com/problems/minimize-maximum-of-array/) (LeetCode 2439) | 09-02 | "minimise the largest": test a cap, carrying excess left from the right |
| 10 | [Maximum Alternating Subsequence Sum](https://leetcode.com/problems/maximum-alternating-subsequence-sum/) (LeetCode 1911) | 17-04 | "even minus odd positions": two states, next pick adds or subtracts |
| 11 | [Can I Win](https://leetcode.com/problems/can-i-win/) (LeetCode 464) | 17-06 | "unused", m ≤ 20: a position is a mask; win if a move reaches a loss |
| 12 | [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312) | 17-05 | "current neighbours": the *last* removal in `(i, j)` splits it |

### Score yourself

- **10–12:** you name the signature from the statement and n alone
- **6–9:** reread 17-01 and 17-02; most misses pick a table before a signature
- **0–5:** redo rows 1, 5 and 8; each is one signature read from n or the input shape
