### The `push()` operation

- The core mechanic of Lazy Propagation is the `push()` (or `propagate()`) function
- Whenever you visit a node (either to query it or to update it), you must first check if it has a pending lazy memo. If it does:
  1. Apply the lazy memo to the node's actual value
  2. Pass the memo down to its left and right children
  3. Clear the memo from the current node

```ts
function push(node: number, left: number, right: number) {
  if (lazy[node] !== 0) {
    // 1. Apply to current node (e.g., Range Sum)
    // If we add X to every element, the total sum increases by X * (elements in range)
    tree[node] += lazy[node] * (right - left + 1);
    
    // 2. Pass memo to children (if not a leaf)
    if (left !== right) {
      lazy[2 * node] += lazy[node];
      lazy[2 * node + 1] += lazy[node];
    }
    
    // 3. Clear memo
    lazy[node] = 0;
  }
}
```

### The Rule of Lazy Traversal

- **Always push before you process.** 
- In your `updateRange` function, call `push(node, left, right)` immediately upon entering the node.
- In your `queryRange` function, call `push(node, left, right)` immediately upon entering the node.
- This guarantees that any node you are looking at is completely up-to-date with all previous range updates.
