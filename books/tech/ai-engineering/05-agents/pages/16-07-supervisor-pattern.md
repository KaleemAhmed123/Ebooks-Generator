## The supervisor pattern

- The **supervisor** (or orchestrator) pattern is the workhorse of production multi-agent systems: one coordinating agent directs a team of worker agents, delegating sub-tasks and synthesizing their results. It is orchestrator-workers (14-39) as a standing architecture.

<svg viewBox="0 0 360 96" role="img" aria-label="A supervisor delegates to specialized workers and synthesizes their outputs into a final answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="140" y="10" width="80" height="22" rx="4" fill="#a03050"/><text x="180" y="24" text-anchor="middle" fill="#fff" font-size="6.5">supervisor</text>
  <rect x="20" y="52" width="70" height="20" rx="3" fill="#6a9bd0"/><text x="55" y="65" text-anchor="middle" fill="#fff" font-size="6">researcher</text>
  <rect x="110" y="52" width="70" height="20" rx="3" fill="#6a9bd0"/><text x="145" y="65" text-anchor="middle" fill="#fff" font-size="6">coder</text>
  <rect x="200" y="52" width="70" height="20" rx="3" fill="#6a9bd0"/><text x="235" y="65" text-anchor="middle" fill="#fff" font-size="6">writer</text>
  <rect x="290" y="52" width="60" height="20" rx="3" fill="#6a9bd0"/><text x="320" y="65" text-anchor="middle" fill="#fff" font-size="6">reviewer</text>
  <g stroke="#888"><path d="M160 32 L60 50" marker-end="url(#sv)"/><path d="M172 32 L148 50" marker-end="url(#sv)"/><path d="M188 32 L232 50" marker-end="url(#sv)"/><path d="M200 32 L315 50" marker-end="url(#sv)"/></g>
  <g stroke="#bbb" stroke-dasharray="2,2"><path d="M60 52 L165 34"/><path d="M235 52 L190 34"/></g>
  <defs><marker id="sv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** the supervisor receives the task, breaks it into sub-tasks, routes each to the worker best suited (by role, or via contract-net bidding, 16-05), collects the results, and synthesizes them into a final answer — deciding whether to iterate, re-delegate, or finish. Workers do not talk to each other; all coordination flows through the supervisor (a **star** topology).
- **Why it dominates production:** it is **controllable and debuggable**. There is one place (the supervisor) where decisions happen, so you can inspect and constrain the orchestration; workers are simple and focused; and the star topology has no confusing agent-to-agent chatter. It maps directly onto LangGraph (a supervisor node routing to worker subgraphs, 14-57) and the OpenAI SDK (handoffs from a triage agent, 14-79).
- **The supervisor is the bottleneck and the risk.** Every task flows through it, so it is a single point of failure and a potential throughput limit, and the *quality* of the whole system depends on its decomposition and synthesis being good. A weak supervisor produces a weak system no matter how strong the workers.

:::interview
"Describe the supervisor multi-agent pattern and its main risk."

A single coordinating agent receives the task, decomposes it, delegates sub-tasks to specialized worker agents (routing by role or by bids), collects their results, and synthesizes the final output — a star topology where workers don't talk to each other and all coordination flows through the supervisor. It's the dominant production pattern because it's controllable and debuggable: one place to inspect and constrain decisions, simple focused workers. Its main risk is that the supervisor is a single point of failure and a bottleneck, and the whole system's quality hinges on its decomposition and synthesis — a weak supervisor sinks even strong workers.
:::
