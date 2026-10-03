### Where it appears

| Problem | What the level walk reveals |
|---|---|
| [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) (LeetCode 199) | last node per level |
| [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) (LeetCode 103) | alternate direction per level |
| [Maximum Width of Binary Tree](https://leetcode.com/problems/maximum-width-of-binary-tree/) (LeetCode 662) | heap indices — subtract the level's first before doubling |
| [Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/) (LeetCode 958) | after the first null, no real node may follow |

:::interview
"Maximum Width uses heap indices that double each level. On a deep skewed tree, do the indices overflow?"

Yes — at depth 64 the index exceeds `Number.MAX_SAFE_INTEGER`. The fix: subtract each level's minimum index before doubling, so indices stay small. You only need the *width* (`last − first + 1`), not the absolute positions.
:::
