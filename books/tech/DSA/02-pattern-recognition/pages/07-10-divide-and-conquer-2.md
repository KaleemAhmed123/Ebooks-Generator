### Where it appears

| Problem | The cut and combine |
|---|---|
| Different Ways to Add Parentheses (LeetCode 241) | cut at each operator, combine by it |
| Sort an Array (LeetCode 912) | split in half, merge sorted halves |
| Count of Smaller Numbers After Self (LeetCode 315) | count across the merge → 07-08 |
| Maximum Subarray (LeetCode 53) | left, right, or crossing the middle |
| Beautiful Array (LeetCode 932) | odds and evens built recursively |

- **Go deeper:** merge sort and quicksort mechanics are Module 04; divide-and-conquer DP optimisation is Module 06.

:::interview
"When is divide & conquer the right frame instead of DP?"

Divide & conquer fits when the sub-parts are independent — the answer combines cleanly from disjoint halves and no subproblem repeats. The moment different splits reuse the same subproblem, you memoise, and it is DP. Merge sort is pure divide & conquer; Different Ways to Add Parentheses needs the memo because sub-expressions recur.
:::
