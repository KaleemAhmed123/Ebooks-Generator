### Where it appears

| Problem | What Morris threading enables |
|---|---|
| [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) (LeetCode 94) | O(1) space in-order walk |
| [Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/) (LeetCode 144) | emit when the thread is laid, not when cut |
| [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/) (LeetCode 99) | the drop rule of 14-08 inside this O(1)-space walk |
| [Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) (LeetCode 114) | rewire right pointers in pre-order |

:::interview
"Morris traversal modifies the tree temporarily. When is that a problem?"

In a concurrent setting — another thread reading the tree sees a cycle and loops forever. Also, if the traversal throws or returns early, the threads (temporary links) stay in place and the tree is corrupted. Always finish the full walk, or catch exceptions and clean up the threads before re-raising.
:::
