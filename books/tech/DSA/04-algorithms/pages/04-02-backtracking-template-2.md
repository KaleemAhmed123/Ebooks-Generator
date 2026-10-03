### Why undo matters

- Without undoing, the state from one branch leaks into the next. If you push `2` onto the path for the left branch and forget to pop it, the right branch starts with a stale `2` already in the path
- In JavaScript, this is where bugs hide: pushing to an array but forgetting to pop, or adding to a Set but forgetting to delete. If you use an **immutable slice** (`[...path, choice]`) instead of mutation, the undo is free — but you pay O(n) per call to copy the array

### When backtracking is the right tool

- The problem asks for **all** valid configurations (permutations, combinations, subsets, placements)
- The constraint space is small: n ≤ 15–20 (exponential search is feasible)
- A greedy approach fails because choices interact — picking one element affects which others are valid

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78) | Enumerate all subsets via include/exclude |
| [Permutations](https://leetcode.com/problems/permutations/) (LeetCode 46) | Generate all orderings with choose-recurse-undo |
| [Combinations](https://leetcode.com/problems/combinations/) (LeetCode 77) | Pick k items from n using backtracking |
| [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) (LeetCode 17) | Branch on each digit's letter options |

:::interview
"How do you decide between backtracking and DP?"

If every decision is independent of the path you took to get there (only the current state matters), use DP — it caches repeated states. If the path itself matters (the same state reached via different paths gives different answers), you need backtracking. Permutations need backtracking; shortest paths need DP.
:::
