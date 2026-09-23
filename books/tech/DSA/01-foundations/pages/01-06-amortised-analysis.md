## Amortised analysis

- Amortised analysis measures the **average cost of an operation over a sequence**, rather than the worst-case cost of a single operation
- It applies when an algorithm has rare, expensive operations interspersed with many cheap ones
- It proves that a sequence of n operations takes O(n) time total, meaning each operation is **amortised O(1)**

### Dynamic Array (Vector / ArrayList)

- An array has a fixed capacity in memory. When it fills up, pushing a new element requires allocating a new array (usually double the size) and copying all existing elements
- The copy operation takes O(n) time. Does this mean `push` is O(n)?

:::mint
<svg viewBox="0 0 470 130" role="img" aria-label="Dynamic array doubling. Cost is 1 for normal pushes, but spikes to copy N elements when resizing. Total cost over N pushes is 2N, making average cost O(1)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bar { fill: #1d4e89; }
    .red { fill: #ef476e; }
  </style>

  <!-- Array sizes -->
  <text x="20" y="25" class="lb">cap 1</text>
  <rect class="hi" x="60" y="15" width="15" height="15" rx="1"/>
  
  <text x="20" y="45" class="lb">cap 2</text>
  <rect class="bx" x="60" y="35" width="15" height="15" rx="1"/><rect class="hi" x="77" y="35" width="15" height="15" rx="1"/>
  
  <text x="20" y="65" class="lb">cap 4</text>
  <rect class="bx" x="60" y="55" width="15" height="15" rx="1"/><rect class="bx" x="77" y="55" width="15" height="15" rx="1"/><rect class="bx" x="94" y="55" width="15" height="15" rx="1"/><rect class="hi" x="111" y="55" width="15" height="15" rx="1"/>
  
  <text x="20" y="85" class="lb">cap 8</text>
  <g class="bx">
    <rect x="60" y="75" width="15" height="15" rx="1"/><rect x="77" y="75" width="15" height="15" rx="1"/><rect x="94" y="75" width="15" height="15" rx="1"/><rect x="111" y="75" width="15" height="15" rx="1"/>
    <rect x="128" y="75" width="15" height="15" rx="1"/><rect x="145" y="75" width="15" height="15" rx="1"/><rect x="162" y="75" width="15" height="15" rx="1"/><rect class="hi" x="179" y="75" width="15" height="15" rx="1"/>
  </g>

  <!-- Cost Bar Chart -->
  <text x="240" y="15" class="sm">Cost per push operation</text>
  <path d="M 240 100 L 440 100" stroke="#1a1a1a" stroke-width="1" />
  
  <rect class="bar" x="250" y="85" width="10" height="15" /> <!-- op 1, cost 1 -->
  <rect class="red" x="265" y="70" width="10" height="30" /> <!-- op 2, cost 2 (copy 1 + insert) -->
  <rect class="bar" x="280" y="85" width="10" height="15" /> <!-- op 3, cost 1 -->
  <rect class="red" x="295" y="40" width="10" height="60" /> <!-- op 4, cost 4 (copy 3 + insert) -->
  <rect class="bar" x="310" y="85" width="10" height="15" /> <!-- op 5, cost 1 -->
  <rect class="bar" x="325" y="85" width="10" height="15" /> <!-- op 6, cost 1 -->
  <rect class="bar" x="340" y="85" width="10" height="15" /> <!-- op 7, cost 1 -->
  <rect class="red" x="355" y="10" width="10" height="90" /> <!-- op 8, cost 8 (copy 7 + insert) -->

  <text x="248" y="115" class="sm">1</text>
  <text x="263" y="115" class="sm">2</text>
  <text x="278" y="115" class="sm">3</text>
  <text x="293" y="115" class="sm">4</text>
  <text x="353" y="115" class="sm">8</text>
  <text x="300" y="128" class="sm" text-anchor="middle">push operation number</text>
</svg>
:::

- Look at the costs. To insert n elements, we do n raw inserts. The copying costs 1 + 2 + 4 + 8 dots ≈ n. Total cost is 2n
- Because 2n in O(n), the average cost per insertion over the long run is strictly bounded by a constant factor. Therefore, `push` is amortised O(1)
- **Crucial requirement:** The array must multiply its capacity by a constant factor (usually 2). If it just added 100 elements of capacity each time, the copies would sum to n², and the amortised cost would be O(n)
