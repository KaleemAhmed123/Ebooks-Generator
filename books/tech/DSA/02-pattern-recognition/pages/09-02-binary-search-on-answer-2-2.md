### Minimise or maximise

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Two axes of X. Minimise: the checks read F F F T T T; the answer is the first T; the loop uses mid rounded down, hi equals mid on T, lo equals mid plus 1 on F. Maximise: the checks read T T T F F F; the answer is the last T; the loop uses mid rounded up, lo equals mid on T, hi equals mid minus 1 on F." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .hd { font: bold 9.5px Georgia, serif; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .f { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; }
    .t { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
    .ans { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 2.2; }
    .ax { stroke: #9a9a9a; stroke-width: 1; }
  </style>
  <text x="10" y="14" class="hd">Minimise</text><text x="80" y="14" class="sm">first T</text>
  <line class="ax" x1="10" y1="46" x2="214" y2="46"/><text x="218" y="49" class="sm">X</text>
  <rect class="f" x="12" y="22" width="30" height="18" rx="2"/><text x="27" y="35" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <rect class="f" x="46" y="22" width="30" height="18" rx="2"/><text x="61" y="35" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <rect class="f" x="80" y="22" width="30" height="18" rx="2"/><text x="95" y="35" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <rect class="ans" x="114" y="22" width="30" height="18" rx="2"/><text x="129" y="35" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <rect class="t" x="148" y="22" width="30" height="18" rx="2"/><text x="163" y="35" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <rect class="t" x="182" y="22" width="30" height="18" rx="2"/><text x="197" y="35" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="129" y="58" class="sm" text-anchor="middle">answer</text>
  <text x="10" y="76" class="lb">mid = (lo + hi) &gt;&gt; 1</text>
  <text x="10" y="90" class="lb">T: hi = mid</text>
  <text x="10" y="104" class="lb">F: lo = mid + 1</text>
  <text x="10" y="118" class="sm">e.g. least capacity, speed</text>
  <text x="250" y="14" class="hd">Maximise</text><text x="320" y="14" class="sm">last T</text>
  <line class="ax" x1="250" y1="46" x2="454" y2="46"/><text x="458" y="49" class="sm">X</text>
  <rect class="t" x="252" y="22" width="30" height="18" rx="2"/><text x="267" y="35" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <rect class="t" x="286" y="22" width="30" height="18" rx="2"/><text x="301" y="35" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <rect class="ans" x="320" y="22" width="30" height="18" rx="2"/><text x="335" y="35" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <rect class="f" x="354" y="22" width="30" height="18" rx="2"/><text x="369" y="35" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <rect class="f" x="388" y="22" width="30" height="18" rx="2"/><text x="403" y="35" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <rect class="f" x="422" y="22" width="30" height="18" rx="2"/><text x="437" y="35" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="335" y="58" class="sm" text-anchor="middle">answer</text>
  <text x="250" y="76" class="lb">mid = (lo + hi + 1) &gt;&gt; 1</text>
  <text x="250" y="90" class="lb">T: lo = mid</text>
  <text x="250" y="104" class="lb">F: hi = mid - 1</text>
  <text x="250" y="118" class="sm">e.g. largest minimum gap</text>
</svg>
:::

- Both loops run while `lo < hi` and stop with `lo === hi` on the answer. The `+ 1` in the maximise midpoint is what makes `lo = mid` progress: without it, `lo = 4, hi = 5` probes 4 forever

### The failure

- **Starting `lo` at 1 for shipping.** A capacity below the heaviest package can never fit it; the greedy check still puts the oversized package on a day of its own, so `[5, 1]` looks shippable in 3 days at capacity 3. Start at `max(weights)`, end at the total
- **A checker that is not monotonic.** If `feasible(x)` can be true, then false, then true again, the search returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" before writing the loop

:::interview
"How do you spot binary search on the answer?" — The answer is a number in a known range, checking one candidate is easy even though computing the optimum is not, and the check is monotone: if X works, every larger X works (or every smaller one). Min-max and max-min problems are the usual case. The cost is O(n log R): one linear check per halving of the range R.
:::
