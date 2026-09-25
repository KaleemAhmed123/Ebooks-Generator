## Recognition drills: Recursion & Backtracking <span class="lv lv1"></span> - continued

| Problem | Template & next call |
|---|---|
| 12. Subsets II (LeetCode 90) | **Loop + skip equal siblings,** record every node |
| 13. Combination Sum (LeetCode 39) | **Stay:** `go(i, rem − c[i])` |
| 14. Combination Sum II (LeetCode 40) | **Loop + skip,** `go(i + 1)` |
| 15. Combination Sum IV (LeetCode 377) | **Restart at 0** + memo: order matters |
| 16. Count Sorted Vowel Strings (LeetCode 1641) | **Stay:** vowels in non-decreasing order, `go(v)`; closed form `C(n + 4, 4)` |
| 17. Count All Possible Routes (LeetCode 1575) | **Restart at 0** over cities + memo `(city, fuel)` |
| 18. Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239) | **Pick or skip** with a letter mask; explore skip even when pick is legal |
| 19. Permutations (LeetCode 46) / Permutations II (LeetCode 47) | **Fill the slots;** for duplicates skip when the left twin is unused |
| 20. Letter Combinations of a Phone Number (LeetCode 17) | **Fill the slots,** each slot its own pool |
| 21. Generate Parentheses (LeetCode 22) | **Fill the slots:** `(` while `open < n`, `)` while `close < open` |
| 22. Palindrome Partitioning (LeetCode 131) | **Try every cut** |
| 23. Restore IP Addresses (LeetCode 93) | **Try every cut,** 4 pieces, prune by remaining length |
| 24. Different Ways to Add Parentheses (LeetCode 241) | **Cut at every operator,** combine both sides |
| 25. Remove Invalid Parentheses (LeetCode 301) <span class="lv lv2"></span> | **Count the excess `(` and `)` first,** then remove exactly that many, skipping equal neighbours |
