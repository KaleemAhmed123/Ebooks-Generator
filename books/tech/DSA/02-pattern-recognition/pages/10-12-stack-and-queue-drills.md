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
| 12. Remove K Digits (LeetCode 402) | **Pop while it pays,** k is the budget |
| 13. Largest Rectangle in Histogram (LeetCode 84) | **Reach:** a popped bar's width runs from the new top to the bar that popped it |
| 14. Maximal Rectangle (LeetCode 85) | **Stack the rows** |
| 15. Sum of Subarray Minimums (LeetCode 907) | **Count each element's reach,** strict on one side only |
| 16. Min Stack (LeetCode 155) | **Build one from another:** each entry stores the min below it |
| 17. Implement Queue using Stacks (LeetCode 232) | **Pour only when out is empty** (amortised O(1)) |
| 18. LRU Cache (LeetCode 146) | **Map + recency list** |
| 19. First non-repeating character in a stream (GFG) | **Queue of candidates** + counts; drop the front while it repeats |
| 20. Sliding Window Maximum (LeetCode 239) | **Monotonic deque;** the front expires by index |

### Score yourself

- **16–20:** you can say what the top means before writing a push
- **10–15:** reread 10-01's three reasons: nesting, cancellation, waiting
- **0–9:** redo 10-05 and 10-08 by hand on paper, then this table
