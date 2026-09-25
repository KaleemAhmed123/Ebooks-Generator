## Recognition drills: Greedy Moves <span class="lv lv1"></span>

Hide the right column. Name the move, and in one phrase say why it is safe. If you cannot say why, assume it is not.

| Problem | Move & why it is safe |
|---|---|
| 1. Jump Game II (LeetCode 45) / Minimum number of jumps (GFG) | **Extend the reach:** levels are contiguous ranges |
| 2. Minimum Number of Taps to Open to Water a Garden (LeetCode 1326) | **Extend the reach** after turning taps into `reach[left]` |
| 3. Job Sequencing Problem (GFG) | **Latest free slot,** most profitable first |
| 4. Boats to Save People (LeetCode 881) | **Pair the extremes:** heaviest boards, lightest joins if it fits |
| 5. Two City Scheduling (LeetCode 1029) | **Sort by regret:** `costA − costB` |
| 6. Gas Station (LeetCode 134) / Circular tour (GFG) | **Restart when broke,** plus the total check |
| 7. Maximize Sum Of Array After K Negations (LeetCode 1005) | **Parity:** negatives first, leftover parity hits the smallest `|x|` |
| 8. Fractional Knapsack (GFG) | **Sort by value / weight;** splitting items makes greedy exact |
| 9. 0/1 Knapsack (GFG) | **Trap: not greedy.** Items cannot be split; ratio order fails. DP (Chapter 17) |
| 10. Task Scheduler (LeetCode 621) | **Counting bound:** `max(n_tasks, (maxFreq − 1) · (gap + 1) + countOfMax)` |

### The wrong approach

- Greedy on the obvious measure breaks when choices interact; drills 8 and 9 show it, and Module 04 (03-01, 03-07) gives the litmus test
