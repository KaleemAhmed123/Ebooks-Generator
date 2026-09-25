## Thread Back to the Parent 🔴

- **What it is:** **Morris traversal.** An in-order walk with O(1) extra space. Before descending left from `cur`, point the null right pointer of `cur`'s in-order predecessor back at `cur`. That temporary **thread** replaces the stack frame that would have remembered the way back
- **Signal:** "O(1) extra space" on a binary tree walk: Median of BST (GFG), the follow-up to Recover BST (LeetCode 99); Kth Smallest (LeetCode 230) when asked for O(1) space
- **Why it works:** The predecessor is the rightmost node of the left subtree, and its right pointer is always null, so the slot is free. Reaching `cur` a second time through the thread proves the left subtree is finished; the walk removes the thread and moves right. Each edge is walked a constant number of times, so O(n) total

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Morris traversal on a BST with root 4, left child 2 with children 1 and 3, right child 6. At the first visit of 4, the walk finds its predecessor 3, the rightmost node of the left subtree, and lays a dashed thread from 3 back to 4, then goes left. After emitting 1, 2 and 3, the walk follows the thread to 4, sees the thread already exists, cuts it, emits 4 and goes right." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
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
    // rightmost of the left subtree
    let pred = cur.left;
    while (pred.right && pred.right !== cur) pred = pred.right;
    // first visit: lay the thread
    if (!pred.right) {
      pred.right = cur; cur = cur.left;
    } else {                           // second visit: cut it
      pred.right = null; out.push(cur.val); cur = cur.right;
    }
  }
  return out;
}
```

### Variations

- **Pre-order (LeetCode 144):** emit `cur` when the thread is *laid*, not when it is cut
- **Median of BST in O(1) space (GFG):** one Morris pass counts n, a second stops at the middle, finishing the walk to restore the tree
- **Recover Binary Search Tree (LeetCode 99):** the follow-up asks for O(1) space; during the Morris in-order, keep the first node larger than its successor and the last node smaller than its predecessor, then swap their values
- **Flatten Binary Tree to Linked List (LeetCode 114):** the same "rightmost node of the left subtree" hop, but the rewiring is permanent

### The failure

- **Returning mid-walk.** Stopping at the k-th node leaves every thread above it in place. The tree now has cycles: a later recursive walk overflows the stack, an iterative one loops forever. Keep walking to the end, or cut the threads before returning
- **Using it where the tree is shared.** The tree is modified during the walk. Another reader, or a tree with frozen nodes, sees broken structure. O(1) space is bought with temporary writes

:::interview
"Can you traverse in O(1) space?" — Morris: before going left, I point the predecessor's null right pointer at the current node. When I arrive through that thread, the left side is done, so I cut it, emit, and go right. O(n) time, since each thread is laid and cut once; the tree is restored when the walk finishes.
:::
