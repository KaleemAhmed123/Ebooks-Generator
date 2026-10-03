### Where it appears

| Problem | What the staircase eliminates |
|---|---|
| [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) (LeetCode 240) | a row or column per comparison |
| [Count Negative Numbers in a Sorted Matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/) (LeetCode 1351) | start bottom-left; add `n − c` per step |
| [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378) | staircase counts cells ≤ x; binary search on x (→ 09-04) |

:::interview
"Why start at the top-right and not the top-left?"

At the top-left, both right and down lead to larger values — a comparison cannot tell you which way to go. At the top-right, left is smaller and down is larger, so each comparison rules out exactly one row or column. The bottom-left corner works too, for the same reason.
:::
