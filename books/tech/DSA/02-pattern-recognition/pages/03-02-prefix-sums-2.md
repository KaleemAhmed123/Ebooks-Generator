### Where it appears

| Problem | What the prefix stores |
|---|---|
| [Range Sum Query – Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | running sum of integers |
| [Range Sum Query 2D – Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) (LeetCode 304) | 2-D prefix sum; add two corners, subtract two |
| [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) (LeetCode 724) | right sum = `total − left − a[i]` |
| [XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/) (LeetCode 1310) | running XOR (XOR undoes itself too) |
| [Sum of Absolute Differences in a Sorted Array](https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array/) (LeetCode 1685) | left count · val − leftSum + rightSum − right count · val |

:::interview
"Can prefix sums handle updates?"

Not efficiently. Changing one element shifts every prefix after it — O(n) per update. For interleaved updates and queries, use a Binary Indexed Tree (Fenwick tree, 19-01) or a Segment Tree, which handle both in O(log n).
:::
