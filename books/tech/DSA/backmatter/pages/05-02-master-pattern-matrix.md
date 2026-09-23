## The Master Pattern Matrix

How to find the right pattern based on what the problem requires.

### Structural Needs

| If you need... | Try this pattern |
| :--- | :--- |
| A contiguous subsegment | Sliding Window, Prefix Sum, Kadane's |
| To find combinations/permutations | Backtracking (dfs), Bitmask DP |
| To find paths or connectivity | BFS, DFS, DSU (Union-Find) |
| To sort elements with dependencies | Topological Sort |
| To optimize a sequence of choices | Dynamic Programming, Greedy |
| The top K elements | Min-Heap / Max-Heap, Quickselect |
| To find intersections or overlaps | Sweep Line (Intervals), Sort by start time |

### State & Search Space

| If the search space is... | Try this pattern |
| :--- | :--- |
| Sorted (Array/Matrix) | Binary Search, Two Pointers |
| A range of possible answers | Binary Search on Answer |
| Nodes differing by 1 step | Graph (BFS for shortest path) |
| Massive coordinates (10⁹) | Coordinate Compression |
| Prefix sharing (Strings) | Trie |

### DP Recognizers

| If the problem asks for... | Try this DP |
| :--- | :--- |
| Ways to reach a target sum | Subset Sum / Knapsack |
| Min/Max of two strings | 2D Array DP (LCS) |
| Min/Max partitioning | Interval DP |
| Subsets (small N) | Bitmask DP |
| Mathematical combinations | Probability DP |
