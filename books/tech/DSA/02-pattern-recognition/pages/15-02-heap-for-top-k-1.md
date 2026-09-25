## Heap for Top K 🟢

- **What it is:** Maintaining a Priority Queue of size k to track the best k elements seen so far
- **When to reach for it:** "Find the Kth largest element", "K closest points to origin", "Top K frequent words"
- **Why it works:** To find the Top K *largest* elements, you maintain a *Min-Heap* of size k. The heap stores the "winners". The root of the Min-Heap is always the *smallest of the winners*

### The visual mechanism

- We want the Top 3 largest numbers in `[5, 1, 9, 3]`

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="A min-heap of size 3 processing elements. It drops smaller elements and keeps the 3 largest. The root of the min-heap is the Kth largest overall." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .rej { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; stroke-dasharray: 2 2;}
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="20" y="20" class="lb">State 1: processed [5, 1, 9]</text>
  <circle class="hi" cx="80" cy="50" r="12" />
  <text x="80" y="53" class="lb" text-anchor="middle">1</text>
  <circle class="hi" cx="50" cy="80" r="12" />
  <text x="50" y="83" class="lb" text-anchor="middle">5</text>
  <circle class="hi" cx="110" cy="80" r="12" />
  <text x="110" y="83" class="lb" text-anchor="middle">9</text>
  <path class="a" d="M 72 58 L 58 72" />
  <path class="a" d="M 88 58 L 102 72" />
  
  <text x="80" y="110" class="sm" text-anchor="middle">Min is at root</text>

  <text x="220" y="20" class="lb">State 2: incoming 3</text>
  <circle class="rej" cx="280" cy="50" r="12" />
  <text x="280" y="53" class="lb" text-anchor="middle" fill="#ef476e">1</text>
  <text x="280" y="32" class="sm" text-anchor="middle" fill="#ef476e">3 > 1, so pop 1, push 3</text>
  
  <text x="400" y="20" class="lb">State 3: final heap</text>
  <circle class="hi" cx="420" cy="50" r="12" />
  <text x="420" y="53" class="lb" text-anchor="middle">3</text>
  <circle class="hi" cx="390" cy="80" r="12" />
  <text x="390" y="83" class="lb" text-anchor="middle">5</text>
  <circle class="hi" cx="450" cy="80" r="12" />
  <text x="450" y="83" class="lb" text-anchor="middle">9</text>
  <path class="a" d="M 412 58 L 398 72" />
  <path class="a" d="M 428 58 L 442 72" />
  
  <text x="420" y="110" class="sm" text-anchor="middle">3rd largest of [5, 1, 9, 3]</text>
</svg>
:::

### The logic inversion

- To find the **Top K Largest**, use a **Min-Heap**. Why? You want the *smallest* of the current winners to be at the root, so you can easily compare it against incoming numbers in O(1) and pop it in O(log k) if a larger number arrives
- To find the **Top K Smallest**, use a **Max-Heap**. You want the *largest* of the current winners exposed at the root to be overwritten by smaller incoming numbers
