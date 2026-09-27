## Recognition drills after Chapter 19 <span class="lv lv2"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Create Sorted Array through Instructions](https://leetcode.com/problems/create-sorted-array-through-instructions/) (LeetCode 1649) | 19-01 | "strictly less", values ≤ 10⁵: Fenwick counts over values; add a point, query a prefix |
| 2 | [Matrix Block Sum](https://leetcode.com/problems/matrix-block-sum/) (LeetCode 1314) | 03-02 | "within k rows and columns", nothing changes: 2-D prefix sums, four lookups per cell |
| 3 | [My Calendar III](https://leetcode.com/problems/my-calendar-iii/) (LeetCode 732) | 19-01 | "after each", at most 400: a difference map swept in key order; a lazy segment tree for large inputs |
| 4 | [Longest Increasing Subsequence II](https://leetcode.com/problems/longest-increasing-subsequence-ii/) (LeetCode 2407) | 19-01 | "differ by at most k": best length ending at values `[v − k, v − 1]`; max cannot be undone, so a segment tree over values |
| 5 | [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | 19-01 | "fixed", "sum": a prefix array, O(1) per query |
| 6 | [Shifting Letters II](https://leetcode.com/problems/shifting-letters-ii/) (LeetCode 2381) | 03-07 | "then print once": every update before the only read; a difference array |
| 7 | [Number of Pairs Satisfying Inequality](https://leetcode.com/problems/number-of-pairs-satisfying-inequality/) (LeetCode 2426) | 19-01 | "pairs `i < j`": with `d = a − b` it is `d[i] ≤ d[j] + diff`; a Fenwick tree over shifted values counts earlier `d[i]` |
| 8 | [Range Minimum Query](https://www.spoj.com/problems/RMQSQ/) (SPOJ RMQSQ) | 19-01 | "fixed", "minimum": overlap-safe, so a sparse table |
| 9 | [Minimum Absolute Difference Queries](https://leetcode.com/problems/minimum-absolute-difference-queries/) (LeetCode 1906) | 19-01 | "between 1 and 100": prefix counts per value; scan the 100 values present, O(100) per query |
| 10 | [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | 19-01 | "mixed with", "sum": point update, prefix query; a Fenwick tree |
| 11 | [XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/) (LeetCode 1310) | 19-01 | "XOR": undoable, so `P[r + 1] ^ P[l]` |

### Score yourself

- **9–11:** you pick the structure from "changes?" and "undoable?" before the story
- **5–8:** reread 19-01; most misses use a tree where a prefix array works
- **0–4:** redo rows 5, 8 and 10, one per row of 19-01's table
