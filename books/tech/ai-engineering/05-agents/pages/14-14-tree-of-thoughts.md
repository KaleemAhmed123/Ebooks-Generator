## Tree of Thoughts

- ReAct and self-refine explore *one* line of reasoning. Some problems need **exploring many** — where the first idea is often wrong and you must try alternatives, backtrack, and compare. **Tree of Thoughts (ToT)** (Yao et al., 2023) turns reasoning into a search over a tree of partial solutions.

<svg viewBox="0 0 360 104" role="img" aria-label="A reasoning tree branches into candidate thoughts, evaluates each, and expands the promising ones" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="180" cy="18" r="10" fill="#24405e"/><text x="180" y="21" text-anchor="middle" fill="#fff" font-size="6">start</text>
  <circle cx="90" cy="52" r="10" fill="#eaf6ea" stroke="#1a3a2a"/><text x="90" y="55" text-anchor="middle" font-size="5.5">A✓</text>
  <circle cx="180" cy="52" r="10" fill="#fdeef2" stroke="#a03050"/><text x="180" y="55" text-anchor="middle" font-size="5.5">B✗</text>
  <circle cx="270" cy="52" r="10" fill="#eaf6ea" stroke="#1a3a2a"/><text x="270" y="55" text-anchor="middle" font-size="5.5">C✓</text>
  <circle cx="60" cy="88" r="10" fill="#eaf6ea" stroke="#1a3a2a"/><circle cx="120" cy="88" r="10" fill="#e8f4fd" stroke="#24405e"/><circle cx="250" cy="88" r="10" fill="#e8f4fd" stroke="#24405e"/><circle cx="300" cy="88" r="10" fill="#eaf6ea" stroke="#1a3a2a"/>
  <g stroke="#888"><line x1="172" y1="26" x2="96" y2="46"/><line x1="180" y1="28" x2="180" y2="42"/><line x1="188" y1="26" x2="264" y2="46"/><line x1="84" y1="60" x2="64" y2="80"/><line x1="96" y1="60" x2="116" y2="80"/><line x1="264" y1="60" x2="252" y2="80"/><line x1="276" y1="60" x2="296" y2="80"/></g>
  <text x="180" y="102" text-anchor="middle" font-size="5.5" fill="#a03050">prune dead branches, expand good ones</text>
</svg>

- **The mechanism:** at each step, generate *several* candidate "thoughts" (partial solutions), have the model (or a heuristic) **evaluate** how promising each is, then **expand** the good ones and **prune** the bad — a classic tree search (BFS/DFS) with the LLM as both the move-generator and the position-evaluator.
- **Why it helps:** for problems where a greedy single path fails — planning puzzles, the "Game of 24," constrained writing — exploring and backtracking finds solutions a linear chain misses. It is deliberate problem-solving vs jumping at the first idea.
- **The cost is steep.** Generating and evaluating many branches means *many* model calls per problem — often 10–100× a single chain. ToT is for genuinely hard problems where quality justifies the compute, not everyday tasks.

:::interview
**"When is Tree of Thoughts worth it over chain-of-thought?"** When the problem needs *exploration and backtracking* — the first reasoning path frequently fails and you must compare alternatives (puzzles, planning, search-like tasks). ToT generates multiple candidate thoughts per step, scores them, and expands the best while pruning dead ends. It measurably beats a single chain on such problems, but at 10–100× the model calls, so you reserve it for hard problems where a wrong answer is costlier than the extra compute.
:::
