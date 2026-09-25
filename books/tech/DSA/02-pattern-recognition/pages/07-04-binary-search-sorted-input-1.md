## Binary Search (on sorted input) <span class="lv lv1"></span>

- **What it is:** Finding an element, or the insertion point for an element, in a sorted array in O(log n) time
- **Why it works:** The sorted order guarantees that if `arr[mid] < target`, the target *cannot* exist anywhere to the left of `mid`. You eliminate half the array in one operation
- **The structural constraint:** The data must be sorted (non-decreasing or non-increasing). If the array is unsorted, you must sort it first (O(n log n)) or use a Hash Map (O(n) time and space)

### The one template

- There are a dozen ways to write Binary Search. Memorise exactly one template that cannot loop forever (18-12 shows the `lo < hi` form used from Chapter 9 on)

```ts
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Avoids integer overflow (left + right) / 2
    const mid = left + Math.floor((right - left) / 2); 
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
      left = mid + 1;  // Target is strictly to the right
    } else {
      right = mid - 1; // Target is strictly to the left
    }
  }
  
  return -1; // Not found
}
```
