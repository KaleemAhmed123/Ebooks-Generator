## Recognition drills: Prefix & Running State <span class="lv lv1"></span> - continued

| Problem | Pattern & the summary |
|---|---|
| 12. [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) (LeetCode 152) | **Drop the baggage** with both `maxHere` and `minHere` |
| 13. [Maximum Subarray Sum with One Deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) (LeetCode 1186) | **Drop the baggage** with a "deleted yet?" state |
| 14. [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) (LeetCode 918) | **Drop the baggage + flip the target:** `total − worst` |
| 15. [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) (LeetCode 304) | **Prefix sums** in two dimensions, inclusion–exclusion |
| 16. [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/) (LeetCode 1109) | **Difference array:** +seats at `first`, −seats after `last` |
| 17. [Car Pooling](https://leetcode.com/problems/car-pooling/) (LeetCode 1094) | **Difference array** over stops; any running sum over capacity fails |

### Score yourself

- **14–17:** you pick the summary from the question, not from the chapter title
- **9–13:** re-check which problems need *two* sides (two passes) and which need one best partner
- **0–8:** reread 03-01, then 03-03: most misses are "equal prefixes" problems in disguise
