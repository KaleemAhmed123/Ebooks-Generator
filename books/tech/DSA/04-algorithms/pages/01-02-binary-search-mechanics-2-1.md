### The Core Loop

```ts
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found it
    } else if (arr[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
    }
  }
  
  return -1; // Not found
}
```

### The trap

- **Infinite loops:** The single most common implementation error in interviews is a Binary Search that never terminates because `left` and `right` do not cross.
- **The fix:** Ensure the `while` condition is `left <= right`, and ensure that you are strictly moving the boundaries past the `mid` point (`left = mid + 1`, not `left = mid`). If you set `left = mid`, and `left` and `right` are adjacent, `mid` will equal `left` (due to integer truncation), and the loop will spin forever.
