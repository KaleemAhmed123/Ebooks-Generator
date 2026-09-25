## Fix One, Collide Two <span class="lv lv1"></span>

- **What it is:** For triplets (or k-tuples) on sorted data, fix the first element with a loop and run collision two pointers (page 02-08) on the rest. k-Sum (k ≥ 3) costs O(n^(k−1)), one power below brute force
- **Signal:** "find all unique triplets summing to 0", "closest sum to target", "count triplets with sum < X", "how many triangles can be formed"
- **Why it works:** With `a[i]` fixed, the question is a two-sum on the sorted suffix, which collision pointers settle in O(n): if the sum is too small only `left++` can raise it, if too big only `right--` can lower it. Sorting also puts duplicates side by side, so skipping them is a single comparison

:::mint
<svg viewBox="0 0 470 92" role="img" aria-label="Sorted array minus 4, minus 1, minus 1, 0, 1, 2. Index i is fixed at minus 1. Left starts after i and right at the end. The sum minus 1 plus minus 1 plus 2 equals 0, a triplet." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .fx { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0210" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="bx" x="20" y="14" width="36" height="24"/><text x="38" y="30" class="lb" text-anchor="middle">−4</text>
  <rect class="fx" x="56" y="14" width="36" height="24"/><text x="74" y="30" class="lb" text-anchor="middle">−1</text>
  <rect class="hi" x="92" y="14" width="36" height="24"/><text x="110" y="30" class="lb" text-anchor="middle">−1</text>
  <rect class="bx" x="128" y="14" width="36" height="24"/><text x="146" y="30" class="lb" text-anchor="middle">0</text>
  <rect class="bx" x="164" y="14" width="36" height="24"/><text x="182" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="hi" x="200" y="14" width="36" height="24"/><text x="218" y="30" class="lb" text-anchor="middle">2</text>
  <text x="74" y="52" class="sm" text-anchor="middle" fill="#1d4e89">i (fixed)</text>
  <text x="110" y="52" class="sm" text-anchor="middle">left →</text>
  <text x="218" y="52" class="sm" text-anchor="middle">← right</text>
  <text x="20" y="78" class="lb">−1 + (−1) + 2 = 0 → record, then skip equal neighbours on both sides</text>
  <text x="260" y="30" class="sm">sum &lt; 0 → left++ (need bigger)</text>
  <text x="260" y="44" class="sm">sum &gt; 0 → right−− (need smaller)</text>
</svg>
:::
