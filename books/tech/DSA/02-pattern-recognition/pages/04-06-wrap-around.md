## Wrap Around 🟢

- **What it is:** A circular array is a linear array read twice. Walk indices `0 .. 2n − 1` and read `a[i % n]`: every window, pair or "next" that wraps past the end appears once as a plain linear one, with no copied array
- **Signal:** "the array is circular", "the last element is adjacent to the first", "houses arranged in a circle", "next greater element, searching circularly"
- **Why it works:** Any contiguous run in a circle of length n starts somewhere in `0..n−1` and has length ≤ n, so it ends before index `2n − 1` in the doubled view. The doubled view contains every circular run; the modulo reads it without allocating it

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
  <text x="199" y="50" class="sm" text-anchor="middle">6</text><text x="225" y="50" class="sm" text-anchor="middle">7%7=0</text><text x="264" y="50" class="sm" text-anchor="middle">1</text><text x="290" y="50" class="sm" text-anchor="middle">2</text>
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

### Variations

- **Next Greater Element II (LeetCode 503):** run the monotonic stack (Chapter 10) over `i = 0 .. 2n − 1` and push only during the first lap. The second lap only resolves elements still waiting
- **House Robber II (LeetCode 213):** here wrapping is a *constraint*, not a view: house 0 and house n − 1 cannot both be taken. Solve two linear problems, `[0 .. n−2]` and `[1 .. n−1]`, and take the better
- **Defuse the Bomb (LeetCode 1652):** a fixed window of k on a circle; the sum for `i` is a window starting at `i + 1` (or ending at `i − 1` when k < 0) read with `% n`
- **Gas Station / circular tour:** the wrap is handled by a single pass plus a reset rule (page 08-06), not by doubling

### The failure

- **Allocating the doubled array anyway.** `[...a, ...a]` works and is O(n) extra memory; with n = 10⁵ it is harmless, but interviewers asking "circular" often follow with "O(1) space". The modulo costs nothing
- **Running `2n` iterations for fixed windows.** For windows of length L, starts `0..n−1` need only `n + L − 1` steps. Running `2n` counts each wrapped window twice, which is harmless for a maximum and wrong for a count
- **Negative indices.** `(i − k) % n` is negative in JS when `i < k`. Use `((i − k) % n + n) % n`, or arrange the loop so the index never goes below zero, as the template does

:::interview
"How do you handle circular arrays without copying?" — Any run in the circle is a linear run in the array written twice, so I iterate a virtual doubled array with `i % n`. For fixed windows of length L I stop at `n + L − 1`, which is exactly one window per starting index.
:::
