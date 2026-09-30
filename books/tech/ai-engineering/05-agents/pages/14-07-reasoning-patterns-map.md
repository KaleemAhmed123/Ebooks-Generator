## Reasoning patterns: the map

- The basic loop (14-03) has the model decide one step at a time, reactively. **Reasoning patterns** are structured ways of thinking bolted onto that loop to make agents smarter, more reliable, or better at hard problems. Each is a different answer to *how should the model decide?*
- Group them by what they add:

<svg viewBox="0 0 360 112" role="img" aria-label="Reasoning patterns grouped by react, plan-first, self-improve, and search" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="16" width="84" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="50" y="30" text-anchor="middle" font-size="6.5">interleave</text><text x="50" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">ReAct</text><text x="50" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">think+act steps</text>
  <rect x="96" y="16" width="84" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="138" y="30" text-anchor="middle" font-size="6.5">plan first</text><text x="138" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">plan-execute,</text><text x="138" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">ReWOO, HTN</text>
  <rect x="184" y="16" width="84" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="226" y="30" text-anchor="middle" font-size="6.5">self-improve</text><text x="226" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">Reflexion,</text><text x="226" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">self-refine</text>
  <rect x="272" y="16" width="84" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="314" y="30" text-anchor="middle" font-size="6.5">search</text><text x="314" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">ToT, LATS,</text><text x="314" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">evolutionary</text>
  <rect x="70" y="72" width="220" height="28" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="86" text-anchor="middle" font-size="6.5">more structure → better on hard tasks,</text><text x="180" y="96" text-anchor="middle" font-size="6.5">but more model calls, cost, latency</text>
</svg>

- **Interleave (ReAct):** alternate reasoning and action, deciding the next act from the last observation. The default working pattern.
- **Plan first (plan-and-execute, ReWOO, HTN):** decide the whole plan up front, then execute — fewer expensive planning calls, better for multi-step tasks.
- **Self-improve (Reflexion, self-refine):** produce an answer, critique it, try again — trades extra calls for higher quality.
- **Search (Tree of Thoughts, LATS):** explore *multiple* reasoning paths and pick the best — for problems where the first attempt often fails.

- **The universal tradeoff:** more structure buys reliability and problem-solving power at the cost of more model calls (money, latency). Match the pattern to the task's difficulty; do not run tree search on a task ReAct solves.

:::note
These are not competing religions — they compose and overlap. A production agent might plan first, execute with ReAct, and reflect on failure. Interviewers want to know you can *name* each, explain its mechanism, and say *when* it earns its extra cost. The next pages give each a page and a worked example so you can do exactly that.
:::
