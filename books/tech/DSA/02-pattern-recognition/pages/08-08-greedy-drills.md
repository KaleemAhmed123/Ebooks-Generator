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
| 7. [Maximize Sum Of Array After K Negations](https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/) (LeetCode 1005) | **Parity:** negatives first, leftover parity hits the smallest `|x|` |
| 8. [Fractional Knapsack](https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1) (GFG) | **Sort by value / weight;** splitting items makes greedy exact |
| 9. [0 - 1 Knapsack Problem](https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1) (GFG) | **Trap: not greedy.** Items cannot be split; ratio order fails. DP (Chapter 17) |
| 10. [Task Scheduler](https://leetcode.com/problems/task-scheduler/) (LeetCode 621) | **Counting bound:** `max(n_tasks, (maxFreq − 1) · (gap + 1) + countOfMax)` |

### The wrong approach

- Greedy on the obvious measure breaks when choices interact; drills 8 and 9 show it, and Module 04 (03-01, 03-07) gives the litmus test
