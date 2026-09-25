## Find the Split Point 🟡

- **What it is:** The lowest common ancestor (LCA) of `p` and `q` is the deepest node that has both below it (a node counts as below itself): the point where their root paths split. Recursively, each call reports "did I find p or q down here?"; the first node that hears *yes* from both sides, or is one of them itself with the other below, is the split point
- **Signal:** "lowest common ancestor", "distance between two nodes", "shortest path between two nodes in a tree", "directions from one node to another", "LCA of the deepest leaves"
- **Why it works:** A subtree that contains neither node returns `null`. Below the LCA, only one side can contain both targets, so `null` comes back from the other side and the found node is passed up unchanged. At the LCA, both sides return something for the first time. Post-order sees every node once: O(n)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="LCA of 7 and 4 in the tree 3 with children 5 and 1, 5 with children 6 and 2, 2 with children 7 and 4. Node 2 receives 7 from its left and 4 from its right, so 2 is the split point. Node 5 receives 2 from its right and null from its left and passes 2 up. The root returns 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .s { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="n" cx="120" cy="16" r="10"/><text x="120" y="19" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="112" y1="23" x2="78" y2="44"/><line class="e" x1="128" y1="23" x2="162" y2="44"/>
  <circle class="n" cx="72" cy="52" r="10"/><text x="72" y="55" class="lb" text-anchor="middle">5</text>
  <circle class="n" cx="168" cy="52" r="10"/><text x="168" y="55" class="lb" text-anchor="middle">1</text>
  <line class="e" x1="66" y1="60" x2="46" y2="80"/><line class="e" x1="78" y1="60" x2="98" y2="80"/>
  <circle class="n" cx="42" cy="88" r="10"/><text x="42" y="91" class="lb" text-anchor="middle">6</text>
  <circle class="s" cx="102" cy="88" r="10"/><text x="102" y="91" class="lb" text-anchor="middle">2</text>
  <line class="e" x1="96" y1="96" x2="84" y2="108"/><line class="e" x1="108" y1="96" x2="120" y2="108"/>
  <circle class="t" cx="80" cy="112" r="8"/><text x="80" y="115" class="lb" text-anchor="middle">7</text>
  <circle class="t" cx="124" cy="112" r="8"/><text x="124" y="115" class="lb" text-anchor="middle">4</text>
  <text x="220" y="30" class="lb">2: left → 7, right → 4 → return 2</text>
  <text x="220" y="48" class="lb">5: left → null, right → 2 → pass 2 up</text>
  <text x="220" y="66" class="lb">3: left → 2, right → null → pass 2 up</text>
  <text x="220" y="92" class="sm">dist(7, 4) = depth(7) + depth(4) − 2·depth(2)</text>
  <text x="220" y="104" class="sm">           = 3 + 3 − 2·2 = 2</text>
</svg>
:::

```ts
// Lowest Common Ancestor of a Binary Tree (LeetCode 236)
// p and q are guaranteed to exist in the tree
function lowestCommonAncestor(
  root: TreeNode | null, p: TreeNode, q: TreeNode,
): TreeNode | null {
  // found one (or none)
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  // split point
  if (left && right) return root;
  // pass up what was found
  return left ?? right;
}
```

### Variations

- **Lowest Common Ancestor of a BST (LeetCode 235):** no recursion into both sides: if both values are smaller go left, if both are larger go right, otherwise this node is the split. O(height), O(1) space
- **Min distance between two given nodes (GFG):** `depth(a) + depth(b) − 2 · depth(LCA)`, or find the LCA and add the two downward depths from it
- **Step-By-Step Directions From a Binary Tree Node to Another (LeetCode 2096):** paths from the root to both nodes as `L`/`R` strings; drop their common prefix (that is the LCA); answer = `U` for each step left in the start path + the rest of the destination path
- **Lowest Common Ancestor of Deepest Leaves (LeetCode 1123):** return `(depth, lca)` from each subtree: deeper side wins, equal depths make the current node the answer (return one, record another, page 14-03)
- **Many LCA queries:** binary lifting answers each in O(log n) after O(n log n) preprocessing (Module 03)

### The failure

- **Assuming both nodes exist when they may not.** The template returns `p` when only `p` is in the tree. GFG's version can ask about a missing node; then count how many targets were actually found and return `null` unless it is two
- **Comparing values instead of nodes.** In a general binary tree, values may repeat; `root.val === p.val` can stop at the wrong node. Compare references

:::interview
"How does the recursive LCA work?" — Each call returns p or q if it found one in its subtree, else null. When a node gets non-null from both children, p and q are on different sides, so it is the lowest common ancestor. If a node is itself p or q, it returns immediately, which covers the case where one target is an ancestor of the other. One post-order pass, O(n).
:::
