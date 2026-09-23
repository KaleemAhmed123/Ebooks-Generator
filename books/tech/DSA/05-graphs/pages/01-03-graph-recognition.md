## Graph Recognition

- **Thesis:** Half of hard interview problems are graph problems in disguise. The skill is not running Dijkstra—it's recognizing that the problem IS a graph.
- If a problem explicitly hands you `nodes` and `edges`, it's an easy graph problem. If it hands you words, locks, or states, it's a hard graph problem.

### The Translation Guide

You must train your brain to translate domain-specific words into Graph Theory.

| If the problem talks about... | Translate it to... |
| :--- | :--- |
| "States", "Configurations", "Rooms", "Cities", "Words" | **Nodes** |
| "Transformations", "Operations", "Moves", "Differs by 1 letter" | **Edges** |
| "Can we reach...", "Is it possible to..." | **Connectivity (DFS/BFS)** |
| "What is the minimum number of operations to...", "Shortest sequence..." | **Shortest Path (BFS on unweighted)** |
| "Must happen before", "Prerequisites", "Dependencies" | **Directed Edges / Topological Sort** |

### Example: Word Ladder

- **Problem:** Given a `startWord`, an `endWord`, and a dictionary, find the shortest transformation sequence from `start` to `end`. You can change only one letter at a time, and every intermediate word must exist in the dictionary.
- **Graph Recognition:**
  - Words = **Nodes**
  - "Change one letter" = **Edges** (e.g., `HIT` has an undirected edge to `HOT`).
  - "Shortest transformation sequence" = **Shortest Path in an unweighted graph**.
- **Solution:** It's not a string manipulation problem. It's a textbook Breadth-First Search (BFS).

### The trap

- **Building the graph too literally:** In the Word Ladder example, a naive candidate will compare every word in the dictionary to every other word to build the adjacency list. If there are V = 10,000 words, V² = 100,000,000 comparisons. It will TLE (Time Limit Exceeded).
- **The fix:** Don't build an explicit graph by comparing nodes to nodes. Take a word, generate all possible 1-letter mutations (O(26 times text{length})), and check if the mutation exists in a `Set`. You dynamically discover edges instead of explicitly building them. This transitions us perfectly into *Implicit Graphs*.
