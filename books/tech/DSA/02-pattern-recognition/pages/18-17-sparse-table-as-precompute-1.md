## Sparse Table as Precompute <span class="lv lv2"></span>

- When an operation is NOT invertible (like minimum or maximum), you cannot use a prefix array. You need a different precompute strategy
- The **Sparse Table** is a precompute structure designed specifically for **idempotent** operations

### The requirement: Idempotence

- An operation is idempotent if applying it multiple times yields the same result as applying it once: `op(x, x) = x`
- ✅ **Minimum:** `min(A, A) = A`
- ✅ **Maximum:** `max(A, A) = A`
- ✅ **GCD:** `gcd(A, A) = A`
- ❌ **Sum:** `A + A != A`
- Idempotence means **overlapping intervals don't matter**. If you want the minimum of a range, and you take the minimum of the first half and the minimum of the second half, and those halves overlap, the answer is still perfectly correct

### The mechanism

- Instead of precomputing sums from index 0, a Sparse Table precomputes the answer for **every interval whose length is a power of 2**
- `table[i][j]` stores the answer for the interval starting at index `i` with length `2^j`
- Upfront cost: O(N log N) to build

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Sparse Table query for Range Minimum. The query range is fully covered by two overlapping precomputed power-of-2 blocks. The overlap does not affect the minimum." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hi2 { fill: #fdf2f8; stroke: #db2777; stroke-width: 1.1; }
    .ov { fill: #e5e7eb; stroke: #1a1a1a; stroke-width: 1.1; stroke-dasharray: 2 2; }
  </style>

  <text x="10" y="14" class="sm">Query Range: [2, 8] (Length 7)</text>

  <!-- Array boxes -->
  <g transform="translate(10, 24)">
    <rect class="bx" x="0" y="0" width="25" height="18" rx="2"/> <text x="12" y="13" class="lb" text-anchor="middle">5</text>
    <rect class="bx" x="28" y="0" width="25" height="18" rx="2"/> <text x="40" y="13" class="lb" text-anchor="middle">2</text>
    
    <!-- Query range [2..8] -->
    <rect class="hi1" x="56" y="0" width="109" height="18" rx="2"/> 
    <rect class="hi2" x="140" y="0" width="109" height="18" rx="2"/>
    <rect class="ov" x="140" y="0" width="25" height="18" rx="2"/> <!-- The overlap -->
    
    <text x="68" y="13" class="lb" text-anchor="middle">4</text>
    <text x="96" y="13" class="lb" text-anchor="middle">1</text>
    <text x="124" y="13" class="lb" text-anchor="middle">9</text>
    <text x="152" y="13" class="lb" text-anchor="middle">3</text>
    <text x="180" y="13" class="lb" text-anchor="middle">7</text>
    <text x="208" y="13" class="lb" text-anchor="middle">6</text>
    <text x="236" y="13" class="lb" text-anchor="middle">8</text>
  </g>

  <!-- Brackets -->
  <path d="M 66 46 L 66 52 L 165 52 L 165 46" fill="none" stroke="#2d6a4f" stroke-width="1.5" />
  <text x="115" y="65" class="lb" fill="#2d6a4f" text-anchor="middle">Length 4 block (starts at 2)</text>

  <path d="M 150 75 L 150 81 L 249 81 L 249 75" fill="none" stroke="#db2777" stroke-width="1.5" />
  <text x="200" y="94" class="lb" fill="#db2777" text-anchor="middle">Length 4 block (ends at 8)</text>

  <text x="10" y="115" class="lb">O(1) Query:</text>
  <text x="10" y="128" class="sm">Largest power of 2 ≤ 7 is 4. Query = min(block_left, block_right). Overlap at index 5 is harmless.</text>
</svg>
:::
