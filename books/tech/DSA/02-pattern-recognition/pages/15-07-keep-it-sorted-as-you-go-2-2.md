### Variations

- **Replace every element with the least greater element on its right (GFG):** walk from the right, and for each value query the successor (strictly greater) in the set of values already seen, then insert it
- **Contains Duplicate III (LeetCode 220):** a window of the last k values in an ordered set; check the successor of `v − t`. A bucket trick (bucket width t + 1) gets O(n) without a set
- **My Calendar I (LeetCode 729):** keep bookings sorted by start; a new booking conflicts only with its predecessor and successor
- **Find the conflicting appointments (GFG):** the same neighbour check while inserting appointments one by one
- **Sliding Window Median:** two heaps with lazy deletion (page 15-04), or one ordered multiset and an iterator to the middle

### The failure

- **A heap for neighbour queries.** A heap exposes only the minimum or maximum. "Closest value to v" needs arbitrary predecessors and successors, which a heap cannot give without popping everything
- **Forgetting that the TS version is O(n) per insert.** `splice` shifts elements; with n = 10⁵ inserts that is up to about 5 · 10⁹ element moves in the worst case. It is fast in practice for moderate n; for hard limits say so, and name `TreeSet` / `std::set`, a balanced BST, or an offline Fenwick tree over compressed values (Chapter 19) as the O(log n) versions

:::interview
"What do you use when you need the nearest larger value among everything seen so far?" — An ordered set: C++ `set` or Java `TreeSet`, with `lower_bound` / `ceiling` and `floor` in O(log n). In a language without one I keep a sorted array with binary search, which is O(log n) to query and O(n) to insert, or process the queries offline with coordinate compression and a Fenwick tree.
:::
