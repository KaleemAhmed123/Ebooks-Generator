## What is Tree-of-Thoughts, and when is searching over reasoning worth it?

- **Chain-of-thought** commits to one line of reasoning. **Tree-of-Thoughts (ToT)** explores **multiple** reasoning branches, evaluates partial solutions, and backtracks from dead ends — reasoning as a search tree rather than a single path.
- Each node is a partial solution ("thought"); the model generates several next thoughts, scores them, and expands the promising ones (with BFS/DFS or beam-style search). LATS adds Monte-Carlo-tree-search-style selection.
- It helps on problems with a **large solution space and a way to evaluate partial progress**: puzzles, planning, some math/coding — where one greedy chain gets stuck.
- Cost is the catch: exploring many branches means **many more LLM calls** (often 10–100×). For most tasks, CoT or a single good attempt is cheaper and nearly as good.
- Use ToT when a problem genuinely needs exploration/backtracking and you can score partial states; otherwise it's expensive overkill.

:::interview
What's really being tested: that ToT trades a lot of extra compute for search + backtracking over reasoning, useful only when the task has a big space and an evaluable partial state.
:::
