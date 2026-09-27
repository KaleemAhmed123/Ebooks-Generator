## The Dependency Family <span class="lv lv1"></span>

- **What it is:** One action unlocks another, so the work forms a **DAG** (directed graph with no cycle). The answer is an order that respects every edge, or a value computed along that order
- **Signal:** "prerequisites", "build order", "X must finish before Y", "minimum time if independent tasks run in parallel", "the order of letters implied by a sorted word list"
- **Why it works:** A node with no unfinished prerequisite (in-degree 0) is always safe to process next. Processing it can only lower its neighbours' in-degrees, so the frontier never gets stuck unless a cycle exists

### Where each question is worked

| Question | Move | Read |
|---|---|---|
| Valid order? Any cycle? | Kahn's queue; fewer than n nodes output means a cycle | Module 05, 06-01 |
| Order by recursion | Post-order DFS, reversed | Module 05, 06-02 |
| Longest / counted paths | DP in topological order | Module 05, 06-03 |
| Minimum time with parallel tasks | Critical path, below | this page |

### Critical path in one line

- **Parallel Courses III (LeetCode 2050):** in Kahn order, `finish[v] = time[v] + max(finish[u])` over prerequisites u; the answer is the largest `finish`. With unit times it is the number of Kahn rounds. The longest chain of dependencies, not the number of tasks, sets the finish time
