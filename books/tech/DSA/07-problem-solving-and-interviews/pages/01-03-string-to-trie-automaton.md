## Transformation: String Array to Trie

When a problem asks you to repeatedly search, prefix-match, or compare a large set of strings, comparing them individually is O(N · M) where N is the number of strings and M is string length. 
We transform the flat array into a hierarchical tree.

### The Signal

- "Autocomplete system..."
- "Find all words starting with..."
- "Longest common prefix among..."
- "Boggle / Word Search II" (Searching a grid against a dictionary).

### The Mapping

- **Input:** `["cat", "car", "cart", "dog"]`
- **Transformation:** A Prefix Tree (Trie). Nodes represent single characters. Paths represent words.
- **Why it works:** It compresses shared prefixes. "car" and "cart" share the `c-a-r` path, meaning we only traverse those characters once.

### Canonical Example: Word Search II

- **Problem:** Given an `m x n` board of characters and a list of `words`, return all words on the board.
- **The Trap:** Running standard DFS backtracking for *every single word* in the list. Complexity becomes O(W · 4L) where W is number of words.
- **The Transformation:**
  - Build a Trie out of the `words` list.
  - Run DFS on the board. Instead of passing a target string to the DFS, pass a Trie Node pointer.
- **The Execution:**
  - As you move around the board, move the pointer down the Trie.
  - If the Trie pointer hits `null`, immediately prune the DFS (this path on the board cannot form any word in the dictionary).
  - If the Trie pointer hits a node where `isWord` is true, you found a word.
- **The Result:** The complexity drops drastically because the Trie prunes invalid board paths instantly for *all words simultaneously*.
