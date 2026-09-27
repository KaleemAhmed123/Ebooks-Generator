## Recognition drills after Chapter 14 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Maximum Level Sum of a Binary Tree](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/) (LeetCode 1161) | 14-04 | "depth": sum per level |
| 2 | [Verify Preorder Serialization of a Binary Tree](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/) (LeetCode 331) | 10-04 | "without building": count open child slots |
| 3 | [Construct Binary Tree from Preorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/) (LeetCode 889) | 14-09 | "before / after": `pre[1]` roots the left subtree |
| 4 | [Number of Good Leaf Nodes Pairs](https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/) (LeetCode 1530) | 14-03 | "pairs of leaves": pair depth counts at the bend |
| 5 | [Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) (LeetCode 2385) | 14-06 | "parent included": parent map, BFS |
| 6 | [Sum of Root To Leaf Binary Numbers](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/) (LeetCode 1022) | 14-02 | "root down": carry `2 · num + val` |
| 7 | [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/) (LeetCode 99) | 14-10 | "constant space": drop rule in a Morris walk |
| 8 | [Step-By-Step Directions From a Binary Tree Node to Another](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/) (LeetCode 2096) | 14-07 | drop the common prefix of the root paths |
| 9 | [All Elements in Two Binary Search Trees](https://leetcode.com/problems/all-elements-in-two-binary-search-trees/) (LeetCode 1305) | 14-08 | "search trees": two in-order walks, merged |
| 10 | [Top View of Binary Tree](https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1) (GFG) | 14-05 | "above": first node per column in BFS |
| 11 | [Contiguous Array](https://leetcode.com/problems/contiguous-array/) (LeetCode 525) | 03-03 | "as many 0s as 1s": 0 → −1, equal prefixes |
| 12 | [Count Nodes Equal to Average of Subtree](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/) (LeetCode 2265) | 14-03 | return `(sum, count)`, record matches |

### Score yourself

- **10–12:** you pick the signature (parameters, return value, queue, parent map) before the body
- **6–9:** reread 14-01; most misses solve an "up" problem "down"
- **0–5:** redo 14-02 and 14-03 on paper, then retry rows 4, 6 and 12
