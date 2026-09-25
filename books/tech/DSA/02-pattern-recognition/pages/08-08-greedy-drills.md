## Recognition drills: Greedy Moves 🟢

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
| 12. Bulbs where a switch flips every bulb to its right (GFG) | **Invariant:** carry the parity of presses |
| 13. Maximize Sum Of Array After K Negations (LeetCode 1005) | **Invariant:** negatives first, leftover parity hits the smallest `|x|` |
| 14. Minimum Replacements to Sort the Array (LeetCode 2366) | **Right to left,** split into `⌈x/m⌉` equal parts |
| 15. Fractional Knapsack (GFG) | **Sort by value / weight;** splitting items makes greedy exact |
| 16. 0/1 Knapsack (GFG) | **Trap: not greedy.** Items cannot be split; ratio order fails. DP (Chapter 17) |
| 17. Minimum number of coins (GFG), Indian currency | **Largest coin first** works for this *canonical* coin system only; `{1, 3, 4}` breaks it |
| 18. Largest Permutation with at most K swaps (GFG) | **Front first:** put the largest remaining value at the next position, using an index map for O(1) swaps |
| 19. Choose and Swap (GFG) | **First improvable character:** in first-occurrence order, the first `c` for which some smaller character first appears later; swap every `c` with the *smallest* such character |
| 20. Minimum Cost to cut a board into squares (GFG) | **Most expensive cut first;** its cost multiplies by the pieces in the other direction |
| 21. Maximize `Σ a[i] · i` (GFG) | **Sort ascending** (rearrangement inequality) |
| 22. Smallest subset with sum greater than the rest (GFG) | **Sort descending,** take until the taken sum exceeds the rest |
| 23. Task Scheduler (LeetCode 621) | **Counting bound:** `max(n_tasks, (maxFreq − 1) · (gap + 1) + countOfMax)` |
| 24. Minimum Cost of Ropes (GFG) | **Merge the two smallest** (15-05) |
| 25. Minimum Number of Refueling Stops (LeetCode 871) | **Take now, regret later** (15-06) |

### The wrong approach: Greedy

- **Naive idea:** pick the locally best-looking item by the obvious measure: biggest coin, earliest start, cheapest city
- **Why it looks right:** it matches every sample input, which are usually small and friendly
- **Why it breaks:** the obvious measure ignores interaction between choices; drills 16 and 17 are the classic cases
- **The fix:** try to break the move on 3–4 hand-made elements first. If you cannot, find the exchange or stays-ahead argument (Module 04). If you can, the problem wants DP or search
