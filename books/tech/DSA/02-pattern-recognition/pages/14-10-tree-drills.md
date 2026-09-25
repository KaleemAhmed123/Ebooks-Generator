## Recognition drills: Trees 🟢

Hide the right column. First name the direction information flows (down, up, across, anywhere, in order), then the page's move.

| Problem | Direction & move |
|---|---|
| 1. Maximum Depth / Height of a tree (LeetCode 104) | **Up:** `1 + max(left, right)` |
| 2. Balanced Binary Tree (LeetCode 110) | **Up,** return −1 once unbalanced |
| 3. Diameter of Binary Tree (LeetCode 543) | **Return height, record bend** |
| 4. Same Tree / Symmetric Tree / Invert Binary Tree (LeetCode 100 / 101 / 226) | **Up,** compare or swap two subtrees at once |
| 5. Check for Children Sum Property / Sum Tree (GFG) | **Up:** return subtree sum, check at each node |
| 6. Count Good Nodes (LeetCode 1448) | **Down:** carry the path maximum |
| 7. Path Sum III / k-sum paths (LeetCode 437 / GFG) | **Down:** carry a prefix-sum map, undo on return |
| 8. Maximum Difference Between Node and Ancestor (LeetCode 1026) | **Down:** carry path min and max |
| 9. Right / Left View (LeetCode 199 / GFG) | **Across:** last / first node per level |
| 10. Zigzag Level Order (LeetCode 103) | **Across,** reverse every other level |
| 11. Maximum Width of Binary Tree (LeetCode 662) | **Across,** heap indices normalised per level |
| 12. Top / Bottom View (GFG) | **Coordinates,** BFS, first / last per column |
| 13. Vertical Order Traversal (LeetCode 987) | **Coordinates,** sort by column, row, value |
| 14. Diagonal Traversal (GFG) | **Coordinates:** count of left moves |
| 15. Boundary Traversal (GFG) | **Three walks:** left edge, leaves, right edge reversed |
| 16. All Nodes Distance K (LeetCode 863) | **Anywhere:** parent map + BFS |
| 17. Burn a Binary Tree / Time to Infect (GFG / LeetCode 2385) | **Anywhere:** BFS until empty |
| 18. Lowest Common Ancestor (LeetCode 236) | **Split point** in post-order |
| 19. Min distance between two nodes (GFG) | **Split point** + two depths |
| 20. Find Duplicate Subtrees (LeetCode 652) | **Up:** serialise each subtree, count in a map |
| 21. Distribute Coins / candies (LeetCode 979 / GFG) | **Return excess, record moves** |
| 22. House Robber III (LeetCode 337) | **Up:** return `(robbed, skipped)` pair (Module 06) |
| 23. Binary Tree Cameras (LeetCode 968) 🔴 | **Up:** three-state return, greedy post-order |
| 24. Minimum Time to Collect All Apples in a Tree (LeetCode 1443) | **Up:** a subtree costs `2 + child cost` only if it holds an apple |
| 25. Longest Path With Different Adjacent Characters (LeetCode 2246) | **Return the best chain, record the two best** |
| 26. Kth Smallest / Largest in BST (LeetCode 230 / GFG) | **In order** (reverse in order for largest) with a stack |
| 27. Two Sum IV in BST / pairs from two BSTs (LeetCode 653 / GFG) | **Two in-order iterators,** collide |
| 28. Recover Binary Search Tree (LeetCode 99) | **In order,** find the drops |
| 29. Construct from Preorder and Inorder (LeetCode 105) | **Rebuild:** index map, split by the root |
| 30. Serialize and Deserialize Binary Tree (LeetCode 297) | **Pre-order with null markers** |
| 31. Check whether BST contains a dead end (GFG) | **Down:** carry the open range `(lo, hi)`, starting at `(0, ∞)` for positive values; a leaf whose range has room for nothing but itself (`hi − lo === 2`) is a dead end |
| 32. Largest BST in a Binary Tree (GFG) | **Up:** return `(isBST, min, max, size)`, record the best size |
| 33. Minimum swaps to convert a binary tree into a BST (GFG) | **In order + cycles:** read the tree in order, then minimum swaps to sort (04-02) |
| 34. Morris traversal / median of BST in O(1) space | **Threads, no stack** (Chapter 19) |

### Score yourself

- **28–34:** you pick the signature (parameters, return value, queue, parent map) before writing the body
- **18–27:** reread 14-01's direction table; misses are usually "up" solved "down"
- **0–17:** redo 14-02 and 14-03 on paper, they cover half of this table
