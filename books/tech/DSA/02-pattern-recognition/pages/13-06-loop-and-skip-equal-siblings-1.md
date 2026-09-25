## Loop and Skip Equal Siblings 🟡

- **What it is:** When the input has duplicates and the output must not, switch from pick-or-skip to the *loop template*: at each level, loop over the candidates for the **next** slot, starting from `start`, and skip a candidate equal to the one before it **at the same level**. Sort first so equal values sit together
- **Signal:** "combinations may not repeat", "the input contains duplicates", "Subsets II", "Combination Sum II", "each number may be used once"
- **Why it works:** Two siblings with the same value start subtrees that produce the same results, so only the first may run. A *child*, however, may repeat its parent's value: that is how `[1, 1, 6]` is built. `i > start` separates "sibling" (same level, skip) from "first choice at this level" (allowed)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Combination Sum II on sorted candidates 1, 1, 2, 5, 6, 7, 10 with target 8. At the root level the first 1 is explored and the second 1 is skipped because it is an equal sibling. Under the first 1, the second 1 is allowed as a child, giving 1, 1, 6. Results: 1 1 6, 1 2 5, 1 7, 2 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .x { stroke: #ef476e; stroke-width: 1; stroke-dasharray: 3 2; }
    .no { fill: #ef476e; }
  </style>
  <text x="160" y="14" class="lb" text-anchor="middle">start = 0</text>
  <line class="e" x1="150" y1="18" x2="70" y2="40"/><line class="x" x1="160" y1="18" x2="150" y2="40"/><line class="e" x1="170" y1="18" x2="240" y2="40"/>
  <text x="66" y="50" class="lb" text-anchor="middle">1</text>
  <text x="150" y="50" class="lb no" text-anchor="middle">1 ✗</text>
  <text x="244" y="50" class="lb" text-anchor="middle">2 …</text>
  <text x="150" y="62" class="sm" text-anchor="middle">equal sibling</text>
  <line class="e" x1="62" y1="54" x2="30" y2="78"/><line class="e" x1="70" y1="54" x2="96" y2="78"/>
  <text x="26" y="88" class="lb" text-anchor="middle">1</text><text x="100" y="88" class="lb" text-anchor="middle">2 …</text>
  <text x="26" y="100" class="sm" text-anchor="middle">child: allowed</text>
  <text x="26" y="112" class="lb" text-anchor="middle">→ 1 1 6</text>
  <text x="300" y="30" class="lb">skip when</text>
  <text x="300" y="46" class="lb">i &gt; start &amp;&amp;</text>
  <text x="300" y="62" class="lb">c[i] === c[i − 1]</text>
  <text x="300" y="90" class="sm">results: 1 1 6 · 1 2 5 · 1 7 · 2 6</text>
</svg>
:::
