## Recognition drills: Trees <span class="lv lv1"></span>

Hide the right column. First name the direction information flows (down, up, across, anywhere, in order), then the page's move.

| Problem | Direction & move |
|---|---|
| 1. [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) (LeetCode 104) | **Up:** `1 + max(left, right)` |
| 2. [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) (LeetCode 110) | **Up,** return −1 once unbalanced |
| 3. [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543) | **Return height, record bend** |
| 4. [Same Tree](https://leetcode.com/problems/same-tree/) (LeetCode 100) / [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) (LeetCode 101) / [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) (LeetCode 226) | **Up,** compare or swap two subtrees at once |
| 5. [Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) (LeetCode 1448) | **Down:** carry the path maximum |
| 6. [Path Sum III](https://leetcode.com/problems/path-sum-iii/) (LeetCode 437) / [K Sum Paths](https://www.geeksforgeeks.org/problems/k-sum-paths/1) (GFG) | **Down:** carry a prefix-sum map, undo on return |
| 7. [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) (LeetCode 199) / [Left View of Binary Tree](https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1) (GFG) | **Across:** last / first node per level |
| 8. [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) (LeetCode 103) | **Across,** reverse every other level |
| 9. [Top View of Binary Tree](https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1) (GFG) / [Bottom View of Binary Tree](https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1) (GFG) | **Coordinates,** BFS, first / last per column |
| 10. [Vertical Order Traversal of a Binary Tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) (LeetCode 987) | **Coordinates,** sort by column, row, value |
| 11. [Tree Boundary Traversal](https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1) (GFG) | **Three walks:** left edge, leaves, right edge reversed |
