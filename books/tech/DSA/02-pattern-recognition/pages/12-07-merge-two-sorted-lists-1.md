## Merge Two Sorted Lists <span class="lv lv1"></span>

- **What:** walk both sorted lists with a **dummy head**; repeatedly append the smaller current node and advance that list. When one runs out, attach the whole other tail in one step
- **Spot it:** "merge two sorted lists", "combine sorted sequences", "merge k lists" (do it pairwise, or a heap → 15-03), the merge half of merge sort
- **Why:** both lists are sorted, so the next smallest overall is always one of the two heads — comparing the fronts is enough. A dummy head means the first node is appended by the same code as the rest, with no special case

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Merging list 1,2,4 with list 1,3,4. A dummy node points at the growing result. At each step the smaller of the two heads is linked to the tail and that list advances. The output chain becomes 1,1,2,3,4,4, and when one list empties the remaining tail is attached whole." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .b { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .d { fill: #fff4d6; stroke: #8a5a00; stroke-width: 1.2; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
  </style>
  <defs><marker id="ll1207" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#6b6b6b"/></marker></defs>
  <text x="20" y="26" class="sm">l1</text>
  <g transform="translate(40,14)">
    <rect class="a" x="0" y="0" width="26" height="22"/><text x="13" y="15" class="lb" text-anchor="middle">1</text>
    <rect class="a" x="40" y="0" width="26" height="22"/><text x="53" y="15" class="lb" text-anchor="middle">2</text>
    <rect class="a" x="80" y="0" width="26" height="22"/><text x="93" y="15" class="lb" text-anchor="middle">4</text>
  </g>
  <text x="20" y="60" class="sm">l2</text>
  <g transform="translate(40,48)">
    <rect class="b" x="0" y="0" width="26" height="22"/><text x="13" y="15" class="lb" text-anchor="middle">1</text>
    <rect class="b" x="40" y="0" width="26" height="22"/><text x="53" y="15" class="lb" text-anchor="middle">3</text>
    <rect class="b" x="80" y="0" width="26" height="22"/><text x="93" y="15" class="lb" text-anchor="middle">4</text>
  </g>
  <text x="20" y="102" class="sm">out</text>
  <g transform="translate(40,90)">
    <rect class="d" x="-4" y="0" width="30" height="22"/><text x="11" y="15" class="lb" text-anchor="middle">•</text>
    <rect class="b" x="40" y="0" width="26" height="22"/><text x="53" y="15" class="lb" text-anchor="middle">1</text>
    <rect class="a" x="80" y="0" width="26" height="22"/><text x="93" y="15" class="lb" text-anchor="middle">1</text>
    <rect class="a" x="120" y="0" width="26" height="22"/><text x="133" y="15" class="lb" text-anchor="middle">2</text>
    <rect class="b" x="160" y="0" width="26" height="22"/><text x="173" y="15" class="lb" text-anchor="middle">3</text>
    <rect class="a" x="200" y="0" width="26" height="22"/><text x="213" y="15" class="lb" text-anchor="middle">4</text>
    <rect class="b" x="240" y="0" width="26" height="22"/><text x="253" y="15" class="lb" text-anchor="middle">4</text>
  </g>
  <text x="300" y="90" class="d" fill="#8a5a00">dummy head</text>
  <text x="300" y="104" class="sm">removes the first-node case</text>
  <text x="300" y="118" class="lb" fill="#2d6a4f">tail = smaller head, then advance</text>
</svg>
:::

```ts
class ListNode { val: number; next: ListNode | null = null; constructor(v: number) { this.val = v; } }

// Merge Two Sorted Lists (LeetCode 21)
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);                          // stand-in before the real head
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; } // splice the smaller node
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 ?? l2;                                    // one list is empty; attach the rest
  return dummy.next;                                       // skip the dummy
}
```

- **Watch out:** without the dummy head you special-case choosing the first node, which is where off-by-one bugs live. Use `<=` (not `<`) to keep the merge **stable** and to not drop equal values. Splice existing nodes (O(1) space); allocating new nodes wastes memory
