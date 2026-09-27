## Recognition drills after Chapter 8 - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Patching Array](https://leetcode.com/problems/patching-array/) (LeetCode 330) | 08-02 | "every value 1 to n": the covered range `[1, miss)` only grows; patch with `miss` at a gap |
| 2 | [Divide Players Into Teams of Equal Skill](https://leetcode.com/problems/divide-players-into-teams-of-equal-skill/) (LeetCode 2491) | 08-04 | everyone paired: sort, match smallest with largest, check every sum |
| 3 | [Jump Game II](https://leetcode.com/problems/jump-game-ii/) (LeetCode 45) | 08-02 | "at most": levels are contiguous ranges, extend `far` |
| 4 | [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) (LeetCode 1029) | 08-05 | two sides with quotas: sort by `costA − costB` |
| 5 | [Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain/) (LeetCode 646) | 07-07 | "any order", keep the most: sort by end, as in activity selection |
| 6 | [Gas Station](https://leetcode.com/problems/gas-station/) (LeetCode 134) | 08-06 | "loop": restart after each negative tank, plus the total check |
| 7 | [Stone Game VI](https://leetcode.com/problems/stone-game-vi/) (LeetCode 1686) | 08-05 | taking a stone gains `a` and denies `b`: sort by `a + b`, no game DP needed |
| 8 | [Job Sequencing Problem](https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1) (GFG) | 08-03 | "one unit of time": most profitable first, latest free slot |
| 9 | [Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling/) (LeetCode 1235) | 17-03 | jobs have *lengths* and *weights*: greedy by end fails; pick, then jump |
| 10 | [Video Stitching](https://leetcode.com/problems/video-stitching/) (LeetCode 1024) | 08-02 | cover a line with the fewest pieces: turn clips into reach, run the level loop |
| 11 | [Boats to Save People](https://leetcode.com/problems/boats-to-save-people/) (LeetCode 881) | 08-04 | "at most two": heaviest boards, lightest joins if it fits |
| 12 | [Minimum Value to Get Positive Step by Step Sum](https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/) (LeetCode 1413) | 03-02 | looks like 08-06, but there is no loop and no choice of start: `1 − min(prefix sum)`, at least 1 |

### Score yourself

- **11–12:** you name the move and its proof in one breath
- **8–10:** reread 08-01's counter-example table and the missed pages
- **5–7:** reread 08-01, then 08-02 against 08-06
- **0–4:** redo 08-02 to 08-06, then this drill in a week
