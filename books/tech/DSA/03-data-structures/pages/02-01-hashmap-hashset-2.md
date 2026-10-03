### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1) | Hash map turns O(N^2) pair search into O(N) |
| [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) (LeetCode 217) | Hash set for O(1) existence check |
| [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (LeetCode 128) | Hash set enables O(1) neighbor lookups |
| [Design HashMap](https://leetcode.com/problems/design-hashmap/) (LeetCode 706) | Implement chaining and hash function from scratch |

:::interview
"How does a Hash Map resize itself?"

Similar to a Dynamic Array. When the map gets too full (measured by the 'Load Factor', usually around 70% capacity), it allocates a new, larger array. It must then re-hash every single key from the old map and place them into the new array, because the array bounds (and thus the modulo arithmetic of the hash function) have changed. This is an O(N) operation.
:::
