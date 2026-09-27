## Linked List Pointers <span class="lv lv1"></span> - continued

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

- **Also solves:** [Partition List](https://leetcode.com/problems/partition-list/) (LeetCode 86) (two dummies, joined) · [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) (LeetCode 2) (carry; one more node if a carry is left) · [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/) (LeetCode 203)

### The trap

- **An unterminated list.** After a partition the last node may still point into the other list: a cycle. Set the final tail's `next` to `null`
