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
