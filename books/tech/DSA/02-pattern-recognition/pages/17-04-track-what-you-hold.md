## Track What You Hold <span class="lv lv2"></span>

- **What it is:** A **state machine DP**: the state is not "which index" but "what you are carrying" — a share or nothing, and how many trades are used. Each day, every state either stays or moves along one edge (buy, sell). Module 06 (01-03) shows how to invent the status variable; this page is the machine it produces
- **Signal:** buy/sell, "at most k transactions", "cooldown", "transaction fee", "you cannot hold more than one"
- **Why it works:** The past matters only through the current status. Two numbers per trade count (best cash while holding, best cash while free) summarise every history, so one pass over the prices is enough

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Stock state machine. Two states per transaction count: FREE j minus 1 and HOLD j and FREE j. Buying moves from FREE j minus 1 to HOLD j and pays the price. Selling moves from HOLD j to FREE j and earns the price. Each state also loops to itself on a day with no trade." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .free { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .hold { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
  </style>
  <defs><marker id="m1704" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <ellipse class="free" cx="70" cy="60" rx="52" ry="20"/><text x="70" y="64" class="lb" text-anchor="middle">free[j−1]</text>
  <ellipse class="hold" cx="235" cy="60" rx="52" ry="20"/><text x="235" y="64" class="lb" text-anchor="middle">hold[j]</text>
  <ellipse class="free" cx="400" cy="60" rx="52" ry="20"/><text x="400" y="64" class="lb" text-anchor="middle">free[j]</text>
  <line x1="122" y1="60" x2="181" y2="60" stroke="#1a1a1a" stroke-width="1.1" marker-end="url(#m1704)"/>
  <text x="152" y="52" class="sm" text-anchor="middle">buy: − p</text>
  <line x1="287" y1="60" x2="346" y2="60" stroke="#1a1a1a" stroke-width="1.1" marker-end="url(#m1704)"/>
  <text x="317" y="52" class="sm" text-anchor="middle">sell: + p</text>
  <path d="M220 41 C 212 12, 258 12, 250 41" fill="none" stroke="#6b6b6b" stroke-width="1" marker-end="url(#m1704)"/>
  <path d="M385 41 C 377 12, 423 12, 415 41" fill="none" stroke="#6b6b6b" stroke-width="1" marker-end="url(#m1704)"/>
  <text x="235" y="12" class="sm" text-anchor="middle">rest</text><text x="400" y="12" class="sm" text-anchor="middle">rest</text>
  <text x="20" y="104" class="sm">one day = every state takes its best incoming edge; the answer is free[k]</text>
</svg>
:::

```ts
// Buy and Sell Stock IV (LeetCode 188): at most k trades
function maxProfit(k: number, prices: number[]): number {
  const hold = new Array(k + 1).fill(-Infinity);  // cash, holding
  // cash, j sells done
  const free = new Array(k + 1).fill(0);
  for (const p of prices)
    for (let j = 1; j <= k; j++) {
      hold[j] = Math.max(hold[j], free[j - 1] - p);
      free[j] = Math.max(free[j], hold[j] + p);
    }
  return free[k];
}
```

### Variations

- **Best Time to Buy and Sell Stock (LeetCode 121):** k = 1; the machine collapses to "lowest price so far"
- **Best Time to Buy and Sell Stock III (LeetCode 123) / at most twice (GFG):** k = 2 in the template
- **Best Time to Buy and Sell Stock II (LeetCode 122):** unlimited trades; one `hold` and one `free` scalar, or sum every rise
- **With Cooldown (LeetCode 309):** a third state, "just sold", that can only rest into `free`. Update from yesterday's values, not today's
- **With Transaction Fee (LeetCode 714):** subtract the fee on the sell edge
- **k ≥ n / 2:** at most ⌊n / 2⌋ trades are possible, so the limit stops binding; treat it as LeetCode 122 and skip the O(n · k) table

### The failure

- **Taking the k largest rising runs.** On `[1, 5, 3, 8]` with k = 1, the largest run is 3 → 8 for 5; one trade from 1 to 8 earns 7. Runs can merge across a dip; the machine keeps that option open
- **Summing every rise when k is limited.** On `[1, 2, 1, 2, 1, 2]` summing rises gives 3; with k = 2 the answer is 2

:::interview
"How do you handle at most k transactions?" — Two arrays indexed by trades used: best cash while holding a share and while free. Each price updates `hold[j]` from `free[j − 1] − p` and `free[j]` from `hold[j] + p`. O(n · k) time, O(k) space; if k ≥ n / 2 the limit never binds and I use the unlimited version.
:::
