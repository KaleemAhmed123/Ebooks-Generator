## Balance Two Heaps 🟡 - continued

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Two heaps after inserting 5, 15, 1, 3, 8. The lower half 1, 3, 5 is a max-heap with top 5. The upper half 8, 15 is a min-heap with top 8. Sizes 3 and 2, so the median is the lower top, 5. After adding 7, sizes are 3 and 3 and the median is 5 plus 7 over 2, which is 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .lo { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="sm">lower half: max-heap</text>
  <rect class="lo" x="20" y="24" width="30" height="22"/><text x="35" y="39" class="lb" text-anchor="middle">1</text>
  <rect class="lo" x="54" y="24" width="30" height="22"/><text x="69" y="39" class="lb" text-anchor="middle">3</text>
  <rect class="lo" x="88" y="24" width="30" height="22" stroke-width="2"/><text x="103" y="39" class="lb" text-anchor="middle">5</text>
  <text x="103" y="60" class="sm" text-anchor="middle">top</text>
  <text x="150" y="18" class="sm">upper half: min-heap</text>
  <rect class="hi" x="150" y="24" width="30" height="22" stroke-width="2"/><text x="165" y="39" class="lb" text-anchor="middle">8</text>
  <rect class="hi" x="184" y="24" width="30" height="22"/><text x="199" y="39" class="lb" text-anchor="middle">15</text>
  <text x="165" y="60" class="sm" text-anchor="middle">top</text>
  <text x="20" y="84" class="lb">sizes 3 | 2 → median = lower top = 5</text>
  <text x="20" y="100" class="lb">add 7 → sizes 3 | 3 → median = (5 + 7) / 2 = 6</text>
  <text x="260" y="34" class="sm">invariant: every lower ≤ every upper,</text>
  <text x="260" y="46" class="sm">|lower| = |upper| or |upper| + 1</text>
</svg>
:::
