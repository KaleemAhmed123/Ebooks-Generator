## Return One, Record Another <span class="lv lv2"></span>

- **What it is:** The value a node must *return* to its parent is often not the answer. The diameter through a node needs both subtree heights, but the parent can only extend *one* of them. So return the extendable quantity (height) and **record** the answer (height left + height right) in an outer variable as a side effect
- **Signal:** "diameter", "longest path between any two nodes", "is it height-balanced", "tilt", "distribute coins so every node has one", "maximum product of splitting the tree", "minimum cameras"
- **Why it works:** A path that bends at node `x` is made of one downward path into each subtree, and a downward path is exactly what a child can report upward. Every path bends at exactly one highest node, so recording "bend here" at every node, in post-order, sees every path once: O(n)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Diameter of binary tree on 1 with children 2 and 3, and 2 with children 4 and 5. Node 2 returns height 2 to its parent and records a bend of 1 plus 1 equals 2 edges. Node 1 records 2 plus 1 equals 3 edges, the diameter, along 4, 2, 1, 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .p { stroke: #1d4e89; stroke-width: 3; opacity: 0.35; }
  </style>
  <line class="p" x1="46" y1="94" x2="80" y2="56"/><line class="p" x1="80" y1="56" x2="120" y2="18"/><line class="p" x1="120" y1="18" x2="160" y2="56"/>
  <circle class="n" cx="120" cy="18" r="11"/><text x="120" y="22" class="lb" text-anchor="middle">1</text>
  <line class="e" x1="112" y1="26" x2="86" y2="48"/><line class="e" x1="128" y1="26" x2="154" y2="48"/>
  <circle class="n" cx="80" cy="56" r="11"/><text x="80" y="60" class="lb" text-anchor="middle">2</text>
  <circle class="n" cx="160" cy="56" r="11"/><text x="160" y="60" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="74" y1="65" x2="52" y2="86"/><line class="e" x1="86" y1="65" x2="108" y2="86"/>
  <circle class="n" cx="46" cy="94" r="11"/><text x="46" y="98" class="lb" text-anchor="middle">4</text>
  <circle class="n" cx="114" cy="94" r="11"/><text x="114" y="98" class="lb" text-anchor="middle">5</text>
  <text x="210" y="30" class="lb">node 2: returns height 2</text>
  <text x="210" y="44" class="lb">        records bend 1 + 1 = 2</text>
  <text x="210" y="66" class="lb">node 1: returns height 3</text>
  <text x="210" y="80" class="lb">        records bend 2 + 1 = 3</text>
  <text x="210" y="104" class="lb" fill="#1d4e89">diameter = 3 edges (4-2-1-3)</text>
</svg>
:::

```ts
// Diameter of Binary Tree (LeetCode 543), in edges
function diameterOfBinaryTree(root: TreeNode | null): number {
  // recorded answer
  let best = 0;
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    const l = height(node.left), r = height(node.right);
    // record: bend here
    best = Math.max(best, l + r);
    // return: extendable part
    return 1 + Math.max(l, r);
  };
  height(root);
  return best;
}
```
