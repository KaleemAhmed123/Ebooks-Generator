## Recognition drills after Chapter 2 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Grumpy Bookstore Owner](https://leetcode.com/problems/grumpy-bookstore-owner/) (LeetCode 1052) | 02-02 | "m **consecutive** minutes": a fixed window |
| 2 | [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) (LeetCode 424) | 02-03 | "**at most** k replacements": valid while `len − maxCount ≤ k` |
| 3 | [Count Subarrays Where Max Element Appears at Least K Times](https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/) (LeetCode 2962) | 02-04 | "**at least** k times" survives growing: add `left` |
| 4 | [Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers/) (LeetCode 633) | 02-08 | candidates `0..√c` are **sorted**: collide |
| 5 | [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/) (LeetCode 930) | 02-05 | "**exactly**": `atMost(goal) − atMost(goal − 1)` |
| 6 | [Minimum Difference Between Largest and Smallest Value in Three Moves](https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/) (LeetCode 1509) | 02-07 | only the **values** matter: sort, best window of n − 3 |
| 7 | [Maximum Erasure Value](https://leetcode.com/problems/maximum-erasure-value/) (LeetCode 1695) | 02-03 | "**no value repeats**": shrink while a repeat is inside |
| 8 | [Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number/) (LeetCode 611) | 02-10 | **triples**, order free: sort, fix the longest side, collide |
| 9 | [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/) (LeetCode 523) | 03-03 | "**multiple of k**" is a remainder: equal prefixes |
| 10 | [Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/) (LeetCode 1423) | 02-06 | "from **either end**": keep a window of n − k |
| 11 | [Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity/) (LeetCode 905) | 02-09 | two groups, **in place**, order free: a writer for the evens |
| 12 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) (LeetCode 11) | 02-08 | area capped by the **shorter** line: move it |

### Score yourself

- **11–12:** you decide from monotonicity, not from the word "subarray"
- **8–10:** you mix up "longest", "count" and "exactly": reread 02-04, 02-05
- **0–7:** reread 02-03 and 02-11
