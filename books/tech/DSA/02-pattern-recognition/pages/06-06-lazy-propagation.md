## Lazy Propagation

- A standard Segment Tree can update a single point in O(log N) time
- What if you need to update an entire range `[L, R]`? For example, "add 5 to all elements from index 10 to 20"
- If you update each point individually, it takes O((R-L) × log N) time, which degrades to O(N log N) in the worst case. This is slower than just updating the array!
- To achieve **O(log N) range updates**, we must use **Lazy Propagation**

### The Insight: Procrastination

- If a node completely covers the update range `[L, R]`, updating all its descendant leaves immediately is a waste of time. The queries might never even ask for those individual leaves
- Instead, we **update the current node** to reflect the total change, and **leave a memo (a lazy value)** for its children: *"Hey, when someone eventually visits you, remind them to add 5."*
- We stop traversing downwards. This keeps the update to O(log N)

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

### The trap: Applying the lazy value correctly

- The most common bug in Lazy Propagation is applying the lazy value incorrectly to the `tree` array
- If the tree tracks **Range Maximum**, and you add 5 to the range, the new maximum is `oldMaximum + 5`
- If the tree tracks **Range Sum**, and you add 5 to the range, the new sum is `oldSum + (5 * numberOfElementsInRange)`
- You must factor in the length of the segment when the operation dictates it

:::interview
"Why does Lazy Propagation keep updates at O(log N)?" — Because we stop traversing the tree as soon as we find a node completely contained within the update range. Instead of updating the O(N) leaves below it, we just tag that single node with a lazy marker and return. We only propagate that marker downwards later, on-demand, if a future query actually forces us to visit those children.
:::
