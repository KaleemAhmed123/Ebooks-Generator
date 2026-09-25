## Binary Search (on sorted input) 🟢

- **What it is:** Finding an element, or the insertion point for an element, in a sorted array in O(log n) time
- **Why it works:** The sorted order guarantees that if `arr[mid] < target`, the target *cannot* exist anywhere to the left of `mid`. You eliminate half the array in one operation
- **The structural constraint:** The data must be monotonic (strictly increasing or decreasing). If the array is unsorted, you must sort it first (O(n log n)) or use a Hash Map (O(n) time and space)

### The one template

- There are a dozen ways to write Binary Search. Memorise exactly one template that cannot loop forever

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
