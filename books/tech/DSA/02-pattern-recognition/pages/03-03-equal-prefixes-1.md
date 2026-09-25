## Equal Prefixes 🟡

- **What it is:** Encode each element so that "subarray `(j, i]` has property P" becomes "`code(prefix j) === code(prefix i)`". Then a map of codes seen so far answers every index in O(1)
- **Signal:** "divisible by k", "equal number of 0s and 1s / odd and even", "every vowel appears an even number of times", "at most one letter with odd count"
- **Why it works:** Differences of prefixes are subarrays. If the property survives subtraction (sums, remainders mod k, parities under XOR), two equal codes bracket a valid subarray. Store the **count** of each code to count subarrays, or the **first index** to find the longest

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Array 4, 5, 0, minus 2, minus 3, 1 with k equal to 5. Prefix remainders are 0, 4, 4, 4, 2, 4, 0. Equal remainders bracket subarrays divisible by 5. The remainder 4 appears four times, giving 6 pairs; the remainder 0 appears twice, giving 1 pair; total 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1d4e89; stroke-width: 1.1; fill: none; }
  </style>
  <text x="20" y="22" class="sm">nums</text>
  <text x="80" y="22" class="lb" text-anchor="middle">4</text><text x="120" y="22" class="lb" text-anchor="middle">5</text><text x="160" y="22" class="lb" text-anchor="middle">0</text><text x="200" y="22" class="lb" text-anchor="middle">−2</text><text x="240" y="22" class="lb" text-anchor="middle">−3</text><text x="280" y="22" class="lb" text-anchor="middle">1</text>
  <text x="20" y="50" class="sm">prefix % 5</text>
  <rect class="bx" x="48" y="36" width="24" height="20"/><text x="60" y="50" class="lb" text-anchor="middle">0</text>
  <rect class="hi" x="88" y="36" width="24" height="20"/><text x="100" y="50" class="lb" text-anchor="middle">4</text>
  <rect class="hi" x="128" y="36" width="24" height="20"/><text x="140" y="50" class="lb" text-anchor="middle">4</text>
  <rect class="hi" x="168" y="36" width="24" height="20"/><text x="180" y="50" class="lb" text-anchor="middle">4</text>
  <rect class="bx" x="208" y="36" width="24" height="20"/><text x="220" y="50" class="lb" text-anchor="middle">2</text>
  <rect class="hi" x="248" y="36" width="24" height="20"/><text x="260" y="50" class="lb" text-anchor="middle">4</text>
  <rect class="bx" x="288" y="36" width="24" height="20"/><text x="300" y="50" class="lb" text-anchor="middle">0</text>
  <path class="a" d="M 100 58 Q 120 74 140 58"/><path class="a" d="M 100 58 Q 180 92 260 58"/>
  <path class="a" d="M 60 58 Q 180 104 300 58" stroke-dasharray="3 2"/>
  <text x="330" y="36" class="lb">code 4 seen 4× → 6 pairs</text>
  <text x="330" y="52" class="lb">code 0 seen 2× → 1 pair</text>
  <text x="330" y="72" class="lb" fill="#2d6a4f">answer = 7</text>
</svg>
:::

```ts
// Subarray Sums Divisible by K (LeetCode 974)
function subarraysDivByK(nums: number[], k: number): number {
  // the empty prefix
  const seen = new Map<number, number>([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    // JS % keeps the sign
    const code = ((sum % k) + k) % k;
    count += seen.get(code) ?? 0;                  // read …
    seen.set(code, (seen.get(code) ?? 0) + 1);     // … then write
  }
  return count;
}
```
