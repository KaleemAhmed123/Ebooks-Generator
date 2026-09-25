## Carry It Down <span class="lv lv1"></span>

- **What it is:** When a node's answer depends on its ancestors, handle the node with what the parent passed in, then call the children with an updated copy. The path from the root is summarised in a few parameters: the maximum so far, the running sum, the allowed range
- **Signal:** "good nodes" (no ancestor is larger), "root-to-leaf path with sum", "numbers formed by root-to-leaf paths", "maximum difference between a node and an ancestor", "valid BST range", "count paths with sum k that go downward"
- **Why it works:** A node's ancestors are exactly the nodes on the call stack above it. Passing a summary as a parameter gives each call its own version of the path, with no undo needed: when the call returns, the caller's parameters are unchanged. Every node is visited once, O(n)

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
    // handle the root
    const good = node.val >= maxAbove ? 1 : 0;
    // update what flows down
    const m = Math.max(maxAbove, node.val);
    return good + go(node.left, m) + go(node.right, m);
  };
  return go(root, -Infinity);
}
```

### Variations

- **Path Sum (LeetCode 112) / Path Sum II (LeetCode 113):** carry the remaining sum; at a *leaf*, check it is 0. For II, also carry the path in a shared array and pop on return
- **Sum Root to Leaf Numbers (LeetCode 129):** carry `num · 10 + node.val`; add it at each leaf
- **Maximum Difference Between Node and Ancestor (LeetCode 1026):** carry both the minimum and the maximum on the path; the answer at a node is the larger of `|val − min|` and `|val − max|`
- **Path Sum III (LeetCode 437) / Print all k-sum paths (GFG):** paths may start anywhere below the root. Carry a *map of prefix sums* on the path (page 03-03): add `count[sum − k]` at each node, insert `sum` before recursing, remove it after
- **Validate Binary Search Tree (LeetCode 98):** carry the allowed range `(lo, hi)`; Module 03 walks through it

### The failure

- **Treating any node as a leaf.** In Path Sum, a node with one child is not a leaf. Checking `remaining === 0` at a `null` child counts a path that stops half-way: a root `1` with only a right child `2` and target 1 must return false
- **Mutating a shared path without undo.** In Path Sum II and III, a shared array or map must be restored after the recursive calls, or later branches see nodes from finished ones

:::interview
"How do you know whether to pass information down or return it up?" — If the node needs something about its ancestors, such as the maximum on the path or the remaining sum, it arrives as a parameter. If it needs something about its descendants, such as height or subtree sum, it comes back as a return value. Good Nodes only looks up the path, so a single parameter and one pre-order pass solve it in O(n).
:::
