## Work Before or After the Call <span class="lv lv1"></span>

- **What:** a line before the recursive call runs on the way *down*, in forward order; a line after it runs on the way *up*, in reverse, with the smaller call's answer in hand
- **Spot it:** a number stored most-significant digit first with the carry starting at the tail; "process a list from its end"; pre-, in- or post-order anything. 10⁵ nodes deep → a loop, 12-02
- **Why:** the call stack keeps each frame's locals until the deeper call returns, so where a line sits decides the order it runs in, with no extra structure

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Add 1 to the list 1, 9, 9. On the way down each call only moves to the next node. The call past the tail returns carry 1. On the way up, the last 9 becomes 0 and returns carry 1, the middle 9 becomes 0 and returns carry 1, the 1 becomes 2 and returns carry 0, so no new head is needed. Result 2, 0, 0." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .up { stroke: #1d4e89; stroke-width: 1.2; fill: none; }
  </style>
  <defs><marker id="m1302k" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker><marker id="m1302b" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <text x="20" y="14" class="sm">down: each call only moves to next</text>
  <rect class="n" x="40" y="22" width="30" height="20"/><text x="55" y="36" class="lb" text-anchor="middle">1</text>
  <path class="a" d="M 70 32 L 106 32" marker-end="url(#m1302k)"/>
  <rect class="n" x="110" y="22" width="30" height="20"/><text x="125" y="36" class="lb" text-anchor="middle">9</text>
  <path class="a" d="M 140 32 L 176 32" marker-end="url(#m1302k)"/>
  <rect class="n" x="180" y="22" width="30" height="20"/><text x="195" y="36" class="lb" text-anchor="middle">9</text>
  <path class="a" d="M 210 32 L 234 32" marker-end="url(#m1302k)"/>
  <text x="240" y="36" class="lb">null</text>
  <path class="up" d="M 252 44 Q 226 66 200 46" marker-end="url(#m1302b)"/>
  <path class="up" d="M 190 46 Q 160 66 130 46" marker-end="url(#m1302b)"/>
  <path class="up" d="M 120 46 Q 90 66 60 46" marker-end="url(#m1302b)"/>
  <text x="226" y="74" class="sm" text-anchor="middle">carry 1</text>
  <text x="160" y="74" class="sm" text-anchor="middle">carry 1</text>
  <text x="90" y="74" class="sm" text-anchor="middle">carry 1</text>
  <text x="55" y="92" class="lb" fill="#1d4e89" text-anchor="middle">2</text>
  <text x="125" y="92" class="lb" fill="#1d4e89" text-anchor="middle">0</text>
  <text x="195" y="92" class="lb" fill="#1d4e89" text-anchor="middle">0</text>
  <text x="20" y="108" class="sm">up: new values, written after the call returns; the head returns carry 0, so no new node</text>
  <text x="290" y="30" class="sm">up(null) = 1: the +1 enters here</text>
  <text x="290" y="46" class="sm">each frame, after the call:</text>
  <text x="290" y="58" class="lb">sum = val + carry</text>
  <text x="290" y="72" class="lb">val = sum % 10</text>
  <text x="290" y="86" class="lb">return ⌊sum / 10⌋</text>
</svg>
:::

```ts
// Add 1 to a Linked List Number (GFG): most significant digit first
function addOne(head: ListNode): ListNode {
  // returns the carry that leaves this node
  const up = (node: ListNode | null): number => {
    if (!node) return 1;                 // the +1 enters below the tail
    const sum = node.val + up(node.next); // after the call: child's carry
    node.val = sum % 10;
    return Math.floor(sum / 10);
  };
  return up(head) ? { val: 1, next: head } : head;
}
```

- **Watch out:** a local change does not survive the way up. A deeper call that must tell its caller something (a carry, a count) returns it
