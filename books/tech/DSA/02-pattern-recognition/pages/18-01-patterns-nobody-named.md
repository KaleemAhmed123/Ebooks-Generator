# Chapter 18 - Patterns Nobody Named

## Four Questions for an Unfamiliar Problem <span class="lv lv2"></span>

- **What it is:** four structures sit under most named techniques. They have no LeetCode tag, so nobody drills them, yet each is a question you can ask of a problem you have never seen
- **Signal:** you have read the statement twice, no chapter title fits, and the brute force is clear but too slow
- **Mechanism:** a named technique is one *answer* to a structural question. Ask the question and the answer follows: BFS, Dijkstra and Swim in Rising Water are one frontier; a monotonic stack and Car Fleet are one domination argument

### The four questions

| Question | Answer | Page |
|---|---|---|
| can I grow the answer from the best candidate so far? | a frontier: BFS, a heap | **18-02** |
| can I prove some candidates will never win? | throw them out: stack, deque, Pareto front | **18-06** |
| does a yes/no test flip once over the answers? | binary search the boundary | **09-02** |
| can one pass of preprocessing answer every query? | prefixes, tables | **03-02** |

Hard problems stack two answers: "shortest path skipping up to K edges" is a frontier over the state `(node, skipsUsed)`; "minimise the largest segment sum" is a boundary checked by a greedy scan.

### The trap

- **Matching on words, not structure.** "Maximum" does not mean heap and "subarray" does not mean window. Car Fleet mentions neither a stack nor a front, yet it is question 2 from the first line
