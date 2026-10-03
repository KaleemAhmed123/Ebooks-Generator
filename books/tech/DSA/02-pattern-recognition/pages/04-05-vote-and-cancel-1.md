## Vote and Cancel <span class="lv lv1"></span>

- **What:** the Boyer–Moore majority vote. One candidate and a counter: a match adds a vote, a different value cancels one
- **Spot it:** "appears more than ⌊n/2⌋ times", "more than ⌊n/3⌋", "O(1) extra space", "one pass over a stream". Most frequent, with no majority promised → count with a map
- **Why:** each cancellation removes two votes, at most one of them the majority's. A value above half can never be cancelled out

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Majority vote on 2, 2, 1, 1, 1, 2, 2. The counter goes 1, 2, 1, 0, then 1 with candidate 1, then 0, then 1 with candidate 2. The survivor is 2, which appears 4 times out of 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .two { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .one { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>
  <text x="14" y="26" class="sm">value</text>
  <rect class="two" x="80" y="12" width="30" height="22"/><text x="95" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="two" x="110" y="12" width="30" height="22"/><text x="125" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="one" x="140" y="12" width="30" height="22"/><text x="155" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="one" x="170" y="12" width="30" height="22"/><text x="185" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="one" x="200" y="12" width="30" height="22"/><text x="215" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="two" x="230" y="12" width="30" height="22"/><text x="245" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="two" x="260" y="12" width="30" height="22"/><text x="275" y="27" class="lb" text-anchor="middle">2</text>
  <text x="14" y="54" class="sm">candidate</text>
  <text x="95" y="54" class="lb" text-anchor="middle">2</text><text x="125" y="54" class="lb" text-anchor="middle">2</text><text x="155" y="54" class="lb" text-anchor="middle">2</text><text x="185" y="54" class="lb" text-anchor="middle">2</text><text x="215" y="54" class="lb" text-anchor="middle">1</text><text x="245" y="54" class="lb" text-anchor="middle">1</text><text x="275" y="54" class="lb" text-anchor="middle">2</text>
  <text x="14" y="74" class="sm">count</text>
  <text x="95" y="74" class="lb" text-anchor="middle">1</text><text x="125" y="74" class="lb" text-anchor="middle">2</text><text x="155" y="74" class="lb" text-anchor="middle">1</text><text x="185" y="74" class="lb" text-anchor="middle">0</text><text x="215" y="74" class="lb" text-anchor="middle">1</text><text x="245" y="74" class="lb" text-anchor="middle">0</text><text x="275" y="74" class="lb" text-anchor="middle">1</text>
  <text x="310" y="40" class="sm">count 0 → next value</text>
  <text x="310" y="52" class="sm">becomes the candidate</text>
  <text x="310" y="78" class="lb" fill="#1d4e89">survivor: 2 (4 of 7)</text>
  <text x="14" y="94" class="sm">1s and 2s cancel in pairs; the value with more than half the votes is left over</text>
</svg>
:::

```ts
// Majority Element (LeetCode 169)
// a value with count > n/2 is guaranteed to exist
function majorityElement(nums: number[]): number {
  let candidate = nums[0], count = 0;
  for (const x of nums) {
    // previous votes all cancelled
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
```

- **Watch out:** with no majority promised, verify in a second pass. On `[1, 2, 3]` the vote leaves 3, which appears once
