## Read the BST in Order 🟢

- **What it is:** An in-order walk of a binary search tree yields its values in sorted order. Turn that walk into an *iterator* with an explicit stack (push the left spine, pop, then push the left spine of the right child) and every "sorted array" trick works on the tree, pausing whenever you like
- **Signal:** "k-th smallest in a BST", "BST iterator with next() and hasNext()", "two-sum in a BST", "count pairs from two BSTs with sum x", "recover a BST where two nodes were swapped", "minimum difference between any two nodes"
- **Why it works:** In a BST every left subtree is smaller and every right subtree is larger than its root, so left-root-right is ascending order. The explicit stack holds only the current left spine, O(height) memory, and each node is pushed and popped once: amortised O(1) per `next()`

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
  <text x="200" y="44" class="lb">pop 1, pop 2, pop 3 → push 4</text>
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
    // next in order
    node = stack.pop()!;
    if (--k === 0) return node.val;
    // then its right
    node = node.right;
  }
}
```

### Variations

- **Binary Search Tree Iterator (LeetCode 173):** the same stack kept between calls. `next()` pops and pushes the right child's left spine; `hasNext()` checks the stack is non-empty
- **Two Sum IV – Input is a BST (LeetCode 653) / Brothers from different roots (GFG):** one iterator ascending, one descending (push *right* spines), then collision two pointers exactly as on a sorted array (page 02-08). O(h) memory, no array copy
- **Recover Binary Search Tree (LeetCode 99):** in order, a swapped pair shows up as one or two "drops" (`prev.val > cur.val`). The first node of the first drop and the second node of the last drop are the swapped pair
- **Minimum Absolute Difference in BST (LeetCode 530):** the minimum gap is between in-order neighbours; track `prev`
- **Convert BST to Greater Tree (LeetCode 538):** reverse in-order (right, root, left) with a running sum
- **Median of a BST in O(1) extra space (GFG):** the in-order walk without a stack needs Morris threading (Chapter 19)

### The failure

- **Collecting the whole in-order list.** Building an array of n values to read the k-th wastes O(n) memory and time when k is small; the iterator stops after k pops
- **Validating a BST with only parent–child checks.** `left.val < node.val < right.val` at each node accepts `5 → left 3 → right 6`, where 6 sits in 5's left subtree. In-order must be strictly increasing, or carry the allowed range down (page 14-02)

:::interview
"Can you find the k-th smallest element in a BST without traversing the whole tree?" — Yes, iterative in-order with a stack: push the left spine, pop, count, then move to the right child. I stop after k pops, so the cost is O(height + k) time and O(height) memory. If the tree changes often and many k-th queries arrive, I would store subtree sizes in each node to answer in O(height).
:::
