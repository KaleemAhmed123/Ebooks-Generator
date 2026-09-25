## Extend the Reach <span class="lv lv2"></span>

- **What it is:** For "minimum steps to cover a line", do not decide *where* to land. Track two numbers: the end of the range reachable with the jumps used so far (`end`), and the farthest point reachable with one more jump (`far`). When `i` reaches `end`, a jump is forced, and it goes to `far`
- **Signal:** "minimum number of jumps to reach the end", "minimum taps to water the whole garden", "minimum clips to cover [0, time]", "can you reach the last index"
- **Why it works:** It is BFS by levels on a line. All indices reachable in k jumps form one contiguous range, and the next level is `(end, far]`. Greedy never picks a landing square; it only extends the range, so no choice can be wrong. Module 04's wrong approach, "jump to the farthest square", fails precisely because it picks a square

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

### Variations

- **Jump Game (LeetCode 55):** only `far` is needed. If `i > far` at any point, index `i` is unreachable; return false
- **Minimum Number of Taps to Open to Water a Garden (LeetCode 1326):** tap `i` covers `[i − r, i + r]`. Convert to `reach[left] = max(reach[left], right)` for each tap, then run the level loop over `reach`; if `far` stops growing before `n`, return −1
- **Video Stitching (LeetCode 1024):** clips are intervals over `[0, time]`; the same reach conversion, the same loop
- **Minimum number of jumps (GFG):** Jump Game II without the reachability promise. Return −1 when `i === end` and `far === end` (no progress possible)

### The failure

- **Looping to the last index.** Running `i` up to `n − 1` counts one extra jump whenever `end` lands exactly on the last index, because the loop then "jumps" from the destination
- **Missing the stuck case.** Without the guarantee, `[1, 0, 2]` sets `end = far = 1` and never grows. Check for `far === end` at a forced jump, or the loop reports a jump count for an unreachable end

:::interview
"Why is greedy optimal for Jump Game II?" — It is breadth-first search where every level is an interval. After k jumps the reachable set is `[0, end]`, and the next set is `[0, far]`, where `far` is the best reach from anything in the current level. Greedy computes exactly those levels, so the first level containing the last index is the minimum. O(n) time, O(1) space.
:::
