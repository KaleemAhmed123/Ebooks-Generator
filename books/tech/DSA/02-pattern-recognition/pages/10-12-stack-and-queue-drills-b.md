## Recognition drills: Stacks & Queues <span class="lv lv1"></span> - continued

| Problem | Pattern & what the top means |
|---|---|
| 12. [Remove K Digits](https://leetcode.com/problems/remove-k-digits/) (LeetCode 402) | **Pop while it pays,** k is the budget |
| 13. [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) (LeetCode 84) | **Reach:** a popped bar's width runs from the new top to the bar that popped it |
| 14. [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) (LeetCode 85) | **Stack the rows** |
| 15. [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) (LeetCode 907) | **Count each element's reach,** strict on one side only |
| 16. [Min Stack](https://leetcode.com/problems/min-stack/) (LeetCode 155) | **Build one from another:** each entry stores the min below it |
| 17. [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) (LeetCode 232) | **Pour only when out is empty** (amortised O(1)) |
| 18. [LRU Cache](https://leetcode.com/problems/lru-cache/) (LeetCode 146) | **Map + recency list** |
| 19. [Stream First Non-repeating](https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1) (GFG) | **Queue of candidates** + counts; drop the front while it repeats |
| 20. [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239) | **Monotonic deque;** the front expires by index |

### Score yourself

- **16–20:** you can say what the top means before writing a push
- **10–15:** reread 10-01's three reasons: nesting, cancellation, waiting
- **0–9:** redo 10-05 and 10-08 by hand on paper, then this table
