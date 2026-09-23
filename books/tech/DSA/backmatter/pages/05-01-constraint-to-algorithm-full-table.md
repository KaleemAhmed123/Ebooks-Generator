## The Master Constraint Table

When you see a specific constraint in an interview, these are the algorithms you should immediately consider.

| Constraint | Complexity Target | Candidate Algorithms |
| :--- | :--- | :--- |
| **N ≤ 12** | O(N!) | Backtracking (Permutations), TSP (Bitmask DP). |
| **N ≤ 25** | O(2^N) | Backtracking (Combinations), Meet-in-the-Middle, Bitmask DP. |
| **N ≤ 100** | O(N⁴) | 4D DP, Floyd-Warshall (All-Pairs Shortest Path). |
| **N ≤ 500** | O(N³) | 3D DP, Matrix Multiplication Chain, O(V³) Graph Algorithms. |
| **N ≤ 10⁴** | O(N²) | 2D DP (LCS, Edit Distance), Selection/Insertion Sort, Unoptimized Graph Traversals (Dense). |
| **N ≤ 10⁵** | O(N log N) | Sorting, Binary Search on Answer, Sweep Line, Segment Trees, Divide and Conquer, Dijkstra. |
| **N ≤ 10⁶** | O(N) | HashMap, Two Pointers, Sliding Window, Monotonic Stack, Prefix Sums, BFS/DFS, KMP. |
| **N ≥ 10⁹** | O(log N) or O(1) | Binary Search (Sorted Array), Math, Digit DP, Matrix Exponentiation. |

### The Exceptions

Constraints are clues, not laws. If N ≤ 10⁵, an O(N) solution is perfectly acceptable (and often optimal), but an O(N²) solution will definitely timeout.

- **The Sparse Exception:** If N ≤ 10⁵ but you need to check pairs, you can't use O(N²). But if you know most pairs are invalid, and you only check valid connections, the *amortized* complexity might be O(N), which passes.
- **The String Exception:** String concatenation in many languages is O(S) where S is the string length. If you do it in a loop N times, your algorithm silently degrades to O(N²). Always use an Array `join()` or a `StringBuilder`.
