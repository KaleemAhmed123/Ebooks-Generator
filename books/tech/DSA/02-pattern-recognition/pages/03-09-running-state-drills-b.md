## Recognition drills after Chapter 3 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Maximum Value of an Ordered Triplet II](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii/) (LeetCode 2874) | 03-05 | **i < j < k**, separable: carry best `a[i]`, then best `a[i] − a[j]` |
| 2 | [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) (LeetCode 1004) | 02-03 | "**at most** k zeros" in the window: record the longest |
| 3 | [Maximum Population Year](https://leetcode.com/problems/maximum-population-year/) (LeetCode 1854) | 03-07 | **ranges** read once: +1 at birth, −1 at death |
| 4 | [Find the Longest Substring Containing Vowels in Even Counts](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/) (LeetCode 1371) | 03-03 | "**even** number of times": a 5-bit parity mask per prefix |
| 5 | [Maximum Absolute Sum of Any Subarray](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) (LeetCode 1749) | 03-06 | "**absolute**": carry the best and the worst sum ending here |
| 6 | [Number of Ways to Split Array](https://leetcode.com/problems/number-of-ways-to-split-array/) (LeetCode 2270) | 03-02 | right sum = **total − left**: one running sum |
| 7 | [Make Sum Divisible by P](https://leetcode.com/problems/make-sum-divisible-by-p/) (LeetCode 1590) | 03-03 | "**multiple of p**": prefix remainders, latest index |
| 8 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238) | 03-04 | "all the **other** values": product before × product after |
| 9 | [Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/) (LeetCode 713) | 02-04 | "**count**", and "below k" is shrink-safe: `right − left + 1` |
| 10 | [Find Good Days to Rob the Bank](https://leetcode.com/problems/find-good-days-to-rob-the-bank/) (LeetCode 2100) | 03-04 | a rule on **both sides**: run lengths from two passes |
| 11 | [Maximum Subarray Sum with One Deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) (LeetCode 1186) | 03-06 | "delete **one**": a second state, deletion used |
| 12 | [Car Pooling](https://leetcode.com/problems/car-pooling/) (LeetCode 1094) | 03-07 | **pick up, drop off**: ±passengers, running sum ≤ seats |

### Score yourself

- **11–12:** you pick the summary from the question, not from the chapter title
- **8–10:** re-check which problems need *two* sides (03-04) and which need one best partner (03-05)
- **0–7:** reread 03-01, then 03-03: most misses are equal-prefix problems in disguise
