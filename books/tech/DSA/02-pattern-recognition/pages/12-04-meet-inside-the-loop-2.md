### Where it appears

| Problem | What forms the "linked list" |
|---|---|
| [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) (LeetCode 142) | actual node pointers |
| [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) (LeetCode 287) | `i → nums[i]` — the array is the list |
| [Happy Number](https://leetcode.com/problems/happy-number/) (LeetCode 202) | digit-square sequence — cycle means not happy |

:::interview
"In Find the Duplicate Number, why start both pointers at index 0, not at nums[0]?"

Index 0 is the entry point — no value maps *to* 0 (values are 1..n), so 0 is guaranteed to be outside the cycle, acting as the "head" of the list. Starting at `nums[0]` skips the tail and may place both pointers inside the cycle immediately, which breaks the phase-2 algebra that relies on walking `a` steps from outside the cycle.
:::
