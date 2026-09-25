## Sweep Line <span class="lv lv1"></span>

- **What it is:** Turn every interval into two events, `+1` at its start and `−1` at its end, sort the events by time, and walk them with a running count. The count at any moment is how many intervals are open
- **Signal:** "how many overlap at once", "maximum CPU load", "minimum meeting rooms / platforms", "skyline", "busiest time"
- **Why it works:** Overlap only changes at an endpoint. Between two consecutive events the set of open intervals is fixed, so 2n events describe every moment, and the answer is read in one pass after an O(n log n) sort instead of comparing all O(n²) pairs

:::mint
<svg viewBox="0 0 470 142" role="img" aria-label="Intervals A from 1 to 5, B from 2 to 4 and C from 6 to 8 on a timeline. Events: plus 1 at times 1, 2 and 6, minus 1 at times 4, 5 and 8. The running count goes 1, 2, 1, 0, 1, 0; its peak of 2 lies between times 2 and 4, when A and B overlap." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .iv { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .up { font: bold 9px Consolas, monospace; fill: #2d6a4f; }
    .dn { font: bold 9px Consolas, monospace; fill: #ef476e; }
  </style>
    <rect class="iv" x="84" y="14" width="176" height="11" rx="3"/><text x="88" y="23" class="lb">A [1, 5]</text>
  <rect class="iv" x="128" y="30" width="88" height="11" rx="3"/><text x="132" y="39" class="lb">B [2, 4]</text>
  <rect class="iv" x="304" y="14" width="88" height="11" rx="3"/><text x="308" y="23" class="lb">C [6, 8]</text>
  <line x1="30" y1="62" x2="436" y2="62" stroke="#1a1a1a" stroke-width="1"/>
  <line x1="84" y1="59" x2="84" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="84" y="74" class="sm" text-anchor="middle">1</text>
  <line x1="128" y1="59" x2="128" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="128" y="74" class="sm" text-anchor="middle">2</text>
  <line x1="172" y1="59" x2="172" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="172" y="74" class="sm" text-anchor="middle">3</text>
  <line x1="216" y1="59" x2="216" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="216" y="74" class="sm" text-anchor="middle">4</text>
  <line x1="260" y1="59" x2="260" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="260" y="74" class="sm" text-anchor="middle">5</text>
  <line x1="304" y1="59" x2="304" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="304" y="74" class="sm" text-anchor="middle">6</text>
  <line x1="348" y1="59" x2="348" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="348" y="74" class="sm" text-anchor="middle">7</text>
  <line x1="392" y1="59" x2="392" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="392" y="74" class="sm" text-anchor="middle">8</text>
  <text x="84" y="88" class="up" text-anchor="middle">+1</text>
  <text x="128" y="88" class="up" text-anchor="middle">+1</text>
  <text x="216" y="88" class="dn" text-anchor="middle">−1</text>
  <text x="260" y="88" class="dn" text-anchor="middle">−1</text>
  <text x="304" y="88" class="up" text-anchor="middle">+1</text>
  <text x="392" y="88" class="dn" text-anchor="middle">−1</text>
  <path d="M53.2 128 L84 128 L84 116 L128 116 L128 104 L216 104 L216 116 L260 116 L260 128 L304 128 L304 116 L392 116 L392 128 L436 128 L436 128" fill="none" stroke="#1d4e89" stroke-width="1.6"/>
  <line x1="30" y1="128" x2="436" y2="128" stroke="#c9c9c9" stroke-width="0.8"/>
  <rect x="128" y="104" width="88" height="24" fill="#e2fcf3" stroke="none" opacity="0.8"/>
  <text x="172" y="100" class="lb" text-anchor="middle">peak 2</text>
  <text x="40" y="138" class="sm">running count = intervals open at that moment</text>
  <text x="40" y="100" class="sm">sort the 6 events by time, add them as you sweep</text>
</svg>
:::

### Variations

- **Template and the end-before-start tie rule:** Module 04 (03-05)
- **Meeting Rooms II (LeetCode 253) / Minimum Platforms (GFG):** the peak of the running count is the answer
- **Bounded positions (Car Pooling):** a difference array replaces the sort (03-07)
- **The Skyline Problem (LeetCode 218):** the events carry heights; keep active heights in a max-heap with lazy deletion and emit a point whenever the top changes
- **My Calendar III (LeetCode 732):** events arrive online; a sorted map of `+1/−1` counts, swept after each booking
