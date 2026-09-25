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
