## Recognition drills: Search Space, named problems <span class="lv lv1"></span>

Hide the right column. For every binary search, name *what* is being searched (an index, a value, a partition point) and the monotone predicate that makes halving legal.

| Problem | What is searched & the predicate |
|---|---|
| 1. Square root of an integer (GFG / LeetCode 69) | **Answer x;** `x · x ≤ n`, last true |
| 2. Search in Rotated Sorted Array (LeetCode 33) | **Index;** pick the sorted half at each mid |
| 3. Find Minimum in Rotated Sorted Array (LeetCode 153) | **Index;** compare with `a[hi]` |
| 4. Peak Index in a Mountain Array (LeetCode 852) | **Index;** slope `a[mid] < a[mid+1]` |
| 5. Koko Eating Bananas (LeetCode 875) | **Answer speed;** hours needed ≤ h (09-02) |
| 6. Aggressive Cows (SPOJ AGGRCOW) | **Answer gap;** can place c cows with gap ≥ g (09-02) |
| 7. Allocate Minimum Number of Pages (GFG) / Painter's Partition | **Answer max load;** students needed ≤ m |
| 8. Capacity To Ship Packages Within D Days (LeetCode 1011) | **Answer capacity;** days needed ≤ D |
| 9. Minimize the Maximum Difference of Pairs (LeetCode 2616) | **Answer d;** after sorting, greedily pair neighbours with difference ≤ d; can we get p pairs? |
| 10. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Value;** count `≤ x` by staircase |
| 11. Find K-th Smallest Pair Distance (LeetCode 719) | **Value;** count pairs `≤ d` with two pointers |
| 12. K-th element of two sorted arrays (GFG) <span class="lv lv2"></span> | **Partition point** `i` in A (with `k − i` from B): valid when both cross-pairs are ordered |
| 13. Median of Two Sorted Arrays (LeetCode 4) <span class="lv lv3"></span> | **Partition point** of the shorter array; O(log min(n, m)) |

### Score yourself

- **11–13:** you name the predicate before the loop
- **7–10:** reread 09-02; most misses are "binary search on the answer"
- **0–6:** start with 07-04 and 09-02, then redo drills 1–4
