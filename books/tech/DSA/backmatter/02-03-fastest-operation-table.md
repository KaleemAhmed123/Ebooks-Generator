## Fastest Operation Table

A quick reference for mapping a required operational speed to the exact data structure that delivers it.

| Operation Required | Fastest Structure | Time Complexity |
|---|---|---|
| Insert at end | Dynamic Array | O(1) amortised |
| Insert at specific index | Doubly Linked List | O(1) (if pointer is known) |
| Key-Value Lookup | Hash Map | O(1) average |
| Existence Check | Hash Set | O(1) average |
| Get Minimum / Maximum | Heap (Priority Queue) | O(1) peek, O(log N) extract |
| Find Closest Value | Binary Search Tree | O(log N) (if balanced) |
| Range Sum (Static Array) | Prefix Sum Array | O(1) |
| Range Sum (Dynamic Array) | Fenwick / Segment Tree | O(log N) |
| String Prefix Match | Trie | O(L) |
| Grouping / Connectivity | Union-Find (DSU) | O(alpha(N)) (nearly O(1)) |
| Eviction Policy (LRU) | Doubly Linked List + Hash Map | O(1) |
