### Where it appears

| Problem | What the rolling hash compares |
|---|---|
| Find the Index of the First Occurrence (LeetCode 28) | pattern vs each window |
| Repeated DNA Sequences (LeetCode 187) | every length-10 window's hash |
| Longest Duplicate Substring (LeetCode 1044) | binary search length + hash windows |
| Longest Common Subpath (LeetCode 1923) | hash paths across arrays |

- **Go deeper:** KMP and the Z-algorithm match without hashing (no collision risk); both, with double hashing, are in Module 08.

:::interview
"Rolling hash can collide — why trust it?"

You do not trust the hash alone; you use it as a fast filter and verify the characters on every match. Equal substrings always hash equal, so no true match is missed; a spurious hash match is caught by the O(m) check. With a large modulus (or two moduli) collisions are rare enough that the verify almost never runs, keeping the scan effectively O(n).
:::
