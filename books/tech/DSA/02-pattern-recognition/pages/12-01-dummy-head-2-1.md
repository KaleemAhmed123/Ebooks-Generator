## The Linked List Family: Start with a Dummy Head 🟢 - continued

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Merging 1, 3 and 2, 4 with a dummy node. A tail pointer starts at the dummy and always attaches the smaller head: 1, then 2, then 3, then 4. The merged list is dummy.next, and no code path treats the first node specially." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .d { fill: #f4f4f4; stroke: #9a9a9a; stroke-width: 1; stroke-dasharray: 3 2; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m1201" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="d" x="20" y="30" width="44" height="24"/><text x="42" y="46" class="sm" text-anchor="middle">dummy</text>
  <path class="a" d="M 64 42 L 84 42" marker-end="url(#m1201)"/>
  <rect class="n" x="86" y="30" width="30" height="24"/><text x="101" y="46" class="lb" text-anchor="middle">1</text>
  <path class="a" d="M 116 42 L 136 42" marker-end="url(#m1201)"/>
  <rect class="n" x="138" y="30" width="30" height="24"/><text x="153" y="46" class="lb" text-anchor="middle">2</text>
  <path class="a" d="M 168 42 L 188 42" marker-end="url(#m1201)"/>
  <rect class="n" x="190" y="30" width="30" height="24"/><text x="205" y="46" class="lb" text-anchor="middle">3</text>
  <path class="a" d="M 220 42 L 240 42" marker-end="url(#m1201)"/>
  <rect class="n" x="242" y="30" width="30" height="24"/><text x="257" y="46" class="lb" text-anchor="middle">4</text>
  <text x="42" y="72" class="sm" text-anchor="middle">tail starts here</text>
  <text x="20" y="96" class="lb">return dummy.next  // the head, whichever list it came from</text>
  <text x="300" y="36" class="sm">A: 1 → 3</text><text x="300" y="50" class="sm">B: 2 → 4</text>
  <text x="300" y="68" class="sm">attach the smaller head, advance</text>
</svg>
:::

```ts
// Merge Two Sorted Lists (LeetCode 21)
type ListNode = { val: number; next: ListNode | null };

function mergeTwoLists(
  a: ListNode | null, b: ListNode | null,
): ListNode | null {
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  // attach the leftover run
  tail.next = a ?? b;
  return dummy.next;
}
```
