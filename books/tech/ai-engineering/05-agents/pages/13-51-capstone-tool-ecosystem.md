## Capstone: a tool ecosystem

- Assemble the module into one coherent stack — a production agent that reaches tools, peers, and know-how through standard protocols, observably and safely.

<svg viewBox="0 0 360 124" role="img" aria-label="An agent connects to MCP tools, A2A peers, and skills, fronted by a gateway and traced by OTel" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="24" rx="4" fill="#24405e"/><text x="180" y="25" text-anchor="middle" fill="#fff" font-size="7">the agent + router</text>
  <rect x="120" y="44" width="120" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="180" y="56" text-anchor="middle" font-size="6">MCP gateway (auth·policy·log)</text>
  <g fill="#fdeef2" stroke="#a03050"><rect x="20" y="76" width="66" height="18" rx="2"/><rect x="94" y="76" width="66" height="18" rx="2"/></g><text x="53" y="88" text-anchor="middle" font-size="5.5">MCP: github</text><text x="127" y="88" text-anchor="middle" font-size="5.5">MCP: db</text>
  <rect x="176" y="76" width="76" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="214" y="88" text-anchor="middle" font-size="5.5">A2A: specialist</text>
  <rect x="262" y="76" width="76" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="300" y="88" text-anchor="middle" font-size="5.5">skills: procedures</text>
  <rect x="90" y="104" width="180" height="16" rx="3" fill="#f4f4f4" stroke="#888"/><text x="180" y="115" text-anchor="middle" font-size="6">OpenTelemetry traces every span</text>
  <path d="M180 34 L180 42" stroke="#888" marker-end="url(#ce)"/><path d="M150 62 L60 74" stroke="#888" marker-end="url(#ce)"/><path d="M170 62 L127 74" stroke="#888" marker-end="url(#ce)"/><path d="M195 62 L214 74" stroke="#888" marker-end="url(#ce)"/><path d="M215 62 L295 74" stroke="#888" marker-end="url(#ce)"/>
  <defs><marker id="ce" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Tools via MCP**, behind a **gateway** that centralizes auth, rate limits, policy, and logging — so every tool call is authorized and audited, and servers are pinned and vetted (supply chain).
- **Peers via A2A** — specialist agents the orchestrator delegates to for sub-tasks it should not do itself.
- **Know-how via skills**, progressively disclosed, sandboxed, permissioned — the agent's procedures without bloating context.
- **A router** in front picks the right model per step; **OpenTelemetry** traces every model and tool span for cost, latency, and debugging.
- **Safety woven through:** least-privilege scopes and roots, human approval on consequential actions, pinned and signed servers/skills, full description review — the defenses against poisoning, rug pulls, and confused deputies.

:::note
This is the shape of a real 2026 agent platform. Notice that almost none of it is model code — it is *protocols and plumbing* (MCP, A2A, OTel, OAuth) plus operational discipline (gateways, pinning, sandboxes, tracing). The model is one component; the ecosystem around it is what makes the agent capable, extensible, observable, and safe. Module 14 turns to the agent *itself* — the loop, reasoning, memory, and frameworks that drive this machine.
:::
