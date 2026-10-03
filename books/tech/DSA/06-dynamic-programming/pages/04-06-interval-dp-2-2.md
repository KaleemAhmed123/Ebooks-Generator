### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312) | Classic "which to burst last" interval DP |
| [Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/) (LeetCode 1000) | Merge adjacent piles — interval split with group constraint |
| [Strange Printer](https://leetcode.com/problems/strange-printer/) (LeetCode 664) | Minimum turns to print a string — interval collapse |
| [Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/) (LeetCode 1039) | Split polygon into triangles at each vertex |

:::interview
"What class of problems does interval DP solve?"

Any problem where you combine adjacent elements and the cost depends on the result of combining sub-intervals. The key invariant: after you merge a range, the elements outside that range are unchanged — they do not rearrange. Matrix chain, burst balloons, optimal BST, and palindrome partitioning all fit this shape.
:::
