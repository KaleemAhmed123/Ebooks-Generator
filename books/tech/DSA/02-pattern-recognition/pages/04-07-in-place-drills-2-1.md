## Recognition drills: In-Place & Index Tricks <span class="lv lv1"></span> - continued

| Problem | Trick & the enabling fact |
|---|---|
| 1. Reverse an Array (GFG) | **Two pointers from both ends,** swap until they cross; `n / 2` swaps |
| 2. Rotate Array (LeetCode 189) | **Reverse to rotate:** all, then the first k, then the rest; `k %= n` first |
| 3. Reverse Words in a String (LeetCode 151) | **Reverse to rotate** on words: reverse all, then each word |
| 4. First Missing Positive (LeetCode 41) | **Send each value home;** values that matter lie in `1..n` |
| 5. Find Missing and Repeating (GFG) | **Send each value home;** the one misplaced slot names both |
| 6. Find All Numbers Disappeared in an Array (LeetCode 448) | **Sign flags:** negate `a[|v| − 1]`; positive slots are missing |
| 7. Find All Duplicates in an Array (LeetCode 442) | **Sign flags:** if `a[|v| − 1]` is already negative, v is a duplicate |
| 8. Find the Duplicate Number (LeetCode 287) | **Not in place:** mutation is banned. Treat `i → a[i]` as a linked list and find the cycle entry (Chapter 12) |
| 9. Next Permutation (LeetCode 31) | **Find the dip,** swap with the rightmost larger value, reverse the suffix |
| 10. Majority Element (LeetCode 169) | **Vote and cancel;** a majority is promised, so no second pass |
| 11. Majority Element II (LeetCode 229) | **Vote and cancel** with two candidates, then verify |
| 12. Sort Colors (LeetCode 75) | **Dutch flag** (02-09): three regions, one pass |
| 13. Three way partitioning (GFG) | **Dutch flag** around a range `[a, b]` instead of the values 0, 1, 2 |
| 14. Minimum Swaps to Group All 1's Together II (LeetCode 2134) | **Wrap around** + fixed window of length `ones` |
| 15. Next Greater Element II (LeetCode 503) | **Wrap around** + monotonic stack over `2n` steps |
