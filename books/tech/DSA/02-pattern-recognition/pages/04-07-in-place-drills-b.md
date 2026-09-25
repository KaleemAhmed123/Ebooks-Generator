## Recognition drills: In-Place & Index Tricks 🟢 - continued

| Problem | Trick & the enabling fact |
|---|---|
| 12. Next Greater Element III (LeetCode 556) | **Find the dip** on digits; watch the 32-bit limit |
| 13. Majority Element (LeetCode 169) | **Vote and cancel;** a majority is promised, so no second pass |
| 14. Majority Element II (LeetCode 229) | **Vote and cancel** with two candidates, then verify |
| 15. Elements appearing more than n/k times (GFG) | **k − 1 candidates** (Misra–Gries) or a frequency map if space allows |
| 16. Sort Colors (LeetCode 75) | **Dutch flag** (02-09): three regions, one pass |
| 17. Three way partitioning (GFG) | **Dutch flag** around a range `[a, b]` instead of the values 0, 1, 2 |
| 18. Move all negative numbers to one side (GFG) | **Read/write pointers** (02-08): write each negative at `j++` |
| 19. Wave Array (GFG), sorted input | **Swap pairs:** `swap(a[i], a[i+1])` for even i gives `a0 ≥ a1 ≤ a2 ≥ …` |
| 20. Minimum Swaps to Group All 1's Together II (LeetCode 2134) | **Wrap around** + fixed window of length `ones` |
| 21. House Robber II (LeetCode 213) | **Break the circle:** best of `[0..n−2]` and `[1..n−1]` |
| 22. Next Greater Element II (LeetCode 503) | **Wrap around** + monotonic stack over `2n` steps |

### Score yourself

- **19–22:** you read the constraints ("1..n", "circular", "O(1) space") before the story
- **13–18:** revisit 04-02: bounded values are the most common unlock in this chapter
- **0–12:** reread 04-01 and redo drills 5–10
