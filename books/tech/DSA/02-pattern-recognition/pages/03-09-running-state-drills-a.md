## Recognition drills: Prefix & Running State <span class="lv lv1"></span>

Hide the right column. Name the summary you would carry through one pass, and whether you store a count, a first index, or a best value.

| Problem | Pattern & the summary |
|---|---|
| 1. [Zero Sum Subarray](https://www.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1) (GFG) | **Equal prefixes.** A repeated prefix sum brackets a zero-sum subarray; a `Set` is enough |
| 2. [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/) (LeetCode 974) | **Equal prefixes,** code = normalised `sum mod k`, store counts |
| 3. [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/) (LeetCode 523) | **Equal prefixes,** first index per remainder, length ≥ 2 |
| 4. Longest subarray with equal odd and even elements | **Equal prefixes,** code = running `+1 odd / −1 even`, first index |
| 5. [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) (LeetCode 121) | **Best partner so far:** the cheapest price seen |
| 6. [Best Sightseeing Pair](https://leetcode.com/problems/best-sightseeing-pair/) (LeetCode 1014) | **Best partner so far:** split into `v[i] + i` and `v[j] − j` |
| 7. [Equilibrium Point](https://www.geeksforgeeks.org/problems/equilibrium-point-1587115620/1) (GFG) | **Running sum:** right side = `total − left − a[i]` |
| 8. [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238) | **Two passes:** product before `i`, product after `i` |
| 9. [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (LeetCode 42) | **Two passes:** left max and right max; or two pointers in O(1) space |
| 10. [Candy](https://leetcode.com/problems/candy/) (LeetCode 135) | **Two passes,** the second one keeps the first with `max` |
| 11. [Kadane's Algorithm](https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1) (GFG) | **Drop the baggage;** the classic, covered in Module 06 |
