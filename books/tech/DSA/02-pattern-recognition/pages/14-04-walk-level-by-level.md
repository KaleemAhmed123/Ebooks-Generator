## Walk Level by Level <span class="lv lv1"></span>

- **What:** BFS with a snapshot: read `size = queue.length`, then pop exactly `size` nodes. Anything asked per level (the rightmost, the average, the width) happens in that inner loop
- **Spot it:** "right side view", "zig-zag level order", "maximum width", "average of each level", "is the tree complete". Seen from above or "vertical" → 14-05
- **Why:** the queue holds the next level behind the current one, left to right. The snapshot is the boundary, so the inner loop sees exactly one level

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Right side view of 1 with children 2 and 3, 2 with right child 5, and 3 with right child 4. Level 0 is 1, level 1 is 2 3, level 2 is 5 4. The last node of each level is 1, 3, 4. The left view takes the first node of each level: 1, 2, 5." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .r { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="r" cx="100" cy="18" r="11"/><text x="100" y="22" class="lb" text-anchor="middle">1</text>
  <line class="e" x1="92" y1="26" x2="66" y2="48"/><line class="e" x1="108" y1="26" x2="134" y2="48"/>
  <circle class="n" cx="60" cy="56" r="11"/><text x="60" y="60" class="lb" text-anchor="middle">2</text>
  <circle class="r" cx="140" cy="56" r="11"/><text x="140" y="60" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="66" y1="65" x2="82" y2="86"/><line class="e" x1="146" y1="65" x2="162" y2="86"/>
  <circle class="n" cx="86" cy="94" r="11"/><text x="86" y="98" class="lb" text-anchor="middle">5</text>
  <circle class="r" cx="166" cy="94" r="11"/><text x="166" y="98" class="lb" text-anchor="middle">4</text>
  <text x="220" y="22" class="lb">level 0: 1       → last 1</text>
  <text x="220" y="60" class="lb">level 1: 2 3     → last 3</text>
  <text x="220" y="98" class="lb">level 2: 5 4     → last 4</text>
  <text x="400" y="60" class="sm">right view</text><text x="400" y="72" class="sm">1, 3, 4</text>
</svg>
:::

```ts
// Binary Tree Right Side View (LeetCode 199)
function rightSideView(root: TreeNode | null): number[] {
  const view: number[] = [];
  let level: TreeNode[] = root ? [root] : [];
  while (level.length) {
    // last node of this level
    view.push(level[level.length - 1].val);
    const next: TreeNode[] = [];
    for (const node of level) {        // one level, left to right
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return view;
}
```

- **Watch out:** "right view" is not "keep going right". For `[1, 2, 3, 4]` (4 under 2) the right-child walk gives `1, 3`; the view is `1, 3, 4`
- **Also solves:** [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) (LeetCode 103) · [Maximum Width of Binary Tree](https://leetcode.com/problems/maximum-width-of-binary-tree/) (LeetCode 662) (heap indices; subtract the level's first before doubling) · [Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/) (LeetCode 958) (after the first `null`, no real node)
