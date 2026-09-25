## Staircase Search 🟢

- **What it is:** Searching for a target in a 2D matrix where every row is sorted left-to-right, and every column is sorted top-to-bottom
- **Signal:** "Search a 2D Matrix II" (LeetCode 240): rows and columns each sorted
- **Why it works:** If you start at the top-right corner, you have two choices. Moving left decreases the value. Moving down increases the value. From that corner the matrix behaves like a Binary Search Tree

### The visual mechanism

- Target: `16`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Searching a row and column sorted matrix. Starting top-right, moving left decreases the value, moving down increases it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef476e"/>
    </marker>
  </defs>

  <!-- Row 0 -->
  <rect class="bx" x="20" y="20" width="30" height="20" rx="2" />
  <rect class="bx" x="50" y="20" width="30" height="20" rx="2" />
  <rect class="hi" x="80" y="20" width="30" height="20" rx="2" />
  <text x="35" y="34" class="lb" text-anchor="middle">1</text>
  <text x="65" y="34" class="lb" text-anchor="middle">4</text>
  <text x="95" y="34" class="lb" text-anchor="middle">7</text>
  
  <text x="130" y="34" class="sm" fill="#2d6a4f">Start (7 < 16, move DOWN)</text>

  <!-- Row 1 -->
  <rect class="bx" x="20" y="40" width="30" height="20" rx="2" />
  <rect class="bx" x="50" y="40" width="30" height="20" rx="2" />
  <rect class="hi" x="80" y="40" width="30" height="20" rx="2" />
  <text x="35" y="54" class="lb" text-anchor="middle">2</text>
  <text x="65" y="54" class="lb" text-anchor="middle">5</text>
  <text x="95" y="54" class="lb" text-anchor="middle">20</text>

  <text x="130" y="54" class="sm" fill="#2d6a4f">(20 > 16, move LEFT)</text>

  <!-- Row 2 -->
  <rect class="bx" x="20" y="60" width="30" height="20" rx="2" />
  <rect class="hi" x="50" y="60" width="30" height="20" rx="2" />
  <rect class="bx" x="80" y="60" width="30" height="20" rx="2" />
  <text x="35" y="74" class="lb" text-anchor="middle">3</text>
  <text x="65" y="74" class="lb" text-anchor="middle">16</text>
  <text x="95" y="74" class="lb" text-anchor="middle">22</text>
  
  <text x="130" y="74" class="sm" fill="#2d6a4f">Found it!</text>

  <path class="a" d="M 95 40 L 95 45" marker-end="url(#arrow)" />
  <path class="a" d="M 80 50 L 70 50" marker-end="url(#arrow)" />
  <path class="a" d="M 65 60 L 65 65" marker-end="url(#arrow)" />

</svg>
:::
