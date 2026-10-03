### Implementation

The core logic lives in the `merge` step, where two pointers walk down the sorted halves.

```ts
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  let result = [];
  let i = 0, j = 0;

  // Compare elements and pull the smallest
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) { // <= guarantees stability
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Concatenate any leftovers
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### The trap

- **Slicing costs:** `arr.slice()` takes O(N) time and O(N) space. Doing this recursively creates a massive constant factor overhead.
- **The fix:** In an interview, the snippet above is often accepted for its clarity. However, a production-grade merge sort passes the original array and a single auxiliary array, mutating them in-place using `start` and `end` indices to avoid creating thousands of tiny arrays.
