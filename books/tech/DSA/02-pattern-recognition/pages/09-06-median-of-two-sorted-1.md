## Partition Two Sorted Arrays <span class="lv lv3"></span>

- **What:** the median (or k-th) of two sorted arrays without merging them. Cut each array so that **everything left of both cuts** is the smaller half of the combined data. Binary search the one cut; the other is fixed by it
- **Spot it:** "median of two sorted arrays", "k-th smallest across two sorted arrays", an O(log) bound demanded on two sorted inputs. One array, k-th → 09-05
- **Why:** a valid split needs `maxLeft ≤ minRight` on both sides. Move cut `i` in the shorter array right and the total-size rule forces cut `j` left, so `maxLeftA` rises while `maxLeftB` falls: the condition is monotone, so one binary search over `i` lands it in O(log min(m, n))

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="Array A is 1, 3, 8, 9, 15 and array B is 7, 11, 18, 19, 21, 25. A cut at i equals 3 keeps 1, 3, 8 on the left of A; the combined half needs 5 or 6 elements, so B's cut j equals 2 keeps 7, 11. Left holds 1, 3, 8, 7, 11. Check 8 is at most 18 and 11 is at most 9? No, 11 is bigger than 9, so move A's cut left." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .lf { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .rt { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .cut { stroke: #ef476e; stroke-width: 1.6; }
  </style>
  <text x="14" y="34" class="sm">A</text>
  <rect class="lf" x="34" y="22" width="34" height="22"/><text x="51" y="37" class="lb" text-anchor="middle">1</text>
  <rect class="lf" x="68" y="22" width="34" height="22"/><text x="85" y="37" class="lb" text-anchor="middle">3</text>
  <rect class="lf" x="102" y="22" width="34" height="22"/><text x="119" y="37" class="lb" text-anchor="middle">8</text>
  <rect class="rt" x="136" y="22" width="34" height="22"/><text x="153" y="37" class="lb" text-anchor="middle">9</text>
  <rect class="rt" x="170" y="22" width="34" height="22"/><text x="187" y="37" class="lb" text-anchor="middle">15</text>
  <line class="cut" x1="136" y1="16" x2="136" y2="50"/><text x="136" y="12" class="sm" text-anchor="middle">i = 3</text>
  <text x="14" y="82" class="sm">B</text>
  <rect class="lf" x="34" y="70" width="34" height="22"/><text x="51" y="85" class="lb" text-anchor="middle">7</text>
  <rect class="lf" x="68" y="70" width="34" height="22"/><text x="85" y="85" class="lb" text-anchor="middle">11</text>
  <rect class="rt" x="102" y="70" width="34" height="22"/><text x="119" y="85" class="lb" text-anchor="middle">18</text>
  <rect class="rt" x="136" y="70" width="34" height="22"/><text x="153" y="85" class="lb" text-anchor="middle">19</text>
  <rect class="rt" x="170" y="70" width="34" height="22"/><text x="187" y="85" class="lb" text-anchor="middle">21</text>
  <rect class="rt" x="204" y="70" width="34" height="22"/><text x="221" y="85" class="lb" text-anchor="middle">25</text>
  <line class="cut" x1="102" y1="64" x2="102" y2="98"/><text x="102" y="108" class="sm" text-anchor="middle">j = 2</text>
  <text x="258" y="34" class="sm">left count i + j must be ⌈(m+n)/2⌉,</text>
  <text x="258" y="46" class="sm">so j is forced once i is chosen</text>
  <text x="258" y="70" class="sm">valid when Aleft ≤ Bright and</text>
  <text x="258" y="82" class="sm">Bleft ≤ Aright</text>
  <text x="258" y="104" class="sm">here Bleft 11 &gt; Aright 9 → cut i</text>
  <text x="258" y="116" class="sm">is too far right, search lower</text>
</svg>
:::
