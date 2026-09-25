## Recognition drills: Search Space, named problems <span class="lv lv1"></span> - continued

| Problem | What is searched & the predicate |
|---|---|
| 12. Capacity To Ship Packages Within D Days (LeetCode 1011) | **Answer capacity;** days needed ≤ D |
| 13. EKO (SPOJ EKO) | **Answer saw height;** wood collected ≥ M, last true |
| 14. ROTI-PRATA (SPOJ PRATA) | **Answer time;** cooks can make ≥ P prata, each cook's count found by a small inner loop |
| 15. Minimize the Maximum Difference of Pairs (LeetCode 2616) | **Answer d;** after sorting, greedily pair neighbours with difference ≤ d; can we get p pairs? |
| 16. Smallest factorial number: at least n trailing zeros (GFG) | **Answer x;** `⌊x/5⌋ + ⌊x/25⌋ + … ≥ n` |
| 17. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Value;** count `≤ x` by staircase |
| 18. Find K-th Smallest Pair Distance (LeetCode 719) | **Value;** count pairs `≤ d` with two pointers |
| 19. Bishu and Soldiers (HackerEarth) | **Sort + prefix sums;** upper bound per query gives count and sum |
| 20. Search in a sorted array of unknown size | **Exponential search** for `hi`, then ordinary binary search |
| 21. K-th element of two sorted arrays (GFG) <span class="lv lv2"></span> | **Partition point** `i` in A (with `k − i` from B): valid when both cross-pairs are ordered |
| 22. Median of Two Sorted Arrays (LeetCode 4) <span class="lv lv3"></span> | **Partition point** of the shorter array; O(log min(n, m)) |
| 23. Minimum Absolute Difference Between Elements With Constraint (LeetCode 2817) | **Not halving an array:** keep the allowed elements sorted as you go and bisect (15-07) |

### Score yourself

- **19–23:** you name the predicate before the loop
- **12–18:** reread 18-11 to 18-14; most misses are "binary search on the answer"
- **0–11:** start with 07-04 and 09-02, then redo drills 1–8
