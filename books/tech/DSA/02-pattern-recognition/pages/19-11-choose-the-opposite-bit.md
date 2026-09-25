## Choose the Opposite Bit 🔴

- **What it is:** A **binary trie** stores numbers as root-to-leaf paths of bits, highest bit first. To maximise `x XOR y`, walk from the root and at every level take the child whose bit is the **opposite** of x's bit when it exists. Module 07 (01-11) names the transformation; this page is the machinery
- **Signal:** "maximum XOR of two numbers / of a subarray / with an element ≤ m", "count pairs whose XOR lies in a range", n up to 10⁵–2·10⁵ so O(n²) pairs are too many
- **Why it works:** A higher bit outweighs all lower bits together: 2ᵇ > 2ᵇ − 1. So winning bit b is always worth more than anything below it, and the greedy choice per level is optimal. One query costs one root-to-leaf walk: 31 steps for values below 2³¹

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Binary trie holding 2 as 010, 5 as 101 and 7 as 111. Query x equals 2, bits 0 1 0. At the top bit x has 0, so the walk wants 1 and takes it. At the middle bit x has 1, so it wants 0 and takes it. At the last bit x has 0, wants 1 and takes it. The walk reaches 5, and 2 XOR 5 equals 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .p { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
    .pe { stroke: #2d6a4f; stroke-width: 2.2; }
  </style>
  <circle class="p" cx="130" cy="14" r="8"/>
  <line class="e" x1="124" y1="20" x2="74" y2="44"/><line class="pe" x1="136" y1="20" x2="186" y2="44"/>
  <text x="92" y="30" class="sm">0</text><text x="164" y="30" class="sm">1</text>
  <circle class="n" cx="70" cy="50" r="8"/><circle class="p" cx="190" cy="50" r="8"/>
  <line class="e" x1="70" y1="58" x2="70" y2="82"/><text x="74" y="72" class="sm">1</text>
  <line class="pe" x1="184" y1="56" x2="154" y2="82"/><line class="e" x1="196" y1="56" x2="226" y2="82"/>
  <text x="160" y="72" class="sm">0</text><text x="214" y="72" class="sm">1</text>
  <circle class="n" cx="70" cy="88" r="8"/><circle class="p" cx="150" cy="88" r="8"/><circle class="n" cx="230" cy="88" r="8"/>
  <line class="e" x1="70" y1="96" x2="70" y2="116"/><line class="pe" x1="150" y1="96" x2="150" y2="116"/><line class="e" x1="230" y1="96" x2="230" y2="116"/>
  <text x="74" y="110" class="sm">0</text><text x="154" y="110" class="sm">1</text><text x="234" y="110" class="sm">1</text>
  <text x="70" y="132" class="lb" text-anchor="middle">2 = 010</text><text x="150" y="132" class="lb" text-anchor="middle">5 = 101</text><text x="230" y="132" class="lb" text-anchor="middle">7 = 111</text>
  <text x="290" y="30" class="lb">query x = 2 = 010</text>
  <text x="290" y="50" class="sm">bit 2: x has 0 → want 1 ✓</text>
  <text x="290" y="66" class="sm">bit 1: x has 1 → want 0 ✓</text>
  <text x="290" y="82" class="sm">bit 0: x has 0 → want 1 ✓</text>
  <text x="290" y="104" class="lb">2 XOR 5 = 111 = 7</text>
</svg>
:::

```ts
// Maximum XOR of Two Numbers in an Array (LeetCode 421)
function findMaximumXOR(nums: number[]): number {
  // node → [child 0, child 1]; 0 = none
  const kid: number[][] = [[0, 0]];
  let best = 0;
  for (const x of nums) {
    let v = 0;                        // insert x, bits 30 … 0
    for (let b = 30; b >= 0; b--) {
      const bit = (x >> b) & 1;
      if (!kid[v][bit]) {
        kid[v][bit] = kid.length; kid.push([0, 0]);
      }
      v = kid[v][bit];
    }
    let u = 0, r = 0;                 // best partner for x
    for (let b = 30; b >= 0; b--) {
      const want = ((x >> b) & 1) ^ 1;
      if (kid[u][want]) { r |= 1 << b; u = kid[u][want]; }
      else u = kid[u][want ^ 1];
    }
    best = Math.max(best, r);
  }
  return best;
}
```

### Variations

- **Maximum subarray XOR (GFG):** XOR of `a[i..j]` = `P[j+1] ^ P[i]` over prefix XORs; insert 0 first, then query each prefix before inserting it (the prefix-difference move of 03-02, with XOR)
- **Maximum XOR With an Element From Array (LeetCode 1707):** offline. Sort queries by the limit m and nums ascending; insert every num ≤ m, then query. An empty trie answers −1
- **Count Pairs With XOR in a Range (LeetCode 1803):** store a count at each node; `count(< high + 1) − count(< low)`. At a 1-bit of the bound, every pair on the matching-bit branch is below it: add that subtree's count and continue down the other branch
- **Minimum XOR pair (GFG):** no trie needed. After sorting, the minimum XOR is always between two adjacent values

### The failure

- **Pairing the largest values.** On `[3, 10, 5, 25, 2, 8]` the two largest give 25 XOR 10 = 19; the answer is 5 XOR 25 = 28. XOR rewards differing high bits, not large numbers
- **Starting at bit 31 in JavaScript.** `1 << 31` is −2147483648, a negative 32-bit integer. Values below 2³¹ need bits 30 … 0 only; wider values need `BigInt` or a split into two halves

:::interview
"Max XOR of two numbers?" — I insert each number's bits, highest first, into a binary trie, and for each number walk the trie taking the opposite bit whenever it exists. Winning a higher bit beats every lower bit combined, so the greedy walk is optimal. O(n · 31) time and at most 31 · n + 1 trie nodes.
:::
