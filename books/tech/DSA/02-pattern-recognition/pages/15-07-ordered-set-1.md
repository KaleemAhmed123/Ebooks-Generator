## Ordered Set <span class="lv lv2"></span>

- **What:** a set kept in sorted order that still changes — insert, delete, and ask *ordered* questions in O(log n): nearest value below or above (**floor / ceil**), the **k-th smallest** (rank), and how many are below x. A heap gives you one extreme; an ordered set gives you any position
- **Spot it:** "closest number so far", "value within t of another and indices within k", "k-th element after each update", "how many seen below x". A min/max only → 15-01; all values known up front and static → sort once
- **Why:** a balanced binary search tree (a tree that stays shallow, so depth ≈ log n) holds the values in order and tracks subtree sizes, so it finds a neighbour or a rank by walking one root-to-leaf path. Nothing linear is scanned

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="A balanced search tree holding 2, 5, 8, 12, 17, 20, 25 with root 12. Each node stores its subtree size. floor of 15 walks right from 12 to 17, too big, back to 12: answer 12. ceil of 15 is 17. The k-th smallest for k equals 4 uses sizes: left of 12 has size 3, so the 4th is 12 itself." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .nd { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .rt { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.3; }
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sz { font: 7px Consolas, monospace; fill: #8a5a00; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .ed { stroke: #6b6b6b; stroke-width: 0.9; }
  </style>
  <line class="ed" x1="120" y1="36" x2="60" y2="76"/><line class="ed" x1="120" y1="36" x2="180" y2="76"/>
  <line class="ed" x1="60" y1="92" x2="30" y2="124"/><line class="ed" x1="60" y1="92" x2="92" y2="124"/>
  <line class="ed" x1="180" y1="92" x2="150" y2="124"/><line class="ed" x1="180" y1="92" x2="210" y2="124"/>
  <circle class="rt" cx="120" cy="28" r="14"/><text x="120" y="32" class="lb" text-anchor="middle">12</text><text x="120" y="16" class="sz" text-anchor="middle">size 7</text>
  <circle class="nd" cx="60" cy="84" r="14"/><text x="60" y="88" class="lb" text-anchor="middle">5</text><text x="42" y="80" class="sz">3</text>
  <circle class="nd" cx="180" cy="84" r="14"/><text x="180" y="88" class="lb" text-anchor="middle">20</text><text x="196" y="80" class="sz">3</text>
  <circle class="nd" cx="30" cy="132" r="13"/><text x="30" y="136" class="lb" text-anchor="middle">2</text>
  <circle class="nd" cx="92" cy="132" r="13"/><text x="92" y="136" class="lb" text-anchor="middle">8</text>
  <circle class="nd" cx="150" cy="132" r="13"/><text x="150" y="136" class="lb" text-anchor="middle">17</text>
  <circle class="nd" cx="210" cy="132" r="13"/><text x="210" y="136" class="lb" text-anchor="middle">25</text>
  <text x="270" y="40" class="sm">floor(15) = 12   ceil(15) = 17</text>
  <text x="270" y="60" class="sm">kth(4): left subtree size 3 &lt; 4,</text>
  <text x="270" y="72" class="sm">so skip 3, the 4th is the root = 12</text>
  <text x="270" y="96" class="sm">insert / delete keep the tree</text>
  <text x="270" y="108" class="sm">balanced: depth stays ≈ log n</text>
  <text x="270" y="132" class="sm">subtree sizes turn rank into</text>
  <text x="270" y="144" class="sm">one downward walk</text>
</svg>
:::
