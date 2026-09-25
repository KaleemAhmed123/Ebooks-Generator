## Weave the Copies <span class="lv lv2"></span>

- **What it is:** To deep-copy a structure whose nodes point at arbitrary other nodes, you need "old node → its copy" for every node. A hash map gives that in O(n) space; weaving each copy right after its original gives it in O(1) extra space: the copy of `x` is simply `x.next`
- **Signal:** "copy list with random pointer", "clone a linked list with next and arbitrary pointer", "clone graph", any deep copy where pointers may point backwards or to nodes not yet copied
- **Why it works:** A pointer to a node that has not been copied yet cannot be set during a single pass. Splitting the job into three passes removes the dependency: create every copy first, then fix every `random` using `x.random.next`, then unweave the two lists

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Copying a list A, B, C with random pointers. Pass 1 weaves copies: A, A prime, B, B prime, C, C prime. Pass 2 sets each copy's random: A prime's random is A.random.next. Pass 3 separates the lists: originals A, B, C and copies A prime, B prime, C prime." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .o { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .r { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 3 2; }
  </style>
  <defs><marker id="m1206" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker></defs>
  <text x="20" y="24" class="sm">1. weave</text>
  <rect class="o" x="90" y="12" width="26" height="20"/><text x="103" y="26" class="lb" text-anchor="middle">A</text>
  <rect class="c" x="120" y="12" width="26" height="20"/><text x="133" y="26" class="lb" text-anchor="middle">A'</text>
  <rect class="o" x="150" y="12" width="26" height="20"/><text x="163" y="26" class="lb" text-anchor="middle">B</text>
  <rect class="c" x="180" y="12" width="26" height="20"/><text x="193" y="26" class="lb" text-anchor="middle">B'</text>
  <rect class="o" x="210" y="12" width="26" height="20"/><text x="223" y="26" class="lb" text-anchor="middle">C</text>
  <rect class="c" x="240" y="12" width="26" height="20"/><text x="253" y="26" class="lb" text-anchor="middle">C'</text>
  <path class="r" d="M 103 34 Q 163 70 221 34" marker-end="url(#m1206)"/><text x="130" y="62" class="sm">A.random = C</text>
  <text x="20" y="86" class="lb">2. A'.random = A.random.next = C'</text>
  <text x="20" y="106" class="lb">3. unweave: A→B→C and A'→B'→C'</text>
  <text x="300" y="26" class="sm">copy of x is x.next:</text>
  <text x="300" y="38" class="sm">the list itself is the map</text>
</svg>
:::
