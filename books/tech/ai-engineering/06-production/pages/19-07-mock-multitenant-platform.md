## Mock: multi-tenant LLM API platform — design

- **Prompt:** "Design an internal LLM platform many product teams call." **Clarify:** 40 teams, mixed workloads (chat, RAG, batch), each needs isolation, per-team cost attribution and budgets, some want fine-tuned models, one gateway for all providers + self-host.
- This is the AI-gateway (17-47) grown into a platform. The core requirement is **multi-tenancy**: isolation, fairness, and attribution across tenants sharing infrastructure.

<svg viewBox="0 0 360 100" role="img" aria-label="Multi-tenant platform: teams call one gateway providing keys, quotas, routing, caching, then a shared serving layer with multi-LoRA and provider fallback" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#f4f4f4" stroke="#888"><rect x="10" y="20" width="40" height="12" rx="2"/><rect x="10" y="44" width="40" height="12" rx="2"/><rect x="10" y="68" width="40" height="12" rx="2"/></g>
  <text x="30" y="29" text-anchor="middle" font-size="5.5">team A</text><text x="30" y="53" text-anchor="middle" font-size="5.5">team B</text><text x="30" y="77" text-anchor="middle" font-size="5.5">…40</text>
  <rect x="66" y="24" width="86" height="52" rx="3" fill="#24405e"/><text x="109" y="20" text-anchor="middle" fill="#24405e" font-size="6">platform gateway</text>
  <g fill="#fff" font-size="5.5" text-anchor="middle"><text x="109" y="38">keys · quotas</text><text x="109" y="50">route · cache</text><text x="109" y="62">budgets · trace</text><text x="109" y="72">guardrails</text></g>
  <rect x="170" y="20" width="74" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="207" y="30" text-anchor="middle" font-size="6">self-host fleet</text><text x="207" y="39" text-anchor="middle" font-size="5" fill="#6b6b6b">vLLM + multi-LoRA</text>
  <rect x="170" y="52" width="74" height="24" rx="3" fill="#eef3ee" stroke="#3b7a57"/><text x="207" y="62" text-anchor="middle" font-size="6">provider APIs</text><text x="207" y="71" text-anchor="middle" font-size="5" fill="#6b6b6b">fallback</text>
  <rect x="260" y="36" width="90" height="24" rx="3" fill="#24405e"/><text x="305" y="46" text-anchor="middle" fill="#fff" font-size="6">cost + usage</text><text x="305" y="55" text-anchor="middle" fill="#cdd" font-size="5">per-team dashboards</text>
  <path d="M50 26 L64 40" stroke="#888" marker-end="url(#mt)"/><path d="M50 50 L64 50" stroke="#888" marker-end="url(#mt)"/><path d="M50 74 L64 60" stroke="#888" marker-end="url(#mt)"/><path d="M152 42 L168 34" stroke="#888" marker-end="url(#mt)"/><path d="M152 58 L168 62" stroke="#888" marker-end="url(#mt)"/><path d="M244 48 L258 48" stroke="#888" marker-end="url(#mt)"/>
  <defs><marker id="mt" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The three multi-tenancy pillars.** *Isolation* — per-team API keys, quotas, and rate limits so one team cannot starve another (17-30a, 17-47a). *Attribution* — every request stamped with `team`/`feature` for per-team cost dashboards and budgets (17-55). *Fairness* — priority lanes and per-tenant caps at the serving layer.
- **Fine-tuning-as-a-service is multi-LoRA** (17-17b): one base model, per-team adapters — teams get custom models without per-team GPUs. Provider fallback (17-03) sits behind the same gateway for models you do not self-host.

:::interview
"How do you stop one team's traffic from hurting everyone else?"

Multi-tenancy controls at the gateway and serving layer: **per-team rate limits and token quotas** (isolation), **priority lanes + admission control** so a batch-heavy team yields to interactive traffic (fairness), and **per-team budgets with burn alerts** so a runaway loop caps itself, not the shared bill. For custom models, **multi-LoRA** gives each team a fine-tune on shared GPUs. The framing that scores: the platform's job is *isolation, fairness, and attribution* over shared infrastructure — the same problems as any multi-tenant system, plus token-cost attribution.
:::
