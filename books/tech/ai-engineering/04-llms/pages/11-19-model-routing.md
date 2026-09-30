## Model routing

- Not every request needs your biggest model. "What's 2+2?" and "Refactor this 400-line service" cost the same on a frontier model, but only one needs it. **Model routing** sends each request to the cheapest model that can handle it.
- A **router** — a rule, a small classifier, or a cheap LLM — looks at the request and picks a tier.

<svg viewBox="0 0 320 76" role="img" aria-label="A router sends easy requests to a small model and hard ones to a large model, with a fallback on failure" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="30" width="56" height="20" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="36" y="43" text-anchor="middle">request</text>
  <rect x="92" y="30" width="52" height="20" rx="3" fill="#24405e"/><text x="118" y="43" text-anchor="middle" fill="#fff">router</text>
  <rect x="176" y="8" width="90" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="221" y="20" text-anchor="middle">small · cheap · fast</text>
  <rect x="176" y="54" width="90" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="221" y="66" text-anchor="middle">large · pricey · smart</text>
  <path d="M64 40 L90 40" stroke="#1a1a1a" marker-end="url(#mr)"/>
  <path d="M144 36 L174 20" stroke="#1a3a2a" marker-end="url(#mr)"/><text x="150" y="30" font-size="6.5" fill="#1a3a2a">easy</text>
  <path d="M144 44 L174 62" stroke="#c0392b" marker-end="url(#mr)"/><text x="150" y="56" font-size="6.5" fill="#c0392b">hard</text>
  <defs><marker id="mr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Routing signals: task type, prompt length, required tools, a difficulty estimate, or the user's tier. Frameworks like **RouteLLM** learn the routing threshold from data.
- Related patterns:
  - **Cascade** — try the small model first; escalate to the big one only if a confidence or validation check fails.
  - **Fallback** — on a provider error, timeout, or refusal, retry on a backup model so the feature stays up.

:::note
Routing can cut cost by more than half with little quality loss, because the request mix is usually **mostly easy**. The gain scales with how skewed your traffic is toward simple requests — measure the mix before building the router.
:::

:::warn
The router is a new failure point. Misroute a hard request to the small model and quality silently drops; misroute an easy one up and you lose the savings. And the router itself adds latency and cost. Keep it cheap (a rule or tiny classifier), monitor mis-routes, and always keep a fallback path.
:::
