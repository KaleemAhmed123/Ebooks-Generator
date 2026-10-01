### The skeleton: a dummy head

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
  tail.next = a ?? b;                   // attach the leftover run
  return dummy.next;
}
```

### Where it appears

| Problem | What the dummy simplifies |
|---|---|
| [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) (LeetCode 21) | the head of the merged result |
| [Partition List](https://leetcode.com/problems/partition-list/) (LeetCode 86) | two dummies, one per side, joined at the end |
| [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) (LeetCode 2) | building a new list with carry propagation |
| [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/) (LeetCode 203) | deleting the head itself without special-casing |

:::interview
"In Partition List, what happens if you forget to set the 'greater' tail's next to null?"

The last node in the greater list still points wherever it pointed in the original. If that original successor ended up in the less-than list, you get a cycle — the list loops forever. Always terminate: `greaterTail.next = null` before joining the two halves.
:::

### The trap

- **An unterminated list.** After a partition the last node may still point into the other list: a cycle. Set the final tail's `next` to `null`
