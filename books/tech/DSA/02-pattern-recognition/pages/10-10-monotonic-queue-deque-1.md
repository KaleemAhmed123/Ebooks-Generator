## Monotonic Queue (Deque) <span class="lv lv2"></span>

- **What it is:** A double-ended queue (deque) that maintains its elements in monotonic order. It allows O(1) access to the maximum or minimum element in a sliding window
- **When to reach for it:** "Sliding window maximum", "Find the max in every contiguous subarray of size k"
- **Why it works:** It combines the elimination property of a monotonic stack with the expiration property of a sliding window

### The core insight

- If you have a window `[3, 1, 4]` and you are looking for the maximum, the `1` can never be the answer. It is smaller than `3`, and it is smaller than `4`. More importantly, `4` arrived *after* `1`, so `1` will expire before `4` does. Therefore, `1` can never be the maximum of any current or future window
- A Monotonic Queue permanently deletes elements that are "dominated" (smaller and older)

### The visual mechanism

- Sliding window of size k=3 over `[1, 3, -1, -3, 5]`

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Monotonic Queue processing elements. When 3 arrives, it pops 1 from the back because 3 > 1. The front of the queue always holds the maximum for the current window." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
  </style>

  <text x="20" y="20" class="lb">Push 1</text>
  <rect class="bx" x="20" y="60" width="30" height="20" rx="2" />
  <text x="35" y="74" class="lb" text-anchor="middle">1</text>
  
  <text x="100" y="20" class="lb">Push 3 (dominates 1)</text>
  <rect class="bx" x="100" y="60" width="30" height="20" rx="2" stroke-dasharray="2 2" />
  <text x="115" y="74" class="lb" text-anchor="middle" fill="#6b6b6b">1</text>
  <text x="145" y="74" class="lb" fill="#ef476e">Pop 1 from back</text>
  
  <rect class="bx" x="100" y="90" width="30" height="20" rx="2" />
  <text x="115" y="104" class="lb" text-anchor="middle">3</text>

  <text x="260" y="20" class="lb">Push -1</text>
  <rect class="bx" x="260" y="60" width="30" height="20" rx="2" />
  <rect class="bx" x="295" y="60" width="30" height="20" rx="2" />
  <text x="275" y="74" class="lb" text-anchor="middle">3</text>
  <text x="310" y="74" class="lb" text-anchor="middle">-1</text>
  
  <text x="260" y="45" class="sm">Front is max of window</text>
</svg>
:::
