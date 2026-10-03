### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) (LeetCode 98) | Pass min/max boundaries downward |
| [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) (LeetCode 230) | In-order traversal yields sorted order |
| [Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) (LeetCode 235) | BST invariant guides left/right decision |
| [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/) (LeetCode 450) | Handles the three deletion cases |

:::interview
"Can we use a Hash Map instead of a BST?"

If you only need exact lookups, a Hash Map is faster (O(1)). But a Hash Map destroys order. If the problem asks you to find the "closest element", the "next largest element", or "count elements between X and Y", a Hash Map is useless (O(N)). A BST is required for order-aware O(log N) queries.
:::
