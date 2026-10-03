### Where it appears

| Problem | What the writer keeps |
|---|---|
| [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) (LeetCode 26) | one copy of each value; compare with `nums[w − 1]` |
| [Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) (LeetCode 80) | at most 2 copies; compare with `nums[w − 2]` |
| [Move Zeroes](https://leetcode.com/problems/move-zeroes/) (LeetCode 283) | all non-zeros; fill the rest with 0 |
| [Sort Colors](https://leetcode.com/problems/sort-colors/) (LeetCode 75) | three regions via two writers (Dutch flag) |
| [Remove Element](https://leetcode.com/problems/remove-element/) (LeetCode 27) | all values ≠ val |

:::interview
"Why does the Dutch flag need three pointers instead of two?"

Two regions need one boundary. Three regions need two boundaries — `low` and `high` — plus a scanner `mid`. Reader-and-writer handles "keep or discard" (two outcomes). The flag handles "bucket 0, 1, or 2" (three outcomes), so you need one more pointer to track where the unknown zone starts and ends.
:::
