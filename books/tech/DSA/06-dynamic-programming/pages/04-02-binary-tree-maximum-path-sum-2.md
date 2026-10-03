### Implementation

```ts
function maxPathSum(root: TreeNode | null): number {
  let globalMax = -Infinity;

  // Returns the maximum "Straight Line" path going down from `node`
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    // We only care about positive contributions. If a branch is negative, ignore it (0).
    const leftStraight = Math.max(0, dfs(node.left));
    const rightStraight = Math.max(0, dfs(node.right));

    // Calculate the peak path (Inverted V) and update the global max
    const peakPath = node.val + leftStraight + rightStraight;
    globalMax = Math.max(globalMax, peakPath);

    // Return the Straight Line path to the parent
    return node.val + Math.max(leftStraight, rightStraight);
  }

  dfs(root);
  return globalMax;
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) (LeetCode 124) | The classic split-state tree DP problem |
| [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543) | Same inverted-V logic, measuring edges instead of sums |
| [Longest ZigZag Path in a Binary Tree](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/) (LeetCode 1372) | Return one direction to parent, track global max |

### The takeaway

Tree DP often requires a split state: one value returned to the parent to maintain mathematical continuity, and a separate side-effect (a global variable) that tracks the actual answer by combining branches that the parent is legally forbidden to see.
