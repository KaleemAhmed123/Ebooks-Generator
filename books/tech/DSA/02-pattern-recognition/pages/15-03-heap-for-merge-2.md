### Where it appears

| Problem | What each "source" feeds the heap |
|---|---|
| [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (LeetCode 23) | one head per list |
| [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) (LeetCode 373) | row i is a source of pairs — push `(i, j+1)` |
| [Smallest Range Covering K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/) (LeetCode 632) | track max beside the min-heap; range is `[top, max]` |

:::interview
"Why not just dump all elements into one array and sort? Both are O(N log N)."

Sorting needs O(N) memory for all elements at once. The k-way merge holds only k elements in the heap at any time — O(k) memory. When k is small and the lists are long, this is the difference between fitting in cache and not. It also works on streaming inputs where you never have all elements.
:::
