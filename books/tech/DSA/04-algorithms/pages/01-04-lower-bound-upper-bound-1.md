## Lower Bound & Upper Bound <span class="lv lv1"></span>

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
