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

### Other codes, same loop

- **Continuous Subarray Sum (LeetCode 523):** "length ≥ 2, sum a multiple of k". Same remainder code, but store the **first index** and accept only `i − first ≥ 2`. Never overwrite a first index: a later one only shortens the subarray
- **Longest subarray with equal odd and even elements (GFG):** code = running `(+1 for odd, −1 for even)`. The 0/1 version of this appears as Contiguous Array in Module 07; any two-class count works the same way
- **Find the Longest Substring Containing Vowels in Even Counts (LeetCode 1371):** code = a 5-bit mask, bit v flipped by each vowel v. Equal masks mean every vowel's count changed by an even number in between
- **Number of Wonderful Substrings (LeetCode 1915) 🟡:** at most one letter odd. For each prefix mask `m`, count earlier masks equal to `m` *and* to `m ^ (1 << b)` for each of the 10 letters

### The failure

- **Negative remainders.** In JavaScript, Java and C++, `−2 % 5` is `−2`, not `3`. On `[−2, 5]` with k = 5 the prefixes are −2 and 3: they bracket `[5]`, but the map files them under different keys and returns 0 instead of 1. Normalise with `((s % k) + k) % k`. Python's `%` is already non-negative, which is why ported solutions break silently
- **Forgetting the empty prefix.** Seed the map with `{0: 1}` (for counting) or `{0: −1}` (for first index). Without it, every valid subarray that starts at index 0 is missed

:::interview
"How do you spot that a prefix map applies?" — I ask whether the property is preserved by *subtracting* two prefixes. Sums are, remainders mod k are, parities are under XOR. If yes, a valid subarray is a pair of equal codes, and one hash map turns the O(n²) pair search into O(n). If the property is a max or a min, subtraction does not work, and I look at windows or stacks instead.
:::
