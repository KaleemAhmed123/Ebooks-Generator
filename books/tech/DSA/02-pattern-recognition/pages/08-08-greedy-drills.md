## Recognition drills: Greedy Moves <span class="lv lv1"></span>

Hide the right column. Name the move, and in one phrase say why it is safe. If you cannot say why, assume it is not.

| Problem | Move & why it is safe |
|---|---|
| 1. [Jump Game II](https://leetcode.com/problems/jump-game-ii/) (LeetCode 45) / [Minimum Jumps](https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1) (GFG) | **Extend the reach:** levels are contiguous ranges |
| 2. [Minimum Number of Taps to Open to Water a Garden](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/) (LeetCode 1326) | **Extend the reach** after turning taps into `reach[left]` |
| 3. [Job Sequencing Problem](https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1) (GFG) | **Latest free slot,** most profitable first |
| 4. [Boats to Save People](https://leetcode.com/problems/boats-to-save-people/) (LeetCode 881) | **Pair the extremes:** heaviest boards, lightest joins if it fits |
| 5. [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) (LeetCode 1029) | **Sort by regret:** `costA − costB` |
| 6. [Gas Station](https://leetcode.com/problems/gas-station/) (LeetCode 134) / [Gas Station](https://www.geeksforgeeks.org/problems/circular-tour-1587115620/1) (GFG) | **Restart when broke,** plus the total check |
| 7. [Fractional Knapsack](https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1) (GFG) | **Sort by value / weight;** splitting items makes greedy exact |
| 8. [Task Scheduler](https://leetcode.com/problems/task-scheduler/) (LeetCode 621) | **Counting bound:** `max(n_tasks, (maxFreq − 1) · (gap + 1) + countOfMax)` |

### The wrong approach

- Greedy on the obvious measure breaks when choices interact; drill 7 is greedy only because items can be split; the 0/1 version is DP (17-07). Module 04 (03-01, 03-07) gives the litmus test
