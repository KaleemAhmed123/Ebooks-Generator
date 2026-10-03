### The Partition Template (Lomuto)

```ts
function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);  // Sort left
    quickSort(arr, pivotIndex + 1, high); // Sort right
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // Choosing the last element as pivot
  let i = low;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
      i++;
    }
  }
  // Move the pivot to its final correct position
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}
```

### The trap

- **The O(N²) meltdown:** If the array is already perfectly sorted, and you always pick the last element as the pivot, the partition splits the array into N-1 elements and 0 elements. It will run in O(N²) time. 
- **The fix:** In practice, professional implementations pick a random pivot, or use the "Median of Three" (choosing the median of the first, middle, and last elements) to virtually eliminate the chance of an O(N²) degradation.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Sort Colors](https://leetcode.com/problems/sort-colors/) (LeetCode 75) | Three-way partition (Dutch National Flag) |
| [Sort an Array](https://leetcode.com/problems/sort-an-array/) (LeetCode 912) | Quick sort with randomized pivot |
| [Wiggle Sort II](https://leetcode.com/problems/wiggle-sort-ii/) (LeetCode 324) | Partition around median then interleave |
