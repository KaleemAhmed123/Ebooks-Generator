## Two Pointers <span class="lv lv1"></span>

- **What it is:** two indices that each move one way only: from both ends toward each other (collide), or both forward, one reading and one writing
- **Signal:** "sorted", "pair / triplet summing to X", "palindrome", "in place, return the new length"
- **Mechanism:** every step discards something for good: a row of pairs (collide) or a settled prefix (write). At most n steps

:::mint
<svg viewBox="0 42 470 76" role="img" aria-label="Two index motions over the same array. Collide: left starts at index 0 and moves right, right starts at the last index and moves left, until they meet. Reader and writer: both move right, the reader ahead, and the cells behind the writer are final." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #c9c9c9; stroke-width: 0.8; }
    .win { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .fin { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
    .p { font: bold 8.5px Consolas, monospace; fill: #1a1a1a; }
  </style>
  <defs><marker id="m0201" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <text x="10" y="24" class="lb">window</text>
  <rect class="bx" x="90" y="12" width="22" height="18"/><rect class="win" x="112" y="12" width="22" height="18"/><rect class="win" x="134" y="12" width="22" height="18"/><rect class="win" x="156" y="12" width="22" height="18"/><rect class="bx" x="178" y="12" width="22" height="18"/><rect class="bx" x="200" y="12" width="22" height="18"/><rect class="bx" x="222" y="12" width="22" height="18"/>
  <path d="M112 36 L134 36" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0201)"/><path d="M167 36 L189 36" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0201)"/>
  <text x="252" y="20" class="sm">left → and right → : both only move right</text>
  <text x="252" y="32" class="sm">answers about contiguous runs (02-02 … 02-07)</text>
  <text x="10" y="64" class="lb">collide</text>
  <rect class="win" x="90" y="52" width="22" height="18"/><rect class="bx" x="112" y="52" width="22" height="18"/><rect class="bx" x="134" y="52" width="22" height="18"/><rect class="bx" x="156" y="52" width="22" height="18"/><rect class="bx" x="178" y="52" width="22" height="18"/><rect class="bx" x="200" y="52" width="22" height="18"/><rect class="win" x="222" y="52" width="22" height="18"/>
  <path d="M101 76 L123 76" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0201)"/><path d="M233 76 L211 76" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0201)"/>
  <text x="252" y="60" class="sm">left → and ← right: they meet in the middle</text>
  <text x="252" y="72" class="sm">answers about pairs in sorted data (02-08, 02-10)</text>
  <text x="10" y="104" class="lb">read/write</text>
  <rect class="fin" x="90" y="92" width="22" height="18"/><rect class="fin" x="112" y="92" width="22" height="18"/><rect class="bx" x="134" y="92" width="22" height="18"/><rect class="bx" x="156" y="92" width="22" height="18"/><rect class="win" x="178" y="92" width="22" height="18"/><rect class="bx" x="200" y="92" width="22" height="18"/><rect class="bx" x="222" y="92" width="22" height="18"/>
  <text x="145" y="89" class="p" text-anchor="middle">w</text><text x="189" y="89" class="p" text-anchor="middle">r</text>
  <text x="252" y="100" class="sm">writer w trails reader r; left of w is final</text>
  <text x="252" y="112" class="sm">answers "rewrite in place" (02-09)</text>
</svg>
:::

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **02-08** | sorted, find a pair | a too-small sum rules out a whole row of pairs |
| **02-10** | triplets, k-Sum | fix one value, collide on the rest |
| **02-09** | "in place, return the new length", 0 / 1 / 2 | everything behind the writer is final |

```ts
let l = 0, r = a.length - 1;          // collide: sorted, find a pair
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) return [l, r];
  s < target ? l++ : r--;
}
let w = 0;                            // reader and writer: keep in place
for (const x of a) if (keep(x)) a[w++] = x;
```

### The trap

- **Unsorted, original indices wanted.** Sorting loses the positions; remember each value seen instead (03-05). A contiguous range under a condition is a window (02-03)
