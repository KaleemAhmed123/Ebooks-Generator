### The pages in this chapter

| Pattern | Pages | Information flows | Canonical problem |
|---|---|---|---|
| **36 · Carry It Down** | 14-02 | from ancestors, as parameters | Count Good Nodes in Binary Tree (LeetCode 1448) |
| **37 · Return One, Record Another** | 14-03 | from children, as return values | Diameter of Binary Tree (LeetCode 543) |
| **38 · Level and Position** | 14-04, 14-05 | across a level; across columns | Binary Tree Right Side View (LeetCode 199) |
| **39 · Tree as a Graph** | 14-06 | in every direction | All Nodes Distance K in Binary Tree (LeetCode 863) |
| **40 · Find the Split Point** | 14-07 | from both subtrees to one ancestor | Lowest Common Ancestor of a Binary Tree (LeetCode 236) |
| **41 · Traversal-Order Facts** | 14-08, 14-09, 14-10 | what an in-, pre- or post-order walk guarantees | Kth Smallest Element in a BST (LeetCode 230) |

Pattern 41 is three moves on one fact, the order a traversal emits nodes: read a BST in sorted order (14-08), rebuild a tree from two orders (14-09), and walk in order with no stack at all (14-10). The basic traversals, level-order BFS and BST validation are in Module 03; tree DP such as House Robber III and Maximum Path Sum is in Module 06. Drills: 14-11.

### The trap

- **Global variables for information that should flow.** A global "current depth" or "current sum" that is incremented on the way down and forgotten on the way up produces answers that depend on visiting order. Pass what flows down, return what flows up, and keep globals only for the single best answer being recorded
