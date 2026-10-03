### Where it appears

| Problem | What the fixed gap measures |
|---|---|
| [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) (LeetCode 19) | n + 1 gap lands slow before the target |
| [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/) (LeetCode 160) | switching heads equalises the gap |
| [Rotate List](https://leetcode.com/problems/rotate-list/) (LeetCode 61) | k % len from the end is the new head |
| [Swapping Nodes in a Linked List](https://leetcode.com/problems/swapping-nodes-in-a-linked-list/) (LeetCode 1721) | k-th from start and k-th from end |

:::interview
"In the intersection problem, why does switching to the other head when you reach null guarantee they meet?"

Pointer A walks `lenA + lenB` steps total (its own list, then B's). Pointer B walks `lenB + lenA`. They travel the same total distance, and the shared tail is the same length from both ends — so they arrive at the first shared node at the same step. If there is no intersection, both reach null together.
:::
