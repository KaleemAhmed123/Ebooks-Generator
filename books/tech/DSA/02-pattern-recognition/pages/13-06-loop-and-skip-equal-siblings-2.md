### Where it appears

| Problem | What the skip-equal rule prevents |
|---|---|
| [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) (LeetCode 40) | duplicate combinations from repeated values |
| [Subsets II](https://leetcode.com/problems/subsets-ii/) (LeetCode 90) | duplicate subsets — record every node, not only leaves |
| [Combination Sum III](https://leetcode.com/problems/combination-sum-iii/) (LeetCode 216) | digits 1–9, no repeats — skip equal siblings naturally |

:::interview
"Why is the condition `i > start` and not `i > 0`?"

`i > 0` skips every occurrence of a duplicate after the first in the *entire array*. That prevents `[1, 1, 6]` from forming — the second 1 is always skipped. `i > start` only skips duplicates *among siblings at the same recursion level*: the second 1 is allowed as a child of the first 1, just not as a sibling.
:::
