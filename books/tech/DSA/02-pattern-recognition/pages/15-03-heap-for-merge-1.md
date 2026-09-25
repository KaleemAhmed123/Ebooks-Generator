## Merge from Every Head <span class="lv lv1"></span>

- **What it is:** K sorted sources, one merged order. Put the *head* of each source in a min-heap; pop the smallest, output it, and push the next element from the source it came from
- **Signal:** "merge k sorted lists / arrays", "k-th smallest across k sorted lists", "smallest range covering one element from each list", "k pairs with smallest sums"
- **Why it works:** The next output must be the smallest head: everything behind a head is at least as large. So the heap only ever needs one candidate per source, K items at most, and each of the N outputs costs O(log K)

:::mint
<svg viewBox="0 0 470 134" role="img" aria-label="Three sorted lists A 1, 5, 9; B 2, 4, 8; C 3, 6, 7. Their heads 1, 2 and 3 sit in a min-heap of size three. Pop 1 from A and push A's next value 5. The heap now holds 2, 3, 5. Output so far: 1. The heap never holds more than one value per list." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .hd { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .pop { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .new { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
  </style>
  <defs><marker id="m1503" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <text x="10" y="26" class="lb">A</text><rect class="pop" x="26" y="12" width="26" height="20"/><rect class="new" x="52" y="12" width="26" height="20"/><rect class="bx" x="78" y="12" width="26" height="20"/>
  <text x="39" y="26" class="lb" text-anchor="middle">1</text><text x="65" y="26" class="lb" text-anchor="middle">5</text><text x="91" y="26" class="lb" text-anchor="middle">9</text>
  <text x="10" y="62" class="lb">B</text><rect class="hd" x="26" y="48" width="26" height="20"/><rect class="bx" x="52" y="48" width="26" height="20"/><rect class="bx" x="78" y="48" width="26" height="20"/>
  <text x="39" y="62" class="lb" text-anchor="middle">2</text><text x="65" y="62" class="lb" text-anchor="middle">4</text><text x="91" y="62" class="lb" text-anchor="middle">8</text>
  <text x="10" y="98" class="lb">C</text><rect class="hd" x="26" y="84" width="26" height="20"/><rect class="bx" x="52" y="84" width="26" height="20"/><rect class="bx" x="78" y="84" width="26" height="20"/>
  <text x="39" y="98" class="lb" text-anchor="middle">3</text><text x="65" y="98" class="lb" text-anchor="middle">6</text><text x="91" y="98" class="lb" text-anchor="middle">7</text>
  <line x1="110" y1="22" x2="176" y2="50" stroke="#1a1a1a" stroke-width="0.9" marker-end="url(#m1503)"/>
  <line x1="110" y1="58" x2="176" y2="58" stroke="#1a1a1a" stroke-width="0.9" marker-end="url(#m1503)"/>
  <line x1="110" y1="94" x2="176" y2="66" stroke="#1a1a1a" stroke-width="0.9" marker-end="url(#m1503)"/>
  <circle class="pop" cx="214" cy="34" r="12"/><text x="214" y="38" class="lb" text-anchor="middle">1</text>
  <circle class="hd" cx="194" cy="72" r="12"/><text x="194" y="76" class="lb" text-anchor="middle">2</text>
  <circle class="hd" cx="234" cy="72" r="12"/><text x="234" y="76" class="lb" text-anchor="middle">3</text>
  <line x1="206" y1="43" x2="199" y2="61" stroke="#1a1a1a" stroke-width="0.8"/><line x1="222" y1="43" x2="229" y2="61" stroke="#1a1a1a" stroke-width="0.8"/>
  <text x="214" y="104" class="sm" text-anchor="middle">heap: one head per list</text>
  <line x1="232" y1="30" x2="296" y2="30" stroke="#2d6a4f" stroke-width="1.2" marker-end="url(#m1503)"/>
  <text x="304" y="34" class="lb">output 1</text>
  <text x="304" y="58" class="lb">push A's next: 5</text>
  <text x="304" y="74" class="sm">heap is now 2, 3, 5</text>
  <text x="304" y="98" class="sm">N pops × O(log K) each</text>
  <text x="10" y="126" class="sm">green: popped · red: its successor, pushed next · blue: current heads</text>
</svg>
:::

```ts
// Merge k Sorted Lists (LeetCode 23)
// ListNode: 12-01 · Heap: the binary heap on 15-11
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const heap = new Heap<ListNode>((x, y) => x.val < y.val);
  for (const head of lists) if (head) heap.push(head);
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;
  while (heap.size() > 0) {
    const node = heap.pop()!;
    // output the smallest head
    tail = tail.next = node;
    if (node.next) heap.push(node.next);   // its successor joins
  }
  return dummy.next;
}
```
