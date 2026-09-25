## Recognition drills: Search Space 🟢

Hide the right column. For every binary search, name *what* is being searched (an index, a value, a partition point) and the monotone predicate that makes halving legal.

| Problem | What is searched & the predicate |
|---|---|
| 1. Find a Fixed Point, value equal to index (GFG), distinct sorted | **Index;** `a[i] − i` is non-decreasing, find where it hits 0 |
| 2. Square root of an integer (GFG / LeetCode 69) | **Answer x;** `x · x ≤ n`, last true |
| 3. Find Nth root of M (GFG) | **Answer x;** `xⁿ ≤ M`, stop the product early once it passes M |
| 4. Search in Rotated Sorted Array (LeetCode 33) | **Index;** pick the sorted half at each mid |
| 5. Find Minimum in Rotated Sorted Array (LeetCode 153) | **Index;** compare with `a[hi]` |
| 6. Peak Index in a Mountain Array (LeetCode 852) | **Index;** slope `a[mid] < a[mid+1]` |
| 7. Searching in an array where adjacent elements differ by at most k (GFG) | **Jump, not halve:** from `i`, skip `max(1, ⌊|a[i] − x| / k⌋)`; x cannot be closer |
| 8. Missing number in an arithmetic progression (GFG) | **Index;** `a[i] === a[0] + i·d` is true before the gap, false after |
| 9. Koko Eating Bananas (LeetCode 875) | **Answer speed;** hours needed ≤ h (18-14) |
| 10. Aggressive Cows (SPOJ AGGRCOW) | **Answer gap;** can place c cows with gap ≥ g (18-14) |
| 11. Allocate Minimum Number of Pages (GFG) / Painter's Partition | **Answer max load;** students needed ≤ m |
| 12. Capacity To Ship Packages Within D Days (LeetCode 1011) | **Answer capacity;** days needed ≤ D |
| 13. EKO (SPOJ EKO) | **Answer saw height;** wood collected ≥ M, last true |
| 14. ROTI-PRATA (SPOJ PRATA) | **Answer time;** cooks can make ≥ P prata, each cook's count found by a small inner loop |
| 15. Minimize the Maximum Difference of Pairs (LeetCode 2616) | **Answer d;** after sorting, greedily pair neighbours with difference ≤ d; can we get p pairs? |
| 16. Smallest number with at least n trailing zeros in factorial (GFG) | **Answer x;** `⌊x/5⌋ + ⌊x/25⌋ + … ≥ n` |
| 17. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Value;** count `≤ x` by staircase |
| 18. Find K-th Smallest Pair Distance (LeetCode 719) | **Value;** count pairs `≤ d` with two pointers |
| 19. Bishu and Soldiers (HackerEarth) | **Sort + prefix sums;** upper bound per query gives count and sum |
| 20. Search in a sorted array of unknown size | **Exponential search** for `hi`, then ordinary binary search |
| 21. K-th element of two sorted arrays (GFG) 🟡 | **Partition point** `i` in A (with `k − i` from B): valid when both cross-pairs are ordered |
| 22. Median of Two Sorted Arrays (LeetCode 4) 🔴 | **Partition point** of the shorter array; O(log min(n, m)) |
| 23. Minimum Absolute Difference Between Elements With Constraint (LeetCode 2817) | **Not halving an array:** keep the allowed elements sorted as you go and bisect (15-07) |

### Score yourself

- **19–23:** you name the predicate before the loop
- **12–18:** reread 18-11 to 18-14; most misses are "binary search on the answer"
- **0–11:** start with 07-04 and 09-02, then redo drills 1–8
