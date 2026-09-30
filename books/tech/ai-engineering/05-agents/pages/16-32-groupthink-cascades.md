## Groupthink and cascades

- Two coordination failures where agents influence each other *wrongly* — and the diversity that was supposed to make multi-agent systems robust (16-18) collapses into correlated error. **[VERIFY]**

<svg viewBox="0 0 360 84" role="img" aria-label="One agent's wrong answer spreads through the group until all agents agree on the error" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="40" cy="42" r="14" fill="#a03050"/><text x="40" y="45" text-anchor="middle" fill="#fff" font-size="5.5">✗ wrong</text>
  <circle cx="120" cy="42" r="14" fill="#c0607a"/><text x="120" y="45" text-anchor="middle" fill="#fff" font-size="5.5">✗</text>
  <circle cx="200" cy="42" r="14" fill="#c0607a"/><text x="200" y="45" text-anchor="middle" fill="#fff" font-size="5.5">✗</text>
  <circle cx="280" cy="42" r="14" fill="#c0607a"/><text x="280" y="45" text-anchor="middle" fill="#fff" font-size="5.5">✗</text>
  <g stroke="#a03050"><path d="M54 42 L104 42" marker-end="url(#gc)"/><path d="M134 42 L184 42" marker-end="url(#gc)"/><path d="M214 42 L264 42" marker-end="url(#gc)"/></g>
  <text x="180" y="74" text-anchor="middle" font-size="6" fill="#a03050">one error cascades into consensus on the wrong answer</text>
  <defs><marker id="gc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Groupthink / conformity.** When agents see each other's outputs, they tend to *converge* — an agent shown that others answered "A" is more likely to say "A" too, even if it would independently have said "B." The diversity that makes voting work (16-18) erodes as agents conform, and the system settles on a *consensus that may be wrong*. Worse, a confident (or a first) agent can anchor the whole group.
- **Cascades / error propagation.** One agent's mistake enters the shared context and *spreads*: downstream agents build on the wrong premise, and by the end everyone agrees on an error that started with one. This is error compounding (14-125) at the *system* level — an early wrong result poisons the collective.
- **Why they are dangerous:** they defeat the *entire point* of multi-agent robustness. You added agents to catch errors through diversity and cross-checking; groupthink and cascades turn the group into a *correlated* error machine that is *more* confident (many agents agree!) and *no more* correct — a false sense of reliability.
- **Defenses:**
  - **Preserve independence** — have agents answer *before* seeing others' answers (independent-then-aggregate, not sequential-influence), so votes are uncorrelated (16-18).
  - **Assign dissent** — a designated devil's-advocate/critic agent (debate, 16-13) whose job is to *disagree*, breaking conformity.
  - **Verify against ground truth** — a verifier (14-135), not just agent agreement, decides correctness — because agreement is not truth.

:::warn
Agent agreement is *not* evidence of correctness — this is the trap of naive multi-agent systems. When five agents all say "A," it *feels* reliable, but if they influenced each other (groupthink) or built on a shared early error (cascade), their agreement is *correlated* and means little — they can be confidently, unanimously wrong. Robustness requires *independent* errors (16-18); the moment agents see and conform to each other, you lose it. Design for independence, seed dissent, and always let a *ground-truth verifier*, not a vote, be the final arbiter of correctness.
:::
