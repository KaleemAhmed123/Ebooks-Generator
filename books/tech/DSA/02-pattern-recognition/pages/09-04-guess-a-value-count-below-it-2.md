### Where it appears

| Problem | How `count(x)` is computed |
|---|---|
| [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378) | staircase walk from bottom-left, O(n) |
| [Find K-th Smallest Pair Distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance/) (LeetCode 719) | two pointers on sorted array |

:::interview
"The binary search might land on a value not in the matrix — how does that work?"

The search finds the smallest `x` with `count(x) ≥ k`. Even if `x` is not in the matrix, `lo` keeps rising until it hits an actual matrix value — because `count` is constant between consecutive matrix values, and the first jump to `≥ k` happens at a value that exists. The `lo < hi` loop converges to that value.
:::
