## Multi-agent observability

- You cannot debug a multi-agent failure (16-31) you cannot *see*. Observability for multi-agent systems extends single-agent tracing (14-113) to capture the *interactions* — who said what to whom, and how the collective reached its result. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="A multi-agent trace showing each agent's spans plus the messages between them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="20" y="12" width="320" height="14" rx="2" fill="#a03050"/><text x="26" y="22" fill="#fff">system run: research query (18.2s)</text>
  <rect x="40" y="30" width="120" height="10" rx="2" fill="#24405e"/><text x="44" y="38" fill="#fff" font-size="5">lead: decompose</text>
  <rect x="40" y="44" width="90" height="10" rx="2" fill="#6a9bd0"/><text x="44" y="52" fill="#fff" font-size="5">researcher-1</text>
  <rect x="140" y="44" width="90" height="10" rx="2" fill="#6a9bd0"/><text x="144" y="52" fill="#fff" font-size="5">researcher-2 (parallel)</text>
  <rect x="40" y="58" width="70" height="10" rx="2" fill="#1a3a2a"/><text x="44" y="66" fill="#fff" font-size="5">critic: verify</text>
  <rect x="40" y="72" width="110" height="10" rx="2" fill="#24405e"/><text x="44" y="80" fill="#fff" font-size="5">writer: synthesize</text>
</svg>

- **What to capture beyond single-agent traces:**
  - **Per-agent spans** — each agent's model and tool calls (14-113), nested under the *system* run so you see the whole collective in one trace.
  - **Inter-agent messages** — who sent what to whom, and each handoff/delegation. This is where coordination failures (16-31) show up — an ignored critic, a duplicated sub-task, a lost message.
  - **The interaction graph** — a view of the topology *as it actually executed* (which agent talked to which), revealing loops (16-33), bottlenecks (a slow supervisor), and idle agents.
  - **Attribution** — trace the final result back through the agents that contributed, so when it is wrong you find *which* agent's output introduced the error (attribution across agents, extending 13-44).
- **Why it is essential:** multi-agent failures live *between* agents (16-31), where a per-agent view cannot see them. Only a system-level trace shows that researcher-1 and researcher-2 covered the same ground, or that the critic's objection was never incorporated. It is also how you compute the eval signals of 16-35 (per-agent contribution, coordination quality) from real runs.

:::interview
"How do you debug a multi-agent system that produced a bad result?"

With system-level tracing that captures the interactions, not just each agent. You pull a trace showing every agent's spans nested under the system run, *plus* the inter-agent messages and handoffs and the topology as it actually executed. Then you localize: did the decomposition miss a sub-question (specification)? Did two agents duplicate work or the critic get ignored (coordination)? Which agent's output introduced the error (attribution across agents)? Per-agent views can't see failures that live *between* agents, which is where most multi-agent failures are — so the interaction-level trace is what makes them debuggable, and it's how you measure per-agent contribution and coordination quality for evals.
:::
