## Let Pairs Cancel <span class="lv lv1"></span>

- **What:** XOR every value together. Anything that appears an even number of times cancels (`x ^ x = 0`, `x ^ 0 = x`), so only the odd-count values remain
- **Spot it:** "every element appears twice except one", "the missing number from 0..n", "the extra character", "two numbers appear once", "O(1) extra space". Others appear three times → 11-02
- **Why:** XOR is addition without carry, per bit. A bit ends up 1 exactly when an odd number of inputs have a 1 there, so pairs vanish

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Single Number III on 1, 2, 1, 3, 2, 5. XOR of everything is 3 xor 5 equals 6, binary 110. Its lowest set bit is 010. Split the numbers by that bit: 2, 3, 2 have it, 1, 1, 5 do not. XOR each group separately: 3 and 5, the two singles." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .g1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .g2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="20" class="lb">1 ^ 2 ^ 1 ^ 3 ^ 2 ^ 5 = 3 ^ 5 = 110₂</text>
  <text x="20" y="38" class="lb">lowest set bit: 110 &amp; −110 = 010₂</text>
  <rect class="g1" x="20" y="50" width="190" height="24"/><text x="115" y="66" class="lb" text-anchor="middle">bit 1 set: 2, 3, 2 → 3</text>
  <rect class="g2" x="220" y="50" width="190" height="24"/><text x="315" y="66" class="lb" text-anchor="middle">bit 1 clear: 1, 1, 5 → 5</text>
  <text x="20" y="96" class="sm">the two singles differ in that bit, so they land in different groups;</text>
  <text x="20" y="108" class="sm">every pair lands together and cancels inside its group</text>
</svg>
:::

```ts
// Single Number III (LeetCode 260)
// two values appear once, every other value twice
function singleNumber(nums: number[]): number[] {
  let both = 0;
  for (const x of nums) both ^= x; // = a ^ b, nonzero since a ≠ b
  const bit = both & -both;     // lowest bit where a and b differ
  let a = 0;
  for (const x of nums) if (x & bit) a ^= x;
  return [a, both ^ a];
}
```

- **Watch out:** XOR when the others appear three times. `[2, 2, 3, 2]` XORs to 1, not the single value 3
### Where it appears

| Problem | What the XOR isolates |
|---|---|
| [Single Number](https://leetcode.com/problems/single-number/) (LeetCode 136) | the one value that appears once |
| [Single Number III](https://leetcode.com/problems/single-number-iii/) (LeetCode 260) | two singles split by their differing bit |
| [Missing Number](https://leetcode.com/problems/missing-number/) (LeetCode 268) | the gap — XOR indices against values |
| [Find the Difference](https://leetcode.com/problems/find-the-difference/) (LeetCode 389) | the extra character — XOR all char codes |

:::interview
"Can you solve Single Number with a hash set instead? Why does the interviewer want XOR?"

A set works — add if absent, remove if present, the survivor is the answer. But it uses O(n) space. XOR does the same job in O(1) space and one pass, which is the real constraint. The interviewer is testing whether you know a constant-space primitive, not just correctness.
:::
