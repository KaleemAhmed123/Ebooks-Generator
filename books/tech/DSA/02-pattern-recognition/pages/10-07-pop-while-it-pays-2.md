### Variations

- **Remove Duplicate Letters (LeetCode 316) / Smallest Subsequence of Distinct Characters (LeetCode 1081):** each letter must appear exactly once. Skip a letter already in the stack; pop the top while it is larger *and it appears again later* (that is the budget: a later copy can replace it)
- **Find the Most Competitive Subsequence (LeetCode 1673):** keep exactly k items. Pop while the top is larger and `stack.length − 1 + (items left, including this one) ≥ k`
- **Largest number after removing k digits:** flip the comparison: pop while the top is *smaller*
- **Create Maximum Number (LeetCode 321) 🔴:** best subsequence of each length from two arrays, then merge; this page's routine is the inner step

### The failure

- **Forgetting the leftover budget.** On an increasing number like `"12345"` with k = 2 nothing is ever popped. The deletions must come off the *end*: `"123"`
- **Leading zeros.** `"10200"` with k = 1 pops the 1 and leaves `"0200"`; the answer is `"200"`. And if everything is deleted, return `"0"`, not `""`
- **Sorting the digits.** The digits must stay in their original order; only deletions are allowed. Sorting answers a different question

:::interview
"Why is it correct to delete a larger digit the moment a smaller one arrives?" — The first position where two candidates differ decides which is smaller. If a digit is followed by a smaller one, deleting it makes that earlier position smaller, and no later change can undo that advantage. So with deletions left, removing the earliest such digit is always part of some optimal answer.
:::
