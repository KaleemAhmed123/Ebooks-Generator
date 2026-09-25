## Peel the Lowest Bit <span class="lv lv2"></span>

- **What it is:** Two one-line identities do most bit work. `n & (n − 1)` deletes the lowest set bit of `n`. `n & −n` keeps only the lowest set bit. Loops that peel bits one at a time run once per *set* bit, not once per bit position
- **Signal:** "count the 1 bits", "is n a power of two", "counting bits for every number from 0 to n", "position of the only set bit", "enumerate all subsets of a mask"
- **Why it works:** Subtracting 1 turns the lowest 1 into 0 and every 0 below it into 1; AND with the original wipes that whole tail. So `n & (n − 1)` is `n` minus its lowest bit, and a number is a power of two exactly when that leaves 0. The same peel turns "number of 1s in i" into a recurrence on a smaller number

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
