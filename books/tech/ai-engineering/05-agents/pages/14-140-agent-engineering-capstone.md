## Capstone: a bug-fixing agent

- Assemble the module into one production-grade agent: given a failing test in a repo, it fixes the bug. Every cluster contributes.

<svg viewBox="0 0 360 118" role="img" aria-label="End-to-end bug-fix agent: scoped loop with reasoning, tools, verification gate, reviewer, and human gate" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="120" y="10" width="120" height="20" rx="4" fill="#24405e"/><text x="180" y="23" text-anchor="middle" fill="#fff">agent loop (ReAct)</text>
  <rect x="14" y="42" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="49" y="55" text-anchor="middle">tools: read/edit/bash</text>
  <rect x="100" y="42" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="135" y="55" text-anchor="middle">scope: /src only</text>
  <rect x="186" y="42" width="70" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="221" y="55" text-anchor="middle">gate: tests pass</text>
  <rect x="272" y="42" width="76" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="310" y="55" text-anchor="middle">reviewer agent</text>
  <rect x="60" y="74" width="110" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="115" y="87" text-anchor="middle">context compaction</text>
  <rect x="190" y="74" width="110" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="245" y="87" text-anchor="middle">human gate: merge</text>
  <rect x="90" y="102" width="180" height="14" rx="3" fill="#f4f4f4" stroke="#888"/><text x="180" y="112" text-anchor="middle">observability: trace every step</text>
</svg>

1. **Loop + reasoning** (14-03, 14-08): a ReAct agent — think, act, observe — over the repo, deciding steps at runtime.
2. **Tools + scope** (13, 14-134): read/edit/bash/grep, *scoped* to `/src`, in an isolated worktree — a tight scope contract, small blast radius.
3. **Smallest slices + verification gate** (14-138, 14-135): localize the bug, make a minimal edit, **run the tests** — the objective gate. Fail → the error is fed back; retry.
4. **Context management** (14-86): compact the growing transcript so a long debugging session does not overflow.
5. **Reviewer agent** (14-136): a second agent reviews the fix against a rubric (correctness, no scope creep, tests meaningful) before it is proposed.
6. **Human gate + propose-then-commit** (14-52): the agent *proposes* a diff; a human approves the merge — the consequential, irreversible action is gated.
7. **Observability** (14-113): every model and tool call is traced, so a bad run is debuggable and quality is measured over time (evals, 14-116).
8. **Security** (14-131): the sandbox has no production credentials or network, so untrusted repo content cannot exfiltrate — the trifecta is broken.

:::note
This is the shape of a real coding agent, and of agent engineering generally: a model in a loop is 10% of it; the other 90% is the **workbench** — scope, verification, review, context management, human gates, observability, and security — that turns a capable-but-unreliable model into a trustworthy worker. Module 15 pushes toward *more* autonomy (long-horizon and self-improving agents); everything here is what keeps that autonomy safe.
:::
