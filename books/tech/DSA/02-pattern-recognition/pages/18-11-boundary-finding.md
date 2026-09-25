## Boundary Finding 🟡

- **What it is:** Transforming a problem that asks "find a value" into a problem that asks "find the point where a boolean condition flips from False to True" (or True to False)
- **Why nobody named it:** Textbooks call it "Binary Search." But Binary Search is just an array traversal technique. The real intellectual leap is the *transformation* of the problem into a boolean boundary

### The abstract mechanism

- You want to find an answer x
- You define a function `isPossible(x)` that returns a boolean
- You prove that `isPossible(x)` is monotonic. For example, if x is too small it's False, and as x grows it eventually becomes True and *stays* True
- The search space maps to: `[F, F, F, F, T, T, T]`
- The problem is now entirely solved by finding the boundary between `F` and `T`

### Where it appears

| Problem Type | The "F to T" transition |
|---|---|
| **Binary Search on Answer** | "Can I carry this much weight?" F → T |
| **First occurrence in sorted array** | "Is this element ≥ target?" F → T |
| **K-th smallest in matrix** | "Are there ≥ k elements smaller than x?" F → T |
| **Longest valid substring** | "Is it possible to have a valid substring of length L?" T → F |

### Why this is a pattern, not a technique

- You can find the boundary using Binary Search (O(log N))
- You can find the boundary using Two Pointers (O(N)) if both the array and the condition move monotonically
- You can find the boundary using a Sweep Line (O(N log N))
- The pattern is **the boundary**, not the search algorithm

### The meta-skill: Inventing the condition

- The hardest part of these problems is never the binary search template. It is defining the `isPossible(x)` function
- **If the problem asks for a minimum:** Define `isPossible(x)` as "Can we achieve the goal with capacity x?" The pattern is `[F, F, T, T, T]`. You want the first T
- **If the problem asks for a maximum:** Define `isPossible(x)` as "Can we achieve the goal with size x?" The pattern is `[T, T, T, F, F]`. You want the last T

:::interview
"I don't know how to optimize this min-max problem."

Min-max and max-min problems are almost always boundary problems in disguise. Instead of asking "What is the maximum minimum?", ask: "Can I guarantee a minimum of X?" If yes, try X+1. If no, try X-1. You have transformed an optimization problem into a boolean boundary.
:::
