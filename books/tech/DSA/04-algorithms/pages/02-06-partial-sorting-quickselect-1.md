## Partial Sorting & Quickselect <span class="lv lv1"></span>

- Sometimes a problem asks you to find the **K-th largest** or **K-th smallest** element in an unsorted array.
- **Naive approach:** Sort the array and return `arr[k]`. This takes O(N log N) time.
- **Optimal approach:** You don't need the entire array to be sorted. You only need the K-th element to be exactly where it *would* be if the array were sorted. You can achieve this in average O(N) time using **Quickselect**.

### Quickselect Mechanics

- Quickselect uses the exact same `partition` logic as Quick Sort.
- When you partition an array, the pivot element ends up at its final, correct, sorted index `P`.
- **The Insight:**
  - If `P === K`, you found the target! Return `arr[P]`.
  - If `P < K`, the K-th element must be to the right of the pivot. Discard the left half and recurse only on the right half.
  - If `P > K`, the K-th element must be to the left of the pivot. Discard the right half and recurse only on the left.

### Implementation

```ts
function quickSelect(arr: number[], k: number, low = 0, high = arr.length - 1): number {
  if (low === high) return arr[low];

  // Assuming Lomuto partition from the Quick Sort chapter
  const pivotIndex = partition(arr, low, high);

  if (k === pivotIndex) {
    return arr[k];
  } else if (k < pivotIndex) {
    return quickSelect(arr, k, low, pivotIndex - 1);
  } else {
    return quickSelect(arr, k, pivotIndex + 1, high);
  }
}
```
