## Carry It Down <span class="lv lv1"></span>

- **What:** when a node's answer depends on its ancestors, summarise the path in a few parameters (the max so far, the running sum, the allowed range) and call the children with an updated copy
- **Spot it:** "good nodes", "root-to-leaf path with sum", "valid BST range". A path that may bend at a node → 14-03
- **Why:** a node's ancestors are exactly the calls above it. Parameters give each call its own copy of the path, so nothing needs undoing

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Count good nodes on a tree with root 3, children 1 and 4, grandchildren 3 under 1, and 1 and 5 under 4. Each call receives the maximum on its path. Nodes 3, 3, 4 and 5 are at least that maximum and are good; the two 1s are not. Answer 4." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .g { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="g" cx="120" cy="18" r="11"/><text x="120" y="22" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="112" y1="26" x2="76" y2="48"/><line class="e" x1="128" y1="26" x2="164" y2="48"/>
  <circle class="b" cx="70" cy="56" r="11"/><text x="70" y="60" class="lb" text-anchor="middle">1</text>
  <circle class="g" cx="170" cy="56" r="11"/><text x="170" y="60" class="lb" text-anchor="middle">4</text>
  <line class="e" x1="64" y1="65" x2="50" y2="86"/><line class="e" x1="164" y1="65" x2="148" y2="86"/><line class="e" x1="176" y1="65" x2="192" y2="86"/>
  <circle class="g" cx="46" cy="94" r="11"/><text x="46" y="98" class="lb" text-anchor="middle">3</text>
  <circle class="b" cx="144" cy="94" r="11"/><text x="144" y="98" class="lb" text-anchor="middle">1</text>
  <circle class="g" cx="196" cy="94" r="11"/><text x="196" y="98" class="lb" text-anchor="middle">5</text>
  <text x="84" y="42" class="sm">max 3</text><text x="182" y="42" class="sm">max 3</text>
  <text x="20" y="80" class="sm">max 3</text><text x="120" y="80" class="sm">max 4</text><text x="206" y="80" class="sm">max 4</text>
  <text x="250" y="30" class="lb">good(node, maxAbove):</text>
  <text x="250" y="46" class="lb">  node.val ≥ maxAbove → +1</text>
  <text x="250" y="62" class="lb">  children get max(maxAbove,</text>
  <text x="250" y="76" class="lb">                   node.val)</text>
  <text x="250" y="100" class="lb" fill="#2d6a4f">answer 4</text>
</svg>
:::

```ts
// Count Good Nodes in Binary Tree (LeetCode 1448)
type TreeNode = {
  val: number; left: TreeNode | null; right: TreeNode | null;
};

function goodNodes(root: TreeNode | null): number {
  const go = (node: TreeNode | null, maxAbove: number): number => {
    if (!node) return 0;
    const good = node.val >= maxAbove ? 1 : 0;  // handle the root
    // update what flows down
    const m = Math.max(maxAbove, node.val);
    return good + go(node.left, m) + go(node.right, m);
  };
  return go(root, -Infinity);
}
```

- **Watch out:** a leaf has *no* children. Checking `remaining === 0` at a `null` child counts a path that stops half-way: root 1 with only a right child 2, target 1, must be false
- **Also solves:** [Path Sum](https://leetcode.com/problems/path-sum/) (LeetCode 112) · [Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/) (LeetCode 129) (carry `num · 10 + val`) · [Maximum Difference Between Node and Ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/) (LeetCode 1026) · [Path Sum III](https://leetcode.com/problems/path-sum-iii/) (LeetCode 437) (a prefix-sum map on the path, 03-03; undo on return)
