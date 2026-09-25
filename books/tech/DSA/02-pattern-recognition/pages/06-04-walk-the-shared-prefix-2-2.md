### Variations

- **Search Suggestions System (LeetCode 1268):** walk the typed prefix; at each node keep up to three smallest words passing through it. Sorting the input first and binary searching the prefix is an equally good trie-free answer
- **Replace Words (LeetCode 648):** mark nodes where a root ends; for each sentence word, walk until the first marked node and replace with that prefix
- **Longest Common Prefix (LeetCode 14):** one query, so no trie: compare column by column across all strings and stop at the first mismatch. A trie pays only when prefix questions repeat
- **Word Search II (LeetCode 212):** a trie of the search words steers a grid DFS (Chapter 13); a branch dies as soon as the path leaves the trie
- **Maximum XOR of Two Numbers (LeetCode 421) <span class="lv lv3"></span>:** a trie over *bits* instead of letters (Chapter 19)

### The failure

- **Comparing every pair of words.** For unique prefixes, pairwise longest-common-prefix is O(n² · L). The trie is O(total characters) to build and to query
- **Forgetting the "prefix of another word" case.** If `"do"` and `"dog"` are both in the list, the path of `"do"` never reaches count 1, and the answer is the whole word. The template's `while` ends at `w.length` and returns all of `"do"`, which is the only honest answer

:::interview
"When is a trie better than a hash set of words?" — When the queries are about prefixes rather than whole words. A hash set answers "is this word present" in O(L), but "how many words start with this" needs every word checked. A trie with pass-through counts answers it by walking L nodes, and the same structure serves autocomplete, unique prefixes and root replacement.
:::
