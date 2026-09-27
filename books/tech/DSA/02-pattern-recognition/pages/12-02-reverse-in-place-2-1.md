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
    // classic three-pointer flip
    while (cur !== groupNext) {
      const next: ListNode | null = cur!.next;
      cur!.next = prev;
      prev = cur;
      cur = next;
    }
    // becomes the group's tail
    const first = groupPrev.next!;
    groupPrev.next = kth;
    groupPrev = first;
  }
  return dummy.next;
}
```

### Variations

- **Reverse Linked List (LeetCode 206):** the inner loop alone with `prev = null`. Recursive form: reverse the rest, then `head.next.next = head; head.next = null`
- **Reverse Linked List II (LeetCode 92):** one group, positions `left..right`: walk to the node before `left`, then run the same flip for `right − left + 1` nodes
- **Last short group reversed too:** a variant of LeetCode 25 reverses the final group even when it has fewer than k nodes. Read the statement; drop the "full group?" check
- **Swap Nodes in Pairs (LeetCode 24):** this template with k = 2. The last node of an odd-length list is a short group and stays
- **Add 1 to a Linked List Number (GFG):** reverse, add with carry, reverse back; or recurse to the tail and carry on the way out (page 13-02)
