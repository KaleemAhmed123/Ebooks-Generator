## Quick Sort & Partitioning <span class="lv lv1"></span>

- Quick Sort is the default sorting algorithm in most standard libraries. It is typically the engine inside your language's `Array.prototype.sort()`.
- **The Core Idea:** Pick a "pivot" element. Move all elements smaller than the pivot to its left. Move all elements larger to its right. The pivot is now exactly where it belongs. Recursively do this for the left and right halves.
- **The Trade-off:** Its average time complexity is O(N log N) with almost zero memory overhead (it is an **in-place** sort). However, its absolute worst-case time complexity is O(N²) if it repeatedly picks the worst possible pivot.

:::mint
<svg viewBox="0 0 470 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quick sort partitioning">
  <rect x="20" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  <rect x="60" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  <rect x="100" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  <rect x="140" y="40" width="40" height="40" class="b" stroke="#1d4e89" stroke-width="2" />
  <rect x="180" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  <rect x="220" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  
  <text x="35" y="65" class="l">2</text>
  <text x="75" y="65" class="l">1</text>
  <text x="115" y="65" class="l">4</text>
  <text x="155" y="65" class="l" fill="#1d4e89">5</text>
  <text x="195" y="65" class="l">9</text>
  <text x="235" y="65" class="l">7</text>
  
  <text x="25" y="100" class="s" fill="#ef476e">&lt; Pivot</text>
  <text x="145" y="100" class="s" fill="#1d4e89">Pivot</text>
  <text x="195" y="100" class="s" fill="#ef476e">&gt; Pivot</text>
</svg>
:::

- Quick Sort is **Unstable**. If two elements have the same value, their original order is not guaranteed to survive the partitioning swaps.
