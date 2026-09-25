## Recognition drills: Prefix & Running State 🟢 - continued

| Problem | Pattern & the summary |
|---|---|
| 12. Trapping Rain Water (LeetCode 42) | **Two passes:** left max and right max; or two pointers in O(1) space |
| 13. Candy (LeetCode 135) | **Two passes,** the second one keeps the first with `max` |
| 14. Maximum Length Bitonic Subarray (GFG) | **Two passes:** rising run ending at `i`, falling run starting at `i` |
| 15. Kadane's Algorithm (GFG) | **Drop the baggage;** the classic, covered in Module 06 |
| 16. Maximum Product Subarray (LeetCode 152) | **Drop the baggage** with both `maxHere` and `minHere` |
| 17. Maximum Subarray Sum with One Deletion (LeetCode 1186) | **Drop the baggage** with a "deleted yet?" state |
| 18. Maximize sum by flipping the sign of one subarray (GFG) | **Drop the baggage** on `−2 · a[i]`, the gain of flipping |
| 19. Maximum Sum Circular Subarray (LeetCode 918) | **Drop the baggage + flip the target:** `total − worst` |
| 20. Range Sum Query 2D – Immutable (LeetCode 304) | **Prefix sums** in two dimensions, inclusion–exclusion |
| 21. Corporate Flight Bookings (LeetCode 1109) | **Difference array:** +seats at `first`, −seats after `last` |
| 22. Car Pooling (LeetCode 1094) | **Difference array** over stops; any running sum over capacity fails |
| 23. Beautiful Towers II (LeetCode 2866) 🟡 | **Two passes,** each side built with a monotonic stack (Chapter 10): best mountain sum ending at `i` and starting at `i` |

### Score yourself

- **20–23:** you pick the summary from the question, not from the chapter title
- **13–19:** re-check which problems need *two* sides (two passes) and which need one best partner
- **0–12:** reread 03-01, then 03-03: most misses are "equal prefixes" problems in disguise
