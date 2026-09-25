## Recognition drills: Greedy Moves 🟢 - continued

| Problem | Move & why it is safe |
|---|---|
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
