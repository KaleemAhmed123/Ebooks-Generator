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
