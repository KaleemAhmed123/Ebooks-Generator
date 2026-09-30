## AI gateways

- An **AI gateway** is a single control plane every LLM call passes through — the reverse proxy for your model traffic. It is where cross-cutting concerns live so they are not re-implemented in every service.

<svg viewBox="0 0 360 102" role="img" aria-label="Apps call one gateway that handles auth, routing, caching, rate limits, guardrails, and observability, then fans out to many model backends" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#f4f4f4" stroke="#888"><rect x="10" y="20" width="44" height="14" rx="2"/><rect x="10" y="42" width="44" height="14" rx="2"/><rect x="10" y="64" width="44" height="14" rx="2"/></g>
  <text x="32" y="30" text-anchor="middle" font-size="5.5">app A</text><text x="32" y="52" text-anchor="middle" font-size="5.5">app B</text><text x="32" y="74" text-anchor="middle" font-size="5.5">agent C</text>
  <rect x="98" y="20" width="120" height="60" rx="4" fill="#24405e"/><text x="158" y="16" text-anchor="middle" font-size="6.5" fill="#24405e">AI gateway</text>
  <g fill="#fff" font-size="5.5" text-anchor="middle"><text x="158" y="34">auth · rate limit · budget</text><text x="158" y="47">route · fallback · retry</text><text x="158" y="60">cache · guardrails</text><text x="158" y="73">trace · cost attribution</text></g>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="262" y="18" width="84" height="14" rx="2"/><rect x="262" y="40" width="84" height="14" rx="2"/><rect x="262" y="62" width="84" height="14" rx="2"/></g>
  <text x="304" y="28" text-anchor="middle" font-size="5.5">OpenAI</text><text x="304" y="50" text-anchor="middle" font-size="5.5">Anthropic</text><text x="304" y="72" text-anchor="middle" font-size="5.5">self-host vLLM</text>
  <path d="M54 27 L96 40" stroke="#888" marker-end="url(#gw)"/><path d="M54 49 L96 50" stroke="#888" marker-end="url(#gw)"/><path d="M54 71 L96 60" stroke="#888" marker-end="url(#gw)"/>
  <path d="M218 40 L260 25" stroke="#888" marker-end="url(#gw)"/><path d="M218 50 L260 47" stroke="#888" marker-end="url(#gw)"/><path d="M218 60 L260 69" stroke="#888" marker-end="url(#gw)"/>
  <defs><marker id="gw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What it centralises:** authentication and per-team API keys; rate limits and spend budgets; provider routing and failover (the two-provider-minimum from 17-03); caching; input/output guardrails; and — critically — one place that stamps every request with trace and cost attributes.
- **Why it matters for the two-provider policy:** the gateway is what makes Claude-on-Bedrock and GPT-on-Azure interchangeable behind one interface, with automatic failover when one provider has an incident. Without it, every app hard-codes a provider and an outage takes you down with it.

:::note
The gateway is the natural home for most of this module's cross-cutting features: routing (17-44), caching (17-41/42), budgets (17-55), guardrails (Module 18), and observability (17-45). Build it once as infrastructure and every app inherits them; scatter them into each service and you maintain the same logic five times and drift. In a mock design, "put an AI gateway in front" is a load-bearing sentence, not a throwaway.
:::
