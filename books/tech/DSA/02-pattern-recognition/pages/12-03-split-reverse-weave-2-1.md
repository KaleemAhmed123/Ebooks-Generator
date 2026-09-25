## Split, Reverse, Weave 🟡 - continued

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Reorder list 1, 2, 3, 4, 5. Slow and fast find the middle 3. Cut after 3: first half 1, 2, 3 and second half 4, 5. Reverse the second half to 5, 4. Weave: 1, 5, 2, 4, 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .h1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .h2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="24" class="sm">1. split</text>
  <rect class="h1" x="90" y="12" width="26" height="20"/><text x="103" y="26" class="lb" text-anchor="middle">1</text>
  <rect class="h1" x="120" y="12" width="26" height="20"/><text x="133" y="26" class="lb" text-anchor="middle">2</text>
  <rect class="h1" x="150" y="12" width="26" height="20"/><text x="163" y="26" class="lb" text-anchor="middle">3</text>
  <rect class="h2" x="196" y="12" width="26" height="20"/><text x="209" y="26" class="lb" text-anchor="middle">4</text>
  <rect class="h2" x="226" y="12" width="26" height="20"/><text x="239" y="26" class="lb" text-anchor="middle">5</text>
  <text x="163" y="44" class="sm" text-anchor="middle">slow</text>
  <text x="20" y="66" class="sm">2. reverse back</text>
  <rect class="h2" x="196" y="54" width="26" height="20"/><text x="209" y="68" class="lb" text-anchor="middle">5</text>
  <rect class="h2" x="226" y="54" width="26" height="20"/><text x="239" y="68" class="lb" text-anchor="middle">4</text>
  <text x="20" y="104" class="sm">3. weave</text>
  <rect class="h1" x="90" y="92" width="26" height="20"/><text x="103" y="106" class="lb" text-anchor="middle">1</text>
  <rect class="h2" x="120" y="92" width="26" height="20"/><text x="133" y="106" class="lb" text-anchor="middle">5</text>
  <rect class="h1" x="150" y="92" width="26" height="20"/><text x="163" y="106" class="lb" text-anchor="middle">2</text>
  <rect class="h2" x="180" y="92" width="26" height="20"/><text x="193" y="106" class="lb" text-anchor="middle">4</text>
  <rect class="h1" x="210" y="92" width="26" height="20"/><text x="223" y="106" class="lb" text-anchor="middle">3</text>
  <text x="290" y="30" class="sm">cut: slow.next = null</text>
  <text x="290" y="68" class="sm">now the "back" walks forward</text>
  <text x="290" y="106" class="sm">alternate one from each half</text>
</svg>
:::

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
