### The trap

- **Building the graph too literally:** In the Word Ladder example, a naive candidate will compare every word in the dictionary to every other word to build the adjacency list. If there are V = 10,000 words, V² = 100,000,000 comparisons. It will TLE (Time Limit Exceeded).
- **The fix:** Don't build an explicit graph by comparing nodes to nodes. Take a word, generate all possible 1-letter mutations (O(26 times text{length})), and check if the mutation exists in a `Set`. You dynamically discover edges instead of explicitly building them. This transitions us perfectly into *Implicit Graphs*.
