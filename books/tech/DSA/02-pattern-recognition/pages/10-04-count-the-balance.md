## Count the Balance 🟢

- **What it is:** With a single bracket type, the stack only ever holds `(`, so its *size* is all the information it has. Replace it with a counter: `+1` on open, `−1` on close. A close that would take the counter below zero is unmatched
- **Signal:** "minimum additions to make it valid", "minimum reversals", "minimum swaps to balance", "longest valid parentheses", "is this string of ( and ) valid"
- **Why it works:** A prefix is fixable only if it never closes more than it opened. The running balance is exactly "opened − closed", its dips below zero count the unmatched closes, and whatever is left at the end counts the unmatched opens. Several types (`()[]{}`) need a real stack, because the *kind* of the last open matters

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
  // unmatched "(" + unmatched ")"
  return open + badClose;
}
```

### Variations

- **Minimum number of bracket reversals (GFG / "Count the Reversals"):** after cancelling matched pairs, `c` unmatched closes and `o` unmatched opens remain. Two of a kind fix with one reversal, so the answer is `⌈c/2⌉ + ⌈o/2⌉`; an odd total length is impossible
- **Minimum Number of Swaps to Make the String Balanced (LeetCode 1963):** equal counts of `[` and `]`. One swap fixes two unmatched closes, so the answer is `⌈unmatched / 2⌉`
- **Longest Valid Parentheses (LeetCode 32):** two counter passes, O(1) space. Left to right: reset both counts when `close > open`, record `2 · open` when they are equal. Right to left: the mirror rule catches strings like `"(()"` that the first pass never balances
- **Minimum Remove to Make Valid Parentheses (LeetCode 1249):** mark unmatched `)` on the forward pass; unmatched `(` are the last `open` ones, removed on a backward pass
- **Valid Parentheses (LeetCode 20):** three bracket types. A counter cannot tell `(]` from `()`; use the stack

### The failure

- **A counter for several bracket types.** `"([)]"` keeps every counter non-negative and ends at zero, yet it is invalid. Kinds must match in last-opened order, which only a stack records
- **One pass for Longest Valid Parentheses.** `"(()"` never brings `open` and `close` level in the forward pass, so it reports 0; the backward pass finds the length 2

:::interview
"When can a counter replace the stack?" — When the stack would only ever contain identical items. Then its height is all it knows, and a counter stores that in O(1) space. Mixed bracket types, or brackets that carry data like `3[...]`, need the actual stack.
:::
