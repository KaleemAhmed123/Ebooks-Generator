### Upper Bound

- **Definition:** The index of the *first* element that is **strictly greater than** (`>`) the target.
- If no such element exists, it returns `arr.length`.

```ts
function upperBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let boundary = arr.length;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] > target) {
      boundary = mid;  // This is a candidate
      right = mid - 1; // Look left for an earlier strictly greater element
    } else {
      left = mid + 1;  // <= target, look right
    }
  }
  return boundary;
}
```

### The trap

- **Confusing the two:** If the array has duplicates like `[1, 2, 2, 2, 3]`, and target is `2`:
  - `lowerBound(2)` returns index `1` (the first `2`).
  - `upperBound(2)` returns index `4` (the `3`).
- **Counting occurrences:** You can find exactly how many times `2` appears by calculating `upperBound(2) - lowerBound(2)`. This takes O(log N) time, bypassing the O(N) linear scan you would otherwise need if you just binary searched and expanded outwards.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Search Insert Position](https://leetcode.com/problems/search-insert-position/) (LeetCode 35) | Exact application of lower bound |
| [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) (LeetCode 34) | Lower bound for first, upper bound minus one for last |
| [Kth Missing Positive Number](https://leetcode.com/problems/kth-missing-positive-number/) (LeetCode 1539) | Binary search on how many values are missing before index i |
