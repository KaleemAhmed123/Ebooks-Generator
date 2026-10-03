### Breadth-First Search (Level Order)

- Sometimes you don't care about the hierarchy's depth; you care about the horizontal layers.
- BFS processes the tree layer by layer, from top to bottom, left to right.
- It requires a **Queue** instead of the Call Stack.

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length; // Snapshot the current level
    const currentLevel: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // O(1) in a real queue
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}
```
