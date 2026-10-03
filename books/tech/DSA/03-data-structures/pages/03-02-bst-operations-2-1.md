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
