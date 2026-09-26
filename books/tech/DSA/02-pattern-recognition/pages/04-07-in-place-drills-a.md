## Recognition drills: In-Place & Index Tricks <span class="lv lv1"></span>

Hide the right column. For each problem name the trick, and say which fact about the input makes it legal: the value range, the order, or permission to mutate.

| Problem | Trick & the enabling fact |
|---|---|
| 1. [Reverse Array](https://www.geeksforgeeks.org/problems/reverse-an-array/1) (GFG) | **Two pointers from both ends,** swap until they cross; `n / 2` swaps |
| 2. [Rotate Array](https://leetcode.com/problems/rotate-array/) (LeetCode 189) | **Reverse to rotate:** all, then the first k, then the rest; `k %= n` first |
| 3. [Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) (LeetCode 151) | **Reverse to rotate** on words: reverse all, then each word |
| 4. [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) (LeetCode 41) | **Send each value home;** values that matter lie in `1..n` |
| 5. [Missing And Repeating](https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1) (GFG) | **Send each value home;** the one misplaced slot names both |
| 6. [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) (LeetCode 448) | **Sign flags:** negate `a[|v| − 1]`; positive slots are missing |
| 7. [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) (LeetCode 442) | **Sign flags:** if `a[|v| − 1]` is already negative, v is a duplicate |
| 8. [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) (LeetCode 287) | **Not in place:** mutation is banned. Treat `i → a[i]` as a linked list and find the cycle entry (Chapter 12) |
| 9. [Next Permutation](https://leetcode.com/problems/next-permutation/) (LeetCode 31) | **Find the dip,** swap with the rightmost larger value, reverse the suffix |
| 10. [Majority Element](https://leetcode.com/problems/majority-element/) (LeetCode 169) | **Vote and cancel;** a majority is promised, so no second pass |
| 11. [Majority Element II](https://leetcode.com/problems/majority-element-ii/) (LeetCode 229) | **Vote and cancel** with two candidates, then verify |
