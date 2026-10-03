## A2A across organizations

- The multi-agent patterns so far assume agents you control, in one system. **A2A** (13-40) extends multi-agent coordination *across organizational boundaries* — your agent delegating to an agent built and run by someone else, whom you do not control and only partially trust.

<svg viewBox="0 0 360 88" role="img" aria-label="An agent in one org delegates via A2A to an agent in another org across a trust boundary" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="24" width="130" height="48" rx="5" fill="#eef6fb" stroke="#24405e"/><text x="75" y="38" text-anchor="middle" font-size="6">your org</text><circle cx="75" cy="56" r="12" fill="#24405e"/><text x="75" y="59" text-anchor="middle" fill="#fff" font-size="5.5">agent</text>
  <rect x="220" y="24" width="130" height="48" rx="5" fill="#fdeef2" stroke="#a03050"/><text x="285" y="38" text-anchor="middle" font-size="6">their org</text><circle cx="285" cy="56" r="12" fill="#a03050"/><text x="285" y="59" text-anchor="middle" fill="#fff" font-size="5.5">agent</text>
  <line x1="180" y1="16" x2="180" y2="80" stroke="#a03050" stroke-dasharray="3,2"/><text x="180" y="12" text-anchor="middle" font-size="5.5" fill="#a03050">trust boundary</text>
  <path d="M87 56 L273 56" stroke="#888" marker-end="url(#ax2)"/><text x="180" y="50" text-anchor="middle" font-size="5.5">A2A task</text>
  <defs><marker id="ax2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What changes across a trust boundary:**
  - **Discovery** — you find the other agent via its public Agent Card (13-41), not by wiring it in. It advertises its skills; you decide whether to use it.
  - **Opacity** — you see the other agent's *interface* (skills, inputs, outputs) but not its internals — its tools, model, or reasoning are hidden. You coordinate on the contract, not the implementation.
  - **Trust and security** — the other agent is *untrusted*. Its outputs are attacker-controllable content (prompt injection, 14-128); it may fail, lie, or behave adversarially. You apply the same defenses as any untrusted input — validate outputs, limit what you act on, never expose secrets.
- **Why it matters:** it enables an *ecosystem* of interoperating agents across companies — a "society of agents" spanning organizational lines, the way APIs let services interoperate. A travel agent delegating to an airline's agent, a research agent consulting a data provider's agent — inter-org agent commerce.
- **The governance question:** cross-org agent interaction raises accountability (whose agent is liable?), trust (how do you verify a claimed skill?), and security (an untrusted agent in your workflow) issues that are still being worked out — the frontier of multi-agent systems.

:::note
Cross-org A2A is where multi-agent systems meet the messy real world: agents built by parties with different incentives, no shared trust, and no central control. It is genuinely different from orchestrating your own agents — closer to integrating a third-party API you cannot audit, but where the "API" is an autonomous agent that can be manipulated. The security discipline of Module 13 (treat external agents as untrusted, break the lethal trifecta, validate everything) is not optional here; it is the entire foundation of doing it safely.
:::
