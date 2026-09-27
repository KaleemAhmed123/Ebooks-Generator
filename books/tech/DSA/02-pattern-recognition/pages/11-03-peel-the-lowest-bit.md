## Peel the Lowest Bit <span class="lv lv1"></span>

- **What:** `n & (n − 1)` deletes the lowest set bit; `n & −n` keeps only it. Loops that peel bits run once per *set* bit, not once per position
- **Spot it:** "count the 1 bits", "is n a power of two", "counting bits for every number up to n", "reverse the bits", "add without + or −". Counts per *position* across many numbers → 11-02
- **Why:** subtracting 1 turns the lowest 1 into 0 and the 0s below it into 1s; AND with the original wipes that tail. A power of two is left with 0

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="n equals 12, binary 1100. n minus 1 is 1011. n and n minus 1 is 1000: the lowest set bit is gone. n and minus n is 0100: only the lowest set bit is kept. For counting bits, bits of 12 equal bits of 8 plus 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
  </style>
  <text x="30" y="22" class="lb">n          = 1100   (12)</text>
  <text x="30" y="38" class="lb">n − 1      = 1011</text>
  <text x="30" y="54" class="lb">n &amp; (n−1)  = 1000   lowest 1 removed</text>
  <text x="30" y="74" class="lb">n &amp; −n     = 0100   lowest 1 kept</text>
  <text x="30" y="96" class="lb" fill="#1d4e89">bits[12] = bits[12 &amp; 11] + 1 = bits[8] + 1 = 2</text>
</svg>
:::

```ts
// Counting Bits (LeetCode 338): number of 1s for every i in 0..n
function countBits(n: number): number[] {
  const bits = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) bits[i] = bits[i & (i - 1)] + 1;
  return bits;
}

const isPowerOfTwo = (n: number) => n > 0 && (n & (n - 1)) === 0;

// Kernighan: one step per set bit
function popcount(n: number): number {
  let c = 0;
  for (n >>>= 0; n; n &= n - 1) c++;
  return c;
}
```

- **Watch out:** `n & (n − 1) === 0` without brackets parses as `n & ((n − 1) === 0)`. And check `n > 0`: 0 passes the test
- **Also solves:** [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) (LeetCode 191) · [Power of Two](https://leetcode.com/problems/power-of-two/) (LeetCode 231) · [Reverse Bits](https://leetcode.com/problems/reverse-bits/) (LeetCode 190) (`r = (r << 1) | (n & 1)`, read `r >>> 0`) · [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/) (LeetCode 371) (`a ^ b` is the sum, `(a & b) << 1` the carry)
