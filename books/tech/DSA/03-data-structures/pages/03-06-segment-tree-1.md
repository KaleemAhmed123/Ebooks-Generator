## Segment Tree <span class="lv lv2"></span>

- **What it is:** A versatile Binary Tree where each node represents an interval (range) of the underlying array
- **The Contract:** O(log N) range queries (sum, min, max, gcd) and O(log N) point or range updates
- **Why it works:** It pre-computes the answers for progressively larger blocks of the array. When asked for a bizarre range like `[3, 11]`, it stitches the answer together from a handful of pre-computed blocks rather than scanning 8 individual elements

*Note: For the deep pedagogical breakdown of Segment Trees and Lazy Propagation, refer to Module 02, Chapter 10. This page serves as the structural reference.*

### The Structure

- A Segment Tree is a full binary tree. If the array has $N$ elements, the leaf nodes represent the $N$ individual elements.
- The parent of two leaves represents the combination of those two elements (e.g., their sum).
- The root of the tree represents the combination of the entire array `[0, N-1]`.
- Because it is a complete tree, it is almost always implemented via a flat Array of size $4N$.
