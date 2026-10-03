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
