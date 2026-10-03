## Read the BST in Order <span class="lv lv1"></span>

- **What:** an in-order walk of a BST yields sorted values. Make it an *iterator* with an explicit stack (push the left spine, pop, push the right child's left spine) and pause whenever you like
- **Spot it:** "k-th smallest in a BST", "BST iterator", "two-sum in a BST", "recover a BST with two nodes swapped". Not a BST, so in-order is not sorted → a heap, 15-01
- **Why:** left subtree < root < right subtree, so left-root-right is ascending. The stack holds one left spine, O(height); each node is pushed and popped once

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="In-order iterator on the BST 5 with children 3 and 6, 3 with children 2 and 4, 2 with left child 1. Push the left spine 5, 3, 2, 1. Pop 1, then 2, then 3; after popping 3 push the left spine of its right child, 4. The values come out 1, 2, 3, 4, 5, 6. The third value is 3, the k-th smallest for k equals 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .sp { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="sp" cx="110" cy="16" r="10"/><text x="110" y="19" class="lb" text-anchor="middle">5</text>
  <line class="e" x1="103" y1="23" x2="77" y2="42"/><line class="e" x1="117" y1="23" x2="143" y2="42"/>
  <circle class="sp" cx="72" cy="50" r="10"/><text x="72" y="53" class="lb" text-anchor="middle">3</text>
  <circle class="n" cx="148" cy="50" r="10"/><text x="148" y="53" class="lb" text-anchor="middle">6</text>
  <line class="e" x1="66" y1="58" x2="48" y2="76"/><line class="e" x1="78" y1="58" x2="96" y2="76"/>
  <circle class="sp" cx="44" cy="84" r="10"/><text x="44" y="87" class="lb" text-anchor="middle">2</text>
  <circle class="n" cx="100" cy="84" r="10"/><text x="100" y="87" class="lb" text-anchor="middle">4</text>
  <line class="e" x1="38" y1="92" x2="28" y2="104"/>
  <circle class="sp" cx="24" cy="110" r="8"/><text x="24" y="113" class="lb" text-anchor="middle">1</text>
  <text x="200" y="26" class="lb">stack after init: [5, 3, 2, 1]</text>
  <text x="200" y="44" class="lb">pop 1, pop 2, pop 3</text>
  <text x="200" y="62" class="lb">order: 1 2 3 4 5 6</text>
  <text x="200" y="86" class="lb" fill="#1d4e89">k = 3 → stop at 3</text>
  <text x="200" y="104" class="sm">memory: one left spine, O(height)</text>
</svg>
:::

```ts
// Kth Smallest Element in a BST (LeetCode 230)
function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let node = root;
  while (true) {
    // left spine
    while (node) { stack.push(node); node = node.left; }
    node = stack.pop()!;                          // next in order
    if (--k === 0) return node.val;
    node = node.right;                           // then its right
  }
}
```

- **Watch out:** Recover BST with swapped *neighbours* has one drop, not two: `1, 3, 2, 4`. Take the first node of the first drop and the second node of the last
