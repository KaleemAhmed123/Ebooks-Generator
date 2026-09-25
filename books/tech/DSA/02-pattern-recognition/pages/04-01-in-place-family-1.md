# Chapter 4 - In-Place & Index Tricks

## The In-Place Family <span class="lv lv1"></span>

- **What it is:** Problems where the array itself is the only memory you get. The tricks turn *positions* into storage: an index can be a hash slot, a reversal can be a rotation, a sign can be a flag
- **Signal:** "O(1) extra space", "modify the array in place", "values are in the range 1..n", "return the next arrangement", "rotate by k"
- **Why it works:** A hash set costs O(n) memory. When values are bounded by n, the array already has n slots, one per possible value. Every trick in this chapter borrows those slots or rearranges them with a provable invariant

:::mint
<svg viewBox="0 0 470 96" role="img" aria-label="Values 1 to n fit exactly into indices 0 to n minus 1. Value v belongs at index v minus 1, so the array can act as its own hash table: swap values home, or flip the sign at index v minus 1 to mark v as seen." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1d4e89; stroke-width: 1.1; fill: none; }
  </style>
  <defs><marker id="m0401" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <text x="20" y="18" class="sm">index</text>
  <text x="97" y="18" class="sm" text-anchor="middle">0</text><text x="137" y="18" class="sm" text-anchor="middle">1</text><text x="177" y="18" class="sm" text-anchor="middle">2</text><text x="217" y="18" class="sm" text-anchor="middle">3</text>
  <rect class="bx" x="80" y="24" width="34" height="24"/><text x="97" y="40" class="lb" text-anchor="middle">3</text>
  <rect class="bx" x="120" y="24" width="34" height="24"/><text x="137" y="40" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="160" y="24" width="34" height="24"/><text x="177" y="40" class="lb" text-anchor="middle">4</text>
  <rect class="bx" x="200" y="24" width="34" height="24"/><text x="217" y="40" class="lb" text-anchor="middle">2</text>
  <path class="a" d="M 97 50 Q 137 80 175 52" marker-end="url(#m0401)"/>
  <text x="100" y="86" class="sm">value 3 lives at index 2</text>
  <text x="270" y="30" class="lb">home(v) = v − 1</text>
  <text x="270" y="50" class="sm">swap v home  → cyclic placement (04-02)</text>
  <text x="270" y="64" class="sm">negate a[v−1] → "v was seen" flag</text>
  <text x="270" y="78" class="sm">reverse parts → rotation (04-03)</text>
</svg>
:::
