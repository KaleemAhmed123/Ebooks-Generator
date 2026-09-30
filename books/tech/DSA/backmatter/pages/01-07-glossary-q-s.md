## Glossary (Q–S)

- **Quick Select:** A variant of Quick Sort that finds the K-th largest element in O(N) average time by only recursing into the relevant partition.
- **Quick Sort:** An unstable, in-place O(N log N) sorting algorithm that partitions an array around a pivot element.
- **Rabin–Karp / Rolling Hash:** A window hash that updates in O(1) as it slides (drop the left character, shift, add the right), giving O(N) substring search with a character check on each hash match.
- **Recursion:** A function calling itself to solve a smaller instance of the same problem, fundamentally relying on the hardware Call Stack.
- **Segment Tree:** A binary tree storing interval information, enabling both range queries and array updates in O(log N) time.
- **Sieve of Eratosthenes:** An O(N log(log N)) algorithm to find all prime numbers up to N by crossing out multiples.
- **Sliding Window:** A technique using two pointers to maintain a contiguous subsegment of an array, usually optimizing a nested loop into O(N).
- **Sparse Table:** Precomputed answers for every power-of-two-length range, giving O(1) min/max queries on static data.
- **State (in DP):** The minimal set of variables (e.g., index, remaining capacity) that uniquely describes a subproblem.
- **State-Space Tree:** The implicit tree of all partial solutions explored by backtracking; each node is a partial configuration, each branch is a decision, and leaves are complete candidates.
- **Stays-Ahead Argument:** A greedy correctness proof showing that at every step, the greedy solution is at least as good as any alternative — so it finishes at least as good.
- **Subset Sum:** A DP deciding whether some subset reaches a target sum; a boolean array over the budget, and the basis of 0/1 knapsack.
- **Sweep Line:** Processing interval endpoints as sorted +1/−1 events while keeping a running count.
