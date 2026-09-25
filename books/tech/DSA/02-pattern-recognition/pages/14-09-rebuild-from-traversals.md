## Rebuild from Traversals <span class="lv lv2"></span>

- **What it is:** A pre-order list tells you *which* node is the root (always first). An in-order list tells you *which nodes are on each side* of it. Together they rebuild the tree uniquely when values are distinct: take the next pre-order value as the root, split the in-order range at its position, recurse left then right
- **Signal:** "construct a binary tree from preorder and inorder", "from inorder and postorder", "BST from preorder", "serialize and deserialize", "tree from a bracket string", "balanced BST from a sorted array"
- **Why it works:** In pre-order, a root comes before everything in its subtree, and the left subtree comes before the right one. In in-order, the root sits between its left and right subtrees. So the root's offset within the current in-order range is exactly the size of its left subtree, which tells the recursion where to split both lists. A value → index map makes each split O(1)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Preorder 3 9 20 15 7 and inorder 9 3 15 20 7. The first preorder value 3 is the root. In the inorder list 3 is at index 1, so 9 is the whole left subtree and 15 20 7 is the right subtree. Recursing gives root 20 with children 15 and 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .r { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .L { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .R { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="14" y="26" class="sm">preorder</text>
  <rect class="r" x="80" y="12" width="30" height="22"/><text x="95" y="27" class="lb" text-anchor="middle">3</text>
  <rect class="L" x="110" y="12" width="30" height="22"/><text x="125" y="27" class="lb" text-anchor="middle">9</text>
  <rect class="R" x="140" y="12" width="30" height="22"/><text x="155" y="27" class="lb" text-anchor="middle">20</text>
  <rect class="R" x="170" y="12" width="30" height="22"/><text x="185" y="27" class="lb" text-anchor="middle">15</text>
  <rect class="R" x="200" y="12" width="30" height="22"/><text x="215" y="27" class="lb" text-anchor="middle">7</text>
  <text x="14" y="62" class="sm">inorder</text>
  <rect class="L" x="80" y="48" width="30" height="22"/><text x="95" y="63" class="lb" text-anchor="middle">9</text>
  <rect class="r" x="110" y="48" width="30" height="22"/><text x="125" y="63" class="lb" text-anchor="middle">3</text>
  <rect class="R" x="140" y="48" width="30" height="22"/><text x="155" y="63" class="lb" text-anchor="middle">15</text>
  <rect class="R" x="170" y="48" width="30" height="22"/><text x="185" y="63" class="lb" text-anchor="middle">20</text>
  <rect class="R" x="200" y="48" width="30" height="22"/><text x="215" y="63" class="lb" text-anchor="middle">7</text>
  <text x="14" y="94" class="lb">root 3, inorder index 1 → left size 1 (9), right size 3</text>
  <text x="14" y="110" class="lb">right part: pre 20 15 7 / in 15 20 7 → root 20</text>
  <text x="260" y="30" class="sm">pre: root first</text>
  <text x="260" y="64" class="sm">in: root splits left | right</text>
</svg>
:::

```ts
// Tree from Preorder and Inorder Traversal (LeetCode 105)
function buildTree(pre: number[], ino: number[]): TreeNode | null {
  // value → inorder index
  const at = new Map<number, number>();
  ino.forEach((v, i) => at.set(v, i));
  // next root in preorder
  let next = 0;
  // ino[lo..hi]
  const build = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const val = pre[next++];
    const mid = at.get(val)!;
    // left subtree first,
    const left = build(lo, mid - 1);
    // in preorder's order
    const right = build(mid + 1, hi);
    return { val, left, right };
  };
  return build(0, ino.length - 1);
}
```

### Variations

- **Construct from Inorder and Postorder (LeetCode 106):** post-order ends with the root. Read it from the back, and build the *right* subtree before the left
- **Construct BST from Preorder Traversal (LeetCode 1008):** no in-order needed: carry an upper bound down; take the next value while it is below the bound. Each value is read once, O(n)
- **Serialize and Deserialize Binary Tree (LeetCode 297):** pre-order with an explicit marker for `null` children is enough on its own, even with duplicate values; deserialising reads the tokens with the same recursion
- **Construct Binary Tree from String with Bracket Representation (GFG):** `4(2(3)(1))(6(5))`: read a number, then an optional `(…)` for the left subtree and another for the right; match brackets by depth or recursion
- **Convert Sorted Array to Binary Search Tree (LeetCode 108) / normal BST to balanced BST (GFG):** the middle element is the root; recurse on both halves. For an existing BST, read it in order first (page 14-08)

### The failure

- **`indexOf` inside the recursion.** Searching the in-order array for every root is O(n) per node, O(n²) total: survivable at a few thousand nodes, too slow at 10⁵, and the first thing an interviewer asks you to fix. Build the value → index map once
- **Duplicate values.** With repeated values the root's in-order position is ambiguous and the tree is not unique. The problem must promise distinct values, or you must serialise with null markers instead

:::interview
"Why keep a value → index map for the in-order array?" — Finding each root by scanning in-order costs O(n) per call, so O(n²) on a skewed tree. The map makes every split O(1) and the whole build O(n). It relies on distinct values, which LeetCode 105 guarantees.
:::
