## Sliding Window (Fixed Length) 🟢

- **What it is:** Maintaining the state of exactly k consecutive elements as you move through an array
- **When to reach for it:** "Find the max sum of a subarray of size k", "Find all anagrams of a string of size k"
- **Why it works:** When moving a window of size k from index i to i+1, k-1 elements stay exactly the same. You only need to subtract the element falling out of the left, and add the element entering on the right

### The visual mechanism

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="A window of size 3 slides right. The middle 2 elements are shared between step 1 and step 2. Only the edges change." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="20" y="25" class="lb">Step 1</text>
  <!-- Window 1 -->
  <rect class="hot" x="80" y="10" width="30" height="25" rx="2" />
  <rect class="hi" x="110" y="10" width="30" height="25" />
  <rect class="hi" x="140" y="10" width="30" height="25" rx="2" />
  <rect class="bx" x="170" y="10" width="30" height="25" rx="2" />
  
  <text x="95" y="27" class="lb" text-anchor="middle">2</text>
  <text x="125" y="27" class="lb" text-anchor="middle">1</text>
  <text x="155" y="27" class="lb" text-anchor="middle">5</text>
  <text x="185" y="27" class="lb" text-anchor="middle">3</text>
  
  <text x="220" y="25" class="sm">Sum = 8</text>

  <text x="20" y="65" class="lb">Step 2</text>
  <!-- Window 2 -->
  <rect class="bx" x="80" y="50" width="30" height="25" rx="2" />
  <rect class="hi" x="110" y="50" width="30" height="25" rx="2" />
  <rect class="hi" x="140" y="50" width="30" height="25" />
  <rect class="hi" x="170" y="50" width="30" height="25" rx="2" />
  
  <text x="95" y="67" class="lb" text-anchor="middle">2</text>
  <text x="125" y="67" class="lb" text-anchor="middle">1</text>
  <text x="155" y="67" class="lb" text-anchor="middle">5</text>
  <text x="185" y="67" class="lb" text-anchor="middle">3</text>

  <text x="220" y="65" class="sm">Sum = 8 - 2 + 3 = 9</text>

  <!-- Arrows -->
  <path class="a" d="M 95 38 L 95 47" marker-end="url(#arrow)" />
  <text x="100" y="45" class="sm" fill="#ef476e">subtract</text>
  
  <path class="a" d="M 185 38 L 185 47" marker-end="url(#arrow)" />
  <text x="190" y="45" class="sm" fill="#2d6a4f">add</text>
</svg>
:::
