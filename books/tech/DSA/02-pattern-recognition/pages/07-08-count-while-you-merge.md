## Count While You Merge 🟡

- **What it is:** Merge sort, with a counter bolted onto the merge step. Every pair `i < j` is split exactly once, into a left half and a right half; at that moment both halves are sorted, so all cross pairs with a property can be counted in one linear sweep
- **Signal:** "count inversions", "count pairs `i < j` with `a[i] > a[j]`", "reverse pairs `a[i] > 2·a[j]`", "count of smaller numbers after self", n up to 10⁵ so O(n²) pairs is out
- **Why it works:** Pairs inside one half are counted by the recursive calls. Pairs across halves only depend on values, not on order within each half, so sorting each half first loses nothing and turns the cross count into a two-pointer walk. Total O(n log n)

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Merging sorted halves 2, 4, 7 and 1, 3, 5. When the right element 1 is taken, all three remaining left elements are larger, so 3 inversions are counted at once. When 3 is taken, 4 and 7 remain, adding 2. When 5 is taken, 7 remains, adding 1. Total cross inversions 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .L { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .R { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="20" y="27" class="sm">left</text>
  <rect class="L" x="60" y="12" width="28" height="22"/><text x="74" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="L" x="88" y="12" width="28" height="22"/><text x="102" y="27" class="lb" text-anchor="middle">4</text>
  <rect class="L" x="116" y="12" width="28" height="22"/><text x="130" y="27" class="lb" text-anchor="middle">7</text>
  <text x="170" y="27" class="sm">right</text>
  <rect class="R" x="210" y="12" width="28" height="22"/><text x="224" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="R" x="238" y="12" width="28" height="22"/><text x="252" y="27" class="lb" text-anchor="middle">3</text>
  <rect class="R" x="266" y="12" width="28" height="22"/><text x="280" y="27" class="lb" text-anchor="middle">5</text>
  <text x="20" y="58" class="lb">take 1 (right): left still holds 2, 4, 7 → +3</text>
  <text x="20" y="74" class="lb">take 2, take 3: left still holds 4, 7    → +2</text>
  <text x="20" y="90" class="lb">take 4, take 5: left still holds 7       → +1</text>
  <text x="20" y="106" class="lb" fill="#1d4e89">cross inversions = 6, counted in one merge</text>
  <text x="320" y="30" class="sm">rule: when a right element</text>
  <text x="320" y="42" class="sm">wins, every unmerged left</text>
  <text x="320" y="54" class="sm">element forms a pair with it</text>
</svg>
:::

```ts
// Count Inversions (GFG): pairs i < j with a[i] > a[j]
function countInversions(a: number[]): number {
  const buf = new Array(a.length);
  const sort = (lo: number, hi: number): number => {     // [lo, hi)
    if (hi - lo < 2) return 0;
    const mid = (lo + hi) >> 1;
    let count = sort(lo, mid) + sort(mid, hi);
    let i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
      if (a[i] <= a[j]) buf[k++] = a[i++];
      // all of a[i..mid) > a[j]
      else { count += mid - i; buf[k++] = a[j++]; }
    }
    while (i < mid) buf[k++] = a[i++];
    while (j < hi) buf[k++] = a[j++];
    for (let t = lo; t < hi; t++) a[t] = buf[t];
    return count;
  };
  return sort(0, a.length);
}
```

### Variations

- **Reverse Pairs (LeetCode 493), `a[i] > 2·a[j]`:** the merge order is by value, not by `2·value`, so count in a *separate* two-pointer pass over the two sorted halves before merging: for each `j`, advance `i` while `a[i] ≤ 2·a[j]`, then add `mid − i`
- **Count of Smaller Numbers After Self (LeetCode 315):** sort *indices* by value. When a left element is placed, every right element already placed was smaller and came after it: add that running count to its answer
- **Global and Local Inversions (LeetCode 775):** the counts are equal exactly when no element sits more than one position from home, an O(n) check, no merge needed
- **Alternative engine:** a Fenwick tree over compressed values counts the same pairs in O(n log n) (Chapter 19). Merge sort needs no compression and no extra structure

### The failure

- **Counting reverse pairs inside the merge comparison.** Using `a[i] > 2·a[j]` to decide which element to *place* breaks the sort itself, and a broken sort breaks every count above it. Keep the counting pass and the merging pass separate
- **Overflow.** n = 10⁵ allows up to ~5 · 10⁹ inversions, past 32-bit `int`. In TS a number is fine; in C++ or Java use `long long` / `long`. For reverse pairs, `2 · a[j]` itself can overflow when values reach 2³¹ − 1

:::interview
"Why is counting inversions a divide-and-conquer problem?" — Every pair is either inside the left half, inside the right half, or split across them. The first two are recursive subproblems. For split pairs, positions no longer matter, only values, so both halves can be sorted, and then when a right element is merged, all remaining left elements are larger: `mid − i` pairs at once. That gives the merge-sort recurrence, O(n log n).
:::
