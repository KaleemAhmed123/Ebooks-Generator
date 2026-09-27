### Where the questions come from

- Module 01, pages 02-05 to 02-08 derive three of them from a brute force: eliminate candidates (question 2), preprocess (question 4), exploit monotonicity (question 3), then a worked example. This chapter does not repeat the derivation; it adds the frontier and gives the two patterns with no chapter of their own a page each

### This chapter

- **Pattern 52 · Maintain the Frontier (18-02):** question 1, the loop under BFS and Dijkstra
- **Pattern 53 · Throw Out the Dominated (18-06):** question 2, the proof under monotonic stacks and Pareto fronts
- **Drills (18-20):** 12 statements from Chapters 14 to 19, three per question, shuffled

### Combining them

- Hard problems stack two answers. "Shortest path when you may skip up to K edges" is a frontier (question 1) over an enlarged state `(node, skipsUsed)`. "Minimum largest segment sum" is a boundary (question 3) whose check is a greedy scan

### The failure

- **Matching on words instead of structure.** "Maximum" does not mean heap and "subarray" does not mean sliding window. Car Fleet mentions neither a stack nor a front, yet it is question 2 from the first line
