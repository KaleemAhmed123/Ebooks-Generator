### Where it appears

| Problem | What you return / what you record |
|---|---|
| [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543) | height / `l + r` as candidate diameter |
| [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) (LeetCode 110) | height, or −1 once unbalanced |
| [Distribute Coins in Binary Tree](https://leetcode.com/problems/distribute-coins-in-binary-tree/) (LeetCode 979) | `coins − nodes` / its absolute value as moves |
| [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) (LeetCode 124) | extendable side / `node + left + right` as candidate |

:::interview
"In Maximum Path Sum, why return `max(left, right) + node.val` instead of `left + right + node.val`?"

A parent can only extend the path through one child — a path cannot fork. Returning both sides would let the parent bend the path twice, which is not a valid path. The fork `left + node + right` is recorded as a candidate answer, but only the better single side is returned upward.
:::
