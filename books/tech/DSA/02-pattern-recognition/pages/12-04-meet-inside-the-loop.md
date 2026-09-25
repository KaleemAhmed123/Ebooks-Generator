## Meet Inside the Loop <span class="lv lv2"></span>

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

### Variations

- **Find the Duplicate Number (LeetCode 287):** values are in `1..n` across `n + 1` slots, so `i → nums[i]` is a function with a cycle, and the cycle's entrance is the duplicated value. Run the same two phases on indices; no mutation, O(1) space
- **Find length of loop (GFG):** after the first meeting, keep one pointer still and walk the other around until it returns; the step count is `c`
- **Remove loop in a linked list (GFG):** find the entrance, then walk from it to the last node of the cycle (the one whose `next` is the entrance) and set its `next` to `null`
- **Happy Number (LeetCode 202):** the sequence `n → sum of squared digits` either reaches 1 or cycles. Slow/fast on numbers detects the cycle without a visited set

### The failure

- **Using a `Set` of visited nodes.** It works, and it is O(n) memory. The question usually adds "O(1) space", which only Floyd meets
- **Restarting both pointers.** Phase 2 moves one pointer from the head and one from the *meeting point*. Restart both from the head and they are equal before the first step, so phase 2 returns the head whatever the real entrance is. And for loop removal, when the entrance is the head itself, "the node before the entrance" must be found by walking the cycle, not by stepping from the head

:::interview
"Why does resetting one pointer to the head find the start of the cycle?" — If the tail has length a and the pointers meet b steps into a cycle of length c, then fast has walked a + b + k·c steps and slow a + b, and fast walked twice as far, so a = k·c − b. From the meeting point, a steps is k full laps minus b, which lands exactly on the entrance; from the head, a steps also lands there. So stepping both one at a time, they meet at the entrance.
:::
