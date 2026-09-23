## Merge Sort

- Merge Sort is the quintessential Divide and Conquer algorithm. It guarantees O(N log N) performance in all cases.
- **The Core Idea:** An array of 1 element is inherently sorted. If we recursively cut the array in half until every element is alone, and then carefully merge the halves back together, the entire array becomes sorted.
- **The Trade-off:** It is heavily reliant on extra memory. It requires O(N) auxiliary space to hold the merged arrays before copying them back to the original.

:::mint
<svg viewBox="0 0 470 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Merge Sort merging two sorted halves">
  <!-- Top level array -->
  <rect x="135" y="20" width="200" height="30" class="b" fill="#f4f4f4" />
  <text x="145" y="40" class="l">38, 27, 43, 3, 9, 82, 10</text>
  
  <path d="M235 55 L165 85" class="a" marker-end="url(#arrow)" />
  <path d="M235 55 L305 85" class="a" marker-end="url(#arrow)" />
  
  <!-- Halves -->
  <rect x="75" y="90" width="100" height="30" class="b" />
  <text x="85" y="110" class="l">27, 38, 43</text>
  
  <rect x="295" y="90" width="100" height="30" class="b" />
  <text x="305" y="110" class="l">3, 9, 10, 82</text>
  
  <!-- Merge action -->
  <path d="M125 125 L235 150" class="a" stroke="#ef476e" marker-end="url(#arrow)" />
  <path d="M345 125 L235 150" class="a" stroke="#ef476e" marker-end="url(#arrow)" />
  
  <!-- Final array -->
  <rect x="135" y="150" width="200" height="30" class="b" stroke="#1d4e89" stroke-width="2" />
  <text x="145" y="170" class="l">3, 9, 10, 27, 38, 43, 82</text>
</svg>
:::

- Merge Sort is **Stable**. If two elements have the same value, their relative order is preserved. This is a critical requirement in complex database sorts.

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
