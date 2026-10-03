### Where it appears

| Problem | What limits the popping |
|---|---|
| [Remove K Digits](https://leetcode.com/problems/remove-k-digits/) (LeetCode 402) | k remaining deletions |
| [Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/) (LeetCode 316) | top must appear again later |
| [Find the Most Competitive Subsequence](https://leetcode.com/problems/find-the-most-competitive-subsequence/) (LeetCode 1673) | enough items must remain to reach length k |

:::interview
"After the loop, why cut from the tail and not the front?"

The stack holds an increasing (or non-decreasing) suffix — the most significant positions are already minimal. If you still owe deletions, the worst digits are at the tail (the least significant, largest positions). Cutting from the front would discard the most valuable positions you already optimised.
:::
