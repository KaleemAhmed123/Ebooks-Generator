### Where it appears

| Problem | What the merge step counts |
|---|---|
| [Count Inversions](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1) (GFG) | pairs where left > right |
| [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | pairs where `a[i] > 2·a[j]`; separate count pass |
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | sort index pairs, not raw values |

:::interview
"Why can't you count inversions with a simple sort?"

A simple sort tells you the array is unsorted but not how many swaps fix it. Merge sort naturally splits every pair `(i, j)` into same-half (handled recursively) and cross-half (handled during merge). Because both halves are sorted, the cross count is a single pointer walk — O(n) per level, O(n log n) total.
:::
