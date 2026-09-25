## Recognition drills: Strings <span class="lv lv1"></span>

Most string problems are another chapter's pattern wearing text. Hide the right column and route each one: which chapter owns it, and what the string-specific twist is.

| Problem | Pattern & the twist |
|---|---|
| 1. Check if strings are rotations of each other (GFG) | **Signature:** `(s + s).includes(t)` with equal lengths |
| 2. Group Anagrams (LeetCode 49) | **Signature key:** 26 counts with separators |
| 3. Isomorphic Strings (LeetCode 205) | **Two-way map,** or equal shape signatures |
| 4. Word Pattern (LeetCode 290) | **Two-way map** plus a length check |
| 5. Longest Palindromic Substring (LeetCode 5) | **Grow from the centre,** odd and even centres |
| 6. Longest Common Prefix (LeetCode 14) | **Vertical scan;** a trie only if prefix queries repeat |
| 7. Roman to Integer (LeetCode 13) | **Look one ahead:** subtract a symbol smaller than its right neighbour |
| 8. Integer to Roman (LeetCode 12) | **Greedy, largest symbol first,** with `CM`, `XC`, `IV` in the table |
| 9. Add Binary (LeetCode 67) | **Carry from the right,** two pointers of different lengths |
| 10. Longest Word in Dictionary through Deleting (LeetCode 524) / largest word by deleting characters (GFG) | **Subsequence check** with two pointers per word; ties by length then lexicographic order |
| 11. Smallest window containing all characters of another string (GFG) / Minimum Window Substring (LeetCode 76) | **Variable window, shortest** (Chapter 2) |
| 12. Decode String (LeetCode 394) | **Push the context** (Chapter 10): a stack of `(string so far, repeat count)` |
| 13. Recursively remove all adjacent duplicates (GFG) | **Cancel against the top** (Chapter 10) |
| 14. Generate IP Addresses (GFG) / Restore IP Addresses (LeetCode 93) | **Try every cut** (Chapter 13), 4 parts, no leading zeros, ≤ 255 |
| 15. Rearrange characters so no two adjacent are the same (GFG) / Reorganize String (LeetCode 767) | **Heap of counts** (Chapter 15); impossible if the top count > ⌈n/2⌉ |
| 16. Edit Distance / LCS / Wildcard Matching | **String DP** (Chapter 17 → Module 06): two indices, one per string |

### Score yourself

- **13–16:** you route strings by structure, not by the word "string"
- **8–12:** review 06-01 and 06-03; many misses are a missing signature
- **0–7:** redo this table after Chapters 10 and 13, which own most of the rest
