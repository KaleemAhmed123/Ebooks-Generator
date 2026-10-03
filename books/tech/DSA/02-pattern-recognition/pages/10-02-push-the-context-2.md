### Where it appears

| Problem | What the stack saves on `[` |
|---|---|
| [Decode String](https://leetcode.com/problems/decode-string/) (LeetCode 394) | `(partialString, repeatCount)` |
| [Basic Calculator](https://leetcode.com/problems/basic-calculator/) (LeetCode 224) | `(result, sign)` |
| [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/) (LeetCode 227) | push terms; `*` and `/` fold into the top |
| [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) (LeetCode 150) | operands; operator pops two |
| [Simplify Path](https://leetcode.com/problems/simplify-path/) (LeetCode 71) | directory names; `..` pops the top |

:::interview
"How do you handle operator precedence without recursion?"

Two stacks (or one with interleaved operators and operands): push low-precedence operators, but when a higher-precedence operator like `*` arrives, compute it immediately against the top operand. This is the shunting-yard algorithm — the stack replaces the recursive call.
:::
