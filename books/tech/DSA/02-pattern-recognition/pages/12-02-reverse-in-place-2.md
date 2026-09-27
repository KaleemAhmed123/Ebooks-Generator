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
### Where it appears

| Problem | What gets reversed |
|---|---|
| [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (LeetCode 206) | the entire list |
| [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) (LeetCode 92) | nodes `left` to `right` — walk to the node before `left` first |
| [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) (LeetCode 25) | each full group of k |
| [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) (LeetCode 24) | k = 2 |

:::interview
"After reversing a sublist, how do you stitch it back without losing nodes?"

You need two anchors saved before the flip: `groupPrev` (the node before the segment) and `groupNext` (the node after it). After the flip, the old first node is now the tail, and the old last is the new head. Set `groupPrev.next = newHead` and `oldFirst.next = groupNext`. Missing either link loses part of the list or creates a cycle.
:::
