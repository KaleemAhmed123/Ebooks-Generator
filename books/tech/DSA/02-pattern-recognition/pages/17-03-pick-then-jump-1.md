## Pick, Then Jump 🟡

- **What it is:** Pick/skip over items sorted by start time, where picking an item makes the next few items illegal. Skip moves to `k + 1`. Pick **jumps** past every item that clashes, to the first one that starts after this one ends, found by binary search
- **Signal:** weighted intervals, "non-overlapping", "maximum profit / value", "choose jobs, events, rides", and n up to 10⁴–10⁵, so the O(n²) "try every earlier job" is too slow
- **Why it works:** After sorting by start, the items compatible with a pick form a **suffix**. So the state is one index: `dp[k]` = best value using items k … n − 1. The suffix begins at a position binary search can find, so each state costs O(log n)

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Five jobs sorted by start on a timeline. From job k the skip arrow goes to job k plus 1. The pick arrow goes from job k past the jobs that start before k ends, to the first job whose start is at or after k's end, found by binary search." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .job { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .cur { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .dead { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; }
  </style>
  <defs><marker id="m1703" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <line x1="20" y1="104" x2="450" y2="104" stroke="#6b6b6b" stroke-width="0.8"/>
  <text x="20" y="118" class="sm">time →</text>
  <rect class="cur" x="30" y="14" width="150" height="14"/><text x="36" y="25" class="lb">k: profit p</text>
  <rect class="dead" x="80" y="34" width="90" height="14"/><text x="86" y="45" class="lb">k+1</text>
  <rect class="dead" x="120" y="54" width="140" height="14"/><text x="126" y="65" class="lb">k+2</text>
  <rect class="job" x="180" y="74" width="110" height="14"/><text x="186" y="85" class="lb">first start ≥ end</text>
  <rect class="job" x="300" y="34" width="120" height="14"/><text x="306" y="45" class="lb">…</text>
  <line x1="180" y1="10" x2="180" y2="100" stroke="#1a1a1a" stroke-width="0.8" stroke-dasharray="3 3"/>
  <path d="M30 21 C 8 30, 20 50, 78 41" fill="none" stroke="#6b6b6b" stroke-width="1" marker-end="url(#m1703)"/>
  <path d="M180 21 C 205 30, 200 60, 200 72" fill="none" stroke="#2d6a4f" stroke-width="1.3" marker-end="url(#m1703)"/>
  <text x="300" y="80" class="sm">skip: dp[k + 1]</text>
  <text x="300" y="94" class="sm">pick: p + dp[lowerBound(end)]</text>
</svg>
:::

```ts
// Maximum Profit in Job Scheduling (LeetCode 1235)
function jobScheduling(st: number[], en: number[], pr: number[]) {
  const n = st.length;
  const ord = st.map((_, i) => i).sort((a, b) => st[a] - st[b]);
  const s = ord.map(i => st[i]);
  const firstFrom = (t: number) => {  // first job with start >= t
    let lo = 0, hi = n;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (s[m] < t) lo = m + 1; else hi = m;
    }
    return lo;
  };
  const dp = new Array(n + 1).fill(0);  // dp[k]: best from k on
  for (let k = n - 1; k >= 0; k--) {
    const i = ord[k];
    dp[k] = Math.max(dp[k + 1], pr[i] + dp[firstFrom(en[i])]);
  }
  return dp[0];
}
```
