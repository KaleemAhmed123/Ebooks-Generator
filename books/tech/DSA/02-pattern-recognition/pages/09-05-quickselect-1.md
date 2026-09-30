## Partition to the k-th <span class="lv lv1"></span>

- **What:** to find the k-th element without sorting everything, **partition** around a pivot so smaller values go left, larger right. The pivot lands at its final index; recurse only into the side holding the target
- **Spot it:** "k-th largest / smallest", "top k in any order", "median", when a full O(n log n) sort is more than the question needs
- **Why:** partition fixes the pivot's sorted position and one side can be discarded each step. On average each step halves the range → O(n) total. A random pivot avoids the O(n²) worst case of an already-sorted input

:::mint
<svg viewBox="0 0 470 128" role="img" aria-label="Quickselect for the target index. After partitioning around a pivot, the pivot sits at index p with all smaller elements left and larger right. If p equals the target, done. If the target is greater than p, recurse on the right part only; if less, the left part only. Half the array is dropped each step." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .lo { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .piv { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.5; }
    .hi { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .drop { fill: #f0f0f0; stroke: #c9c9c9; stroke-width: 1; }
  </style>
  <g transform="translate(40,16)">
    <rect class="lo" x="0" y="0" width="34" height="26"/><text x="17" y="18" class="lb" text-anchor="middle">&lt;</text>
    <rect class="lo" x="34" y="0" width="34" height="26"/><text x="51" y="18" class="lb" text-anchor="middle">&lt;</text>
    <rect class="piv" x="68" y="0" width="34" height="26"/><text x="85" y="18" class="lb" text-anchor="middle">P</text>
    <rect class="hi" x="102" y="0" width="34" height="26"/><text x="119" y="18" class="lb" text-anchor="middle">&gt;</text>
    <rect class="hi" x="136" y="0" width="34" height="26"/><text x="153" y="18" class="lb" text-anchor="middle">&gt;</text>
    <rect class="hi" x="170" y="0" width="34" height="26"/><text x="187" y="18" class="lb" text-anchor="middle">&gt;</text>
    <text x="85" y="40" class="sm" text-anchor="middle">pivot at index p</text>
  </g>
  <text x="60" y="80" class="sm">target = p → done</text>
  <text x="60" y="98" class="lb" fill="#1d4e89">target &gt; p → recurse right only</text>
  <text x="260" y="80" class="sm">target &lt; p → recurse left only</text>
  <text x="260" y="98" class="lb" fill="#2d6a4f">half dropped each step → O(n) avg</text>
</svg>
:::

```ts
// Kth Largest Element (LeetCode 215): kth largest = index n-k when sorted ascending
function findKthLargest(nums: number[], k: number): number {
  const a = nums.slice(), target = a.length - k;
  let lo = 0, hi = a.length - 1;
  while (lo < hi) {
    const p = partition(a, lo, hi);
    if (p === target) break;
    else if (p < target) lo = p + 1;                     // target is to the right
    else hi = p - 1;                                     // target is to the left
  }
  return a[target];
}
function partition(a: number[], lo: number, hi: number): number {
  const r = lo + Math.floor(Math.random() * (hi - lo + 1));
  [a[r], a[hi]] = [a[hi], a[r]];                          // random pivot → move to end
  const pivot = a[hi]; let i = lo;
  for (let j = lo; j < hi; j++)
    if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; } // push smaller left
  [a[i], a[hi]] = [a[hi], a[i]];                          // pivot to its final spot
  return i;
}
```

- **Watch out:** a fixed pivot (first or last) on sorted or reverse-sorted input degrades to O(n²) — randomise it. Quickselect **partly reorders** the array; if you need the original order, copy first (as above). For a *guaranteed* O(n), use median-of-medians, but randomised quickselect is faster in practice
