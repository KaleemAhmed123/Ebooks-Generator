## Suffix Structures 🔴

When a problem asks you to process *every single substring* of a massive string, you need a Suffix structure. A string of length 10⁵ has 10¹⁰ substrings. We must represent them in O(N) space.

### 1. The Suffix Trie

If you take all suffixes of `"banana"` (`"banana"`, `"anana"`, `"nana"`, `"ana"`, `"na"`, `"a"`) and insert them into a Trie, every path from the root to any node represents a unique substring!
- **Problem:** Building this takes O(N²) time and space. TLE.

### 2. The Suffix Array (O(N log N))

A Suffix Array is simply an array of the starting indices of all suffixes, sorted alphabetically.
For `"banana"`:
0: `a` (index 5)
1: `ana` (index 3)
2: `anana` (index 1)
3: `banana` (index 0)
4: `na` (index 4)
5: `nana` (index 2)
The Suffix Array is `[5, 3, 1, 0, 4, 2]`.

**The LCP Array:**
The Longest Common Prefix (LCP) array stores the length of the matching prefix between adjacent suffixes in the sorted Suffix Array.
`LCP[i]` = length of prefix shared by suffix `SA[i-1]` and `SA[i]`.

**The Magic Power:**
The number of *distinct* substrings in a string is exactly:
$ N(N+1)/2 - sum text{LCP}[i] $
(Total possible substrings, minus the ones that are duplicates because they share a prefix with their sorted neighbor).

### 3. The Suffix Automaton (O(N))

A Suffix Automaton is a Directed Acyclic Graph (DAG) that perfectly recognizes all substrings of a string in exactly O(N) time and O(N) states (nodes).
It groups substrings into "equivalence classes" based on their end positions.

**When to use Suffix Automaton:**
- Finding the lexicographically K-th substring.
- Finding the first occurrence of a pattern dynamically as the text is being built.
- Counting the number of occurrences of every possible substring.

*Implementation Note:* Building a Suffix Array or Suffix Automaton is roughly 50-80 lines of highly specific code. In CP, you do not derive this during a contest; you copy-paste it from your pre-written library and use it as a black box. If you are preparing for standard SWE interviews, **skip these structures entirely**. You will never be asked to write a Suffix Automaton at Google.
