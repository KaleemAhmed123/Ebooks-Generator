## Recognition drills: Stacks & Queues <span class="lv lv1"></span>

Hide the right column. Say what the top of the stack (or the front of the queue) *means*, and what event removes it.

| Problem | Pattern & what the top means |
|---|---|
| 1. Valid Parentheses (LeetCode 20) | **Nesting:** top = the bracket that must close next |
| 2. Minimum Add to Make Parentheses Valid (LeetCode 921) | **Counter:** one bracket type, the height is all you need |
| 3. Longest Valid Parentheses (LeetCode 32) | **Counter, two passes** (O(1) space), or a stack holding the last unmatched index |
| 4. Evaluation of Postfix Expression (GFG / LeetCode 150) | **Operands wait;** an operator pops two, pushes one |
| 5. Decode String (LeetCode 394) | **Push the context:** `(string so far, repeat count)` |
| 6. Basic Calculator II (LeetCode 227) | **Terms wait;** `*` and `/` combine with the top at once |
| 7. Simplify Path (LeetCode 71) | **Directories;** `..` pops |
| 8. Asteroid Collision (LeetCode 735) | **Cancel against the top** in a `while` |
| 9. Next Greater Element (GFG) | **Waiting:** top = nearest element still without an answer |
| 10. Online Stock Span (LeetCode 901) | **Previous greater:** pop smaller-or-equal prices, span = distance to the new top |
| 11. 132 Pattern (LeetCode 456) <span class="lv lv2"></span> | **Right to left:** each element acts as the "3"; values it pops become the best "2" so far |
