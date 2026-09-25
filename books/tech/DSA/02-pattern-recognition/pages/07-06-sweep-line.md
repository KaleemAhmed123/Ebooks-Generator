## Sweep Line <span class="lv lv1"></span>

- **What it is:** Turn every interval into two events, `+1` at its start and `−1` at its end, sort the events by time, and walk them with a running count. The count at any moment is how many intervals are open
- **Signal:** "how many overlap at once", "maximum CPU load", "minimum meeting rooms / platforms", "skyline", "busiest time"
- **Why it works:** Overlap only changes at an endpoint. Between two consecutive events the set of open intervals is fixed, so 2n events describe every moment, and the answer is read in one pass after an O(n log n) sort instead of comparing all O(n²) pairs

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Sweep line processing events chronologically. The running sum tracks the exact number of overlapping intervals at any given moment." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <path class="a" d="M 40 40 L 420 40" />
  
  <text x="80" y="30" class="lb">+1</text>
  <text x="140" y="30" class="lb">+1</text>
  <text x="260" y="30" class="lb">-1</text>
  <text x="320" y="30" class="lb">-1</text>
  
  <text x="80" y="55" class="sm">T=1</text>
  <text x="140" y="55" class="sm">T=2</text>
  <text x="260" y="55" class="sm">T=4</text>
  <text x="320" y="55" class="sm">T=5</text>
  
  <path class="hot" d="M 40 80 L 420 80" />
  <text x="40" y="75" class="sm" fill="#ef476e">Active count (overlap)</text>

  <text x="80" y="95" class="lb">1</text>
  <text x="140" y="95" class="lb">2 (Max)</text>
  <text x="260" y="95" class="lb">1</text>
  <text x="320" y="95" class="lb">0</text>
  
  <!-- Sweeping line -->
  <path class="a" d="M 140 10 L 140 120" marker-end="url(#arrow)" stroke-dasharray="2 2" />
</svg>
:::

### Variations

- **Template and the end-before-start tie rule:** Module 04 (03-05)
- **Meeting Rooms II (LeetCode 253) / Minimum Platforms (GFG):** the peak of the running count is the answer
- **Car Pooling (LeetCode 1094):** events at bounded positions, so a difference array (03-07) replaces the sort
- **The Skyline Problem (LeetCode 218):** the events carry heights; keep active heights in a max-heap with lazy deletion and emit a point whenever the top changes
- **My Calendar III (LeetCode 732):** events arrive online; a sorted map of `+1/−1` counts, swept after each booking

### The failure

- **Ignoring the tie rule.** `[1, 3]` and `[3, 5]` overlap in one statement and not in another. When they do not, process ends before starts at equal times, or the peak is one too high (Module 04, 03-05)

:::interview
"When is a sweep better than merging intervals?" — When the question is about *how many* intervals overlap at a point, not about their union. Merging (07-07) answers "which ranges are covered"; the sweep answers "how deep is the overlap". Both sort, so both are O(n log n).
:::
