## Cost and latency in multi-agent

- The hidden tax of multi-agent systems is *resource consumption*. Every agent is model calls; every message is context re-processed. A multi-agent system can cost **10× or more** what a single agent does for the same task — sometimes worth it, often not. Knowing where the cost goes is how you keep it justified. **[VERIFY]**

<svg viewBox="0 0 360 84" role="img" aria-label="Cost sources in multi-agent systems: more calls, repeated context, coordination overhead" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="20" width="108" height="44" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="64" y="34" text-anchor="middle">more calls</text><text x="64" y="47" text-anchor="middle" font-size="5.5" fill="#6b6b6b">N agents × their loops</text><text x="64" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">× rounds</text>
  <rect x="126" y="20" width="108" height="44" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="180" y="34" text-anchor="middle">repeated context</text><text x="180" y="47" text-anchor="middle" font-size="5.5" fill="#6b6b6b">each re-reads shared</text><text x="180" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">conversation</text>
  <rect x="242" y="20" width="108" height="44" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="296" y="34" text-anchor="middle">coordination</text><text x="296" y="47" text-anchor="middle" font-size="5.5" fill="#6b6b6b">supervisor calls,</text><text x="296" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">handoffs, votes</text>
</svg>

- **Where the cost comes from:**
  - **More model calls** — N agents each running their own loop (Module 14), possibly over multiple rounds (debate, MoA), multiplies calls. A 5-agent, 3-round debate is ~15× the calls of one answer.
  - **Repeated context** — in group chat (16-11), *every* agent re-processes the *whole* growing conversation each turn — the cost scales super-linearly with agents and turns (the AutoGen blowup, 14-66).
  - **Coordination overhead** — the supervisor's routing/synthesis calls, handoff messages, and voting rounds are pure overhead beyond the actual work.
- **Latency compounds too** — sequential coordination (supervisor → worker → back → next worker) adds round trips; a deep hierarchy (16-08) or a long debate is *slow* even when each step is fast.
- **Controlling it:**
  - **Parallelize** where possible (map-reduce, 16-15) so agents run concurrently, not sequentially — latency stays flat as you add agents.
  - **Prune context** — do not give every agent the whole conversation; give each only what its role needs (16-10). This is the biggest lever.
  - **Right-size models** — a cheap model for simple worker roles, the flagship only where needed (routing, 13-45).
  - **Justify each agent** — the discipline of 16-02: if an agent's cost exceeds its contribution, cut it.

:::warn
Multi-agent systems are where LLM costs quietly explode. A design that "felt clean" — five agents debating in a shared group chat over several rounds — can cost 20–50× a single well-prompted agent for a *marginally* better answer, or no better answer at all. Before shipping a multi-agent system, measure its cost and latency against a strong single-agent baseline (16-42). If the multi-agent version is not *meaningfully* better per dollar and second, the single agent wins. Sophistication that does not pay for itself is just expense.
:::
