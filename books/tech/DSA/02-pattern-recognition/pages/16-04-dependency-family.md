## The Dependency Family <span class="lv lv1"></span>

- **What it is:** One action unlocks another, so the work forms a **DAG** (directed graph with no cycle). The answer is an order that respects every edge, or a value computed along that order
- **Signal:** "prerequisites", "course schedule", "build order", "X must finish before Y", "minimum time if independent tasks run in parallel", "alien dictionary"
- **Why it works:** A node with no unfinished prerequisite (in-degree 0) is always safe to process next. Processing it can only lower its neighbours' in-degrees, so the frontier never gets stuck unless a cycle exists

### Where each question is worked

| Question | Move | Read |
|---|---|---|
| Valid order? Any cycle? | Kahn's queue; fewer than n nodes output means a cycle | Module 05, 06-01 |
| Order by recursion | Post-order DFS, reversed | Module 05, 06-02 |
| Longest / counted paths | DP in topological order | Module 05, 06-03 |
| Minimum time with parallel tasks | Critical path, below | this page |

### Critical path in one line

- **Parallel Courses III (LeetCode 2050):** in Kahn order, `finish[v] = time[v] + max(finish[u])` over prerequisites u; the answer is the largest `finish`. With unit times (Parallel Courses, LeetCode 1136) it is the number of Kahn levels. The longest chain of dependencies, not the number of tasks, sets the finish time

### The failure

- **Answering the number of tasks instead of the number of levels.** With unit times (LeetCode 1136) independent tasks run in the same semester, so the answer is how many Kahn *rounds* it takes, not n. Process the queue level by level. Cycle detection itself is Module 05, 05-01

:::interview
"How do you find the minimum time to finish tasks with prerequisites, running in parallel?" — The tasks form a DAG. I process them in Kahn order and set each task's finish time to its duration plus the latest finish among its prerequisites. The answer is the maximum finish: the critical path. O(V + E).
:::
