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
