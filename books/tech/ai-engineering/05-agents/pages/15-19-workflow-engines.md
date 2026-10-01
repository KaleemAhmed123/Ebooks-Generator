## Workflow engines (Temporal)

- Durable execution and idempotency are hard to build correctly, so you often do not — you use a **workflow engine** that provides them as infrastructure. **Temporal** is the leading one; agent frameworks increasingly integrate with or resemble it. **[VERIFY]**

<svg viewBox="0 0 360 88" role="img" aria-label="A workflow engine persists every step's result and replays deterministically to resume after failure" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="120" y="10" width="120" height="20" rx="4" fill="#24405e"/><text x="180" y="24" text-anchor="middle" fill="#fff">workflow engine</text>
  <rect x="20" y="44" width="90" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="65" y="57" text-anchor="middle">activity: call LLM</text>
  <rect x="135" y="44" width="90" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="57" text-anchor="middle">activity: run tool</text>
  <rect x="250" y="44" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="295" y="57" text-anchor="middle">durable log</text>
  <path d="M160 30 L70 42" stroke="#888" marker-end="url(#we2)"/><path d="M180 30 L180 42" stroke="#888" marker-end="url(#we2)"/><path d="M200 30 L295 42" stroke="#888" marker-end="url(#we2)"/>
  <text x="180" y="80" text-anchor="middle" font-size="6" fill="#6b6b6b">every step's result is logged; replay resumes exactly</text>
  <defs><marker id="we2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How a workflow engine works:** you write your logic as a **workflow** whose external calls are **activities**. The engine *persists the result of every activity* to a durable log. If the process crashes, it **replays** the workflow from the log — re-running the deterministic logic but *skipping* already-completed activities (their results come from the log, not a re-execution). This gives resumability and exactly-once activity execution for free.
- **Why it fits agents so well:** an agent run *is* a durable workflow — a sequence of LLM calls and tool calls (activities) that must survive interruption and not repeat side effects. Wrapping model and tool calls as activities gives an agent Temporal-grade durability without hand-rolling checkpointing and idempotency (15-17, 15-18). Long-running human-in-the-loop waits (a day for an approval) are also natural — the workflow just sleeps durably.
- **The tradeoff:** a workflow engine is real operational complexity (a server, workers, a new programming model). For a short agent it is overkill; for a long-horizon, high-value, must-not-fail agent, it is the mature answer to durability.

:::interview
"How would you make a long-running, multi-step agent survive crashes and not repeat actions?"

Run it on (or like) a durable workflow engine such as Temporal. You model the agent's LLM and tool calls as *activities* whose results are persisted to a durable log; on a crash the engine replays the workflow, skipping already-completed activities by reading their logged results, so it resumes exactly and each side effect runs once. It also handles durable long waits (day-long human approvals) naturally. It's heavyweight for short agents but the right foundation for long-horizon, high-value autonomous runs where restart-from-scratch and double-execution are unacceptable.
:::
