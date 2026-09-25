## Split, Reverse, Weave <span class="lv lv2"></span> - continued

```ts
// Reorder List (LeetCode 143), in place
function reorderList(head: ListNode | null): void {
  if (!head?.next) return;
  let slow = head, fast: ListNode | null = head;
  while (fast?.next?.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  let back: ListNode | null = slow.next;
  // 1. cut: first half ends here
  slow.next = null;
  let prev: ListNode | null = null;
  // 2. reverse the back half
  while (back) {
    const next: ListNode | null = back.next;
    back.next = prev; prev = back; back = next;
  }
  let a: ListNode | null = head, b = prev;
  while (a && b) {                         // 3. weave
    const an: ListNode | null = a.next;
    const bn: ListNode | null = b.next;
    a.next = b; b.next = an;
    a = an; b = bn;
  }
}
```
