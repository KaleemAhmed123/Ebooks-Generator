## Recognition drills: Recursion & Backtracking 🟢 - continued

| Problem | Template & next call |
|---|---|
| 26. N-Queens (LeetCode 51) | **Place, check, undo** with column and diagonal sets |
| 27. Sudoku Solver (LeetCode 37) | **Place, check, undo** with row/column/box sets |
| 28. Partition to K Equal Sum Subsets (LeetCode 698) / Fair Distribution of Cookies (LeetCode 2305) | **Items into buckets,** biggest first, skip equal-sum buckets |
| 29. Largest number in K swaps (GFG) 🟡 | **Place, check, undo:** at each position swap in every larger digit to its right that equals the maximum, recurse with k − 1 |
| 30. Partition Array Into Two Arrays to Minimize Sum Difference, up to 30 numbers (LeetCode 2035) 🔴 | **Not plain backtracking:** 2³⁰ is too many; split in halves (meet in the middle, 19-09) |

### Score yourself

- **25–30:** you choose the start index of the next call before writing the loop
- **15–24:** reread 13-05 to 13-08; most misses are "once, reuse, or reorder?"
- **0–14:** go back to 13-01 and write the hypothesis for every drill before its code
