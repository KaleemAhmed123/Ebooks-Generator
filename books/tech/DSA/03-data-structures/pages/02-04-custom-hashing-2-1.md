### Application 2: Subtree Serialization

- **Problem:** Find all duplicate subtrees in a Binary Tree
- **The Insight:** We can't compare TreeNodes directly. But we can convert every subtree into a string using a post-order traversal
- A leaf node with value 4 serializes to `"4,null,null"`
- We store these strings in a Hash Map. If we see a string that already has a count of 1, we found a duplicate

```ts
function findDuplicateSubtrees(root: TreeNode | null): TreeNode[] {
  const map = new Map<string, number>();
  const res: TreeNode[] = [];
  
  function serialize(node: TreeNode | null): string {
    if (!node) return "#"; // Delimiter for null
    
    // Post-order: left, right, then current
    const leftStr = serialize(node.left);
    const rightStr = serialize(node.right);
    
    // Construct the unique signature for THIS subtree
    const signature = `${node.val},${leftStr},${rightStr}`;
    
    const count = map.get(signature) || 0;
    if (count === 1) {
      res.push(node); // Only push on the SECOND occurrence
    }
    map.set(signature, count + 1);
    
    return signature;
  }
  
  serialize(root);
  return res;
}
```
