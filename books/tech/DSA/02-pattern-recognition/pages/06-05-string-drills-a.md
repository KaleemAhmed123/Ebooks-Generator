## Recognition drills: Strings <span class="lv lv1"></span>

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
