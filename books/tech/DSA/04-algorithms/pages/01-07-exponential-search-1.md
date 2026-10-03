## Exponential Search <span class="lv lv2"></span>

- Standard Binary Search requires you to know the upper bound (`right`) of your search space.
- **Exponential Search** (also called Galloping Search) is used when the search space is theoretically unbounded, or when the target is expected to be very close to the beginning of a massive array.

### The Mechanics

1. Start with a bound of `size = 1`.
2. Check if the element at `size` is greater than the target.
3. If not, double the `size` (`size *= 2`) and repeat.
4. Once `arr[size] > target`, you have successfully boxed the target into the range `[size/2, size]`.
5. Perform a standard Binary Search within that specific range.

### Implementation

```ts
function exponentialSearch(arr: number[], target: number): number {
  if (arr[0] === target) return 0;

  let bound = 1;
  // Double the bound until it surpasses the target
  while (bound < arr.length && arr[bound] <= target) {
    bound *= 2;
  }

  // Now binary search in the boxed range
  let left = bound / 2;
  let right = Math.min(bound, arr.length - 1);

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```
