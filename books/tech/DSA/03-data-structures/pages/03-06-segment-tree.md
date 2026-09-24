## Segment Tree

- **What it is:** A versatile Binary Tree where each node represents an interval (range) of the underlying array
- **The Contract:** O(log N) range queries (sum, min, max, gcd) and O(log N) point or range updates
- **Why it works:** It pre-computes the answers for progressively larger blocks of the array. When asked for a bizarre range like `[3, 11]`, it stitches the answer together from a handful of pre-computed blocks rather than scanning 8 individual elements

*Note: For the deep pedagogical breakdown of Segment Trees and Lazy Propagation, refer to Module 02, Chapter 10. This page serves as the structural reference.*

### The Structure

- A Segment Tree is a full binary tree. If the array has $N$ elements, the leaf nodes represent the $N$ individual elements.
- The parent of two leaves represents the combination of those two elements (e.g., their sum).
- The root of the tree represents the combination of the entire array `[0, N-1]`.
- Because it is a complete tree, it is almost always implemented via a flat Array of size $4N$.

### The Build Phase

Building the tree is a classic Post-Order traversal. A node calculates its own value by combining its left and right children.

```ts
// Example: Range Minimum Query (RMQ)
let tree: number[]; // size 4N
let arr: number[];

function build(node: number, start: number, end: number) {
  if (start === end) {
    tree[node] = arr[start]; // Leaf node
    return;
  }
  
  const mid = Math.floor((start + end) / 2);
  const leftChild = 2 * node;
  const rightChild = 2 * node + 1;
  
  build(leftChild, start, mid);
  build(rightChild, mid + 1, end);
  
  // Combine: Post-order step
  tree[node] = Math.min(tree[leftChild], tree[rightChild]);
}
```

### The Flexibility advantage

- Unlike a Fenwick Tree (which is practically limited to commutative operations with inverses, like Addition), a Segment Tree can handle *anything*.
- You can build a Segment Tree for **Minimum, Maximum, Greatest Common Divisor (GCD), or Matrix Multiplication**.
- You simply change the post-order combination step: `tree[node] = COMBINE(tree[left], tree[right])`.

:::interview
"Why use a Segment Tree over a Fenwick Tree if both do O(log N) updates and queries?"

A Fenwick Tree is incredibly concise (10 lines of code) and uses only $O(N)$ space, making it strictly faster due to cache locality and bitwise operations. However, Fenwick Trees cannot do Range Minimum Queries (RMQ) efficiently because `min()` doesn't have an inverse operation (you can't "subtract" a minimum). A Segment Tree requires $O(4N)$ space and is much more verbose to write, but it is infinitely more flexible.
:::
