## Shadow, canary, progressive rollout

- Changing the model, the prompt, or the serving config is risky *because output is nondeterministic* — you cannot fully predict the effect from a diff. Three deployment patterns let you ship the change to a shrinking blast radius and roll back before most users notice.

<svg viewBox="0 0 360 96" role="img" aria-label="Shadow mirrors traffic to the new version without serving it; canary serves a small percent; progressive ramps the percent up" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">shadow</text>
  <rect x="20" y="20" width="34" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="37" y="30" text-anchor="middle" font-size="5">v1 serves</text>
  <rect x="20" y="38" width="34" height="14" rx="2" fill="#f4f4f4" stroke="#888" stroke-dasharray="2 2"/><text x="37" y="48" text-anchor="middle" font-size="5">v2 mirror</text>
  <text x="60" y="62" text-anchor="middle" font-size="5" fill="#6b6b6b">compare, don't serve</text>
  <text x="180" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">canary</text>
  <rect x="150" y="20" width="60" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="30" text-anchor="middle" font-size="5">v1 · 95%</text>
  <rect x="150" y="38" width="14" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="48" font-size="5">v2 · 5%</text>
  <text x="300" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">progressive</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="250" y="44" width="12" height="8"/><rect x="266" y="38" width="12" height="14"/><rect x="282" y="30" width="12" height="22"/><rect x="298" y="22" width="12" height="30"/><rect x="314" y="16" width="12" height="36"/></g>
  <text x="300" y="62" text-anchor="middle" font-size="5" fill="#6b6b6b">5→25→50→100%</text>
</svg>

- **Shadow:** send a copy of live traffic to the new version but *do not return its output*. You compare v2's answers, latency, and cost against v1's on real traffic with zero user risk. The pre-flight check.
- **Canary:** route a small slice (say 5%) of *real* users to v2, watch the golden signals and quality metrics, and abort at the first regression. The controlled live test.
- **Progressive rollout:** once the canary is healthy, ramp the percentage up in stages (5→25→50→100), each gated on metrics staying green, with automatic rollback if they don't.

:::warn
Shadowing an LLM has a trap the web world does not: **side effects.** If the shadowed request calls tools — sends an email, writes to a database, charges a card — mirroring it fires those effects twice. Shadow only *read-only* paths, or stub the tools in the shadow lane. A shadow deployment that double-sends every email is a worse outage than the bug you were testing for.
:::
