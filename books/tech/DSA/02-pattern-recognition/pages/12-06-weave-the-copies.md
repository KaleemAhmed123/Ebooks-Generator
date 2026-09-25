## Weave the Copies <span class="lv lv2"></span>

- **What it is:** To deep-copy a structure whose nodes point at arbitrary other nodes, you need "old node → its copy" for every node. A hash map gives that in O(n) space; weaving each copy right after its original gives it in O(1) extra space: the copy of `x` is simply `x.next`
- **Signal:** "copy list with random pointer", "clone a linked list with next and arbitrary pointer", "clone graph", any deep copy where pointers may point backwards or to nodes not yet copied
- **Why it works:** A pointer to a node that has not been copied yet cannot be set during a single pass. Splitting the job into three passes removes the dependency: create every copy first, then fix every `random` using `x.random.next`, then unweave the two lists

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
  // 1. weave copies in
  for (let x = head; x; x = x.next!.next)
    x.next = { val: x.val, next: x.next, random: null };
  // 2. copies' randoms
  for (let x = head; x; x = x.next!.next)
    x.next!.random = x.random ? x.random.next : null;
  const dummy: RNode = { val: 0, next: null, random: null };
  let tail = dummy;
  for (let x = head; x; x = x.next) {              // 3. unweave
    const copy = x.next!;
    // restore original
    x.next = copy.next;
    tail.next = copy; tail = copy;
  }
  return dummy.next;
}
```

### Variations

- **Hash-map version:** pass 1 builds `Map<old, new>`, pass 2 sets `copy.next = map.get(x.next)` and `copy.random = map.get(x.random)`. O(n) space, simpler to get right under pressure
- **Clone Graph (LeetCode 133):** the map version on a graph; DFS or BFS, creating each clone the first time it is seen (drill in 16-09)
- **Flattening a Linked List (GFG):** each node has a sorted `bottom` list; merge the lists pairwise from the right with the merge from page 12-01
- **Flatten a Multilevel Doubly Linked List (LeetCode 430):** when a node has a child, splice the child list between it and its `next`, fixing `prev` pointers both ways

### The failure

- **Setting `random` in the first pass.** `x.random` may point to a node whose copy does not exist yet. Either finish all copies first, or use a map that creates copies on demand
- **Not restoring the original list.** Skipping the `x.next = copy.next` line leaves the caller's list woven with copies. Every test that checks "the original must be unchanged" fails

:::interview
"Can you copy a list with random pointers without a hash map?" — Yes: weave each copy directly after its original, so the copy of any node x is x.next. Then every copy's random pointer is `x.random.next`, and a final pass separates the two lists, restoring the original. Three linear passes, O(1) extra space besides the copies themselves.
:::
