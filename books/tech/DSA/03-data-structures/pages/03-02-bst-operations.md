## Binary Search Trees (BST)

- **What it is:** A Binary Tree governed by a strict invariant: Left children are strictly smaller, Right children are strictly larger
- **The Contract:** O(log N) insertions, deletions, and lookups, while maintaining a perfectly sorted dataset
- **Why it works:** It is the data structure manifestation of Binary Search. Every step down the tree permanently eliminates half of the remaining data

### The Array Bottleneck

- If you want to binary search, you need a sorted array.
- But what if you need to continually *add* new numbers to your dataset?
- Inserting into a sorted array is O(N) because you have to shift elements. A BST solves this by linking nodes dynamically. Finding the insertion point is O(log N), and linking the node is O(1).

### The Worst-Case Reality

- A BST only guarantees O(log N) operations if it is **balanced** (the left and right subtrees have roughly the same height).
- If you insert elements in already-sorted order `[1, 2, 3, 4]`, every node is placed as the right child of the previous node.
- The tree devolves into a Linked List. Lookups and insertions crash to O(N).
- **The Fix:** Self-balancing BSTs (AVL Trees, Red-Black Trees). They detect imbalance and perform O(1) "rotations" to pull the tree back into a logarithmic shape.

### Validating a BST

- A classic interview trap is validating if a tree is a BST.
- **The trap:** Checking if `left < current < right` for every node. 
- This fails because a node deep in the left subtree might satisfy its immediate parent, but still be larger than the root of the entire tree.
- **The fix:** You must pass the boundary constraints *downward* (Pre-order logic).

```ts
function isValidBST(node: TreeNode | null, min = -Infinity, max = Infinity): boolean {
  if (!node) return true;
  
  // The current node must fit within the boundaries dictated by its ancestors
  if (node.val <= min || node.val >= max) return false;
  
  // Left child inherits the max boundary. Right child inherits the min boundary.
  return isValidBST(node.left, min, node.val) && 
         isValidBST(node.right, node.val, max);
}
```

### In-order Traversal Property

- Because of the BST invariant, an **In-order traversal** (Left, Current, Right) visits the nodes in perfectly ascending sorted order.
- To find the Kth smallest element in a BST, you do an In-order traversal and return the Kth element you process.

:::interview
"Can we use a Hash Map instead of a BST?" — If you only need exact lookups, a Hash Map is faster (O(1)). But a Hash Map destroys order. If the problem asks you to find the "closest element", the "next largest element", or "count elements between X and Y", a Hash Map is useless (O(N)). A BST is required for order-aware O(log N) queries.
:::
