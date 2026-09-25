## Recognition drills: Stacks & Queues 🟢

Hide the right column. Say what the top of the stack (or the front of the queue) *means*, and what event removes it.

| Problem | Pattern & what the top means |
|---|---|
| 1. Valid Parentheses (LeetCode 20) | **Nesting:** top = the bracket that must close next |
| 2. Minimum Add to Make Parentheses Valid (LeetCode 921) | **Counter:** one bracket type, the height is all you need |
| 3. Longest Valid Parentheses (LeetCode 32) | **Counter, two passes** (O(1) space), or a stack holding the last unmatched index |
| 4. Expression contains redundant brackets (GFG) | **Nesting:** on `)`, pop to `(`; no operator popped → redundant |
| 5. Evaluation of Postfix Expression (GFG / LeetCode 150) | **Operands wait;** an operator pops two, pushes one |
| 6. Infix to Postfix (GFG) | **Operators wait** while the incoming one has lower or equal precedence (left-associative) |
| 7. Decode String (LeetCode 394) | **Push the context:** `(string so far, repeat count)` |
| 8. Basic Calculator II (LeetCode 227) | **Terms wait;** `*` and `/` combine with the top at once |
| 9. Simplify Path (LeetCode 71) | **Directories;** `..` pops |
| 10. Asteroid Collision (LeetCode 735) | **Cancel against the top** in a `while` |
| 11. Remove K consecutive duplicates (GFG) / LeetCode 1209 | **Cancel against the top** with `(char, run length)` |
| 12. Next Greater Element (GFG) | **Waiting:** top = nearest element still without an answer |
| 13. Online Stock Span (LeetCode 901) | **Previous greater:** pop smaller-or-equal prices, span = distance to the new top |
| 14. Help Classmates / next smaller element (GFG) | **Waiting,** comparison flipped |
| 15. 132 Pattern (LeetCode 456) 🟡 | **Right to left:** a stack of candidates for "3"; each pop raises the best "2" seen so far |
| 16. Remove K Digits (LeetCode 402) | **Pop while it pays,** k is the budget |
| 17. Largest Rectangle in Histogram (LeetCode 84) | **Reach:** a popped bar's width runs from the new top to the bar that popped it |
| 18. Maximal Rectangle (LeetCode 85) | **Stack the rows** |
| 19. Sum of Subarray Minimums (LeetCode 907) | **Count each element's reach,** strict on one side only |
| 20. Maximum of minimum for every window size (GFG) | **Reach** gives each element's window length |
| 21. The Celebrity Problem (GFG) | **Elimination:** `knows(a, b)` rules out a or b; one candidate survives, then verify it |
| 22. Min Stack (LeetCode 155) | **Build one from another:** each entry stores the min below it |
| 23. Implement Queue using Stacks (LeetCode 232) | **Pour only when out is empty** (amortised O(1)) |
| 24. LRU Cache (LeetCode 146) | **Map + recency list** |
| 25. First non-repeating character in a stream (GFG) | **Queue of candidates** + counts; drop the front while it repeats |
| 26. Reverse First K elements of Queue (GFG) | **Stack reverses k,** then rotate the other `n − k` to the back |
| 27. Sliding Window Maximum (LeetCode 239) | **Monotonic deque;** the front expires by index |
| 28. First negative integer in every window of size k (GFG) | **Queue of negative indices;** drop expired ones from the front |
| 29. Rotting Oranges / Distance of nearest cell having 1 | **Queue as BFS frontier,** all sources at time 0 (Chapter 16) |
| 30. Implement N stacks in an array (GFG) 🔴 | **Free list:** `next[]` links each slot to the one below it or to the next free slot |

### Score yourself

- **25–30:** you can say what the top means before writing a push
- **16–24:** reread 10-01's three reasons: nesting, cancellation, waiting
- **0–15:** redo 10-05 and 10-08 by hand on paper, then this table
