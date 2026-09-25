## Greedy via Sorting 🟢

- **What it is:** Sorting the input data so that the locally optimal choice is always at the front of the array
- **When to reach for it:** "Minimum number of platforms required", "Maximum number of activities you can attend", "Assign cookies to children to satisfy the maximum number"
- **Why it works:** A greedy algorithm takes the best available option right now, without looking ahead. For this to guarantee a globally optimal answer, the "best" option must be easily identifiable. Sorting the data by some metric (end time, size, weight) puts the best options first

### The visual mechanism

- Consider the **Activity Selection** problem: given start and end times, attend the maximum number of non-overlapping activities.
- The greedy choice: Always pick the activity that **ends earliest**. It leaves the most time available for future activities.

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Sorting intervals by end time. Picking the earliest ending interval leaves the maximum room for subsequent choices." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .rej { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; stroke-dasharray: 2 2; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>

  <text x="20" y="20" class="lb">Sorted by end time</text>
  
  <!-- Axis -->
  <path class="a" d="M 120 15 L 420 15" />
  <text x="120" y="10" class="sm">Time 0</text>
  <text x="420" y="10" class="sm">Time 10</text>
  
  <!-- Interval 1 (Picked) -->
  <rect class="hi" x="120" y="30" width="80" height="15" rx="2" />
  <text x="160" y="41" class="lb" text-anchor="middle">A: ends at 3</text>
  <text x="80" y="41" class="sm" fill="#2d6a4f">Pick</text>
  
  <!-- Interval 2 (Overlaps A) -->
  <rect class="rej" x="150" y="55" width="100" height="15" rx="2" />
  <text x="200" y="66" class="lb" text-anchor="middle" fill="#6b6b6b">B: ends at 5</text>
  <text x="80" y="66" class="sm" fill="#ef476e">Overlaps A, Skip</text>

  <!-- Interval 3 (Picked) -->
  <rect class="hi" x="220" y="80" width="90" height="15" rx="2" />
  <text x="265" y="91" class="lb" text-anchor="middle">C: ends at 6</text>
  <text x="80" y="91" class="sm" fill="#2d6a4f">Pick</text>
</svg>
:::
