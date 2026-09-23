## The Constraint Table

If you read the constraints carefully, they will tell you exactly what time complexity the problem setter is expecting.

| Constraint | Expected Time Complexity | Probable Algorithms / Patterns |
|---|---|---|
| N ≤ 12 | O(N!) | **Backtracking** (Permutations), Traveling Salesperson |
| N ≤ 20 | O(2^N) | **Backtracking** (Subsets), Bitmask DP, Meet-in-the-Middle |
| N ≤ 100 | O(N³) | **3D DP**, Floyd-Warshall (All-Pairs Shortest Path) |
| N ≤ 1,000 | O(N²) | **2D DP** (Strings, Grid), Nested Loops, Adjacency Matrix |
| N ≤ 10⁵ | O(N log N) | **Sorting**, Divide & Conquer, Binary Search, Priority Queue (Heaps) |
| N ≤ 10⁶ | O(N) | **Hash Maps**, **Two Pointers**, **Sliding Window**, **Monotonic Stack/Queue**, Prefix Sum, Graph Traversals (DFS/BFS) |
| N ≥ 10⁹ | O(log N) | **Binary Search** (on an answer range), Math / Combinatorics |
| N ≥ 10¹⁸ | O(1) or O(log N) | Pure Math, Fast Exponentiation |

### How to use this

When you see N = 10⁵, you instantly know that a O(N²) algorithm will Time Out. Do not waste time building a 2D DP table. Do not waste time writing nested loops. You must find a way to sort the data, use a Heap, or scan it linearly with a Hash Map or Two Pointers.
