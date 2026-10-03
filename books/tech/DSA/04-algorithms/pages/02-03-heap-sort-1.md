## Heap Sort <span class="lv lv1"></span>

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
