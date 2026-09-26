## Recognition drills: Stacks & Queues <span class="lv lv1"></span>

Hide the right column. Say what the top of the stack (or the front of the queue) *means*, and what event removes it.

| Problem | Pattern & what the top means |
|---|---|
| 1. [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (LeetCode 20) | **Nesting:** top = the bracket that must close next |
| 2. [Minimum Add to Make Parentheses Valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/) (LeetCode 921) | **Counter:** one bracket type, the height is all you need |
| 3. [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) (LeetCode 32) | **Counter, two passes** (O(1) space), or a stack holding the last unmatched index |
| 4. [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) (LeetCode 150) / [Postfix Evaluation](https://www.geeksforgeeks.org/problems/evaluation-of-postfix-expression1735/1) (GFG) | **Operands wait;** an operator pops two, pushes one |
| 5. [Decode String](https://leetcode.com/problems/decode-string/) (LeetCode 394) | **Push the context:** `(string so far, repeat count)` |
| 6. [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/) (LeetCode 227) | **Terms wait;** `*` and `/` combine with the top at once |
| 7. [Simplify Path](https://leetcode.com/problems/simplify-path/) (LeetCode 71) | **Directories;** `..` pops |
| 8. [Asteroid Collision](https://leetcode.com/problems/asteroid-collision/) (LeetCode 735) | **Cancel against the top** in a `while` |
| 9. [Next Greater Element](https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1) (GFG) | **Waiting:** top = nearest element still without an answer |
| 10. [Online Stock Span](https://leetcode.com/problems/online-stock-span/) (LeetCode 901) | **Previous greater:** pop smaller-or-equal prices, span = distance to the new top |
| 11. [132 Pattern](https://leetcode.com/problems/132-pattern/) (LeetCode 456) <span class="lv lv2"></span> | **Right to left:** each element acts as the "3"; values it pops become the best "2" so far |
