## Keep a Fixed Gap 🟢

- **What it is:** Two pointers that move at the *same* speed but start a fixed distance apart. When the leader reaches the end, the follower is exactly that distance from the end. A variant equalises two different lengths by letting each pointer, at its end, jump to the other list's head
- **Signal:** "remove the n-th node from the end", "n-th node from the end", "sum of the last N nodes", "intersection point of two Y-shaped lists", one pass, no length counting
- **Why it works:** The gap between the pointers never changes, so it is still n when the leader falls off the list. For two lists of lengths `x + c` and `y + c` sharing a tail `c`, each pointer walks `x + c + y` nodes before reaching the junction the second time around, so they arrive together

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Remove the 2nd node from the end of 1, 2, 3, 4, 5. Start both pointers at a dummy node, move fast 3 steps ahead (n plus 1). Move both until fast is null. Slow stops at 3, the node before the one to delete, so slow.next becomes 5." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .d { fill: #f4f4f4; stroke: #9a9a9a; stroke-width: 1; stroke-dasharray: 3 2; }
    .x { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
    .s { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
  </style>
  <rect class="d" x="20" y="20" width="34" height="22"/><text x="37" y="35" class="sm" text-anchor="middle">dummy</text>
  <rect class="n" x="60" y="20" width="30" height="22"/><text x="75" y="35" class="lb" text-anchor="middle">1</text>
  <rect class="n" x="96" y="20" width="30" height="22"/><text x="111" y="35" class="lb" text-anchor="middle">2</text>
  <rect class="s" x="132" y="20" width="30" height="22"/><text x="147" y="35" class="lb" text-anchor="middle">3</text>
  <rect class="x" x="168" y="20" width="30" height="22"/><text x="183" y="35" class="lb" text-anchor="middle">4</text>
  <rect class="n" x="204" y="20" width="30" height="22"/><text x="219" y="35" class="lb" text-anchor="middle">5</text>
  <text x="250" y="35" class="lb">null</text>
  <text x="147" y="58" class="sm" text-anchor="middle">slow</text><text x="262" y="58" class="sm" text-anchor="middle">fast</text>
  <text x="20" y="82" class="lb">gap = n + 1 = 3 nodes → slow stops before the target</text>
  <text x="20" y="100" class="lb">slow.next = slow.next.next    // 4 is unlinked</text>
</svg>
:::

```ts
// Remove Nth Node From End of List (LeetCode 19)
function removeNthFromEnd(
  head: ListNode | null, n: number,
): ListNode | null {
  const dummy: ListNode = { val: 0, next: head };
  let fast: ListNode | null = dummy, slow: ListNode = dummy;
  for (let i = 0; i <= n; i++) fast = fast!.next;   // gap of n + 1
  while (fast) { fast = fast.next; slow = slow.next!; }
  // slow is just before it
  slow.next = slow.next!.next;
  return dummy.next;
}
```

### Variations

- **Intersection of Two Linked Lists (LeetCode 160) / Y-shaped lists (GFG):** `a = a ? a.next : headB` and `b = b ? b.next : headA` until `a === b`. Both walk `lenA + lenB` at most; they meet at the junction, or both reach `null` together when there is none
- **Program for n-th node from the end (GFG):** the same gap without the dummy; return −1 when the list is shorter than n
- **Sum of last N nodes (GFG):** gap of n, then sum from the follower to the end; or `total − sum of the first (len − N)` in two passes
- **Rotate List (LeetCode 61):** "cut k from the end" is a fixed gap of `k % len` from the tail (page 12-02)

### The failure

- **A gap of n instead of n + 1.** With gap n, `slow` lands *on* the node to delete, and a singly linked list cannot unlink a node without its predecessor. Starting both at a dummy with gap `n + 1` puts `slow` one node earlier, and deleting the head (n = length) needs no special case
- **Comparing values for the intersection.** Two lists can hold equal values in unrelated nodes. The junction is a shared *node*: compare references with `===`

:::interview
"How do you find where two linked lists intersect in O(1) space?" — Walk a pointer down each list; when one ends, send it to the head of the other list. Each pointer then covers the unique part of both lists plus the shared tail, the same total distance, so they land on the first shared node at the same time, or on `null` together if there is none.
:::
