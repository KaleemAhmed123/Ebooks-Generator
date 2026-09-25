## Recognition drills: Strings 🟢

Most string problems are another chapter's pattern wearing text. Hide the right column and route each one: which chapter owns it, and what the string-specific twist is.

| Problem | Pattern & the twist |
|---|---|
| 1. Check if strings are rotations of each other (GFG) | **Signature:** `(s + s).includes(t)` with equal lengths |
| 2. Group Anagrams (LeetCode 49) | **Signature key:** 26 counts with separators |
| 3. Isomorphic Strings (LeetCode 205) | **Two-way map,** or equal shape signatures |
| 4. Word Pattern (LeetCode 290) | **Two-way map** plus a length check |
| 5. Longest Palindromic Substring (LeetCode 5) | **Grow from the centre,** odd and even centres |
| 6. Break a Palindrome (LeetCode 1328) | **Observation:** first non-`a` in the first half → `a`; else last char → `b` |
| 7. Longest Common Prefix (LeetCode 14) | **Vertical scan;** a trie only if prefix queries repeat |
| 8. Shortest unique prefix for every word (GFG) | **Walk the shared prefix** with pass-through counts |
| 9. Roman to Integer (LeetCode 13) | **Look one ahead:** subtract a symbol smaller than its right neighbour |
| 10. Integer to Roman (LeetCode 12) | **Greedy, largest symbol first,** with `CM`, `XC`, `IV` in the table |
| 11. Count and Say (LeetCode 38) | **Run-length simulation:** count equal neighbours, emit count + digit |
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
| 23. Orderly Queue (LeetCode 899) 🟡 | **Observation:** k = 1 → best rotation; k ≥ 2 → any order is reachable, so sort |
| 24. Text Justification (LeetCode 68) 🟡 | **Greedy line packing + simulation:** fill a line while words fit, spread the extra spaces left-first |
| 25. Edit Distance / LCS / Wildcard Matching | **String DP** (Chapter 17 → Module 06): two indices, one per string |

### Score yourself

- **21–25:** you route strings by structure, not by the word "string"
- **14–20:** review 06-01 and 06-03; many misses are a missing signature
- **0–13:** redo this table after Chapters 10 and 13, which own most of the rest
