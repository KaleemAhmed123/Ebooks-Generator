## Recognition drills: Range Structures & Rare Tricks <span class="lv lv3"></span>

Hide the right column. Decide first whether the data changes, then whether the operation is undoable or overlap-safe (19-01).

| Problem | Structure · reason |
|---|---|
| 1. Range Sum Query – Immutable (LeetCode 303) | **Prefix sums:** static, undoable |
| 2. XOR of a subarray, static (GFG) | **Prefix XOR:** `P[R + 1] ^ P[L]` |
| 3. Range Minimum Query (SPOJ RMQSQ) | **Sparse table:** static, overlap-safe min |
| 4. Corporate Flight Bookings (LeetCode 1109) | **Difference array:** all updates before any read |
| 5. Range Sum Query – Mutable (LeetCode 307) | **Fenwick tree:** point update, prefix query |
| 6. Count of Smaller Numbers After Self (LeetCode 315) | **Fenwick over value ranks** from the right; or count while you merge (07-08) |
| 7. Count of Range Sum (LeetCode 327) | **Prefix sums + Fenwick over compressed values,** or merge-sort counting |
| 8. Point update, range max query (GFG) | **Segment tree:** max cannot be undone, so no Fenwick |
| 9. Flip all bits in [L, R], count 1s in [L, R] | **Segment tree with lazy tags:** range update and range query mixed |
| 10. My Calendar III (LeetCode 732) | **Difference map** swept in key order; a lazy segment tree for large inputs |
| 11. Binary Tree Inorder Traversal (LeetCode 94) in O(1) space | **Thread back to the parent** (19-10) |
| 12. Recover Binary Search Tree (LeetCode 99), O(1)-space follow-up | **Morris in-order;** keep the two out-of-order nodes |

### Score yourself

- **10–12:** you pick the structure from "changes?" and "undoable?" before the story
- **6–9:** reread 19-01; most misses use a tree where a prefix array works
- **0–5:** these are optional for most interviews; finish Chapters 2–17 first
