# Chapter 2 — The Derivation Method

## The derivation method

- Remembering a solution guarantees you will fail when the problem is slightly changed
- Deriving a solution means following a mechanical, repeatable path from the naive approach to the optimal one. If you follow the path, the algorithm reveals itself

### The Path

:::mint
<svg viewBox="0 0 470 230" role="img" aria-label="A flowchart showing the derivation method: start with brute force, ask why it is slow, identify repeated work, then apply one of six transformations — remember, eliminate, reorder, preprocess, exploit monotonicity, or pick a data structure — to reach the optimal solution." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <!-- Level 1: Brute Force -->
  <rect class="hi" x="160" y="10" width="150" height="24" rx="3"/>
  <text x="235" y="26" class="lb" text-anchor="middle">1. Brute Force</text>
  <path class="a" d="M 235 34 L 235 50" marker-end="url(#arrow)" />

  <!-- Level 2: What is repeated? -->
  <rect class="bx" x="160" y="55" width="150" height="24" rx="3"/>
  <text x="235" y="71" class="lb" text-anchor="middle">2. What is repeated?</text>

  <!-- Fan-out to 6 branches -->
  <path class="a" d="M 235 79 L 235 100" />
  <path class="a" d="M 50 100 L 420 100" />
  <path class="a" d="M 50 100 L 50 110" marker-end="url(#arrow)" />
  <path class="a" d="M 125 100 L 125 110" marker-end="url(#arrow)" />
  <path class="a" d="M 200 100 L 200 110" marker-end="url(#arrow)" />
  <path class="a" d="M 275 100 L 275 110" marker-end="url(#arrow)" />
  <path class="a" d="M 345 100 L 345 110" marker-end="url(#arrow)" />
  <path class="a" d="M 420 100 L 420 110" marker-end="url(#arrow)" />

  <!-- Branch 1: Remember -->
  <rect class="bx" x="10" y="115" width="80" height="22" rx="3"/>
  <text x="50" y="130" class="lb" text-anchor="middle">Remember?</text>
  <text x="50" y="148" class="sm" text-anchor="middle">DP / Hash Map</text>

  <!-- Branch 2: Eliminate -->
  <rect class="bx" x="95" y="115" width="80" height="22" rx="3"/>
  <text x="135" y="130" class="lb" text-anchor="middle">Eliminate?</text>
  <text x="135" y="148" class="sm" text-anchor="middle">Bin Search / Prune</text>

  <!-- Branch 3: Reorder -->
  <rect class="bx" x="180" y="115" width="80" height="22" rx="3"/>
  <text x="220" y="130" class="lb" text-anchor="middle">Reorder?</text>
  <text x="220" y="148" class="sm" text-anchor="middle">Sort / Greedy</text>

  <!-- Branch 4: Preprocess -->
  <rect class="bx" x="265" y="115" width="80" height="22" rx="3"/>
  <text x="305" y="130" class="lb" text-anchor="middle">Preprocess?</text>
  <text x="305" y="148" class="sm" text-anchor="middle">Prefix Sum / Trie</text>

  <!-- Branch 5: Monotonicity -->
  <rect class="bx" x="350" y="115" width="80" height="22" rx="3"/>
  <text x="390" y="130" class="lb" text-anchor="middle">Monotonic?</text>
  <text x="390" y="148" class="sm" text-anchor="middle">Window / Stack</text>

  <!-- Branch 6: Data Structure -->
  <rect class="bx" x="380" y="155" width="80" height="22" rx="3"/>
  <text x="420" y="170" class="lb" text-anchor="middle">DS swap?</text>
  <text x="420" y="188" class="sm" text-anchor="middle">Heap / Seg Tree</text>

  <!-- Connect all to optimal -->
  <path class="a" d="M 50 152 L 50 195 L 220 195 L 220 200" marker-end="url(#arrow)" />
  <path class="a" d="M 135 152 L 135 195 L 220 195" />
  <path class="a" d="M 220 152 L 220 200" />
  <path class="a" d="M 305 152 L 305 195 L 250 195 L 250 200" />
  <path class="a" d="M 390 152 L 390 195 L 250 195" />
  <path class="a" d="M 420 192 L 420 195 L 250 195" />

  <!-- Level 4: Optimised -->
  <rect class="hi" x="160" y="205" width="150" height="24" rx="3"/>
  <text x="235" y="221" class="lb" text-anchor="middle">3. Optimised Algorithm</text>
</svg>
:::

### The mindset shift

- Do not stare at a problem hoping an optimal algorithm will pop into your head. That is waiting for inspiration, and inspiration is unreliable under stress
- Start with the dumbest, most naive brute force solution imaginable. It doesn't matter if it's O(n!). It gives you a working baseline
- The brute force solution is a map. The inefficiencies in it will point directly to the data structure or technique you need to fix them
