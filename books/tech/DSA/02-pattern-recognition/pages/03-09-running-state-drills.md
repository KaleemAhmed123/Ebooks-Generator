## Recognition drills: Prefix & Running State <span class="lv lv1"></span>

Hide the right column. Name the summary you would carry through one pass, and whether you store a count, a first index, or a best value.

| Problem | Pattern & the summary |
|---|---|
| 1. Subarray with 0 sum (GFG) | **Equal prefixes.** A repeated prefix sum brackets a zero-sum subarray; a `Set` is enough |
| 2. Subarray Sums Divisible by K (LeetCode 974) | **Equal prefixes,** code = normalised `sum mod k`, store counts |
| 3. Continuous Subarray Sum (LeetCode 523) | **Equal prefixes,** first index per remainder, length ≥ 2 |
| 4. Longest subarray with equal odd and even elements (GFG) | **Equal prefixes,** code = running `+1 odd / −1 even`, first index |
| 5. Best Time to Buy and Sell Stock (LeetCode 121) | **Best partner so far:** the cheapest price seen |
| 6. Best Sightseeing Pair (LeetCode 1014) | **Best partner so far:** split into `v[i] + i` and `v[j] − j` |
| 7. Equilibrium Point (GFG) | **Running sum:** right side = `total − left − a[i]` |
| 8. Product of Array Except Self (LeetCode 238) | **Two passes:** product before `i`, product after `i` |
| 9. Trapping Rain Water (LeetCode 42) | **Two passes:** left max and right max; or two pointers in O(1) space |
| 10. Candy (LeetCode 135) | **Two passes,** the second one keeps the first with `max` |
| 11. Kadane's Algorithm (GFG) | **Drop the baggage;** the classic, covered in Module 06 |
| 12. Maximum Product Subarray (LeetCode 152) | **Drop the baggage** with both `maxHere` and `minHere` |
| 13. Maximum Subarray Sum with One Deletion (LeetCode 1186) | **Drop the baggage** with a "deleted yet?" state |
| 14. Maximum Sum Circular Subarray (LeetCode 918) | **Drop the baggage + flip the target:** `total − worst` |
| 15. Range Sum Query 2D – Immutable (LeetCode 304) | **Prefix sums** in two dimensions, inclusion–exclusion |
| 16. Corporate Flight Bookings (LeetCode 1109) | **Difference array:** +seats at `first`, −seats after `last` |
| 17. Car Pooling (LeetCode 1094) | **Difference array** over stops; any running sum over capacity fails |

### Score yourself

- **14–17:** you pick the summary from the question, not from the chapter title
- **9–13:** re-check which problems need *two* sides (two passes) and which need one best partner
- **0–8:** reread 03-01, then 03-03: most misses are "equal prefixes" problems in disguise
