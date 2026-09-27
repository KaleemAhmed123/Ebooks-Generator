## Reverse in Place <span class="lv lv1"></span>

- **What:** three pointers, `prev`, `cur`, `next`. Save `cur.next`, point `cur` back, step both forward. The same lines reverse a list, a sublist, or every group of k
- **Spot it:** "reverse the list", "reverse nodes m to n", "in groups of k", "swap every two nodes". The front paired with the back → 12-03
- **Why:** a node knows only its successor, so saving `next` first is what keeps the rest reachable. For a segment, hold the node *before* it; its first node becomes its tail

:::mint
<svg viewBox="0 0 470 192" role="img" aria-label="Reverse nodes in k group, k equal to 2, on dummy, 1, 2, 3, 4, in four frames. Frame 1, setup: groupPrev is the dummy, cur is 1, kth is 2, and prev starts at groupNext, node 3. Frame 2: next is 2, the link from 1 is flipped to point at 3, prev becomes 1 and cur becomes 2. Frame 3: next is 3, the link from 2 is flipped to point back at 1; cur has reached groupNext, so the loop stops. Frame 4, stitch: the dummy now points at kth, node 2, giving dummy, 2, 1, 3, 4, and groupPrev moves to node 1, the old first node. Flipped links are red and dashed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .d { fill: #f4f4f4; stroke: #9a9a9a; stroke-width: 1; stroke-dasharray: 3 2; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .r { stroke: #ef476e; stroke-width: 1.3; fill: none; stroke-dasharray: 3 2; }
  </style>
  <defs><marker id="m1202k" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker><marker id="m1202r" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker></defs>
  <text x="8" y="30" class="lb">1 setup</text>
  <rect class="d" x="115" y="18" width="26" height="16"/><text x="128" y="30" class="lb" text-anchor="middle">d</text>
  <rect class="n" x="163" y="18" width="26" height="16"/><text x="176" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="n" x="211" y="18" width="26" height="16"/><text x="224" y="30" class="lb" text-anchor="middle">2</text>
  <rect class="n" x="259" y="18" width="26" height="16"/><text x="272" y="30" class="lb" text-anchor="middle">3</text>
  <rect class="n" x="307" y="18" width="26" height="16"/><text x="320" y="30" class="lb" text-anchor="middle">4</text>
  <path class="a" d="M 141 26 L 161 26" marker-end="url(#m1202k)"/>
  <path class="a" d="M 189 26 L 209 26" marker-end="url(#m1202k)"/>
  <path class="a" d="M 237 26 L 257 26" marker-end="url(#m1202k)"/>
  <path class="a" d="M 285 26 L 305 26" marker-end="url(#m1202k)"/>
  <text x="128" y="46" class="sm" text-anchor="middle">groupPrev</text>
  <text x="176" y="46" class="sm" text-anchor="middle">cur</text>
  <text x="224" y="46" class="sm" text-anchor="middle">kth</text>
  <text x="272" y="46" class="sm" text-anchor="middle">prev = groupNext</text>
  <text x="352" y="24" class="sm">prev starts at groupNext,</text>
  <text x="352" y="35" class="sm">so the flipped 1 lands on 3</text>
  <text x="8" y="76" class="lb">2 flip</text>
  <rect class="d" x="115" y="64" width="26" height="16"/><text x="128" y="76" class="lb" text-anchor="middle">d</text>
  <rect class="n" x="163" y="64" width="26" height="16"/><text x="176" y="76" class="lb" text-anchor="middle">1</text>
  <rect class="n" x="211" y="64" width="26" height="16"/><text x="224" y="76" class="lb" text-anchor="middle">2</text>
  <rect class="n" x="259" y="64" width="26" height="16"/><text x="272" y="76" class="lb" text-anchor="middle">3</text>
  <rect class="n" x="307" y="64" width="26" height="16"/><text x="320" y="76" class="lb" text-anchor="middle">4</text>
  <path class="a" d="M 141 72 L 161 72" marker-end="url(#m1202k)"/>
  <path class="a" d="M 237 72 L 257 72" marker-end="url(#m1202k)"/>
  <path class="a" d="M 285 72 L 305 72" marker-end="url(#m1202k)"/>
  <path class="r" d="M 180 64 Q 224 52 268 63" marker-end="url(#m1202r)"/>
  <text x="128" y="92" class="sm" text-anchor="middle">groupPrev</text>
  <text x="176" y="92" class="sm" text-anchor="middle">prev</text>
  <text x="224" y="92" class="sm" text-anchor="middle">cur, next</text>
  <text x="352" y="70" class="sm">next = 2; 1.next = prev</text>
  <text x="352" y="81" class="sm">prev = 1; cur = 2</text>
  <text x="8" y="122" class="lb">3 flip</text>
  <rect class="d" x="115" y="110" width="26" height="16"/><text x="128" y="122" class="lb" text-anchor="middle">d</text>
  <rect class="n" x="163" y="110" width="26" height="16"/><text x="176" y="122" class="lb" text-anchor="middle">1</text>
  <rect class="n" x="211" y="110" width="26" height="16"/><text x="224" y="122" class="lb" text-anchor="middle">2</text>
  <rect class="n" x="259" y="110" width="26" height="16"/><text x="272" y="122" class="lb" text-anchor="middle">3</text>
  <rect class="n" x="307" y="110" width="26" height="16"/><text x="320" y="122" class="lb" text-anchor="middle">4</text>
  <path class="a" d="M 141 118 L 161 118" marker-end="url(#m1202k)"/>
  <path class="a" d="M 285 118 L 305 118" marker-end="url(#m1202k)"/>
  <path class="a" d="M 180 110 Q 224 98 268 109" marker-end="url(#m1202k)"/>
  <path class="r" d="M 211 118 L 191 118" marker-end="url(#m1202r)"/>
  <text x="128" y="138" class="sm" text-anchor="middle">groupPrev</text>
  <text x="224" y="138" class="sm" text-anchor="middle">prev</text>
  <text x="272" y="138" class="sm" text-anchor="middle">cur = groupNext</text>
  <text x="352" y="116" class="sm">next = 3; 2.next = 1</text>
  <text x="352" y="127" class="sm">cur reached groupNext: stop</text>
  <text x="8" y="168" class="lb">4 stitch</text>
  <rect class="d" x="115" y="156" width="26" height="16"/><text x="128" y="168" class="lb" text-anchor="middle">d</text>
  <rect class="n" x="163" y="156" width="26" height="16"/><text x="176" y="168" class="lb" text-anchor="middle">2</text>
  <rect class="n" x="211" y="156" width="26" height="16"/><text x="224" y="168" class="lb" text-anchor="middle">1</text>
  <rect class="n" x="259" y="156" width="26" height="16"/><text x="272" y="168" class="lb" text-anchor="middle">3</text>
  <rect class="n" x="307" y="156" width="26" height="16"/><text x="320" y="168" class="lb" text-anchor="middle">4</text>
  <path class="r" d="M 141 164 L 161 164" marker-end="url(#m1202r)"/>
  <path class="a" d="M 189 164 L 209 164" marker-end="url(#m1202k)"/>
  <path class="a" d="M 237 164 L 257 164" marker-end="url(#m1202k)"/>
  <path class="a" d="M 285 164 L 305 164" marker-end="url(#m1202k)"/>
  <text x="176" y="184" class="sm" text-anchor="middle">kth</text>
  <text x="224" y="184" class="sm" text-anchor="middle">groupPrev</text>
  <text x="352" y="162" class="sm">groupPrev.next = kth</text>
  <text x="352" y="173" class="sm">groupPrev = old first; repeat</text>
</svg>
:::
