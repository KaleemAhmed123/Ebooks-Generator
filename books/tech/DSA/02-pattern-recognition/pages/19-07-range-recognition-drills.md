## Recognition drills: Range Structures & Rare Tricks <span class="lv lv3"></span>

Hide the right column. Decide first whether the data changes, then whether the operation is undoable or overlap-safe (19-01).

| Problem | Structure · reason |
|---|---|
| 1. [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | **Prefix sums:** static, undoable |
| 2. [XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/) (LeetCode 1310) | **Prefix XOR:** `P[R + 1] ^ P[L]` |
| 3. [Range Minimum Query](https://www.spoj.com/problems/RMQSQ/) (SPOJ RMQSQ) | **Sparse table:** static, overlap-safe min |
| 4. [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | **Fenwick tree:** point update, prefix query |
| 5. [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327) | **Prefix sums + Fenwick over compressed values,** or merge-sort counting |
| 6. Point update, range max query | **Segment tree:** max cannot be undone, so no Fenwick |
| 7. [My Calendar III](https://leetcode.com/problems/my-calendar-iii/) (LeetCode 732) | **Difference map** swept in key order; a lazy segment tree for large inputs |

### Score yourself

- **5–7:** you pick the structure from "changes?" and "undoable?" before the story
- **3–4:** reread 19-01; most misses use a tree where a prefix array works
- **0–2:** these are optional for most interviews; finish Chapters 2–17 first
