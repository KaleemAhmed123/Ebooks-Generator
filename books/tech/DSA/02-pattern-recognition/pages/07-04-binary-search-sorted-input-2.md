### Lower Bound / Upper Bound

- What if there are duplicates, and you need the *first* occurrence?
- **Lower bound:** Find the first element ≥ target.
- **Upper bound:** Find the first element > target.
- Do not stop when `arr[mid] === target`. Record it as a potential answer, but keep searching to the left to see if there is an earlier one

```ts
function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); 
    if (arr[mid] >= target) {
      ans = mid;       // Could be the answer
      right = mid - 1; // But look left for a better one
    } else {
      left = mid + 1;
    }
  }
  return ans;
}
```

### The trap

- **Assuming Binary Search only works on arrays.** It works on *any* monotonic search space. (Covered extensively in Chapter 9: Search Space)
