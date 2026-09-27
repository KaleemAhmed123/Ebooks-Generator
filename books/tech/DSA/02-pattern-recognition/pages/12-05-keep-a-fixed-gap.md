## Keep a Fixed Gap <span class="lv lv1"></span>

- **What:** two pointers at the *same* speed, a fixed distance apart. When the leader falls off, the follower is that distance from the end
- **Spot it:** "remove the n-th node from the end", "where two lists intersect", one pass. The *middle* (a distance that grows) → 12-03
- **Why:** the gap never changes. For lists `x + c` and `y + c` sharing a tail, a pointer that switches to the other head at its end meets the other after `x + y + c` steps

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
  slow.next = slow.next!.next;           // slow is just before it
  return dummy.next;
}
```

- **Watch out:** a gap of n lands *on* the node to delete, and it cannot unlink itself. Start both at a dummy with gap `n + 1`
### Where it appears

| Problem | What the fixed gap measures |
|---|---|
| [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) (LeetCode 19) | n + 1 gap lands slow before the target |
| [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/) (LeetCode 160) | switching heads equalises the gap |
| [Rotate List](https://leetcode.com/problems/rotate-list/) (LeetCode 61) | k % len from the end is the new head |
| [Swapping Nodes in a Linked List](https://leetcode.com/problems/swapping-nodes-in-a-linked-list/) (LeetCode 1721) | k-th from start and k-th from end |

:::interview
"In the intersection problem, why does switching to the other head when you reach null guarantee they meet?"

Pointer A walks `lenA + lenB` steps total (its own list, then B's). Pointer B walks `lenB + lenA`. They travel the same total distance, and the shared tail is the same length from both ends — so they arrive at the first shared node at the same step. If there is no intersection, both reach null together.
:::
