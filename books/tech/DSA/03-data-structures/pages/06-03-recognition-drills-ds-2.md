### Drill 5: The Static Range Minimum
**Scenario:** An array of $10^5$ elements. The array never changes. You receive $10^6$ queries asking for the minimum element between index `L` and `R`.
**The Insight:** A Segment Tree does this in O(log N), taking $10^6 \times 20$ operations. But the data is static, and `min()` is an idempotent operation (overlap doesn't corrupt the answer). We can precompute overlapping blocks for strict O(1) queries.
**Structure:** Sparse Table.

### Drill 6: The Friend Circles
**Scenario:** A social network with $10^5$ users. Users form friendships one by one over time. At any point, a query asks: "Are user A and user B in the same extended friend group?"
**The Insight:** We are merging sets dynamically and checking connectivity. A standard graph BFS/DFS would take O(V+E) per query, which is too slow. We just need to know if they share the same "ultimate boss".
**Structure:** Disjoint Set Union (DSU / Union-Find) with Path Compression.

### Drill 7: The Bounded Anagrams
**Scenario:** Given two strings up to length $10^5$ containing only lowercase English letters, check if they are anagrams in strict O(N) time and O(1) space.
**The Insight:** We need to count frequencies. We could use a Hash Map, but the keys are strictly bounded to 26 characters. Hash Maps have hashing overhead and allocate object memory. We want raw, contiguous memory access.
**Structure:** 26-element integer Array.

### Drill 8: The Custom Cache
**Scenario:** Build an LRU (Least Recently Used) cache. It must support `get(key)` in O(1) and `put(key, value)` in O(1). When full, it evicts the least recently used item.
**The Insight:** O(1) lookup demands a Hash Map. But a Hash Map has no concept of "recency" or order. We need to track order and splice elements to the "most recent" position in strict O(1) time. An array shift takes O(N).
**Structure:** Hash Map + Doubly Linked List (Map stores pointers directly to the List nodes for O(1) splicing).
