### The pages in this chapter

| Page | Information flows | Canonical problem |
|---|---|---|
| **14-02 Carry It Down** | from ancestors, as parameters | Count Good Nodes in Binary Tree (LeetCode 1448) |
| **14-03 Return One, Record Another** | from children, as return values | Diameter of Binary Tree (LeetCode 543) |
| **14-04 Walk Level by Level** | across a level | Binary Tree Right Side View (LeetCode 199) |
| **14-05 Give Every Node a Coordinate** | across columns | Vertical Order Traversal (LeetCode 987) |
| **14-06 Turn the Tree into a Graph** | in every direction | All Nodes Distance K in Binary Tree (LeetCode 863) |
| **14-07 Find the Split Point** | from both subtrees to one ancestor | Lowest Common Ancestor (LeetCode 236) |
| **14-08 Read the BST in Order** | sorted order, left to right | Kth Smallest Element in a BST (LeetCode 230) |
| **14-09 Rebuild from Traversals** | from traversal arrays back to a tree | Construct Binary Tree from Preorder and Inorder (LeetCode 105) |

The basic traversals, level-order BFS and BST validation are in Module 03; tree DP such as House Robber III and Maximum Path Sum is in Module 06.

### The trap

- **Global variables for information that should flow.** A global "current depth" or "current sum" that is incremented on the way down and forgotten on the way up produces answers that depend on visiting order. Pass what flows down, return what flows up, and keep globals only for the single best answer being recorded
