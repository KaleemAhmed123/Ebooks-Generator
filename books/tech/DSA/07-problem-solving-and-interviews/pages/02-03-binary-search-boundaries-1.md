## Binary Search Boundaries <span class="lv lv1"></span>

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
