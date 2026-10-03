## Keep a Set of What You've Seen <span class="lv lv1"></span>

- **What:** carry a hash set or map of everything visited and ask it O(1) questions as you scan: *is the complement here* (`target − x`), *have I seen this exact key*, *what is attached to this key*. The running state is membership, not a sum
- **Spot it:** "two numbers that sum to target" (unsorted), "longest run of consecutive numbers", "first duplicate", "group by some key". A running *sum* with a hashmap → 03-03; a *sorted* input lets two pointers replace the set → 02-08
- **Why:** a hash set answers "is x present" in O(1) average, turning an O(n²) pair-or-lookup search into one O(n) pass. The set *is* the memory — nothing else about order is needed

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Longest Consecutive Sequence over the set 100, 4, 200, 1, 3, 2. Only a value whose predecessor is absent starts a run: 1 has no 0, so count up 1, 2, 3, 4 for length 4. 100 has no 99, length 1. 200 has no 199, length 1. The 4, 3, 2 are not starts because their predecessors are in the set, so each run is counted once." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .in { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .start { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.5; }
    .run { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
  </style>
  <text x="10" y="26" class="sm">set</text>
  <rect class="in" x="40" y="14" width="46" height="22"/><text x="63" y="29" class="lb" text-anchor="middle">100</text>
  <rect class="run" x="86" y="14" width="40" height="22"/><text x="106" y="29" class="lb" text-anchor="middle">4</text>
  <rect class="in" x="126" y="14" width="46" height="22"/><text x="149" y="29" class="lb" text-anchor="middle">200</text>
  <rect class="start" x="172" y="14" width="40" height="22"/><text x="192" y="29" class="lb" text-anchor="middle">1</text>
  <rect class="run" x="212" y="14" width="40" height="22"/><text x="232" y="29" class="lb" text-anchor="middle">3</text>
  <rect class="run" x="252" y="14" width="40" height="22"/><text x="272" y="29" class="lb" text-anchor="middle">2</text>
  <text x="40" y="66" class="sm">start? only if value−1 is absent</text>
  <text x="40" y="88" class="lb">1 is a start (no 0) → walk 1,2,3,4 → length 4</text>
  <text x="40" y="106" class="lb">100 (no 99) → 1    200 (no 199) → 1</text>
  <text x="40" y="126" class="sm">4, 3, 2 are skipped as starts → each run counted once → O(n)</text>
</svg>
:::

```ts
// Longest Consecutive Sequence (LeetCode 128): O(n), no sorting.
function longestConsecutive(nums: number[]): number {
  const seen = new Set(nums);
  let best = 0;
  for (const x of seen) {
    if (seen.has(x - 1)) continue;          // not a run start — skip
    let len = 1;
    while (seen.has(x + len)) len++;         // walk the run upward
    best = Math.max(best, len);
  }
  return best;
}
// Two Sum (LeetCode 1): map value→index; for each x, look up target − x already seen.
```

- **Watch out:** the "only start from a run's smallest" guard is what keeps Longest Consecutive at O(n) — without it, each run is re-walked from every member, back to O(n²). Iterate the **set**, not the raw array, so duplicates don't trigger repeated walks
