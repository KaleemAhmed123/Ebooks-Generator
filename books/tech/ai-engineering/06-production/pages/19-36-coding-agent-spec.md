## Flagship 4: coding agent — spec

- **Goal:** build the harness behind a terminal coding agent (the kind this booklet was written with) — the loop, tool registry, transport, dispatcher, verification gates, and sandbox. Booklet 5 covered agent *patterns*; this builds the *harness* that runs them.
- **The harness contract:** the model proposes actions as structured tool calls; the harness executes them, feeds back observations, and loops until the task is done or a budget is hit.

<svg viewBox="0 0 360 100" role="img" aria-label="Coding agent harness: model proposes a tool call, dispatcher validates against the registry, runs it in a sandbox, returns an observation, loops, with verification gates" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="40" width="56" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="42" y="52" text-anchor="middle">model</text>
  <rect x="90" y="40" width="60" height="20" rx="3" fill="#24405e"/><text x="120" y="48" text-anchor="middle" fill="#fff" font-size="6">dispatcher</text><text x="120" y="57" text-anchor="middle" fill="#cdd" font-size="5">validate</text>
  <rect x="170" y="16" width="60" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="27" text-anchor="middle" font-size="6">tool registry</text>
  <rect x="170" y="66" width="60" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="77" text-anchor="middle" font-size="6">sandbox run</text>
  <rect x="250" y="40" width="60" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="280" y="48" text-anchor="middle" font-size="6">verify gate</text><text x="280" y="57" text-anchor="middle" font-size="5" fill="#6b6b6b">tests pass?</text>
  <path d="M70 50 L88 50" stroke="#888" marker-end="url(#co)"/><path d="M150 46 L168 32" stroke="#888" marker-end="url(#co)"/><path d="M150 54 L168 72" stroke="#888" marker-end="url(#co)"/><path d="M230 75 L250 58" stroke="#888" marker-end="url(#co)"/>
  <path d="M250 50 Q210 50 210 40 M120 60 Q120 92 200 92 Q280 92 280 62" fill="none" stroke="#888" stroke-dasharray="3 2"/>
  <text x="150" y="99" text-anchor="middle" font-size="5.5" fill="#6b6b6b">observation loops back to the model</text>
  <defs><marker id="co" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The six components**, each a page: a **tool registry** (typed, validated tools), a **JSON-RPC/stdio transport** (how tools talk), a **dispatcher** running the plan-execute loop, **verification gates** with an observation budget, a **sandbox** for safe execution, and **OTel tracing**.
- **The contract is what makes it reliable**, not the model: constrain what the model can do (typed tools), verify what it did (tests, gates), and bound how much it can do (budgets). Booklet 5's agent-workbench craft, in code.

:::note
The insight that separates a robust coding agent from a flaky demo: **the harness, not the model, is where reliability comes from.** A better model helps, but a model wired to unvalidated tools, no verification, and no budget will still corrupt a repo or loop forever. The engineering — schema validation, sandboxing, test gates, observation budgets — is what turns a capable-but-fallible model into a system you can leave running. That is why this flagship is mostly *harness* code, not prompt engineering.
:::
