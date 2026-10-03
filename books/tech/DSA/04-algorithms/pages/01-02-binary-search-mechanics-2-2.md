### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Binary Search](https://leetcode.com/problems/binary-search/) (LeetCode 704) | Direct application of the basic loop |
| [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (LeetCode 33) | Binary search deciding which half is sorted |
| [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) (LeetCode 153) | Binary search to locate the rotation pivot |
| [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) (LeetCode 74) | Treat the matrix as a flat sorted array |

:::interview
"Why did you write `left <= right` instead of `left < right`?"

Because if the target is exactly at the final remaining element where `left === right`, we still need to evaluate that one element. If we use strict inequality, we skip checking the final candidate.
:::
