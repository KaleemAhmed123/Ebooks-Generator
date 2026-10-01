### Where it appears

| Problem | What the stack holds |
|---|---|
| Decode String (LeetCode 394) | (text so far, repeat count) per level |
| Basic Calculator (LeetCode 224) | running result and sign across parentheses |
| Basic Calculator II (LeetCode 227) | pending terms; fold `×` `÷` immediately |
| Flatten Nested List Iterator (LeetCode 341) | the list cursors, outer under inner |
| Valid Parentheses (LeetCode 20) | open brackets awaiting a match → 10-02 |

- **Go deeper:** plain bracket matching is 10-02; full expression grammars and the shunting-yard method are in Module 07.

:::interview
"Nested decoding — stack or recursion?"

They are the same shape. Recursion uses the call stack: each `[` is a recursive call, each `]` a return that the caller folds in. An explicit stack of (outer string, count) makes that memory visible and avoids deep-recursion limits. Reach for the stack when nesting can be thousands deep.
:::
