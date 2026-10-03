### Where it appears

| Problem | How many candidates survive |
|---|---|
| [Majority Element](https://leetcode.com/problems/majority-element/) (LeetCode 169) | one candidate (> n/2 guaranteed) |
| [Majority Element II](https://leetcode.com/problems/majority-element-ii/) (LeetCode 229) | two candidates (> n/3); verify both in a second pass |
| [Minimum Index of a Valid Split](https://leetcode.com/problems/minimum-index-of-a-valid-split/) (LeetCode 2780) | vote first, then a prefix count to find the split |

:::interview
"Why do you need a verification pass for Majority Element II?"

The vote can leave a candidate that is not actually a majority. With two candidates and > n/3 threshold, up to two values qualify, but the algorithm always fills both slots — even when only one (or none) is above the threshold. The second pass counts each candidate's actual frequency to confirm.
:::
