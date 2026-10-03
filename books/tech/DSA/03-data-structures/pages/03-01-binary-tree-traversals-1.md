## Binary Tree Traversals <span class="lv lv1"></span>

- **What it is:** A hierarchical structure where each node has at most two children (`left`, `right`)
- **The Contract:** Trees enforce a hierarchy, breaking down a problem space logarithmically. They are inherently recursive
- **Why it works:** You can mathematically guarantee that you visit every node exactly once, in a specific order, using simple recursion

### The Three Depth-First Traversals

All DFS traversals visit nodes in the exact same physical path. The only difference is **when** you process the current node's value.

1. **Pre-order (Current, Left, Right):** Process the node the moment you first see it. Used for *Top-Down* logic (e.g., passing a value from the root down to the leaves).
2. **In-order (Left, Current, Right):** Process the left subtree, then the node, then the right subtree. Used exclusively for **Binary Search Trees (BSTs)** because it visits nodes in sorted, ascending order.
3. **Post-order (Left, Right, Current):** Process the node *after* both of its children have been fully processed. Used for *Bottom-Up* logic (e.g., calculating the height of a tree, or deleting a tree).

```ts
function postOrder(node: TreeNode | null) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val); // The processing step
}
```

### The Post-Order Bottleneck

- The vast majority of hard tree problems are **Post-order** problems.
- **The pattern:** A node cannot calculate its own answer until it receives information from its left child and its right child. 
- **Example:** "Is this tree balanced?" A node cannot know if it is balanced until it knows the height of its left subtree and right subtree. It must wait for them to return.
