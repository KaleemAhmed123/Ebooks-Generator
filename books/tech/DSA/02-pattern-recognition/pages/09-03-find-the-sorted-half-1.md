## Find the Sorted Half <span class="lv lv1"></span>

- **What:** binary search on data that is only *mostly* sorted: rotated, a mountain, one peak. At each `mid` one side is provably sorted or uphill; decide with it, drop the other half
- **Spot it:** O(log n) on an array sorted except for one break, or that rises toward a peak: "rotated at an unknown pivot", "increasing then decreasing", "larger than its neighbours"
- **Why:** a window holds at most one break, so one of `[lo, mid]` and `[mid, hi]` has none, and a sorted side says "is the target in me?" from its two ends. For peaks, uphill guarantees one

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Rotated array 4, 5, 6, 7, 0, 1, 2 searching for 0. mid is 7. The left half 4 to 7 is sorted because a lo is at most a mid, and 0 is not between 4 and 7, so search the right half. Next mid is 1; the left half 0 to 1 is sorted and contains 0." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .run1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .run2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .m { fill: none; stroke: #ef476e; stroke-width: 2; }
  </style>
  <rect class="run1" x="40" y="16" width="32" height="24"/><text x="56" y="32" class="lb" text-anchor="middle">4</text>
  <rect class="run1" x="72" y="16" width="32" height="24"/><text x="88" y="32" class="lb" text-anchor="middle">5</text>
  <rect class="run1" x="104" y="16" width="32" height="24"/><text x="120" y="32" class="lb" text-anchor="middle">6</text>
  <rect class="run1" x="136" y="16" width="32" height="24"/><text x="152" y="32" class="lb" text-anchor="middle">7</text>
  <rect class="run2" x="168" y="16" width="32" height="24"/><text x="184" y="32" class="lb" text-anchor="middle">0</text>
  <rect class="run2" x="200" y="16" width="32" height="24"/><text x="216" y="32" class="lb" text-anchor="middle">1</text>
  <rect class="run2" x="232" y="16" width="32" height="24"/><text x="248" y="32" class="lb" text-anchor="middle">2</text>
  <rect class="m" x="136" y="14" width="32" height="28"/>
  <text x="152" y="54" class="sm" text-anchor="middle">mid</text>
  <text x="40" y="76" class="lb">a[lo] = 4 ≤ a[mid] = 7 → left half is sorted</text>
  <text x="40" y="92" class="lb">target 0 ∉ [4, 7]      → drop left, lo = mid + 1</text>
  <text x="290" y="30" class="sm">two sorted runs, one break;</text>
  <text x="290" y="42" class="sm">any window has at most one</text>
</svg>
:::

```ts
// Search in Rotated Sorted Array (LeetCode 33), distinct values
function search(a: number[], target: number): number {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] === target) return mid;
    if (a[lo] <= a[mid]) {                     // left half sorted
      if (a[lo] <= target && target < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {                                  // right half sorted
      if (a[mid] < target && target <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

- **Watch out:** `a[lo] < a[mid]` instead of `<=`. With two elements left, `lo === mid`, so the code tests the wrong side: `[3, 1]` searching for 1 returns −1
