### Where it appears

| Problem | What the "break" is |
|---|---|
| [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (LeetCode 33) | one rotation point |
| [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) (LeetCode 153) | compare with `a[hi]`, not `a[lo]` |
| [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) (LeetCode 81) | duplicates: shrink both ends; O(n) worst case |
| [Find Peak Element](https://leetcode.com/problems/find-peak-element/) (LeetCode 162) | rising at `mid` → peak is right |

:::interview
"Why compare with `a[lo]` for search but `a[hi]` for finding the minimum?"

For search, you need to know which half is sorted to decide if the target is inside it. `a[lo] <= a[mid]` tells you the left half has no break. For finding the minimum, you need to know which half contains it. `a[mid] > a[hi]` means the break is to the right, so the minimum is there. Using the wrong comparison confuses "sorted half" with "half containing the minimum."
:::
