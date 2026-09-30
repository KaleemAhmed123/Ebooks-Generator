## Rolling Hash <span class="lv lv2"></span>

- **What:** treat a window of characters as digits of a number in some base. As the window slides, update the hash in O(1) — drop the leftmost digit, shift, add the new one. Compare substrings by hash, then verify a hit
- **Spot it:** "find a pattern in text", "any repeated substring of length L", "longest duplicate substring", "compare many substrings for equality" at scale
- **Why:** recomputing a length-m hash every step is O(n · m). Rolling makes each step O(1), so a full scan is O(n). Two equal substrings always share a hash; different ones collide only rarely with a large modulus — a verify on match keeps it exact

:::mint
<svg viewBox="0 0 470 130" role="img" aria-label="A window of length 3 over a b c d. The hash of abc is a times base squared plus b times base plus c. Sliding to bcd subtracts a times base squared, multiplies by base, and adds d. One multiply and one add per step instead of rebuilding the whole window." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
    .w1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .w2 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.3; }
  </style>
  <g transform="translate(60,16)">
    <rect class="w1" x="0" y="0" width="34" height="26"/><text x="17" y="18" class="lb" text-anchor="middle">a</text>
    <rect class="w1" x="34" y="0" width="34" height="26"/><text x="51" y="18" class="lb" text-anchor="middle">b</text>
    <rect class="w1" x="68" y="0" width="34" height="26"/><text x="85" y="18" class="lb" text-anchor="middle">c</text>
    <rect class="c" x="102" y="0" width="34" height="26"/><text x="119" y="18" class="lb" text-anchor="middle">d</text>
  </g>
  <text x="60" y="60" class="sm">h(abc) = a·B² + b·B + c</text>
  <g transform="translate(60,72)">
    <rect class="c" x="0" y="0" width="34" height="26"/><text x="17" y="18" class="lb" text-anchor="middle">a</text>
    <rect class="w2" x="34" y="0" width="34" height="26"/><text x="51" y="18" class="lb" text-anchor="middle">b</text>
    <rect class="w2" x="68" y="0" width="34" height="26"/><text x="85" y="18" class="lb" text-anchor="middle">c</text>
    <rect class="w2" x="102" y="0" width="34" height="26"/><text x="119" y="18" class="lb" text-anchor="middle">d</text>
  </g>
  <text x="230" y="34" class="lb" fill="#1d4e89">slide: drop a, add d</text>
  <text x="230" y="52" class="sm">h(bcd) = (h(abc) − a·B²)·B + d</text>
  <text x="230" y="78" class="sm">one multiply + one add per step</text>
  <text x="230" y="98" class="lb" fill="#2d6a4f">O(1) per window → O(n) scan</text>
</svg>
:::

```ts
// Rabin–Karp substring search: index of needle in haystack, or -1
function rabinKarp(haystack: string, needle: string): number {
  const n = haystack.length, m = needle.length;
  if (m === 0) return 0;
  if (m > n) return -1;
  const B = 131n, MOD = 1_000_000_007n;                  // BigInt: no overflow
  let hn = 0n, hh = 0n, power = 1n;                       // power = B^(m-1)
  for (let i = 0; i < m; i++) {
    hn = (hn * B + BigInt(needle.charCodeAt(i))) % MOD;
    hh = (hh * B + BigInt(haystack.charCodeAt(i))) % MOD;
    if (i < m - 1) power = (power * B) % MOD;
  }
  for (let i = 0; i + m <= n; i++) {
    if (hh === hn && haystack.slice(i, i + m) === needle) return i; // verify on a hash hit
    if (i + m < n) {
      hh = (hh - BigInt(haystack.charCodeAt(i)) * power % MOD + MOD) % MOD; // drop left
      hh = (hh * B + BigInt(haystack.charCodeAt(i + m))) % MOD;             // shift, add right
    }
  }
  return -1;
}
```

- **Watch out:** always **verify** a hash match against the real characters — equal hashes are not proof, and an adversarial input can force collisions. Keep the modulus large (or hash with two independent (base, mod) pairs). In fixed-width integers the multiply overflows silently; BigInt or careful modular math avoids it
