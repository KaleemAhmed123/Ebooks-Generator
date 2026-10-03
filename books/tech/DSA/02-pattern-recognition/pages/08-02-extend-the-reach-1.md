## Extend the Reach <span class="lv lv1"></span>

- **What:** for fewest steps to cover a line, track `end` (the edge reached so far) and `far` (the best reach with one more jump). When `i` hits `end`, a jump to `far` is forced
- **Spot it:** fewest jumps, taps or clips to cover 0..n, where each position reaches *anywhere* in a stretch ahead. A jump lands on exactly `i ± a[i]` → BFS over indices, 16-01
- **Why:** it is BFS by levels on a line: all indices reachable in k jumps form one range, and the next level is `(end, far]`. Extending a range involves no choice, so none can be wrong

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Jump Game II on 2, 3, 1, 1, 4. Level 0 is index 0 with reach 2. Level 1 covers indices 1 and 2; from them the farthest reach is index 4. Level 2 contains index 4, the end. Two jumps." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .L0 { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .L1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .L2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <rect class="L0" x="40" y="20" width="40" height="26"/><text x="60" y="37" class="lb" text-anchor="middle">2</text>
  <rect class="L1" x="80" y="20" width="40" height="26"/><text x="100" y="37" class="lb" text-anchor="middle">3</text>
  <rect class="L1" x="120" y="20" width="40" height="26"/><text x="140" y="37" class="lb" text-anchor="middle">1</text>
  <rect class="L2" x="160" y="20" width="40" height="26"/><text x="180" y="37" class="lb" text-anchor="middle">1</text>
  <rect class="L2" x="200" y="20" width="40" height="26"/><text x="220" y="37" class="lb" text-anchor="middle">4</text>
  <text x="60" y="62" class="sm" text-anchor="middle">level 0</text>
  <text x="120" y="62" class="sm" text-anchor="middle">level 1: (0, 2]</text>
  <text x="200" y="62" class="sm" text-anchor="middle">level 2: (2, 4]</text>
  <text x="40" y="86" class="lb">i = 0: far = 2, i == end → jump 1, end = 2</text>
  <text x="40" y="100" class="lb">i = 1..2: far = 4,  i == end → jump 2, end = 4 ≥ last</text>
  <text x="280" y="30" class="sm">each level is a contiguous range</text>
  <text x="280" y="44" class="sm">greedy extends the range,</text>
  <text x="280" y="56" class="sm">it never picks a square</text>
</svg>
:::

```ts
// Jump Game II (LeetCode 45); the end is guaranteed reachable
function jump(nums: number[]): number {
  let jumps = 0, end = 0, far = 0;
  // never jump *from* the last index
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    // current level exhausted
    if (i === end) {
      jumps++;
      end = far;
    }
  }
  return jumps;
}
```

- **Watch out:** stop before the last index, or a level ending there adds a jump from the destination. Without a reachability promise, `[1, 0, 2]` sticks at `end = far = 1`: return −1 when a forced jump makes no progress
