## Recognition drills: The Hard Tail <span class="lv lv3"></span>

Hide the right column. These rarely appear outside hard rounds and contests; the cue is usually a constraint (n ≤ 40, O(1) space, values up to 2³¹) rather than the story. Range structures have their own drills in 19-07.

| Problem | Structure · reason |
|---|---|
| 1. Implement Trie (LeetCode 208) | **Letter trie:** 26 children and an end flag per node (06-04) |
| 2. Phone Directory (GFG) | **Letter trie:** after each typed letter, list every word below the current node |
| 3. Print unique rows in a boolean matrix (GFG) | **Bit trie over rows:** a row is new iff inserting it creates a node |
| 4. Word Break, trie solution (GFG) | **Walk the trie from i;** every word end reached is a legal next cut |
| 5. Maximum XOR of Two Numbers in an Array (LeetCode 421) | **Choose the opposite bit** (19-11) |
| 6. Maximum subarray XOR (GFG) | **Prefix XORs in a bit trie** (19-11) |
| 7. Maximum XOR With an Element From Array (LeetCode 1707) | **Offline:** sort queries by limit, insert as the limit grows |
| 8. Count Pairs With XOR in a Range (LeetCode 1803) | **Counts on trie nodes,** `count(< high + 1) − count(< low)` |
| 9. Binary Tree Inorder Traversal (LeetCode 94) when asked for O(1) space | **Thread back to the parent** (19-10) |
| 10. Recover Binary Search Tree (LeetCode 99) | **Morris in-order,** track the two out-of-order nodes |
| 11. Median of BST in O(1) space (GFG) | **Morris twice:** count, then walk to the middle |
