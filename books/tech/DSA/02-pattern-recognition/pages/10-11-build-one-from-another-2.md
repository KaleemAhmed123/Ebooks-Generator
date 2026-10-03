### Where it appears

| Problem | What you build and from what |
|---|---|
| [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) (LeetCode 232) | queue from two stacks (double reversal) |
| [Min Stack](https://leetcode.com/problems/min-stack/) (LeetCode 155) | stack + running min (push `[value, minSoFar]`) |
| [LRU Cache](https://leetcode.com/problems/lru-cache/) (LeetCode 146) | map for O(1) lookup + doubly-linked list for order |
| [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/) (LeetCode 380) | map for O(1) lookup + array for O(1) random |

:::interview
"In the LRU cache, why a doubly-linked list instead of singly-linked?"

Moving a node to the head requires removing it from its current position. Removing from a singly-linked list means finding the *previous* node — O(n) scan. A doubly-linked node holds its own `prev` pointer, so removal is O(1): unlink `prev ↔ node ↔ next` in two pointer writes, no traversal.
:::
