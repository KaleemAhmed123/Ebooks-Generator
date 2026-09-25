### Variations

- **Basic Calculator (LeetCode 224):** `+`, `−` and parentheses. On `(` push `(result so far, sign before the bracket)` and reset; on `)` pop and fold: `result = saved + sign · result`
- **Basic Calculator II (LeetCode 227):** no brackets, but precedence. Push each term; on `*` or `/` combine with the top immediately; sum the stack at the end. Division truncates toward zero: `Math.trunc`
- **Evaluate Reverse Polish Notation (LeetCode 150):** the nesting is implicit; operands wait on the stack, an operator pops two and pushes one. Mind the order: `a − b` where `b` is popped first
- **Simplify Path (LeetCode 71):** split on `/`. A name pushes, `..` pops (if possible), `.` and empty segments do nothing. Join what is left
- **Score of Parentheses (LeetCode 856):** push a 0 on `(`; on `)` pop `v` and add `max(2v, 1)` to the new top

### The failure

- **Reading one digit.** `"10[a]"` read digit by digit as `1` then `0` pushes a repeat count of 0. Accumulate `num = num · 10 + digit` until the bracket
- **Rebuilding strings from the whole stack.** Joining everything on every `]` turns the decode into O(output²). Only the popped context is combined; everything below it is untouched until its own bracket closes

:::interview
"How would you do Decode String without a stack?" — Recursion: on `[` call a function that decodes until the matching `]` and returns its string plus the position it stopped at. The call stack plays the role of the explicit stack; the saved local variables are the "context". Both are linear in the output in practice; strict string copying can make nested repeats quadratic.
:::
