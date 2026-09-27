## Wrap Around <span class="lv lv2"></span>

- **What:** a circular array is a linear array read twice. Walk `0 .. 2n − 1` and read `a[i % n]`: no copy
- **Spot it:** "circular", "the last element is next to the first", "search circularly". Houses in a circle that cannot both be robbed: split into two cases → Module 06
- **Why:** every circular run starts in `0..n − 1` and has length ≤ n, so it appears once in the doubled view

:::mint
<svg viewBox="0 0 470 108" role="img" aria-label="Circular array 1, 0, 1, 1, 0, 0, 1 has four ones. Reading the array twice with index modulo n, the window of length 4 starting at index 6 wraps to indices 6, 0, 1, 2 and holds 1, 1, 0, 1: three ones. The best window has 3 ones, so one swap groups them." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .gh { fill: #f4f4f4; stroke: #9a9a9a; stroke-width: 1; stroke-dasharray: 3 2; }
    .win { fill: none; stroke: #1d4e89; stroke-width: 2; }
  </style>
  <text x="14" y="27" class="sm">a</text>
  <rect class="bx" x="30" y="12" width="26" height="22"/><text x="43" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="56" y="12" width="26" height="22"/><text x="69" y="27" class="lb" text-anchor="middle">0</text>
  <rect class="bx" x="82" y="12" width="26" height="22"/><text x="95" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="108" y="12" width="26" height="22"/><text x="121" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="134" y="12" width="26" height="22"/><text x="147" y="27" class="lb" text-anchor="middle">0</text>
  <rect class="bx" x="160" y="12" width="26" height="22"/><text x="173" y="27" class="lb" text-anchor="middle">0</text>
  <rect class="bx" x="186" y="12" width="26" height="22"/><text x="199" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="gh" x="212" y="12" width="26" height="22"/><text x="225" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="gh" x="238" y="12" width="26" height="22"/><text x="251" y="27" class="lb" text-anchor="middle">0</text>
  <rect class="gh" x="264" y="12" width="26" height="22"/><text x="277" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="gh" x="290" y="12" width="26" height="22"/><text x="303" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="win" x="186" y="10" width="104" height="26"/>
  <text x="199" y="50" class="sm" text-anchor="middle">6</text><text x="225" y="50" class="sm" text-anchor="middle">7%7=0</text><text x="251" y="50" class="sm" text-anchor="middle">1</text><text x="277" y="50" class="sm" text-anchor="middle">2</text>
  <text x="212" y="64" class="sm">never allocated: read a[i % n]</text>
  <text x="30" y="86" class="lb">ones = 4 → window length 4 → best window holds 3 ones</text>
  <text x="30" y="102" class="lb" fill="#1d4e89">swaps = ones − best = 1</text>
</svg>
:::

```ts
// Minimum Swaps to Group All 1's Together II (LeetCode 2134)
function minSwaps(nums: number[]): number {
  const n = nums.length;
  const ones = nums.reduce((a, b) => a + b, 0);
  if (ones === 0) return 0;
  let inWindow = 0, best = 0;
  // every start 0..n−1 gets a full window
  for (let i = 0; i < n + ones - 1; i++) {
    inWindow += nums[i % n];
    if (i >= ones) inWindow -= nums[(i - ones) % n];
    if (i >= ones - 1) best = Math.max(best, inWindow);
  }
  // zeros inside the best window
  return ones - best;
}
```

- **Watch out:** for windows of length L, stop at `n + L − 1`. Running 2n steps counts each wrapped window twice: harmless for a max, wrong for a count
- **Also solves:** [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) (LeetCode 503) (monotonic stack; push only in the first lap) · [Defuse the Bomb](https://leetcode.com/problems/defuse-the-bomb/) (LeetCode 1652) · [Check if Array Is Sorted and Rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/) (LeetCode 1752) (at most one descent, counted circularly)
