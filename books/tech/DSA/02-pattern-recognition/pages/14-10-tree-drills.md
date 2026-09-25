## Recognition drills: Trees <span class="lv lv1"></span>

Hide the right column. First name the direction information flows (down, up, across, anywhere, in order), then the page's move.

| Problem | Direction & move |
|---|---|
| 1. Maximum Depth / Height of a tree (LeetCode 104) | **Up:** `1 + max(left, right)` |
| 2. Balanced Binary Tree (LeetCode 110) | **Up,** return −1 once unbalanced |
| 3. Diameter of Binary Tree (LeetCode 543) | **Return height, record bend** |
| 4. Same Tree / Symmetric Tree / Invert Binary Tree (LeetCode 100 / 101 / 226) | **Up,** compare or swap two subtrees at once |
| 5. Count Good Nodes (LeetCode 1448) | **Down:** carry the path maximum |
| 6. Path Sum III / k-sum paths (LeetCode 437 / GFG) | **Down:** carry a prefix-sum map, undo on return |
| 7. Right / Left View (LeetCode 199 / GFG) | **Across:** last / first node per level |
| 8. Zigzag Level Order (LeetCode 103) | **Across,** reverse every other level |
| 9. Top / Bottom View (GFG) | **Coordinates,** BFS, first / last per column |
| 10. Vertical Order Traversal (LeetCode 987) | **Coordinates,** sort by column, row, value |
| 11. Boundary Traversal (GFG) | **Three walks:** left edge, leaves, right edge reversed |
| 12. All Nodes Distance K (LeetCode 863) | **Anywhere:** parent map + BFS |
| 13. Burn a Binary Tree / Time to Infect (GFG / LeetCode 2385) | **Anywhere:** BFS until empty |
| 14. Lowest Common Ancestor (LeetCode 236) | **Split point** in post-order |
| 15. House Robber III (LeetCode 337) | **Up:** return `(robbed, skipped)` pair (Module 06) |
| 16. Kth Smallest / Largest in BST (LeetCode 230 / GFG) | **In order** (reverse in order for largest) with a stack |
| 17. Recover Binary Search Tree (LeetCode 99) | **In order,** find the drops |
| 18. Construct from Preorder and Inorder (LeetCode 105) | **Rebuild:** index map, split by the root |
| 19. Serialize and Deserialize Binary Tree (LeetCode 297) | **Pre-order with null markers** |

### Score yourself

- **16–19:** you pick the signature (parameters, return value, queue, parent map) before writing the body
- **10–15:** reread 14-01's direction table; misses are usually "up" solved "down"
- **0–9:** redo 14-02 and 14-03 on paper, they cover half of this table
