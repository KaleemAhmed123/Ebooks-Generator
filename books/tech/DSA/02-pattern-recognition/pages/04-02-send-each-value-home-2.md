### Where it appears

| Problem | What the home-placement reveals |
|---|---|
| [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) (LeetCode 41) | first slot without its owner = first missing |
| [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) (LeetCode 448) | sign-flag variant: negate `a[|v| − 1]`; positive slots are missing |
| [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) (LeetCode 442) | already-negative slot = a repeat |
| [Set Mismatch](https://leetcode.com/problems/set-mismatch/) (LeetCode 645) | the one misplaced slot holds the repeat; its index + 1 is the missing |

:::interview
"Why not just sort and scan?"

Sorting is O(n log n). The swap-to-home trick is O(n) — each value moves at most once to its home slot. And it uses O(1) extra space, which sorting (without extra arrays) also claims but cannot always deliver for stability. The constraint "values in 1..n" is what makes it possible: each value has exactly one correct position.
:::
