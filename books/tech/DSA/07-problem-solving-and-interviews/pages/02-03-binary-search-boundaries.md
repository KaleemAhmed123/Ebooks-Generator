## Binary Search Boundaries

Binary search is famous for causing infinite loops. If you get the bounds wrong, `left` and `right` will get stuck next to each other forever.

### The Template of Truth

You only need ONE template for 99% of Binary Search problems.

```ts
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1; // Inclusive bounds [left, right]
  let ans = -1; // Store the best answer here

  while (left <= right) { // Cross over when done
    let mid = left + Math.floor((right - left) / 2);

    if (isValid(mid)) {
      ans = mid;         // 1. Record the known good answer
      right = mid - 1;   // 2. Aggressively move past it to find a better one
    } else {
      left = mid + 1;    // 3. Aggressively move past the bad answer
    }
  }

  return ans;
}
```

### Why this template never infinite loops

The core rule of avoiding infinite loops: **You must always exclude `mid` in your updates.**
- `left = mid + 1`
- `right = mid - 1`

If you ever write `left = mid` or `right = mid`, you are at risk of an infinite loop. 
- Example: `left = 4`, `right = 5`. 
- `mid = Math.floor((4+5)/2) = 4`. 
- If your logic does `left = mid`, then `left` stays `4`. The loop repeats exactly the same state forever.

### The "Record and Move" Principle

But wait, if we aggressively exclude `mid`, what if `mid` was actually the correct answer?
That's why we use the `ans` variable. 
When we find a valid `mid`, we **record it** (`ans = mid`). Once it is safely recorded, we can aggressively discard it from the search space (`right = mid - 1`) because we already have it saved! We are now free to see if an *even better* answer exists.

### Finding First vs Last Occurrence

- **Find First Occurrence:**
  If `arr[mid] >= target`, record `ans = mid`, and search left: `right = mid - 1`.
- **Find Last Occurrence:**
  If `arr[mid] <= target`, record `ans = mid`, and search right: `left = mid + 1`.

This single template perfectly handles both scenarios without needing to memorize bizarre `<` vs `<=` or `mid = Math.ceil(...)` rules.
