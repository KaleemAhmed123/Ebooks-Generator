## What is being repeated? <span class="lv lv1"></span>

- Every suboptimal algorithm does unnecessary work. "Unnecessary" almost always means "repeated"
- The transition from brute force to optimal requires identifying exactly what calculation is happening more than once

### The types of repetition

| Repetition | The symptom | The cure |
|---|---|---|
| **Recalculating values** | Function called with the same arguments | Memoisation / DP |
| **Re-scanning ranges** | Summing the same subarray offset by one | Sliding Window / Prefix Sum |
| **Re-searching space** | Scanning an array to find a value | Hash Map / Binary Search |
| **Re-sorting data** | Finding the minimum repeatedly | Priority Queue (Heap) |
| **Re-evaluating dead ends** | Checking candidates that cannot win | Monotonic Stack / Pruning |

### Example: The overlapping sums

- Imagine a brute force algorithm that sums a subarray of length k starting at index 0, then sums the subarray of length k starting at index 1
- **The repetition:** The elements from index 1 to k-1 are summed twice. In fact, if k=100, 99 elements are summed repeatedly on every step
- **The insight:** The new sum is just the old sum, minus the element that fell out on the left, plus the new element on the right
- This exact insight derives the Sliding Window technique

:::mint
<svg viewBox="0 0 470 130" role="img" aria-label="Before: brute force sums k elements from scratch each time. After: sliding window subtracts one element and adds one element, reusing the previous sum." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { fill: #ef476e; stroke: none; }
    .blue { fill: #1d4e89; stroke: none; }
  </style>

  <text x="10" y="14" class="sm">Before (brute force): sum k=4 elements from scratch each step</text>
  <rect class="hi" x="10" y="22" width="30" height="18" rx="2"/><rect class="hi" x="44" y="22" width="30" height="18" rx="2"/><rect class="hi" x="78" y="22" width="30" height="18" rx="2"/><rect class="hi" x="112" y="22" width="30" height="18" rx="2"/><rect class="bx" x="146" y="22" width="30" height="18" rx="2"/><rect class="bx" x="180" y="22" width="30" height="18" rx="2"/>
  <text x="10" y="56" class="lb">step 1: sum [0..3]  → 4 additions</text>
  <rect class="bx" x="10" y="62" width="30" height="18" rx="2"/><rect class="hi" x="44" y="62" width="30" height="18" rx="2"/><rect class="hi" x="78" y="62" width="30" height="18" rx="2"/><rect class="hi" x="112" y="62" width="30" height="18" rx="2"/><rect class="hi" x="146" y="62" width="30" height="18" rx="2"/><rect class="bx" x="180" y="62" width="30" height="18" rx="2"/>
  <text x="10" y="96" class="lb">step 2: sum [1..4]  → 4 additions again</text>

  <text x="260" y="14" class="sm">After (sliding window): reuse previous sum</text>
  <rect class="hi" x="260" y="22" width="30" height="18" rx="2"/><rect class="hi" x="294" y="22" width="30" height="18" rx="2"/><rect class="hi" x="328" y="22" width="30" height="18" rx="2"/><rect class="hi" x="362" y="22" width="30" height="18" rx="2"/>
  <text x="260" y="56" class="lb">sum = 4 additions (first time only)</text>
  <rect class="bx" x="260" y="62" width="30" height="18" rx="2"/>
  <circle cx="275" cy="71" r="5" class="hot"/>
  <rect class="hi" x="294" y="62" width="30" height="18" rx="2"/><rect class="hi" x="328" y="62" width="30" height="18" rx="2"/><rect class="hi" x="362" y="62" width="30" height="18" rx="2"/><rect class="bx" x="396" y="62" width="30" height="18" rx="2"/>
  <circle cx="411" cy="71" r="5" class="blue"/>
  <text x="260" y="96" class="lb">sum = sum − left + right → 2 ops</text>

  <text x="260" y="120" class="sm">O(n·k) → O(n)</text>
</svg>
:::
