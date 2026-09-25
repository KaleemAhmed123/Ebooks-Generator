## Rebuild from Traversals 🟡 - continued

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
