### Where it appears

| Problem | What the "jump" skips over |
|---|---|
| [Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling/) (LeetCode 1235) | overlapping jobs — binary search for next valid start |
| [Maximum Number of Events That Can Be Attended II](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/) (LeetCode 1751) | overlapping events — add a k-transaction dimension |
| [Two Best Non-Overlapping Events](https://leetcode.com/problems/two-best-non-overlapping-events/) (LeetCode 2054) | inclusive ends: search `start > end` |

:::interview
"In job scheduling, should the binary search find `start >= end` or `start > end`?"

It depends on whether intervals are half-open or closed. LeetCode 1235 uses `[start, end]` where a job starting at time 3 can follow one ending at time 3 — so search for `start >= end`. Using `>` here misses valid chains: `[1,2]:50, [2,3]:50` scores 50 instead of 100.
:::
