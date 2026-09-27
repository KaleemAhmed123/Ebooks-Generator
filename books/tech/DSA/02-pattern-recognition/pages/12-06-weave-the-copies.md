## Weave the Copies <span class="lv lv2"></span>

- **What:** a deep copy needs "old node → its copy". A map gives it in O(n) space; weaving each copy right after its original gives it in O(1): the copy of `x` is `x.next`
- **Spot it:** a deep copy of a list whose nodes carry a second pointer to any node or null. Nodes with neighbour lists (a graph) → the map version, 16-01
- **Why:** a pointer to an uncopied node cannot be set in one pass. Three passes remove the dependency: copy all, set each `random` to `x.random.next`, unweave

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Copying a list A, B, C with random pointers. Pass 1 weaves copies: A, A prime, B, B prime, C, C prime. Pass 2 sets each copy's random: A prime's random is A.random.next. Pass 3 separates the lists: originals A, B, C and copies A prime, B prime, C prime." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .o { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .r { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 3 2; }
  </style>
  <defs><marker id="m1206" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker></defs>
  <text x="20" y="24" class="sm">1. weave</text>
  <rect class="o" x="90" y="12" width="26" height="20"/><text x="103" y="26" class="lb" text-anchor="middle">A</text>
  <rect class="c" x="120" y="12" width="26" height="20"/><text x="133" y="26" class="lb" text-anchor="middle">A'</text>
  <rect class="o" x="150" y="12" width="26" height="20"/><text x="163" y="26" class="lb" text-anchor="middle">B</text>
  <rect class="c" x="180" y="12" width="26" height="20"/><text x="193" y="26" class="lb" text-anchor="middle">B'</text>
  <rect class="o" x="210" y="12" width="26" height="20"/><text x="223" y="26" class="lb" text-anchor="middle">C</text>
  <rect class="c" x="240" y="12" width="26" height="20"/><text x="253" y="26" class="lb" text-anchor="middle">C'</text>
  <path class="r" d="M 103 34 Q 163 70 221 34" marker-end="url(#m1206)"/><text x="130" y="62" class="sm">A.random = C</text>
  <text x="20" y="86" class="lb">2. A'.random = A.random.next = C'</text>
  <text x="20" y="106" class="lb">3. unweave: A→B→C and A'→B'→C'</text>
  <text x="300" y="26" class="sm">copy of x is x.next:</text>
  <text x="300" y="38" class="sm">the list itself is the map</text>
</svg>
:::

```ts
// Copy List with Random Pointer (LeetCode 138), O(1) extra space
type RNode = {
  val: number; next: RNode | null; random: RNode | null;
};
function copyRandomList(head: RNode | null): RNode | null {
  for (let x = head; x; x = x.next!.next)    // 1. weave copies in
    x.next = { val: x.val, next: x.next, random: null };
  for (let x = head; x; x = x.next!.next)    // 2. copies' randoms
    x.next!.random = x.random ? x.random.next : null;
  const dummy: RNode = { val: 0, next: null, random: null };
  let tail = dummy;
  for (let x = head; x; x = x.next) {              // 3. unweave
    const copy = x.next!;
    x.next = copy.next;                        // restore original
    tail.next = copy; tail = copy;
  }
  return dummy.next;
}
```

- **Watch out:** restore the original. Skip `x.next = copy.next` and the caller's list stays woven with copies
- **Map version:** `Map<old, new>` in pass 1, then `copy.next = map.get(x.next)`, `copy.random = map.get(x.random)`: simpler under pressure
