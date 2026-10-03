### Implementation

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function rob(root: TreeNode | null): number {
  // Returns [robThisNode, skipThisNode]
  function dfs(node: TreeNode | null): [number, number] {
    if (!node) return [0, 0];

    const left = dfs(node.left);
    const right = dfs(node.right);

    const robNode = node.val + left[1] + right[1];
    
    const skipNode = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    return [robNode, skipNode];
  }

  const result = dfs(root);
  return Math.max(result[0], result[1]);
}
```

By returning an array (or object) containing multiple state variables, we avoid needing a global Hash Map to memoize the Tree nodes, making the algorithm a blazing fast O(N) with O(H) space.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [House Robber III](https://leetcode.com/problems/house-robber-iii/) (LeetCode 337) | Non-adjacent selection on a tree |
| [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543) | Return depth to parent, track diameter as side effect |
| [Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/) (LeetCode 687) | Same split-state pattern with a value-matching constraint |
