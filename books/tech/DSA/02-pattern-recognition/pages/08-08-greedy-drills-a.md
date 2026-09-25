## Recognition drills: Greedy Moves <span class="lv lv1"></span>

Hide the right column. Name the move, and in one phrase say why it is safe. If you cannot say why, assume it is not.

| Problem | Move & why it is safe |
|---|---|
| 1. Jump Game II (LeetCode 45) / Minimum number of jumps (GFG) | **Extend the reach:** levels are contiguous ranges |
| 2. Minimum Number of Taps to Open to Water a Garden (LeetCode 1326) | **Extend the reach** after turning taps into `reach[left]` |
| 3. Job Sequencing Problem (GFG) | **Latest free slot,** most profitable first |
| 4. Boats to Save People (LeetCode 881) | **Pair the extremes:** heaviest boards, lightest joins if it fits |
| 5. Maximum Product of Three Numbers (LeetCode 628) | **First X, last Y:** three largest, or two smallest × largest |
| 6. Assign Mice to Holes (GFG) | **Sort both, pair in order;** answer is the largest gap |
| 7. Shop in Candy Store (GFG) | **Both ends:** buy the cheapest, take the k priciest free |
| 8. Two City Scheduling (LeetCode 1029) | **Sort by regret:** `costA − costB` |
| 9. Maximum Tip Calculator (GFG) | **Sort by regret:** `|a − b|` descending, respect capacities |
| 10. Gas Station (LeetCode 134) / Circular tour (GFG) | **Restart when broke,** plus the total check |
| 11. Bulb Switcher (LeetCode 319) | **Invariant:** only perfect squares have an odd number of divisors |
