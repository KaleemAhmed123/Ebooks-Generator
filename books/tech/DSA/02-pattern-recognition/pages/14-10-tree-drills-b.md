## Recognition drills: Trees <span class="lv lv1"></span> - continued

| Problem | Direction & move |
|---|---|
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
