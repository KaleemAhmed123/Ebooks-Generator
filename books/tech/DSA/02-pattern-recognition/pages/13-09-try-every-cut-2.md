### Variations

- **Restore IP Addresses (LeetCode 93) / Generate IP Addresses (GFG):** exactly 4 pieces of length 1–3, each ≤ 255, no leading zero unless the piece is `"0"`. Prune when the remaining length exceeds `3 × (pieces left)`
- **Word Break II (LeetCode 140):** a piece is valid if it is a dictionary word. Memoise "all sentences for suffix `start`" when many partitions share suffixes
- **Different Ways to Add Parentheses (LeetCode 241):** cut the *expression* at every operator; recursively get all values of the left and right parts, and combine every pair. Memoise by substring
- **Split Array into Fibonacci Sequence (LeetCode 842):** pieces must obey `f[i] = f[i−1] + f[i−2]`; once two pieces are chosen the rest is forced, so the search is tiny. Reject leading zeros and values above 2³¹ − 1
- **Palindrome Partitioning II (LeetCode 132):** the *minimum* number of cuts. Enumerating partitions is exponential; DP over cut positions (17-05)

### The failure

- **Enumerating when only a count or a minimum is asked.** "How many ways" or "fewest cuts" means the suffix states repeat: memoise or tabulate instead of building every partition
- **Re-checking palindromes from scratch.** `isPal` costs O(n) and runs for every `(start, end)` pair the search reaches, again and again across branches. Precompute `pal[i][j]` once in O(n²) (expand around centres, page 06-02) and look it up

:::interview
"How do you enumerate all palindrome partitions?" — Backtracking on the first piece: for each end index, if `s[start..end]` is a palindrome, add it and recurse on the rest; remove it when the call returns. The output can be exponential in size, so the goal is only to avoid extra work per piece, for example with a precomputed palindrome table.
:::
