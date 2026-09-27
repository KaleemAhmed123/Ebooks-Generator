## Recognition drills after Chapter 9 - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Count Negative Numbers in a Sorted Matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/) (LeetCode 1351) | 05-04 | rows *and* columns sorted: a staircase walk, O(m + n) |
| 2 | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) | 09-02 | "slowest rate that works": first T of hours(rate) ≤ h |
| 3 | [K-th Smallest Prime Fraction](https://leetcode.com/problems/k-th-smallest-prime-fraction/) (LeetCode 786) | 09-04 | k-th of n² fractions: guess a real x, count ≤ x by two pointers |
| 4 | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (LeetCode 33) | 09-03 | "cut and swapped": one side of `mid` is sorted; test the target against it |
| 5 | [Maximum Candies Allocated to K Children](https://leetcode.com/problems/maximum-candies-allocated-to-k-children/) (LeetCode 2226) | 09-02 | "maximise": last T of `Σ ⌊pile / x⌋ ≥ k` |
| 6 | [Get Equal Substrings Within Budget](https://leetcode.com/problems/get-equal-substrings-within-budget/) (LeetCode 1208) | 02-03 | non-negative costs: a variable window, O(n), no log |
| 7 | [Find K-th Smallest Pair Distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance/) (LeetCode 719) | 09-04 | k-th of n² distances: sort, count pairs ≤ d with two pointers |
| 8 | [Find a Peak Element II](https://leetcode.com/problems/find-a-peak-element-ii/) (LeetCode 1901) | 09-03 | halve the columns; move toward the larger neighbour of the column maximum |
| 9 | [Sqrt(x)](https://leetcode.com/problems/sqrtx/) (LeetCode 69) | 09-02 | "rounded down": last T of `r · r ≤ x` |
| 10 | [Aggressive cows](https://www.spoj.com/problems/AGGRCOW/) (SPOJ AGGRCOW) | 09-02 | "closest two as far apart as possible": last T of "c cows fit with gap ≥ g" |
| 11 | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) (LeetCode 153) | 09-03 | compare `a[mid]` with `a[hi]`, never `a[lo]` |
| 12 | [Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/) (LeetCode 1482) | 09-02 | "first day": first T of "m runs of k bloomed flowers by day d" |
| 13 | [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378) | 09-04 | "less than O(n²) memory": guess a value, count ≤ x by staircase |

### Score yourself

- **12–13:** you name what is searched before writing the loop
- **8–11:** reread the two axes on 09-02, then 09-02 against 09-04
- **0–7:** redo 09-02 to 09-04 and Module 04 (01-02 to 01-05), then this drill in a week
