### Where it appears

| Problem | What you carry down |
|---|---|
| [Path Sum](https://leetcode.com/problems/path-sum/) (LeetCode 112) | remaining target |
| [Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/) (LeetCode 129) | `num · 10 + val` |
| [Maximum Difference Between Node and Ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/) (LeetCode 1026) | min and max seen so far |
| [Path Sum III](https://leetcode.com/problems/path-sum-iii/) (LeetCode 437) | a prefix-sum map on the path (03-03); undo on return |

:::interview
"Path Sum checks `remaining === 0` at a leaf. What goes wrong if you check at a null child instead?"

A node with only one child sends a null child the remaining value. That null "succeeds" even though the path ended at a non-leaf. Example: root 1 with only a right child 2, target 1 — the left null returns true, but no root-to-leaf path sums to 1. Always check at a leaf: `!node.left && !node.right`.
:::
