## Walk the Shared Prefix <span class="lv lv2"></span>

- **What it is:** Put all the words in a trie (a tree where each edge is one character and each path from the root spells a prefix) and store a small fact on every node: how many words pass through it, or whether a word ends there. Then each question is one walk down from the root
- **Signal:** "shortest unique prefix for every word", "suggest words as the user types", "replace each word with its shortest root", "many words, many prefix queries"
- **Why it works:** Words that share a prefix share a path, so the work of reading that prefix is done once for all of them. A per-node count answers "how many words start like this?" at every depth of the walk. Module 03 builds the trie itself; this page is about what to store on the nodes
