# Chapter 18 - Patterns Nobody Named

## Why unnamed patterns matter 🟡

- Every technique in Chapters 2–17 has a LeetCode tag. Sliding Window. Binary Search. Heap. You can study them by name
- But there are structural patterns that appear across multiple techniques and have never been given a consistent name. They connect algorithms that look completely different on the surface
- These unnamed patterns are the reason some people can "see" solutions to unfamiliar problems while others cannot. The difference is not intelligence — it is recognising a structure that nobody taught you to look for

### The four unnamed patterns

| Pattern | What it does | Where you have already seen it |
|---|---|---|
| **Frontier Maintenance** | Maintain a boundary between explored and unexplored, advance it systematically | BFS queue, Dijkstra's priority queue, greedy selection |
| **Dominated Candidate Elimination** | Prove a candidate can never become optimal, throw it away permanently | Monotonic stack, convex hull trick, Pareto pruning |
| **Boundary Finding** | Reduce the problem to finding the transition point in a sorted boolean sequence | Binary search, binary search on answer, first/last occurrence |
| **Precompute for Cheap Queries** | Spend time upfront so repeated queries become O(1) | Prefix sum, sparse table, Fenwick tree |
