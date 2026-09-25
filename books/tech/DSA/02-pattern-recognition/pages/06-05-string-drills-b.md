## Recognition drills: Strings <span class="lv lv1"></span> - continued

| Problem | Pattern & the twist |
|---|---|
| 12. Minimum number of flips to make a binary string alternate (GFG) | **Two targets:** count mismatches against `0101…`, answer `min(x, n − x)` |
| 13. Add Binary (LeetCode 67) | **Carry from the right,** two pointers of different lengths |
| 14. Compare Version Numbers (LeetCode 165) | **Split and pad:** missing revisions count as 0 |
| 15. Longest Word in Dictionary through Deleting (LeetCode 524) / largest word by deleting characters (GFG) | **Subsequence check** with two pointers per word; ties by length then lexicographic order |
| 16. Smallest window containing all characters of another string (GFG) / Minimum Window Substring (LeetCode 76) | **Variable window, shortest** (Chapter 2) |
| 17. Smallest distinct window (GFG) | **Variable window, shortest,** target = all distinct characters of the string |
| 18. Decode String (LeetCode 394) | **Push the context** (Chapter 10): a stack of `(string so far, repeat count)` |
| 19. Recursively remove all adjacent duplicates (GFG) | **Cancel against the top** (Chapter 10) |
| 20. Minimum bracket reversals to balance (GFG) | **Count the balance** (Chapter 10); odd length is impossible |
| 21. Generate IP Addresses (GFG) / Restore IP Addresses (LeetCode 93) | **Try every cut** (Chapter 13), 4 parts, no leading zeros, ≤ 255 |
| 22. Rearrange characters so no two adjacent are the same (GFG) / Reorganize String (LeetCode 767) | **Heap of counts** (Chapter 15); impossible if the top count > ⌈n/2⌉ |
