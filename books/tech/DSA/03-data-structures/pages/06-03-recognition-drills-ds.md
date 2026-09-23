## Data Structure Recognition Drills

These drills are designed to test your architectural judgment. Do not write code. Just read the constraint and immediately name the required data structure.

### Drill 1: The Stock Span
**Scenario:** You receive a daily stream of stock prices. For each day, you must output the number of consecutive previous days where the price was less than or equal to today's price.
**The Insight:** When a massive price arrives, all smaller previous prices are rendered irrelevant for future span queries—they are dominated. We need an elimination machine that looks backward.
**Structure:** Monotonic Stack (Decreasing).

### Drill 2: The Continuous Median
**Scenario:** You receive a continuous, infinite stream of numbers. At any given moment, you must output the median of all numbers seen so far.
**The Insight:** The median is the boundary between the smaller half of numbers and the larger half. We don't care about the sorted order of the extremes, only the middle two numbers. We need constant access to the largest of the smalls, and the smallest of the larges.
**Structure:** Two Heaps (A Max-Heap for the bottom half, a Min-Heap for the top half).

### Drill 3: The Lexicographical Autocomplete
**Scenario:** Given an array of 100,000 strings, you receive queries consisting of a prefix (e.g. "pre"). You must return the lexicographically smallest string in the array that starts with that prefix.
**The Insight:** We need to group strings by shared prefixes. A Hash Map fails at partial matches. We need a structure that models character-by-character progression.
**Structure:** Trie (Prefix Tree).

### Drill 4: The Dynamic Range Sum
**Scenario:** An array of $10^5$ elements. You receive $10^5$ queries. Some queries ask to update the value at index `i`. Other queries ask for the sum of elements from index `L` to `R`.
**The Insight:** A pre-computed prefix-sum array answers range sums in O(1), but updating it takes O(N). We need a structure that balances updates and range queries at O(log N). Since the operation is commutative addition, we can use the lightweight option.
**Structure:** Fenwick Tree (Binary Indexed Tree) or Segment Tree.

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
