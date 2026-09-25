## Two Pointers <span class="lv lv1"></span>

- **What it is:** Using two indices to traverse a data structure simultaneously
- **When to reach for it:** "Find a pair that sums to X in a sorted array", "Reverse a string in place", "Remove duplicates from a sorted array"
- **Why it works:** In sorted arrays, the pointers act as boundaries that permanently eliminate candidates. In read/write problems (sorted or not), one pointer acts as a "reader" and the other as a "writer"

### Opposite Direction (Collision)

- Used primarily on **sorted** data to find pairs or triplets
- **Mechanism:** One pointer starts at `0`, the other at `n-1`. They move toward each other

```ts
function twoSumSorted(arr: number[], target: number): number[] {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    
    // The elimination step
    if (sum < target) {
      left++; // The current left is too small for ANY remaining right
    } else {
      right--; // The current right is too big for ANY remaining left
    }
  }
  return [-1, -1];
}
```
