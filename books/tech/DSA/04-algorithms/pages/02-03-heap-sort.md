## Heap Sort

- Heap Sort is the ultimate defensive sorting algorithm. It guarantees O(N log N) worst-case performance (unlike Quick Sort) and uses O(1) auxiliary space (unlike Merge Sort).
- **The Core Idea:** Build a Max-Heap out of the array. The largest element is now at the root (index 0). Swap the root with the last element. The largest element is now perfectly sorted at the end. Reduce the heap size by 1, "sift down" the new root to restore the heap property, and repeat.

:::mint
<svg viewBox="0 0 470 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Heap Sort swap and sift">
  <rect x="20" y="40" width="40" height="40" class="b" fill="#e2fcf3" />
  <rect x="60" y="40" width="40" height="40" class="b" />
  <rect x="100" y="40" width="40" height="40" class="b" />
  <rect x="140" y="40" width="40" height="40" class="b" stroke="#1d4e89" stroke-width="2" fill="#e2fcf3" />
  
  <text x="35" y="65" class="l">9</text>
  <text x="75" y="65" class="l">4</text>
  <text x="115" y="65" class="l">2</text>
  <text x="155" y="65" class="l">1</text>
  
  <path d="M40 30 Q 100 0 160 30" class="a" stroke="#ef476e" fill="none" marker-end="url(#arrow)" />
  <text x="90" y="15" class="s">Swap</text>
  
  <text x="220" y="55" class="s">1. Swap Max (9) to end</text>
  <text x="220" y="70" class="s">2. Exclude end from heap</text>
  <text x="220" y="85" class="s">3. Sift down new root (1)</text>
</svg>
:::

- Heap Sort is **Unstable**.
- Despite its perfect theoretical constraints, it is generally slower in practice than Quick Sort because it has a terrible caching profile (jumping around the array to find children causes frequent cache misses).

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

### The trap

- **Zero-indexed vs One-indexed Math:** The children of node `i` in a 0-indexed array are `2*i + 1` and `2*i + 2`. In a 1-indexed array, they are `2*i` and `2*i + 1`. Mixing these up during an interview guarantees an out-of-bounds error.
- **The fix:** Always explicitly write out `const left = 2 * i + 1` instead of doing the math inline. It makes debugging trivial.
