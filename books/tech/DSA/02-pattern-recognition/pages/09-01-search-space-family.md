# Chapter 9 - Search Space

## The Search Space Reduction Family <span class="lv lv1"></span>

- **What it is:** Problems where the potential answers form a massive, structured domain, and you can systematically eliminate large portions of that domain without checking them
- **The signal:** "Find the minimum capacity", "Find the maximum distance", "Search in a 2D matrix"
- **The mechanism:** In a random space, finding an answer takes O(N) time (you must check everything). In a structured space (like a sorted array, a binary search tree, or a monotonic boolean function), you can check one point and logically conclude that an entire half of the space is invalid. This drops the search time from O(N) to O(log N)

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Binary Search on Answer** | "Minimise the maximum", "Maximise the minimum" | A boolean function `canAchieve(X)` that flips from `true` to `false` at exactly one threshold |
| **Staircase Search** (05-04) | "Search in a row/col sorted 2D matrix" | Moving Left decreases the value, moving Down increases the value |
| **Find the Sorted Half** (09-03) | "Rotated sorted array", "peak element" | One side of any midpoint is sorted or uphill |
| **Guess a Value, Count Below It** (09-04) | "k-th smallest in a sorted matrix" | `count(≤ x)` is monotone in x |

### The meta-pattern

- Binary search on answer is the most abstract pattern in the linear half of this booklet.
- The previous patterns operated on *the input array*. "Binary Search on Answer" operates on *the mathematical domain of all possible answers*.
- It changes how you write algorithms: instead of writing a function that directly calculates the answer, you write a "checker" function that says "Yes" or "No", and you binary search over guesses, each checked in one pass
