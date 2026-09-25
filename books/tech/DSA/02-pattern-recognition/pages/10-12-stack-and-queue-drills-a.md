## Recognition drills: Stacks & Queues 🟢

Hide the right column. Say what the top of the stack (or the front of the queue) *means*, and what event removes it.

| Problem | Pattern & what the top means |
|---|---|
| 1. Valid Parentheses (LeetCode 20) | **Nesting:** top = the bracket that must close next |
| 2. Minimum Add to Make Parentheses Valid (LeetCode 921) | **Counter:** one bracket type, the height is all you need |
| 3. Longest Valid Parentheses (LeetCode 32) | **Counter, two passes** (O(1) space), or a stack holding the last unmatched index |
| 4. Expression contains redundant brackets (GFG) | **Nesting:** on `)`, pop to `(`; no operator popped → redundant |
| 5. Evaluation of Postfix Expression (GFG / LeetCode 150) | **Operands wait;** an operator pops two, pushes one |
| 6. Infix to Postfix (GFG) | **Operators wait** until an incoming one has lower or equal precedence (left-associative) |
| 7. Decode String (LeetCode 394) | **Push the context:** `(string so far, repeat count)` |
| 8. Basic Calculator II (LeetCode 227) | **Terms wait;** `*` and `/` combine with the top at once |
| 9. Simplify Path (LeetCode 71) | **Directories;** `..` pops |
| 10. Asteroid Collision (LeetCode 735) | **Cancel against the top** in a `while` |
| 11. Remove K consecutive duplicates (GFG) / LeetCode 1209 | **Cancel against the top** with `(char, run length)` |
