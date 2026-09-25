## Split, Reverse, Weave <span class="lv lv2"></span>

- **What it is:** A three-step recipe for problems that pair the front of a list with its back. Find the middle with slow/fast pointers, reverse the second half in place (page 12-02), then walk both halves together: compare them, weave them, or add them
- **Signal:** "reorder L0 → Ln → L1 → Ln−1 …", "is the linked list a palindrome", "maximum twin sum", "sort a linked list in O(n log n)", O(1) extra space
- **Why it works:** A singly linked list can only be walked forward, so "the i-th node from the end" is out of reach. Reversing the back half turns it into a forward walk that starts at the end. The middle comes from slow/fast pointers

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Reorder list 1, 2, 3, 4, 5. Slow and fast find the middle 3. Cut after 3: first half 1, 2, 3 and second half 4, 5. Reverse the second half to 5, 4. Weave: 1, 5, 2, 4, 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .h1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .h2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="24" class="sm">1. split</text>
  <rect class="h1" x="90" y="12" width="26" height="20"/><text x="103" y="26" class="lb" text-anchor="middle">1</text>
  <rect class="h1" x="120" y="12" width="26" height="20"/><text x="133" y="26" class="lb" text-anchor="middle">2</text>
  <rect class="h1" x="150" y="12" width="26" height="20"/><text x="163" y="26" class="lb" text-anchor="middle">3</text>
  <rect class="h2" x="196" y="12" width="26" height="20"/><text x="209" y="26" class="lb" text-anchor="middle">4</text>
  <rect class="h2" x="226" y="12" width="26" height="20"/><text x="239" y="26" class="lb" text-anchor="middle">5</text>
  <text x="163" y="44" class="sm" text-anchor="middle">slow</text>
  <text x="20" y="66" class="sm">2. reverse back</text>
  <rect class="h2" x="196" y="54" width="26" height="20"/><text x="209" y="68" class="lb" text-anchor="middle">5</text>
  <rect class="h2" x="226" y="54" width="26" height="20"/><text x="239" y="68" class="lb" text-anchor="middle">4</text>
  <text x="20" y="104" class="sm">3. weave</text>
  <rect class="h1" x="90" y="92" width="26" height="20"/><text x="103" y="106" class="lb" text-anchor="middle">1</text>
  <rect class="h2" x="120" y="92" width="26" height="20"/><text x="133" y="106" class="lb" text-anchor="middle">5</text>
  <rect class="h1" x="150" y="92" width="26" height="20"/><text x="163" y="106" class="lb" text-anchor="middle">2</text>
  <rect class="h2" x="180" y="92" width="26" height="20"/><text x="193" y="106" class="lb" text-anchor="middle">4</text>
  <rect class="h1" x="210" y="92" width="26" height="20"/><text x="223" y="106" class="lb" text-anchor="middle">3</text>
  <text x="290" y="30" class="sm">cut: slow.next = null</text>
  <text x="290" y="68" class="sm">now the "back" walks forward</text>
  <text x="290" y="106" class="sm">alternate one from each half</text>
</svg>
:::
