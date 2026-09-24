## Persistent Segment Tree

- **What it is:** A Segment Tree that remembers all its previous states after being updated
- **The Contract:** O(log N) time and O(log N) space per update, while granting access to the entire history of the tree
- **Why it matters:** Standard Segment Trees overwrite their nodes during an update. If you need to answer queries about the array *as it was at time T*, a Persistent Segment Tree makes this possible without copying the entire O(N) array at every step

### Path Copying (The Secret to O(log N) Space)

- If we update index `5` in a Segment Tree, we only traverse down one specific path from the root to the leaf.
- That path touches exactly $\approx \log_2 N$ nodes. The other $N - \log_2 N$ nodes are completely unaffected.
- **The mechanism:** Instead of modifying the nodes, we create a *brand new root*, and create *brand new copies* of only the $\log_2 N$ nodes on the path. 
- We point the new nodes' untouched children to the *existing nodes* from the previous version of the tree.
- Result: We get a whole new tree state representing "Time T+1", but it shares 99% of its memory with "Time T".

### The Implementation Structure

Unlike a standard Segment Tree which uses a flat array `tree[4N]`, a Persistent Segment Tree must use dynamic Node objects, because the tree structure is no longer a perfect, single binary tree—it is a massive web of shared nodes.

```ts
class PNode {
  constructor(
    public sum: number = 0,
    public left: PNode | null = null,
    public right: PNode | null = null
  ) {}
}

// Update returns a BRAND NEW node, leaving the old one untouched
function update(node: PNode | null, start: number, end: number, idx: number, val: number): PNode {
  if (start === end) {
    return new PNode(val); // The new leaf
  }
  
  const mid = Math.floor((start + end) / 2);
  const leftChild = node ? node.left : null;
  const rightChild = node ? node.right : null;
  
  const newNode = new PNode();
  
  if (idx <= mid) {
    newNode.left = update(leftChild, start, mid, idx, val); // Copy left path
    newNode.right = rightChild; // Share old right branch
  } else {
    newNode.left = leftChild; // Share old left branch
    newNode.right = update(rightChild, mid + 1, end, idx, val); // Copy right path
  }
  
  newNode.sum = (newNode.left?.sum || 0) + (newNode.right?.sum || 0);
  return newNode;
}
```

### Application: K-th Smallest Element in a Range

The most famous application of the Persistent Segment Tree is answering queries of the form: "What is the K-th smallest number in the subarray `arr[L...R]`?".

1. Build a Persistent Segment Tree over the *values* of the array (essentially a frequency map segment tree).
2. For each element `arr[i]`, create a new version of the tree (Time `i`) that increments the frequency of `arr[i]`.
3. To query range `[L, R]`, you look at the tree at Time `R` and subtract the tree at Time `L-1`. This difference perfectly represents the frequencies in the subarray `[L, R]`.
4. You can then binary search down the tree to find the K-th smallest element in O(log N) time.

:::interview
"Does Path Copying trigger Garbage Collection issues?"

Yes, in environments like Java or Node.js, allocating O(log N) new objects per update can create heavy GC pressure. In high-performance CP (C++), developers often pre-allocate a massive array of Nodes `Node pool[MAX_UPDATES * 20]` and use an integer pointer `pool_ptr++` to simulate allocation instantly without GC overhead.
:::
