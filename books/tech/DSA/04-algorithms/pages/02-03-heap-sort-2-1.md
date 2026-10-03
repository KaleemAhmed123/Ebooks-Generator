### Implementation

```ts
function heapSort(arr: number[]): void {
  const n = arr.length;

  // 1. Build a Max-Heap (bottom-up, O(N))
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, n, i);
  }

  // 2. Extract elements one by one (O(N log N))
  for (let i = n - 1; i > 0; i--) {
    // Swap root (max) with the current end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Restore heap property for the reduced array
    siftDown(arr, i, 0);
  }
}

function siftDown(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    siftDown(arr, n, largest);
  }
}
```
