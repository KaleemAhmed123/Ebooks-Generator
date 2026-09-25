## Push the Context 🟡

- **What it is:** For nested input, every opening symbol starts a new, smaller problem inside the current one. Push *everything you were in the middle of* (the partial result, the pending number, the sign) and start fresh; on the matching close, pop it and combine
- **Signal:** `k[encoded]`, parentheses in an expression, `(a(b)c)`-style nesting, "simplify the path", "evaluate", "score of parentheses"
- **Why it works:** Nesting is last-opened, first-closed, which is exactly stack order. The top of the stack is always the context the current bracket will return to, so every close knows what to combine with, without re-scanning

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Decode string 3 a 2 c inside brackets. On 3 open bracket push the pair empty string and 3, start fresh. Read a. On 2 open bracket push a and 2, start fresh. Read c. On close pop a and 2 giving a plus c times 2, acc. On close pop empty and 3 giving accaccacc." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .st { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="lb">s = "3[a2[c]]"</text>
  <text x="20" y="40" class="lb">3[  push ("", 3)   cur = ""</text>
  <text x="20" y="54" class="lb">a       cur = "a"</text>
  <text x="20" y="68" class="lb">2[  push ("a", 2)  cur = ""</text>
  <text x="20" y="82" class="lb">c       cur = "c"</text>
  <text x="20" y="96" class="lb">]   pop ("a", 2) → cur = "a" + "c"·2 = "acc"</text>
  <text x="20" y="110" class="lb">]   pop ("", 3)  → cur = "" + "acc"·3</text>
  <rect class="st" x="360" y="70" width="90" height="20"/><text x="405" y="84" class="lb" text-anchor="middle">("a", 2)</text>
  <rect class="st" x="360" y="90" width="90" height="20"/><text x="405" y="104" class="lb" text-anchor="middle">("", 3)</text>
  <text x="360" y="62" class="sm">stack after "2["</text>
  <text x="330" y="24" class="lb" fill="#1d4e89">"accaccacc"</text>
</svg>
:::

```ts
// Decode String (LeetCode 394)
function decodeString(s: string): string {
  const stack: [string, number][] = [];
  let cur = "", num = 0;
  for (const ch of s) {
    // multi-digit
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch);
    else if (ch === "[") {
      stack.push([cur, num]);             // save the context
      cur = ""; num = 0;                  // start the inner problem
    } else if (ch === "]") {
      const [prev, k] = stack.pop()!;
      // close: combine with context
      cur = prev + cur.repeat(k);
    } else cur += ch;
  }
  return cur;
}
```

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
"How would you do Decode String without a stack?" — Recursion: on `[` call a function that decodes until the matching `]` and returns its string plus the position it stopped at. The call stack plays the role of the explicit stack; the saved local variables are the "context". Both are O(length of the output).
:::
