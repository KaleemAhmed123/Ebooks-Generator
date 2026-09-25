### Variations

- **Print all subsequences of a string (GFG):** the same tree on characters; the leaf is `cur.join("")`
- **Count subsets with sum K / Target Sum (LeetCode 494):** return counts instead of collecting. The state `(i, remaining)` repeats across branches, so memoising it turns 2ⁿ calls into O(n · K): pick-or-skip is where most knapsack DPs are born (Chapter 17)
- **Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239):** "pick" is allowed only if the word has no repeated letter and shares none with the current mask. Keep exploring *skip* even when pick is allowed: picking now can block a better pick later
- **Ones and Zeroes (LeetCode 474):** pick costs `(zeros, ones)` from two budgets; again memoise `(i, m, n)`
- **Subset sums in sorted order (GFG):** the leaves' sums; sort at the end, or generate them by merging (Chapter 19, meet in the middle, for n up to 40)

### The failure

- **Pushing the working array itself.** `out.push(cur)` stores one shared array 2ⁿ times; after the recursion finishes every entry is the same (empty) array. Push a copy at the leaf
- **Forgetting to undo.** Without `cur.pop()`, the "skip" branch still contains the picked item, and the output is wrong from the second leaf on

:::interview
"What is the complexity of generating all subsets?" — There are 2ⁿ subsets, and copying each one costs up to n, so O(n · 2ⁿ) time and O(n) extra space for the recursion and the working array. It is fine for n ≤ 20. If the question only asks for a *count* or a *best* subset under a numeric budget, the repeated `(index, budget)` states mean DP, not enumeration.
:::
