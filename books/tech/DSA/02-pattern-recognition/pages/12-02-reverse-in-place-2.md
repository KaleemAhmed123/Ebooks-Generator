## Reverse in Place <span class="lv lv1"></span> - continued

```ts
// Reverse Nodes in k-Group (LeetCode 25)
function reverseKGroup(
  head: ListNode | null, k: number,
): ListNode | null {
  const dummy: ListNode = { val: 0, next: head };
  let groupPrev = dummy;
  while (true) {
    // is there a full group?
    let kth: ListNode | null = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    let prev: ListNode | null = groupNext, cur = groupPrev.next;
    while (cur !== groupNext) {      // classic three-pointer flip
      const next: ListNode | null = cur!.next;
      cur!.next = prev;
      prev = cur;
      cur = next;
    }
    const first = groupPrev.next!;     // becomes the group's tail
    groupPrev.next = kth;
    groupPrev = first;
  }
  return dummy.next;
}
```

- **Watch out:** after a group, its old first node is the new tail. Forget to link it to the next group, or to move `groupPrev` to it, and nodes vanish or cycle
- **Also solves:** [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (LeetCode 206) · [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) (LeetCode 92) (walk to the node before `left`, flip `right − left + 1`) · [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) (LeetCode 24) (k = 2)
