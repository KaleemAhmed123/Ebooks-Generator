# Chapter 9 - Search Space

## The Search Space Reduction Family <span class="lv lv1"></span>

- **What it is:** Problems where the potential answers form a massive, structured domain, and you can systematically eliminate large portions of that domain without checking them
- **The signal:** "Find the minimum capacity", "Find the maximum distance", "Search in a 2D matrix"
- **The mechanism:** In a random space, finding an answer takes O(N) time (you must check everything). In a structured space (like a sorted array, a binary search tree, or a monotonic boolean function), you can check one point and logically conclude that an entire half of the space is invalid. This drops the search time from O(N) to O(log N)

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Binary Search on Answer** (09-02) | "Minimise the maximum", "Maximise the minimum" | A boolean function `canAchieve(X)` that flips from `true` to `false` at exactly one threshold |
| **Staircase Search** (05-04) | "Search in a row/col sorted 2D matrix" | Moving Left decreases the value, moving Down increases the value |
| **Find the Sorted Half** (09-03) | "Rotated sorted array", "peak element" | One side of any midpoint is sorted or uphill |
| **Guess a Value, Count Below It** (09-04) | "k-th smallest in a sorted matrix" | `count(≤ x)` is monotone in x |

### The meta-pattern

- Turning "find the optimum" into "is this value feasible?" is Module 07 (01-04). The boundary need not be found by binary search: when both the input and the condition move one way, two pointers find it in O(n)
