## SWE-bench

- **SWE-bench** is the benchmark that made coding agents credible. Each task is a **real GitHub issue** from a real open-source project; the agent must produce a **code patch that fixes it**, and the fix is graded by running the project's **actual test suite**. Pass the tests, pass the task. **[VERIFY current scores]**

<svg viewBox="0 0 360 92" role="img" aria-label="An agent reads a real issue, edits the repo, and is graded by running the project's tests" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="66" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="46" text-anchor="middle" font-size="6">real issue</text><text x="43" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">+ the repo</text>
  <rect x="110" y="32" width="70" height="28" rx="4" fill="#24405e"/><text x="145" y="49" text-anchor="middle" fill="#fff" font-size="6.5">agent edits</text>
  <rect x="214" y="34" width="66" height="24" rx="3" fill="#a03050"/><text x="247" y="46" text-anchor="middle" fill="#fff" font-size="6">run tests</text>
  <rect x="314" y="34" width="36" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="332" y="49" text-anchor="middle" font-size="6">pass?</text>
  <path d="M76 46 L108 46" stroke="#888" marker-end="url(#sw)"/><path d="M180 46 L212 46" stroke="#888" marker-end="url(#sw)"/><path d="M280 46 L312 46" stroke="#888" marker-end="url(#sw)"/>
  <defs><marker id="sw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why it is a strong benchmark:** the grading is **objective and grounded** — the project's own tests decide, not a fuzzy judge. And the tasks are **real** — genuine bugs and features from projects like Django, not toy problems. An agent that scores well on SWE-bench can actually fix real code, which is why it became the headline coding-agent metric.
- **What it demands of an agent:** understand a codebase it did not write (navigate, search — the Claude Agent SDK's tools, 14-85), localize the bug, make a *correct* edit, and often run tests and iterate (the evaluator-optimizer loop, 14-40, with tests as the evaluator). It exercises the whole coding-agent stack.
- **Progress has been dramatic.** Scores climbed from single digits to a large fraction of tasks within a couple of years — the clearest evidence that coding agents crossed from demo to genuinely useful. **SWE-bench Verified** (a human-validated subset) is the cleaner variant to cite. **[VERIFY]**

:::interview
"What does SWE-bench measure and why is it respected?"

It measures whether a coding agent can resolve *real* GitHub issues by editing a real repository, graded objectively by running the project's own test suite — no fuzzy judgment, no toy tasks. That grounding is why it's the credible coding-agent benchmark: passing it means the agent actually fixed the code. It exercises the full stack — navigating an unfamiliar codebase, localizing the bug, making a correct patch, iterating against tests. Cite SWE-bench Verified (the human-checked subset) for a cleaner number, and note that rapid score gains are the main public evidence coding agents became genuinely useful.
:::
