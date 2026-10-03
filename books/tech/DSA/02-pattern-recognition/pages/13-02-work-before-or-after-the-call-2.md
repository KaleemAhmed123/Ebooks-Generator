### Where it appears

| Problem | Before or after the call |
|---|---|
| [Plus One Linked List](https://leetcode.com/problems/plus-one-linked-list/) (LeetCode 369) | after — carry propagates on the way back up |
| [Double a Number Represented as a Linked List](https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/) (LeetCode 2816) | after — same idea, multiply then carry |
| Tree traversals (14-01) | post-order = work after both children return |

:::interview
"Why can't you just reverse the list, add, and reverse back instead of using recursion?"

You can — and it is O(n) time, O(1) space, arguably simpler. The recursive version is O(n) space (the call stack). Choose recursion when the interviewer bans modification of the list, or when you need to show you understand how the call stack acts as an implicit reversal.
:::
