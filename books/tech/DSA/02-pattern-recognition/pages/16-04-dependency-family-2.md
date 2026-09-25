### The failure

- **Answering the number of tasks instead of the number of levels.** With unit times (LeetCode 1136) independent tasks run in the same semester, so the answer is how many Kahn *rounds* it takes, not n. Process the queue level by level. Cycle detection itself is Module 05, 05-01

:::interview
"How do you find the minimum time to finish tasks with prerequisites, running in parallel?" — The tasks form a DAG. I process them in Kahn order and set each task's finish time to its duration plus the latest finish among its prerequisites. The answer is the maximum finish: the critical path. O(V + E).
:::
