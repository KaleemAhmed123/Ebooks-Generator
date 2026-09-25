## Monotonic Stack as Elimination 🟡

- The monotonic stack is the most common instantiation of dominated candidate elimination. Each stack pop is a *proof of domination*, not just a mechanical step

### The "Next Greater Element" through elimination lens

- **Problem:** For each element in the array, find the next element to the right that is strictly greater
- **Traditional explanation:** "Maintain a decreasing stack. When a larger element arrives, pop smaller elements."
- **Elimination explanation:** Every element on the stack is *waiting* for its answer. When element X arrives and is greater than the top of the stack, X proves that the top is **dominated** — its answer has been found, and it will never be needed again. Discard it permanently

### The derivation

1. **Brute force:** For each element, scan right until you find something larger. O(n²)
2. **What's repeated?** Elements that haven't found their answer yet are being re-checked on every scan
3. **The insight:** Once element A finds its next greater element B, A is permanently resolved. It never needs to be checked again. We can track "unresolved" elements in a stack and resolve them as larger elements arrive

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Monotonic stack as elimination. When 5 arrives, it proves 1 and 2 are dominated (their answer is 5). They are permanently discarded." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .dead { fill: #f0f0f0; stroke: #c0c0c0; stroke-width: 0.8; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>

  <text x="10" y="14" class="sm">Array: [4, 2, 1, 5, 3]</text>

  <!-- Stack state before 5 arrives -->
  <text x="10" y="36" class="lb">Stack before 5:</text>
  <rect class="bx" x="140" y="24" width="25" height="18" rx="2"/>
  <text x="152" y="37" class="lb" text-anchor="middle">4</text>
  <rect class="bx" x="170" y="24" width="25" height="18" rx="2"/>
  <text x="182" y="37" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="200" y="24" width="25" height="18" rx="2"/>
  <text x="212" y="37" class="lb" text-anchor="middle">1</text>
  <text x="240" y="37" class="sm">← top (all waiting for answer)</text>

  <!-- 5 arrives and dominates -->
  <text x="10" y="62" class="lb">5 arrives:</text>
  <rect class="dead" x="170" y="50" width="25" height="18" rx="2"/>
  <text x="182" y="63" class="lb" text-anchor="middle" fill="#c0c0c0">2</text>
  <rect class="dead" x="200" y="50" width="25" height="18" rx="2"/>
  <text x="212" y="63" class="lb" text-anchor="middle" fill="#c0c0c0">1</text>
  <text x="240" y="63" class="sm" fill="#ef476e">← dominated by 5 (popped, answer = 5)</text>

  <!-- Stack after -->
  <text x="10" y="88" class="lb">Stack after 5:</text>
  <rect class="bx" x="140" y="76" width="25" height="18" rx="2"/>
  <text x="152" y="89" class="lb" text-anchor="middle">4</text>
  <rect class="hi" x="170" y="76" width="25" height="18" rx="2"/>
  <text x="182" y="89" class="lb" text-anchor="middle">5</text>
  <text x="210" y="89" class="sm">← 4 survives (5 > 4, so pop 4 too? Yes! 4's answer = 5)</text>
</svg>
:::

### Why this framing matters

- The traditional explanation tells you *what* to do (push, pop). The elimination framing tells you *why* it works (popped elements are proven dominated)
- When you face a novel problem — "find the next element with property X" — the elimination framing tells you: maintain a set of unresolved candidates; when a new element proves an existing candidate is dominated, resolve and discard it. You can derive the algorithm from this principle even if you have never seen "monotonic stack" before
