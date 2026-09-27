# Chapter 16 - Graphs & Dependency

## Connectivity? See Graphs <span class="lv lv1"></span>

- **What it is:** The statement describes relationships between items rather than a sequence: "A is friends with B", "course C needs course D", "these accounts share an email". The items are nodes, the relationships are edges, and the question is about reaching, grouping, ordering or paying along them
- **Signal:** items numbered 0 to n − 1 with pairs, "connected", "reachable", "minimum steps", "X must come before Y", "share something in common", "within range"
- **Why it works:** Once the edge is named, the rest is a standard question with a standard answer: reachability and components (BFS / DFS / union–find), shortest paths (BFS, Dijkstra), order (topological sort). Module 05 teaches each of those in full

### This chapter

- **Pattern 46 · Find the Hidden Edge (16-02):** the statement never says "edge"; a shared attribute, a range or a ratio does
- **Pattern 47 · Flood from the Border (16-03):** enclosed regions, answered by flooding what is *not* enclosed
- **Dependency (16-04):** "X before Y" becomes a DAG; order it, then compute along the order. It routes to Module 05 and adds the critical path
- **Drills (16-09):** 12 disguised statements

### The failure

- **Building the graph literally.** Comparing every pair of items to find edges is O(n²) before the search starts. Generate neighbours on the fly (Word Ladder: all one-letter changes, Module 05 01-03) or index by the shared attribute (16-02)
