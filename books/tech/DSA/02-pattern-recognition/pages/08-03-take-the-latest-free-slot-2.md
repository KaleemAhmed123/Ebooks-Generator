### Where it appears

| Problem | What fills the slots |
|---|---|
| [Job Sequencing](https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1) (GFG) | unit-time jobs placed by deadline |
| [Course Schedule III](https://leetcode.com/problems/course-schedule-iii/) (LeetCode 630) | variable-length jobs; regret heap (→ 15-06) |

:::interview
"Why place each job in the latest free slot, not the earliest?"

Placing it early wastes a slot that a future job with a tighter deadline might need. The latest slot satisfying the deadline preserves the most options. This is the greedy exchange argument: swapping a late-placed job to an earlier slot never helps, but moving an early one later can save a tighter job.
:::
