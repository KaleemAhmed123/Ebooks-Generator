## Lower Bound & Upper Bound

- In languages like C++, `lower_bound` and `upper_bound` are built-in standard library functions. In JavaScript/TypeScript, you must implement them yourself.
- They are direct applications of the **Boundary Finding** template.

### Lower Bound

- **Definition:** The index of the *first* element that is **greater than or equal to** (`>=`) the target.
- If no such element exists (all elements are strictly less than the target), it returns `arr.length`.

```ts
function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let boundary = arr.length;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] >= target) {
      boundary = mid;  // This is a candidate
      right = mid - 1; // But look for a smaller index
    } else {
      left = mid + 1;  // Too small, look right
    }
  }
  return boundary;
}
```

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
