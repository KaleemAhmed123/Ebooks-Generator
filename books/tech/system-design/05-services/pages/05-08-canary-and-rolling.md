## Canary and rolling

- A **rolling update** replaces the fleet in batches, watching health checks. It bounds the blast radius of a version that will not boot, and says nothing about one that boots and is subtly wrong
- A **canary** answers that. Google's SRE workbook: "We define canarying as a partial and time-limited deployment of a change in a service and its evaluation." The evaluation is the part that gets dropped, and the only part separating a canary from a slow rollout

<svg viewBox="0 0 460 114" role="img" aria-label="A canary evaluated against a same-sized control. Traffic is split three ways: to a canary of one instance running version two, to a control of one instance running version one, and to the rest of the fleet, 998 instances running version one. The canary is compared against the control, not against the fleet: same size, same traffic, same hardware, with exactly one thing different. An orange cross marks comparing the canary against the whole fleet, which hides one bad instance among 999. Kubernetes rolling update defaults, maxUnavailable 25 per cent and maxSurge 25 per cent, replace the fleet: that is a rollout, not a comparison." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="30" width="52" height="28" rx="3" fill="#fff" stroke="#1d4e89"/><text x="32" y="48" text-anchor="middle" font-size="7.5">traffic</text>
  <rect x="110" y="12" width="130" height="22" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="175" y="26" text-anchor="middle" font-size="7.5">canary — 1 instance, v2</text>
  <rect x="110" y="42" width="130" height="22" rx="3" fill="#fff" stroke="#1d4e89"/><text x="175" y="56" text-anchor="middle" font-size="7.5">control — 1 instance, v1</text>
  <rect x="110" y="72" width="130" height="22" rx="3" fill="#f3f3f3" stroke="#666"/><text x="175" y="86" text-anchor="middle" font-size="7.5">fleet — 998 instances, v1</text>
  <line x1="58" y1="40" x2="108" y2="23" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="58" y1="44" x2="108" y2="53" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="58" y1="52" x2="108" y2="83" stroke="#1d4e89" marker-end="url(#b)"/>
  <path d="M244,23 L258,23 L258,53 L244,53" fill="none" stroke="#1d4e89"/>
  <text x="266" y="32" font-size="7" fill="#1d4e89">compare these two</text>
  <text x="266" y="42" font-size="7">same size, same traffic,</text>
  <text x="266" y="52" font-size="7">same hardware, one thing differs</text>
  <text x="266" y="82" font-size="7" fill="#bf4c28">✕ canary against the whole fleet:</text>
  <text x="266" y="92" font-size="7" fill="#bf4c28">one bad instance in 999 moves nothing</text>
  <text x="6" y="108" font-size="7">Kubernetes rolling defaults maxUnavailable 25 % and maxSurge 25 % replace the fleet — a rollout, not a comparison</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Pick few metrics on purpose: "Stack-rank the metrics … based on how well they indicate actual user-perceivable problems", tied to existing indicators (Module 6, page 7). Then size the canary from the rate of the fault being looked for — one that fires once in a thousand requests needs enough requests to fire

:::interview
"How do you roll out a change safely?" — Deploy it dark behind a flag (page 9), so release is a separate switch from deploy. Then put a small slice of real traffic on the new version and an identical, same-sized slice on the old one, and compare those two on a few user-facing metrics. Widen only if the comparison holds, and keep rollback to one action: flip the flag or shift the traffic back. The schema is the part that does not roll back, so every migration ships as its own backward-compatible release first.
:::

### The failure

- Canarying against the fleet average. One instance in a thousand failing half its requests moves fleet error rate by 0.05 percentage points — inside the daily noise, so the dashboard stays green and the rollout widens on a signal never capable of showing the fault
