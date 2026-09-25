## Throw Out the Dominated <span class="lv lv2"></span>

- **What it is:** A candidate is **dominated** when another candidate is at least as good in every way that can ever matter. It can never become the answer, so delete it the moment you can prove it. What survives is short and ordered, and the answer is read off the survivors
- **Signal:** "catches up / blocks / hides behind", "visible", "fleet", "weak characters", "nested envelopes", a pair of scores where one item can beat another on both
- **Why it works:** Deletion is permanent, so every candidate is inserted once and removed at most once: O(n) after sorting. Monotonic stacks (10-05), monotonic deques (10-10) and Pareto frontiers are all this one move with different proofs of domination

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Car Fleet with target 12. Cars at positions 10, 8, 5, 3 and 0 need 1, 1, 7, 3 and 12 hours to arrive. Scanning from the car closest to the target: the car at 10 leads a fleet arriving at hour 1; the car at 8 would arrive at 1 as well, so it is absorbed; the car at 5 needs 7, a new fleet; the car at 3 needs 3, less than 7, absorbed; the car at 0 needs 12, a new fleet. Three fleets." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .lead { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .gone { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
    .road { stroke: #1a1a1a; stroke-width: 1.2; }
  </style>
  <defs><marker id="m1806" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ef476e"/></marker></defs>
  <line class="road" x1="20" y1="70" x2="440" y2="70"/>
  <line x1="440" y1="56" x2="440" y2="84" stroke="#1a1a1a" stroke-width="2"/><text x="440" y="96" class="sm" text-anchor="middle">target 12</text>
  <rect class="lead" x="12" y="58" width="22" height="16" rx="3"/><text x="23" y="70" class="lb" text-anchor="middle">0</text><text x="23" y="50" class="lb" text-anchor="middle">12 h</text>
  <rect class="gone" x="117" y="58" width="22" height="16" rx="3"/><text x="128" y="70" class="lb" text-anchor="middle">3</text><text x="128" y="50" class="lb" text-anchor="middle">3 h</text>
  <rect class="lead" x="187" y="58" width="22" height="16" rx="3"/><text x="198" y="70" class="lb" text-anchor="middle">5</text><text x="198" y="50" class="lb" text-anchor="middle">7 h</text>
  <rect class="gone" x="292" y="58" width="22" height="16" rx="3"/><text x="303" y="70" class="lb" text-anchor="middle">8</text><text x="303" y="50" class="lb" text-anchor="middle">1 h</text>
  <rect class="lead" x="362" y="58" width="22" height="16" rx="3"/><text x="373" y="70" class="lb" text-anchor="middle">10</text><text x="373" y="50" class="lb" text-anchor="middle">1 h</text>
  <path d="M140 80 C 160 96, 176 96, 192 80" fill="none" stroke="#ef476e" stroke-width="1.1" marker-end="url(#m1806)"/>
  <path d="M315 80 C 335 96, 350 96, 366 80" fill="none" stroke="#ef476e" stroke-width="1.1" marker-end="url(#m1806)"/>
  <text x="20" y="20" class="lb">scan from the target backwards; keep the slowest arrival ahead</text>
  <text x="20" y="116" class="sm">green: leads a fleet (slower than everything ahead) · red: faster than the fleet ahead, so it catches up and is absorbed</text>
  <text x="20" y="130" class="lb">fleets = 3</text>
</svg>
:::

```ts
// Car Fleet (LeetCode 853)
function carFleet(target: number, pos: number[], speed: number[]) {
  const cars = pos.map((p, i) => [p, (target - p) / speed[i]]);
  // closest to target first
  cars.sort((a, b) => b[0] - a[0]);
  // arrival of fleet ahead
  let fleets = 0, slowest = 0;
  for (const [, time] of cars) {
    if (time > slowest) { fleets++; slowest = time; }  // new leader
    // otherwise it catches the fleet ahead: dominated, absorbed
  }
  return fleets;
}
```
