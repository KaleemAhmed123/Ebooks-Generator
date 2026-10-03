### Where it appears

| Problem | What the split point decides |
|---|---|
| [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) (LeetCode 236) | the first node with targets on both sides |
| [Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) (LeetCode 235) | BST: both smaller → go left, both larger → go right |
| [Step-By-Step Directions](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/) (LeetCode 2096) | root paths as `L`/`R`; drop the common prefix |
| [LCA of Deepest Leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/) (LeetCode 1123) | the deepest node with both max-depth subtrees |

:::interview
"The LCA template assumes both p and q exist. What if one might be missing?"

If only p exists, the recursion finds p and returns it — never encountering q. It reports p as the LCA, which is wrong (there is no common ancestor of a missing node). Fix: count how many targets were actually found during the traversal, and return the LCA only if the count is 2.
:::
