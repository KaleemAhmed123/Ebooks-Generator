## Scaling multi-agent systems

- Running a few agents on a laptop is easy; running *many* agents reliably in production is a distributed-systems problem. The infrastructure concerns — **queues, concurrency, backpressure, and fault isolation** — are what separate a multi-agent demo from a multi-agent service. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="A task queue feeds a pool of agent workers with backpressure and per-agent fault isolation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="36" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="45" y="45" text-anchor="middle">task queue</text><text x="45" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">buffers work</text>
  <g fill="#24405e"><rect x="130" y="16" width="70" height="16" rx="2"/><rect x="130" y="40" width="70" height="16" rx="2"/><rect x="130" y="64" width="70" height="16" rx="2"/></g>
  <text x="165" y="27" text-anchor="middle" fill="#fff" font-size="5.5">worker</text><text x="165" y="51" text-anchor="middle" fill="#fff" font-size="5.5">worker</text><text x="165" y="75" text-anchor="middle" fill="#fff" font-size="5.5">worker</text>
  <rect x="250" y="36" width="100" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="50" text-anchor="middle">results / retries</text>
  <g stroke="#888"><path d="M80 44 L128 24" marker-end="url(#sm2)"/><path d="M80 48 L128 48" marker-end="url(#sm2)"/><path d="M80 52 L128 72" marker-end="url(#sm2)"/><path d="M200 24 L248 44" marker-end="url(#sm2)"/><path d="M200 48 L248 48" marker-end="url(#sm2)"/><path d="M200 72 L248 52" marker-end="url(#sm2)"/></g>
  <defs><marker id="sm2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Task queues** — decouple task *creation* from task *execution*. The orchestrator puts sub-tasks on a queue; a pool of agent workers pulls from it. This lets you scale workers independently, retry failed tasks, and handle bursts — the standard way to run many agents (and it makes durability, 15-17, natural).
- **Concurrency limits + backpressure** — you cannot run unlimited agents at once (API rate limits, cost, memory). **Backpressure** means when the system is saturated, you *slow intake* (pause the queue, reject new work) rather than melt down. Without it, a flood of tasks spawns a flood of agents that overwhelm rate limits and blow the budget (the cost-governor concern, 15-20, at fleet scale).
- **Fault isolation** — one agent crashing, hanging, or looping must not take down the others. Run agents as isolated workers (separate processes/containers) with timeouts, so a stuck agent is killed and its task retried, not left to block the pool. This is the sandbox principle (15-25) applied for *reliability*, not just security.
- **Checkpointing at scale** — with many long-running agents, durable state (15-17) per agent lets the fleet survive restarts and rebalance work across machines.

:::interview
"What changes when you go from a few agents to a large multi-agent system in production?"

It becomes a distributed-systems problem. You need a task queue to decouple creation from execution (scale workers independently, retry failures, absorb bursts); concurrency limits with backpressure so a flood of tasks doesn't spawn a flood of agents that blow past API rate limits and budgets — you slow intake instead of melting down; fault isolation so one hung or looping agent (run as an isolated worker with a timeout) doesn't take down the pool; and per-agent durable checkpointing so the fleet survives restarts. The agent logic is the easy part; the orchestration infrastructure — queues, backpressure, isolation, durability — is what makes it a reliable service.
:::
