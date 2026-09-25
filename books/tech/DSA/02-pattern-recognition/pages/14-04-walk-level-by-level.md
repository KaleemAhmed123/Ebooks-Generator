## Walk Level by Level <span class="lv lv1"></span>

- **What it is:** Breadth-first search with a snapshot: before processing a level, read `size = queue.length`, then pop exactly `size` nodes. Everything asked "per level" (the rightmost node, the average, the order, the width) is computed inside that inner loop
- **Signal:** "right side view", "left view", "zig-zag level order", "maximum width of a level", "average of each level", "is the tree complete", "are all levels anagrams of each other"
- **Why it works:** A queue holds the next level behind the current one, in left-to-right order. The size snapshot is the boundary between them, so the inner loop sees exactly one level, and its first and last iterations are the leftmost and rightmost nodes. Module 03 builds the basic loop; the patterns are what you do inside it

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
    // one level, left to right
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return view;
}
```

### Variations

- **Left View of Binary Tree (GFG):** `level[0]` instead of the last node. DFS alternative: visit left before right and record the first node seen at each depth
- **Binary Tree Zigzag Level Order Traversal (LeetCode 103):** collect each level left to right, reverse every other one (or fill an array from the back on odd levels)
- **Maximum Width of Binary Tree (LeetCode 662):** give each node its heap index (`2i`, `2i + 1`); width = last index − first index + 1 per level. Subtract the level's first index before doubling, or indices overflow on deep, thin trees
- **Check Completeness of a Binary Tree (LeetCode 958):** BFS that also enqueues `null` children; once a `null` has been seen, any later real node means the tree is not complete
- **Check if all levels of two trees are anagrams (GFG):** walk both trees level by level together; compare each pair of levels as sorted lists or frequency maps
- **Reverse Level Order Traversal (GFG):** collect levels, then reverse the list of levels (or push right child before left and reverse the whole output)

### The failure

- **Using the queue's changing length as the loop bound.** `for (let i = 0; i < queue.length; i++)` while pushing children keeps extending the loop into the next level. Snapshot the size first, or build `next` separately as the template does
- **Right view as "keep going right".** Following only right children misses nodes that stick out below a shorter right side. For `[1, 2, 3, 4]` (4 is the left child of 2) the right-child walk gives `1, 3`; the view is `1, 3, 4`, because nothing on level 2 is to the right of 4

:::interview
"How do you get the right side view of a binary tree?" — BFS level by level, and the last node of each level is visible from the right. Equivalently, DFS visiting the right child first and recording the first node at each new depth. Both are O(n); BFS uses O(width) memory, DFS O(height).
:::
