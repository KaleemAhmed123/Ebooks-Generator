### Where it appears

| Problem | The question asked of the set |
|---|---|
| [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1) | is `target − x` already seen? |
| [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (LeetCode 128) | is `x − 1` absent (a run start)? |
| [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) (LeetCode 217) | has this value appeared before? |

:::interview
"Longest Consecutive Sequence has a `while` loop inside a `for` loop. Why is it O(n), not O(n²)?"

Because the inner walk only ever runs from a value whose predecessor is missing — a run's smallest element — and each value is the start of at most one run. Across the whole scan, the inner `while` advances through each element exactly once in total, so the combined work is O(n). The nested loops look quadratic but the start-guard caps total inner iterations at n. Sorting would also solve it but costs O(n log n); the set trades that for O(n) time and O(n) space.
:::
