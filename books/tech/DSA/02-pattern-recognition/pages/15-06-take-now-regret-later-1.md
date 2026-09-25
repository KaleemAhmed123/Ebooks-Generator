## Take Now, Regret Later <span class="lv lv2"></span>

- **What it is:** A greedy that is allowed to change its mind. Tentatively accept every option you pass and push it onto a heap. When a constraint breaks (fuel runs out, a deadline is missed, bricks run out), undo the *worst* accepted choice, which is the heap's top. Each item enters and leaves the heap at most once
- **Signal:** "minimum number of refuelling stops", "maximum number of courses before their deadlines", "furthest building reachable with bricks and ladders", "maximum performance of a team of at most k", decisions whose value is only clear later
- **Why it works:** Deciding at each station whether to stop requires knowing the future. But the choice can be made *retroactively*: if you run dry, you would have wanted to stop at the best station you already passed. The heap holds exactly those passed options, so "regret" costs O(log n) and is always the locally best correction

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Minimum refuelling stops with target 100, start fuel 10, stations at 10 with 60 fuel, 20 with 30, 30 with 30, 60 with 40. Drive to 10, remember 60. Cannot reach 20 without fuel beyond 10, so refuel retroactively with the best passed, 60: reach 70. Pass 20, 30 and 60, remembering 30, 30, 40. Short of 100: take 40, reach 110. Two stops." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .st { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .ax { stroke: #1a1a1a; stroke-width: 1.2; }
  </style>
  <line class="ax" x1="20" y1="40" x2="420" y2="40"/>
  <circle cx="20" cy="40" r="4" fill="#1a1a1a"/><text x="14" y="30" class="sm">0</text>
  <rect class="st" x="54" y="32" width="12" height="16"/><text x="60" y="62" class="sm" text-anchor="middle">10:+60</text>
  <rect class="st" x="94" y="32" width="12" height="16"/><text x="100" y="74" class="sm" text-anchor="middle">20:+30</text>
  <rect class="st" x="134" y="32" width="12" height="16"/><text x="140" y="62" class="sm" text-anchor="middle">30:+30</text>
  <rect class="st" x="254" y="32" width="12" height="16"/><text x="260" y="62" class="sm" text-anchor="middle">60:+40</text>
  <circle cx="420" cy="40" r="4" fill="#2d6a4f"/><text x="408" y="30" class="sm">100</text>
  <text x="20" y="92" class="lb">reach 10 → stuck before 20 → pop 60 → reach 70</text>
  <text x="20" y="106" class="lb">pass 20, 30, 60 → short of 100 → pop 40 → reach 110 ✓  stops: 2</text>
</svg>
:::
