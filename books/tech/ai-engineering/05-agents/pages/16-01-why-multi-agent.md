# Multi-Agent & Swarms

## Why multi-agent

- One agent is a model in a loop with tools (Module 14). A **multi-agent system** is *several* such agents working together on a task — dividing labor, specializing, checking each other, or coordinating toward a shared goal. The question this module answers: when does *more agents* actually beat *one better agent*, and how do you make many agents cooperate without chaos?

<svg viewBox="0 0 360 96" role="img" aria-label="One generalist agent versus a team of specialized agents coordinating on a task" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="80" y="14" text-anchor="middle" font-size="6.5" fill="#6b6b6b">single agent</text>
  <circle cx="80" cy="52" r="26" fill="#24405e"/><text x="80" y="49" text-anchor="middle" fill="#fff" font-size="6.5">generalist</text><text x="80" y="59" text-anchor="middle" fill="#cdd" font-size="5.5">does everything</text>
  <line x1="180" y1="10" x2="180" y2="86" stroke="#eee"/>
  <text x="270" y="14" text-anchor="middle" font-size="6.5" fill="#6b6b6b">multi-agent</text>
  <circle cx="230" cy="34" r="14" fill="#6a9bd0"/><text x="230" y="37" text-anchor="middle" fill="#fff" font-size="5.5">research</text>
  <circle cx="310" cy="34" r="14" fill="#6a9bd0"/><text x="310" y="37" text-anchor="middle" fill="#fff" font-size="5.5">code</text>
  <circle cx="270" cy="70" r="14" fill="#6a9bd0"/><text x="270" y="73" text-anchor="middle" fill="#fff" font-size="5.5">review</text>
  <g stroke="#888"><line x1="244" y1="34" x2="296" y2="34"/><line x1="234" y1="47" x2="262" y2="58"/><line x1="306" y1="47" x2="278" y2="58"/></g>
</svg>

- **The four reasons to go multi-agent:**
  - **Specialization** — a focused agent (a dedicated coder, a dedicated reviewer) outperforms a generalist juggling everything, the same reason human teams have roles (14-136).
  - **Parallelism** — independent sub-tasks run concurrently across agents, finishing faster (the map-reduce of 14-38).
  - **Context isolation** — each agent has its own window, so a noisy sub-task does not pollute the whole system's context (subagents, 14-87).
  - **Robustness via checking** — agents that review or vote on each other catch errors a lone agent misses (14-136, and consensus, later).
- **The cost:** coordination. Every agent added is more model calls (cost, latency), more ways to miscommunicate, and more emergent failure modes. Multi-agent is *not free capability* — it is a trade of coordination overhead for the four benefits above, and only worth it when they outweigh it (16-02).

:::note
The honest framing for this whole module: multi-agent systems are *powerful and over-used.* They shine for genuinely parallel, specialized, or self-checking work — and they are a liability when a single well-designed agent (or even a workflow, 14-35) would do. Much of 2024–2025's "multi-agent" hype was solving with five agents what one agent plus good context engineering handles more cheaply and reliably. Learn the patterns, and learn just as hard *when not to use them* (16-42).
:::
