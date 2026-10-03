### Where it appears

| Problem | What the "price" measures |
|---|---|
| [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) (LeetCode 1029) | `costA − costB`: extra cost of sending to A |
| [Minimum Initial Energy to Finish Tasks](https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks/) (LeetCode 1665) | `minimum − actual`: wasted reserve per task |

:::interview
"Why sort by the signed difference, not the absolute difference?"

The absolute difference tells you how much a person *cares* but not which city they prefer. `|costA − costB|` = 10 could mean A is cheaper by 10 or B is cheaper by 10. Sorting by `costA − costB` preserves direction: negative means A is cheaper, positive means B is cheaper. Send the most negative to A and the most positive to B.
:::
