## Thread Back to the Parent <span class="lv lv3"></span>

- **What:** Morris traversal: in-order in O(1) extra space. Before going left from `cur`, point the null right pointer of `cur`'s in-order predecessor back at `cur`. The thread replaces the stack
- **Spot it:** "O(1) extra space" or "without a stack" on a tree walk. The recursion stack does not count → 14-08
- **Why:** the predecessor's right pointer is always null, so the slot is free. Returning to `cur` through the thread proves its left side is done: cut it, go right

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Morris traversal on a BST with root 4, left child 2 with children 1 and 3, right child 6. At the first visit of 4, the walk finds its predecessor 3, the rightmost node of the left subtree, and lays a dashed thread from 3 back to 4, then goes left. After emitting 1, 2 and 3, the walk follows the thread to 4, sees the thread already exists, cuts it, emits 4 and goes right." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .cur { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.3; }
    .pr { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
  </style>
  <defs><marker id="m1910" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ef476e"/></marker></defs>
  <line x1="120" y1="22" x2="70" y2="62" stroke="#1a1a1a"/><line x1="120" y1="22" x2="170" y2="62" stroke="#1a1a1a"/>
  <line x1="70" y1="62" x2="40" y2="102" stroke="#1a1a1a"/><line x1="70" y1="62" x2="100" y2="102" stroke="#1a1a1a"/>
  <circle class="cur" cx="120" cy="22" r="12"/><text x="120" y="26" class="lb" text-anchor="middle">4</text>
  <circle class="n" cx="70" cy="62" r="12"/><text x="70" y="66" class="lb" text-anchor="middle">2</text>
  <circle class="n" cx="170" cy="62" r="12"/><text x="170" y="66" class="lb" text-anchor="middle">6</text>
  <circle class="n" cx="40" cy="102" r="12"/><text x="40" y="106" class="lb" text-anchor="middle">1</text>
  <circle class="pr" cx="100" cy="102" r="12"/><text x="100" y="106" class="lb" text-anchor="middle">3</text>
  <path d="M112 100 C 150 90, 150 50, 126 33" fill="none" stroke="#ef476e" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#m1910)"/>
  <text x="148" y="98" class="sm">thread: 3.right = 4</text>
  <text x="230" y="24" class="lb">1st visit of 4:</text><text x="230" y="38" class="sm">pred.right is null → lay thread, go left</text>
  <text x="230" y="62" class="lb">2nd visit of 4 (via thread):</text><text x="230" y="76" class="sm">pred.right === cur → cut thread,</text><text x="230" y="88" class="sm">emit 4, go right</text>
  <text x="230" y="112" class="sm">output: 1 2 3 4 6 · extra space: two pointers</text>
</svg>
:::

```ts
// Binary Tree Inorder Traversal (LeetCode 94) in O(1) extra space
function inorder(root: TreeNode | null): number[] {
  const out: number[] = [];
  let cur = root;
  while (cur) {
    if (!cur.left) { out.push(cur.val); cur = cur.right; continue; }
    let pred = cur.left;          // rightmost of the left subtree
    while (pred.right && pred.right !== cur) pred = pred.right;
    if (!pred.right) {              // first visit: lay the thread
      pred.right = cur; cur = cur.left;
    } else {                           // second visit: cut it
      pred.right = null; out.push(cur.val); cur = cur.right;
    }
  }
  return out;
}
```

- **Watch out:** returning mid-walk leaves threads in place, and the tree has cycles. Finish the walk, or cut the threads first
