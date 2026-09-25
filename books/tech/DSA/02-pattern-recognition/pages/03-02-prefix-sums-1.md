## Prefix Sums 🟢

- **What it is:** An array where the value at index i is the sum of all elements from index 0 to i in the original array
- **When to reach for it:** You need to rapidly query the sum of elements between any two indices L and R
- **Why it works:** `Sum[L, R]` is mathematically identical to `Sum[0, R] - Sum[0, L-1]`. By precomputing all `Sum[0, i]`, any arbitrary range query becomes a single O(1) subtraction

### The visual mechanism

- Original: `[3, 1, 4, 1, 5]`
- Prefix: `[3, 4, 8, 9, 14]`
- Query sum of `[1, 3]` (values `1, 4, 1`, sum is `6`).
- Using Prefix: `Prefix[3] - Prefix[0]` = `9 - 3` = `6`.

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Prefix sum calculation. The sum of range L to R is found by taking the prefix sum at R and subtracting the prefix sum just before L." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>

  <!-- Array Indices -->
  <text x="55" y="25" class="sm">0</text><text x="95" y="25" class="sm">1</text>
  <text x="135" y="25" class="sm">2</text><text x="175" y="25" class="sm">3</text>
  <text x="215" y="25" class="sm">4</text>

  <!-- Prefix Array -->
  <text x="10" y="45" class="sm">Prefix</text>
  <rect class="hi" x="40" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="80" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="120" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="160" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="200" y="30" width="30" height="20" rx="2" />
  
  <text x="55" y="44" class="lb" text-anchor="middle">3</text>
  <text x="95" y="44" class="lb" text-anchor="middle">4</text>
  <text x="135" y="44" class="lb" text-anchor="middle">8</text>
  <text x="175" y="44" class="lb" text-anchor="middle">9</text>
  <text x="215" y="44" class="lb" text-anchor="middle">14</text>

  <!-- Explanation -->
  <text x="40" y="75" class="lb">Query [1, 3] = Prefix[3] - Prefix[0]</text>
  <text x="120" y="95" class="lb">= 9 - 3</text>
  <text x="120" y="115" class="lb" fill="#2d6a4f">= 6</text>
</svg>
:::
