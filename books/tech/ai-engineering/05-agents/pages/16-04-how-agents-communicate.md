## How agents communicate

- Before agents can cooperate, they must *exchange information*. The communication mechanism shapes everything about a multi-agent system — its speed, its failure modes, its debuggability. Three patterns cover it.

<svg viewBox="0 0 360 100" role="img" aria-label="Three communication patterns: direct messages, shared blackboard, and broadcast" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="60" y="12" text-anchor="middle" font-size="6.5">direct</text>
  <circle cx="35" cy="40" r="12" fill="#24405e"/><circle cx="85" cy="40" r="12" fill="#24405e"/><path d="M47 40 L73 40" stroke="#888" marker-end="url(#cm)"/>
  <text x="180" y="12" text-anchor="middle" font-size="6.5">blackboard (shared)</text>
  <rect x="150" y="30" width="60" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="42" text-anchor="middle" font-size="5.5">shared state</text>
  <circle cx="150" cy="66" r="10" fill="#24405e"/><circle cx="180" cy="70" r="10" fill="#24405e"/><circle cx="210" cy="66" r="10" fill="#24405e"/>
  <g stroke="#888"><line x1="152" y1="58" x2="158" y2="48"/><line x1="180" y1="60" x2="180" y2="48"/><line x1="208" y1="58" x2="202" y2="48"/></g>
  <text x="300" y="12" text-anchor="middle" font-size="6.5">broadcast</text>
  <circle cx="300" cy="34" r="11" fill="#a03050"/><circle cx="275" cy="66" r="9" fill="#24405e"/><circle cx="300" cy="70" r="9" fill="#24405e"/><circle cx="325" cy="66" r="9" fill="#24405e"/>
  <g stroke="#888"><line x1="292" y1="43" x2="278" y2="58"/><line x1="300" y1="45" x2="300" y2="61"/><line x1="308" y1="43" x2="322" y2="58"/></g>
  <defs><marker id="cm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Direct messaging** — one agent sends to a specific other (the handoff of 14-79, the A2A task of 13-40). Precise and traceable, but you must wire who-talks-to-whom, and it does not scale to many agents (N² possible connections).
- **Shared memory / blackboard** — agents read and write a common workspace; no direct addressing, they coordinate through shared state (16-06). Scales to many agents and decouples them, but needs concurrency control and can become a contention point.
- **Broadcast / group chat** — one agent's message goes to all (the AutoGen group chat, 14-62). Simple and transparent, but noisy and expensive (everyone processes everything) and does not scale — every agent re-reads the whole conversation.
- **What flows in the message:** at minimum the content; better, the *intent* (the ACL performative, 16-03) — is this a request, a result, a proposal, a question? And often a *structured* format (JSON) so receivers parse reliably rather than interpret prose.

:::interview
**"What are the ways agents communicate in a multi-agent system, and their tradeoffs?"** Three. Direct messaging (agent-to-specific-agent): precise and traceable but you wire the topology and it doesn't scale (N² links). Shared memory / blackboard (agents read-write a common workspace): decoupled and scales to many agents, but needs concurrency control and can become a contention bottleneck. Broadcast / group chat (everyone hears everything): simple and transparent but noisy, expensive, and non-scaling since each agent reprocesses the whole conversation. Beyond the mechanism, good messages carry *intent* (request/inform/propose) and structure (JSON) so agents coordinate on meaning, not just text.
:::
