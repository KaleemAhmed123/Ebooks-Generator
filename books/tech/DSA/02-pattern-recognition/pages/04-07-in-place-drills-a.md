## Recognition drills: In-Place & Index Tricks 🟢

Hide the right column. For each problem name the trick, and say which fact about the input makes it legal: the value range, the order, or permission to mutate.

| Problem | Trick & the enabling fact |
|---|---|
| 1. Reverse an Array (GFG) | **Two pointers from both ends,** swap until they cross; `n / 2` swaps |
| 2. Cyclically rotate an array by one (GFG) | **Save the last, shift right,** write it at index 0 |
| 3. Rotate Array (LeetCode 189) | **Reverse to rotate:** all, then the first k, then the rest; `k %= n` first |
| 4. Reverse Words in a String (LeetCode 151) | **Reverse to rotate** on words: reverse all, then each word |
| 5. First Missing Positive (LeetCode 41) | **Send each value home;** values that matter lie in `1..n` |
| 6. Find Missing and Repeating (GFG) | **Send each value home;** the one misplaced slot names both |
| 7. Find All Numbers Disappeared in an Array (LeetCode 448) | **Sign flags:** negate `a[|v| − 1]`; positive slots are missing |
| 8. Find All Duplicates in an Array (LeetCode 442) | **Sign flags:** if `a[|v| − 1]` is already negative, v is a duplicate |
| 9. Find the Duplicate Number (LeetCode 287) | **Not in place:** mutation is banned. Treat `i → a[i]` as a linked list and find the cycle entry (Chapter 12) |
| 10. Minimum swaps to sort an array (GFG) | **Follow cycles:** `n − cycles`, with each value mapped to its sorted index |
| 11. Next Permutation (LeetCode 31) | **Find the dip,** swap with the rightmost larger value, reverse the suffix |
