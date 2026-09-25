## Recognition drills: Stacks & Queues <span class="lv lv1"></span> - continued

| Problem | Pattern & what the top means |
|---|---|
| 12. Next Greater Element (GFG) | **Waiting:** top = nearest element still without an answer |
| 13. Online Stock Span (LeetCode 901) | **Previous greater:** pop smaller-or-equal prices, span = distance to the new top |
| 14. Help Classmates / next smaller element (GFG) | **Waiting,** comparison flipped |
| 15. 132 Pattern (LeetCode 456) <span class="lv lv2"></span> | **Right to left:** each element acts as the "3"; values it pops become the best "2" so far |
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
