## Responsible Scaling Policies (RSP / ASL)

- Anthropic's **Responsible Scaling Policy (RSP)** introduced the framework the others echo: **AI Safety Levels (ASL)**, modeled on the biosafety levels (BSL) used for pathogens. Each level pairs a *capability* range with the *safety and security measures* required to develop and deploy models in it. **[VERIFY current ASL definitions]**

<svg viewBox="0 0 360 92" role="img" aria-label="Ascending AI Safety Levels, each requiring stronger safeguards as capability and risk rise" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="20" y="14" width="300" height="16" rx="2" fill="#eef6fb" stroke="#24405e"/><text x="28" y="25" font-size="6">ASL-2 — present models: basic safeguards</text>
  <rect x="40" y="34" width="280" height="16" rx="2" fill="#d5e8fb" stroke="#24405e"/><text x="48" y="45" font-size="6">ASL-3 — meaningful catastrophic-misuse uplift: hardened security + deploy limits</text>
  <rect x="60" y="54" width="260" height="16" rx="2" fill="#6a9bd0"/><text x="68" y="65" fill="#fff" font-size="6">ASL-4+ — autonomy / severe uplift: far stronger, some measures TBD</text>
  <text x="180" y="84" text-anchor="middle" font-size="5.5" fill="#6b6b6b">higher level = more capability = more required safeguards</text>
</svg>

- **How ASL works:** define capability thresholds that would meaningfully raise catastrophic risk (e.g. substantially uplifting a novice's ability to create bioweapons, or the ability to operate autonomously and self-replicate). Before a model *crosses* a threshold, the lab must have the corresponding **safeguards** in place — stronger security (to prevent theft of dangerous weights), deployment restrictions, and evaluations — or it pauses.
- **The key commitment: capability triggers safeguards, not the reverse.** You do not deploy a model and then figure out safety; you must be able to *demonstrate* the safeguards for a capability level *before* you reach it. If evaluations (15-34) show a model has crossed a line and the safeguards are not ready, development or deployment is supposed to halt until they are.
- **ASL and autonomy:** the higher levels are explicitly about *this module's* concerns — autonomous capability, self-replication, evading oversight. The framework is, in part, a plan for how to handle exactly the recursive-autonomy risks (15-09) if and when models approach them.

:::interview
**"What is a Responsible Scaling Policy / ASL, in one breath?"** A commitment framework that ties required safety measures to measured model capability, modeled on biosafety levels. Each AI Safety Level pairs a capability range with mandatory safeguards — security, deployment limits, evaluations. The core rule is that capability *triggers* safeguards *in advance*: before a model could cross a dangerous-capability threshold (bioweapon uplift, autonomous self-replication, evading control), the lab must already have the corresponding protections in place, or pause. It's how frontier labs plan to handle escalating risk — including the autonomous-agent risks this module is about — proactively rather than after the fact.
:::
