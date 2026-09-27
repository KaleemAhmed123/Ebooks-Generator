## Count the Balance <span class="lv lv1"></span>

- **What:** with one bracket type the stack only holds `(`, so its height is all it knows. Use a counter: `+1` on open, `−1` on close; a close that would go below zero is unmatched
- **Spot it:** "fewest additions to make it valid", "longest valid parentheses". Several kinds, or brackets that carry data → 10-02
- **Why:** the running balance is "opened − closed". Its dips below zero are the unmatched closes; what is left at the end are the unmatched opens

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Balance walk on the string close, open, open, close, close, close. The balance goes minus 1 at the first close, which is an unmatched close, reset to 0 and count 1. Then 1, 2, 1, 0, then minus 1 again, another unmatched close. End balance 0. Additions needed: 2 unmatched closes plus 0 unmatched opens equals 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .ln { stroke: #1d4e89; stroke-width: 1.6; fill: none; }
    .ax { stroke: #9a9a9a; stroke-width: 1; }
    .bad { fill: #ef476e; }
  </style>
  <line class="ax" x1="30" y1="70" x2="270" y2="70"/>
  <text x="14" y="73" class="sm">0</text>
  <path class="ln" d="M 30 70 L 60 86 L 60 70 L 90 54 L 120 38 L 150 54 L 180 70 L 210 86 L 210 70"/>
  <circle class="bad" cx="60" cy="86" r="3"/><circle class="bad" cx="210" cy="86" r="3"/>
  <text x="45" y="20" class="lb">)   (   (   )   )   )</text>
  <text x="30" y="100" class="sm">dips below 0 → unmatched ")" (count and reset)</text>
  <text x="290" y="40" class="lb">unmatched ")" = 2</text>
  <text x="290" y="56" class="lb">final balance  = 0</text>
  <text x="290" y="76" class="lb" fill="#1d4e89">additions = 2</text>
</svg>
:::

```ts
// Minimum Add to Make Parentheses Valid (LeetCode 921)
function minAddToMakeValid(s: string): number {
  let open = 0, badClose = 0;
  for (const ch of s) {
    if (ch === "(") open++;
    else if (open > 0) open--;          // matches an earlier "("
    else badClose++;                    // nothing to match
  }
  return open + badClose;         // unmatched "(" + unmatched ")"
}
```

- **Watch out:** a counter for several kinds. `"([)]"` keeps every counter valid and ends at zero, yet it is invalid: only a stack records which kind opened last
- **Also solves:** [Minimum Number of Swaps to Make the String Balanced](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/) (LeetCode 1963) (`⌈unmatched / 2⌉`) · [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) (LeetCode 32) (a forward and a backward counter pass) · [Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/) (LeetCode 1249) · [Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/) (LeetCode 678) (track the lowest and highest possible balance)
