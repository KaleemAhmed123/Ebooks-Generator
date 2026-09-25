## Recognition drills: The Hard Tail 🔴

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
| 12. Closest Subsequence Sum (LeetCode 1755) | **Meet in the middle:** n ≤ 40, sort one half's sums, binary search from the other (19-09) |
| 13. Partition Array Into Two Arrays to Minimize Sum Difference (LeetCode 2035) | **Meet in the middle,** grouping each half's sums by how many items they take |
| 14. Subset Sums (SPOJ SUBSUMS) | **Meet in the middle:** count pairs of half-sums in [A, B] with two binary searches |
| 15. Frog 3 (AtCoder DP Z) | **Convex hull trick:** `(hᵢ − hⱼ)²` expands into a line in hᵢ; heights rise, so a deque works (19-08) |
| 16. Count of Smaller Numbers After Self (LeetCode 315) | **Fenwick over value ranks,** scanning from the right (19-02); or count while you merge (07-08) |
| 17. Count of Range Sum (LeetCode 327) | **Prefix sums + Fenwick over compressed values,** or merge sort counting |
| 18. Range Sum Query – Mutable (LeetCode 307) | **Fenwick tree:** point update, prefix query (19-02) |
| 19. Range Minimum Query (SPOJ RMQSQ) | **Sparse table:** static and idempotent, O(1) per query (19-06) |
| 20. My Calendar III (LeetCode 732) | **Difference map** swept in key order; a lazy segment tree for larger inputs (19-05) |
| 21. Falling Squares (LeetCode 699) | **Segment tree** with range assign and range max over compressed coordinates |
| 22. D-query (SPOJ DQUERY) | **Offline by right end:** Fenwick marks only each value's last occurrence; or Mo's algorithm (Module 08) |

### Score yourself

- **18–22:** you read the constraint before the story
- **10–17:** reread 19-09 and 19-11; most misses reach for DP when n ≤ 40 calls for splitting
- **0–9:** these are optional for most interviews; finish Chapters 2–17 first
