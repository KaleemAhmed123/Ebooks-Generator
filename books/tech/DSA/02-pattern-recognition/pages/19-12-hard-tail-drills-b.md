## Recognition drills: The Hard Tail <span class="lv lv3"></span> - continued

| Problem | Structure · reason |
|---|---|
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
