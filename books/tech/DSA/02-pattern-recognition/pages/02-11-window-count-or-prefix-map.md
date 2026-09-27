## Window, count, or prefix map? <span class="lv lv1"></span>

Four questions, asked in this order, settle every "subarray with property P" statement.

:::mint
<svg viewBox="0 0 470 218" role="img" aria-label="Decision chart. First: is the answer contiguous, a subarray or substring? If no, it is not a window: a subset scored by its values goes to 02-07, a subsequence to Module 06. If yes: is the property a remainder, a parity or a balance count? If yes, 03-03. If no: can values be negative? If yes, sum equals K goes to 03-03 and sum at least K to 10-10. If no: what is asked? Longest or shortest goes to 02-03; a count whose condition survives shrinking goes to 02-04; a count of exactly K goes to 02-05." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .q { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .lf { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .lb { font: 9.5px Georgia, serif; fill: #1a1a1a; }
    .id { font: bold 9.5px Consolas, monospace; fill: #2d6a4f; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .ar { fill: none; stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <defs><marker id="m0211" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <rect class="q" x="10" y="8" width="220" height="24" rx="4"/><text x="120" y="24" class="lb" text-anchor="middle">1. Contiguous: subarray, substring?</text>
  <rect class="q" x="10" y="54" width="220" height="24" rx="4"/><text x="120" y="70" class="lb" text-anchor="middle">2. Remainder, parity or balance?</text>
  <rect class="q" x="10" y="100" width="220" height="24" rx="4"/><text x="120" y="116" class="lb" text-anchor="middle">3. Can values be negative?</text>
  <rect class="q" x="10" y="146" width="220" height="24" rx="4"/><text x="120" y="162" class="lb" text-anchor="middle">4. What is asked?</text>
  <path class="ar" d="M120 32 L120 52" marker-end="url(#m0211)"/><text x="126" y="46" class="sm">yes</text>
  <path class="ar" d="M120 78 L120 98" marker-end="url(#m0211)"/><text x="126" y="92" class="sm">no</text>
  <path class="ar" d="M120 124 L120 144" marker-end="url(#m0211)"/><text x="126" y="138" class="sm">no</text>
  <path class="ar" d="M230 20 L262 20" marker-end="url(#m0211)"/><text x="238" y="15" class="sm">no</text>
  <rect class="lf" x="264" y="8" width="198" height="24" rx="12"/><text x="274" y="24" class="lb">subset <tspan class="id">02-07</tspan> · subsequence <tspan class="id">Mod 06</tspan></text>
  <path class="ar" d="M230 66 L262 66" marker-end="url(#m0211)"/><text x="238" y="61" class="sm">yes</text>
  <rect class="lf" x="264" y="54" width="198" height="24" rx="12"/><text x="274" y="70" class="lb">equal codes, a map <tspan class="id">03-03</tspan></text>
  <path class="ar" d="M230 112 L262 112" marker-end="url(#m0211)"/><text x="238" y="107" class="sm">yes</text>
  <rect class="lf" x="264" y="100" width="198" height="24" rx="12"/><text x="274" y="116" class="lb">sum = K <tspan class="id">03-03</tspan> · sum ≥ K <tspan class="id">10-10</tspan></text>
  <path class="ar" d="M230 158 L262 150" marker-end="url(#m0211)"/>
  <rect class="lf" x="264" y="138" width="198" height="22" rx="11"/><text x="274" y="153" class="lb">longest / shortest <tspan class="id">02-03</tspan></text>
  <path class="ar" d="M230 162 L262 176" marker-end="url(#m0211)"/>
  <rect class="lf" x="264" y="166" width="198" height="22" rx="11"/><text x="274" y="181" class="lb">count, shrink-safe <tspan class="id">02-04</tspan></text>
  <path class="ar" d="M226 170 L262 202" marker-end="url(#m0211)"/>
  <rect class="lf" x="264" y="192" width="198" height="22" rx="11"/><text x="274" y="207" class="lb">count, "exactly K" <tspan class="id">02-05</tspan></text>
  <text x="10" y="192" class="sm">a window needs every value ≥ 0:</text>
  <text x="10" y="204" class="sm">then growing never lowers the sum</text>
</svg>
:::

### One word flips the pattern

| Looks like | Is | The word that decides |
|---|---|---|
| [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) (LeetCode 209): window, 02-03 | [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862): deque of prefix sums, 10-10 | "−10⁵ ≤ nums[i]": a negative value can lower the sum, so shrinking is no longer safe |
| [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/) (LeetCode 992): two windows, 02-05 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560): prefix map, 03-03 | "sum", with negatives allowed: a sum subtracts across prefixes, a distinct count does not |
| [Minimum Operations to Reduce X to Zero](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/) (LeetCode 1658): window on the middle, 02-06 | [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) (LeetCode 918): Kadane on the middle, 03-06 | "exactly x" on values ≥ 1 vs "maximum" on signed values: the kept middle is the worst subarray, not a target sum |
| [Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/) (LeetCode 713): add `right − left + 1`, 02-04 | [Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/) (LeetCode 1358): add `left`, 02-04 | "less than" survives shrinking; "containing" survives growing |
