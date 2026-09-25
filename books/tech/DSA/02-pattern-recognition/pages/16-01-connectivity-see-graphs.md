# Chapter 16 - Graphs & Dependency

## Connectivity? See Graphs <span class="lv lv1"></span>

- **What it is:** The statement describes relationships between items rather than a sequence: "A is friends with B", "course C needs course D", "these accounts share an email". The items are nodes, the relationships are edges, and the question is about reaching, grouping, ordering or paying along them
- **Signal:** items numbered 0 to n − 1 with pairs, "connected", "reachable", "minimum steps", "X must come before Y", "share something in common", "within range"
- **Why it works:** Once the edge is named, the rest is a standard question with a standard answer: reachability and components (BFS / DFS / union–find), shortest paths (BFS, Dijkstra), order (topological sort). Module 05 teaches each of those in full

### This chapter

- **16-02 Find the hidden edge:** the statement never says "edge"; a shared attribute, a range or a ratio does
- **16-03 Flood from the border:** enclosed regions, answered by flooding what is *not* enclosed
- **16-04 Dependency:** "X before Y" becomes a DAG; order it, then run DP along the order
- **16-09 Drills:** 23 named problems, each reduced to node, edge and move

### The failure

- **Building the graph literally.** Comparing every pair of items to find edges is O(n²) before the search starts. Generate neighbours on the fly (Word Ladder: all one-letter changes, Module 05 01-03) or index by the shared attribute (16-02)
