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
