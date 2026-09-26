## Recognition drills: Search Space, named problems <span class="lv lv1"></span>

Hide the right column. For every binary search, name *what* is being searched (an index, a value, a partition point) and the monotone predicate that makes halving legal.

| Problem | What is searched & the predicate |
|---|---|
| 1. [Sqrt(x)](https://leetcode.com/problems/sqrtx/) (LeetCode 69) / [Square Root](https://www.geeksforgeeks.org/problems/square-root/1) (GFG) | **Answer x;** `x · x ≤ n`, last true |
| 2. [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (LeetCode 33) | **Index;** pick the sorted half at each mid |
| 3. [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) (LeetCode 153) | **Index;** compare with `a[hi]` |
| 4. [Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/) (LeetCode 852) | **Index;** slope `a[mid] < a[mid+1]` |
| 5. [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) | **Answer speed;** hours needed ≤ h (09-02) |
| 6. [Aggressive cows](https://www.spoj.com/problems/AGGRCOW/) (SPOJ AGGRCOW) | **Answer gap;** can place c cows with gap ≥ g (09-02) |
| 7. [Allocate Minimum Pages](https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1) (GFG) / [The Painter's Partition Problem-II](https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1) (GFG) | **Answer max load;** students needed ≤ m |
| 8. [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) (LeetCode 1011) | **Answer capacity;** days needed ≤ D |
| 9. [Minimize the Maximum Difference of Pairs](https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs/) (LeetCode 2616) | **Answer d;** after sorting, greedily pair neighbours with difference ≤ d; can we get p pairs? |
| 10. [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378) | **Value;** count `≤ x` by staircase |
| 11. [Find K-th Smallest Pair Distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance/) (LeetCode 719) | **Value;** count pairs `≤ d` with two pointers |
