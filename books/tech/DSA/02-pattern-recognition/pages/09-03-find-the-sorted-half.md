## Find the Sorted Half 🟡

- **What it is:** Binary search still works on data that is *mostly* sorted: a rotated array, a mountain, an array with one peak. At every `mid`, at least one side is provably sorted or provably uphill. Decide using that side and discard the other half
- **Signal:** "sorted array rotated at an unknown pivot", "find the minimum of a rotated array", "peak element", "mountain array", "bitonic", O(log n) required
- **Why it works:** A rotated sorted array is two sorted runs. Any window `[lo, hi]` contains at most one break, so one of `[lo, mid]` and `[mid, hi]` has none. A sorted side answers "is the target inside me?" by comparing with its two ends, so each step still halves the range. For peaks, the slope at `mid` points toward a peak: uphill guarantees one

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
    // left half sorted
    if (a[lo] <= a[mid]) {
      if (a[lo] <= target && target < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    // right half sorted
    } else {
      if (a[mid] < target && target <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

### Variations

- **Find Minimum in Rotated Sorted Array (LeetCode 153):** compare `a[mid]` with `a[hi]`. If `a[mid] > a[hi]`, the break (and the minimum) is to the right: `lo = mid + 1`; else `hi = mid`
- **Search in Rotated Sorted Array II (LeetCode 81):** with duplicates, `a[lo] === a[mid] === a[hi]` hides which side is sorted. Shrink both ends by one and continue; the worst case becomes O(n), and no algorithm avoids that on inputs like `[1, 1, 1, …, 1, 2, 1, 1]`
- **Find Peak Element (LeetCode 162) / Peak Index in a Mountain Array (LeetCode 852):** compare `a[mid]` with `a[mid + 1]`. Rising means a peak lies to the right (`lo = mid + 1`); falling means `mid` or something left of it is a peak (`hi = mid`)
- **Search in a sorted array of unknown size:** double `hi` until `a[hi] ≥ target`, then search `[hi/2, hi]` (exponential search, Module 04)

### The failure

- **`<` instead of `<=` in `a[lo] <= a[mid]`.** When two elements remain, `lo === mid`, and `a[lo] < a[mid]` is false for the sorted left half, so the code tests the wrong side: `[3, 1]` searching for 1 returns −1
- **Comparing with `a[lo]` to find the minimum.** On an unrotated array, `a[mid] ≥ a[lo]` everywhere, so "go right" walks away from the minimum at index 0. `a[hi]` is the safe reference for 153

:::interview
"How do you binary search an array that is sorted but rotated?" — At any midpoint, the rotation break is on at most one side, so one half is sorted, and I can tell which by comparing its endpoints. I check whether the target lies within that sorted half's range; if it does I search there, otherwise the other half. Every step halves the range, so it stays O(log n) for distinct values.
:::
