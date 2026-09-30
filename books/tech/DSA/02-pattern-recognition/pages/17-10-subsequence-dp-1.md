## Subsequence DP <span class="lv lv2"></span>

- **What:** a subsequence keeps order but drops adjacency. Over one string the state is a **range** `f(i, j)`: if the two ends match, they extend the answer; otherwise drop one end and take the better side
- **Spot it:** "longest palindromic subsequence", "fewest deletions/insertions to make a palindrome", "count palindromic subsequences"
- **Why:** the ends are the only decision — keep both (when equal) or discard one. Every shorter range is solved first, so filling by increasing length settles `f(0, n − 1)`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Longest palindromic subsequence of the string b b b a b. The range DP fills by length. When the two ends are equal, the value is the inner range plus 2. When they differ, it is the max of dropping the left end or the right end. The full range 0 to 4 evaluates to 4, the subsequence b b b b." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .ch { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .eq { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .a { stroke: #2d6a4f; stroke-width: 1.3; }
  </style>
  <defs><marker id="s1710" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2d6a4f"/></marker></defs>
  <g transform="translate(30,16)">
    <rect class="eq" x="0" y="0" width="30" height="26"/><text x="15" y="18" class="lb" text-anchor="middle">b</text>
    <rect class="ch" x="30" y="0" width="30" height="26"/><text x="45" y="18" class="lb" text-anchor="middle">b</text>
    <rect class="ch" x="60" y="0" width="30" height="26"/><text x="75" y="18" class="lb" text-anchor="middle">b</text>
    <rect class="ch" x="90" y="0" width="30" height="26"/><text x="105" y="18" class="lb" text-anchor="middle">a</text>
    <rect class="eq" x="120" y="0" width="30" height="26"/><text x="135" y="18" class="lb" text-anchor="middle">b</text>
    <text x="15" y="42" class="sm" text-anchor="middle">i</text>
    <text x="135" y="42" class="sm" text-anchor="middle">j</text>
    <path class="a" d="M 15 -4 Q 75 -22 135 -4" fill="none" marker-end="url(#s1710)"/>
  </g>
  <text x="200" y="26" class="lb" fill="#2d6a4f">ends equal (b = b)</text>
  <text x="200" y="44" class="sm">f(i, j) = f(i+1, j−1) + 2</text>
  <text x="200" y="68" class="lb">ends differ (a ≠ b)</text>
  <text x="200" y="86" class="sm">f(i, j) = max(f(i+1, j), f(i, j−1))</text>
  <text x="30" y="92" class="sm">fill shortest ranges first</text>
  <text x="30" y="122" class="lb" fill="#2d6a4f">f(0,4) = 4  →  "bbbb"</text>
  <text x="30" y="134" class="sm">a single char is a length-1 palindrome</text>
</svg>
:::

```ts
// Longest Palindromic Subsequence (LeetCode 516)
function longestPalinSubseq(s: string): number {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {                    // i descends so f(i+1, …) is ready
    dp[i][i] = 1;                                       // one char: palindrome of length 1
    for (let j = i + 1; j < n; j++)
      dp[i][j] = s[i] === s[j]
        ? dp[i + 1][j - 1] + 2                          // keep both ends
        : Math.max(dp[i + 1][j], dp[i][j - 1]);         // drop one end
  }
  return dp[0][n - 1];
}
```

- **Watch out:** the fill order must have every smaller range done first. Iterate `i` downward and `j` upward, or loop by increasing length — a plain `i, j` ascending double loop reads `dp[i+1][…]` before it exists. Deletions to make a palindrome = `n − longestPalinSubseq`
