# Chapter 6 - Strings

## The String Family <span class="lv lv1"></span>

- **What it is:** Two patterns belong to strings alone. A *canonical key* turns "these strings are the same under a rule" into plain equality. *Growing from the centre* finds contiguous palindromes. Every other string problem is another chapter's pattern over characters
- **Signal:** "anagram", "same pattern", "rotation of", "isomorphic", "palindromic substring"
- **Why it works:** A key computed once per string makes grouping one hash-map pass instead of comparing every pair. A palindrome is symmetric about its centre, so growing outward from each of 2n − 1 centres finds every one

| Pattern | Page | What it does | Canonical problem |
|---|---|---|---|
| **13 · Canonical Keys** | **06-01 Signature Key** | one key per string, equal exactly when the rule says "same" | Group Anagrams (LeetCode 49) |
| | **06-03 Two-Way Map** | two maps check a bijection in one pass | Word Pattern (LeetCode 290) |
| **14 · Grow from the Centre** | **06-02** | expand from each centre while the ends match | Longest Palindromic Substring (LeetCode 5) |

| The statement says | Owned by | Go to |
|---|---|---|
| substring with at most / exactly k of something | a variable window | 02-03 · 02-05 |
| an anagram or permutation of p *inside* s | a fixed window | 02-02 |
| every vowel an even number of times in a substring | parity prefixes | 03-03 |
| brackets, "remove adjacent equal pairs" | a stack | 10-02 · 10-03 |
| subsequence, fewest edits, common subsequence | DP over two indices | 17-02 |
| split into pieces that each satisfy a rule | backtracking | 13-09 |

### The trap

- **"Palindrome" names three different problems.** Contiguous → centres (06-02). Characters may be skipped → range DP (17-02). Characters may be rearranged → only letter counts matter: at most one letter may have an odd count (03-03 when it is asked of every substring)
