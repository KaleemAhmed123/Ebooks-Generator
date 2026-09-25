## Meet Inside the Loop 🟡

- **What it is:** Floyd's cycle method has a second phase. After slow (1 step) and fast (2 steps) meet inside the cycle, restart one pointer from the head and move both one step at a time. They meet again exactly at the node where the cycle begins
- **Signal:** "return the node where the cycle begins", "length of the loop", "remove the loop", "find the duplicate in `[1..n]` without modifying the array and in O(1) space", "happy number"
- **Why it works:** Let the tail before the cycle have length `a`, and let the first meeting happen `b` steps into the cycle of length `c`. Fast walked twice as far as slow: `2(a + b) = a + b + k·c`, so `a = k·c − b`. Walking `a` more steps from the meeting point therefore lands on the cycle entrance, and so does walking `a` steps from the head

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="A list with a tail of length a leading into a cycle of length c. Slow and fast first meet b steps into the cycle. Because a equals k times c minus b, a pointer from the head and a pointer from the meeting point, both moving one step at a time, arrive at the cycle entrance together." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .ln { stroke: #1a1a1a; stroke-width: 1.3; fill: none; }
    .ent { fill: #2d6a4f; }
    .meet { fill: #ef476e; }
  </style>
  <line class="ln" x1="20" y1="62" x2="130" y2="62"/>
  <circle cx="20" cy="62" r="4" fill="#1a1a1a"/><text x="14" y="52" class="sm">head</text>
  <text x="70" y="78" class="lb" text-anchor="middle">a</text>
  <circle class="ln" cx="180" cy="62" r="50"/>
  <circle class="ent" cx="130" cy="62" r="5"/><text x="96" y="100" class="sm">entrance</text>
  <circle class="meet" cx="215" cy="27" r="5"/><text x="222" y="22" class="sm">first meeting</text>
  <text x="150" y="20" class="lb">b</text>
  <text x="248" y="92" class="sm">cycle length c</text>
  <text x="290" y="46" class="lb">2(a + b) = a + b + k·c</text>
  <text x="290" y="62" class="lb">a = k·c − b</text>
  <text x="290" y="86" class="sm">head → a steps → entrance</text>
  <text x="290" y="98" class="sm">meeting → a steps → entrance</text>
</svg>
:::

```ts
// Linked List Cycle II (LeetCode 142)
function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next; fast = fast.next.next;
    // phase 1: inside the cycle
    if (slow === fast) {
      let p = head;
      while (p !== slow) { p = p!.next; slow = slow!.next; }
      return p;                            // phase 2: the entrance
    }
  }
  return null;
}
```
