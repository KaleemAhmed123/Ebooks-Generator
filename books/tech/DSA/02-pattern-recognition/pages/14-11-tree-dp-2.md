### Where it appears

| Problem | The per-node value(s) |
|---|---|
| House Robber III (LeetCode 337) | (rob this, skip this) |
| Binary Tree Cameras (LeetCode 968) | node state: covered / has camera / needs cover |
| Diameter of Binary Tree (LeetCode 543) | height returned, bend recorded → 14-03 |
| Longest Univalue Path (LeetCode 687) | extend-length up, best recorded |
| Distribute Coins in Binary Tree (LeetCode 979) | surplus/deficit flowing to the parent |

- **Go deeper:** rerooting (answers for *every* node as root) and tree-DP on general trees are in Module 06; the path-vs-return distinction is 14-03.

:::interview
"Why return two numbers from each node in House Robber III?"

The parent's choice depends on whether each child was robbed: if the parent robs, its children must be skipped. Returning both "best if I'm robbed" and "best if I'm skipped" lets the parent combine them in O(1). A single number loses the information the parent needs, forcing recomputation and breaking the linear-time single pass.
:::
