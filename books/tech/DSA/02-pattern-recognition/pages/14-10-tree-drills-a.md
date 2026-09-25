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
