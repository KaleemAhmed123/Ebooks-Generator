## Grow from the Centre 🟢

- **What it is:** Every palindrome has a centre: a character (odd length) or a gap between two characters (even length). Try all 2n − 1 centres and expand outward while the two ends match
- **Signal:** "longest palindromic substring", "count palindromic substrings", "is it a palindrome after removing one character", anything about *contiguous* palindromes
- **Why it works:** If `s[l..r]` is a palindrome and `s[l−1] === s[r+1]`, then `s[l−1..r+1]` is one too, and if they differ no longer palindrome shares this centre. So each centre's palindromes are nested, and expanding finds the longest one in one walk. There are 2n − 1 centres and each expansion is at most n/2 steps: O(n²) time, O(1) space, with no table

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Expanding around centres in cbbd and babad. Odd centre at the middle b of babad expands to aba, then b and d differ. Even centre between the two b's in cbbd expands to bb, then cbbd fails. There are 2n minus 1 centres: n characters and n minus 1 gaps." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .ctr { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .ok { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
  </style>
  <text x="20" y="16" class="sm">odd centre</text>
  <rect class="c" x="20" y="22" width="24" height="22"/><text x="32" y="37" class="lb" text-anchor="middle">b</text>
  <rect class="ok" x="44" y="22" width="24" height="22"/><text x="56" y="37" class="lb" text-anchor="middle">a</text>
  <rect class="ctr" x="68" y="22" width="24" height="22"/><text x="80" y="37" class="lb" text-anchor="middle">b</text>
  <rect class="ok" x="92" y="22" width="24" height="22"/><text x="104" y="37" class="lb" text-anchor="middle">a</text>
  <rect class="c" x="116" y="22" width="24" height="22"/><text x="128" y="37" class="lb" text-anchor="middle">d</text>
  <text x="20" y="60" class="sm">aba ✓ then b ≠ d: stop</text>
  <text x="200" y="16" class="sm">even centre (a gap)</text>
  <rect class="c" x="200" y="22" width="24" height="22"/><text x="212" y="37" class="lb" text-anchor="middle">c</text>
  <rect class="ok" x="224" y="22" width="24" height="22"/><text x="236" y="37" class="lb" text-anchor="middle">b</text>
  <rect class="ok" x="248" y="22" width="24" height="22"/><text x="260" y="37" class="lb" text-anchor="middle">b</text>
  <rect class="c" x="272" y="22" width="24" height="22"/><text x="284" y="37" class="lb" text-anchor="middle">d</text>
  <path d="M 248 18 L 248 48" stroke="#1d4e89" stroke-width="1.6"/>
  <text x="200" y="60" class="sm">bb ✓ then c ≠ d: stop</text>
  <text x="20" y="84" class="lb">centres = n characters + (n − 1) gaps = 2n − 1</text>
  <text x="330" y="36" class="sm">expand(l, r) while</text>
  <text x="330" y="48" class="sm">s[l] === s[r]</text>
</svg>
:::

```ts
// Longest Palindromic Substring (LeetCode 5)
function longestPalindrome(s: string): string {
  let start = 0, len = 0;
  const expand = (l: number, r: number) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    // last matching span
    if (r - l - 1 > len) { start = l + 1; len = r - l - 1; }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);          // odd length, centre on s[i]
    // even length, centre between s[i] and s[i+1]
    expand(i, i + 1);
  }
  return s.slice(start, start + len);
}
```

### Variations

- **Palindromic Substrings (LeetCode 647):** count instead of keep: every successful expansion step is one more palindrome
- **Valid Palindrome II (LeetCode 680):** two pointers from the ends; at the first mismatch, try skipping the left or the right character once and check the rest directly
- **Break a Palindrome (LeetCode 1328):** change the first non-`'a'` in the first half to `'a'`; if the first half is all `'a'`, change the last character to `'b'`. A length-1 string cannot be broken
- **Minimum characters to add at the front to make a palindrome (GFG):** the answer is `n − (longest palindromic prefix)`. Centres give O(n²); the O(n) way runs KMP's failure function on `s + '#' + reverse(s)` (KMP, Module 08)
- **Longest Palindromic Subsequence:** *not* this pattern. Subsequences may skip characters, so centres do not apply; it is a range DP (the `f(i, j)` shape of 17-02), or LCS of the string and its reverse (Module 06, 03-01)

### The failure

- **Checking only odd centres.** `"cbbd"` has no odd palindrome longer than 1, and the answer `"bb"` is found only from the gap between the b's
- **Checking every substring.** O(n²) substrings × O(n) check each is O(n³): 10⁹ steps at n = 1,000, which is LeetCode 5's limit

:::interview
"Is there a faster way than O(n²)?" — Manacher's algorithm finds every centre's radius in O(n) by reusing mirrored radii inside the rightmost palindrome found so far. In an interview I state it, then write expand-around-centre: O(n²) time, O(1) space, and hard to get wrong.
:::
