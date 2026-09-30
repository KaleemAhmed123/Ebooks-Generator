## The autonomous safety stack

- Assemble every safeguard in this module into one layered defense. No layer suffices alone; together they make autonomy safe enough to deploy. This is the mental checklist for shipping any unsupervised agent.

<svg viewBox="0 0 360 116" role="img" aria-label="Concentric safety layers around an agent: alignment, sandbox, constraints, gates, monitoring, kill switch" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="5.8" fill="#1a1a1a">
  <rect x="14" y="8" width="332" height="100" rx="7" fill="#fdeef2" stroke="#a03050"/><text x="180" y="18" text-anchor="middle" fill="#a03050">6 · kill switch + monitoring (outside)</text>
  <rect x="40" y="22" width="280" height="80" rx="6" fill="#fff" stroke="#24405e"/><text x="180" y="32" text-anchor="middle">5 · cost governor + canary rollout</text>
  <rect x="66" y="36" width="228" height="62" rx="5" fill="#eef6fb" stroke="#24405e"/><text x="180" y="46" text-anchor="middle">4 · sandbox + scope + reversibility</text>
  <rect x="92" y="50" width="176" height="44" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="60" text-anchor="middle">3 · gates: propose-then-commit, approvals</text>
  <rect x="116" y="64" width="128" height="26" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="180" y="74" text-anchor="middle">2 · guardrails + constraints</text>
  <rect x="140" y="76" width="80" height="12" rx="2" fill="#24405e"/><text x="180" y="85" text-anchor="middle" fill="#fff">1 · aligned model</text>
</svg>

- **The layers, inside out** — each catches what the inner ones miss:
  1. **Aligned model** (15-26) — trained dispositions to refuse harm and stay in bounds. Reduces how often anything else is tested.
  2. **Guardrails + hard constraints** (15-28, 14-133) — safety classifiers and executable rules block disallowed content/actions.
  3. **Gates** (15-23, 15-14) — human/automated approval on consequential, irreversible actions.
  4. **Sandbox + scope + reversibility** (15-25, 14-134, 15-24) — limit what is even possible, and make mistakes undoable.
  5. **Cost governor + canary** (15-20, 15-22) — bound runaway spend; limit blast radius of a bad version.
  6. **Kill switch + monitoring** (15-21, 14-113) — external observation and an instant, total off switch when all else fails.
- **The principle: defense in depth** (14-130). An incident must defeat *every* layer, which is far harder than beating one. Match the number and strength of layers to the autonomy level (15-02) and the stakes — L2 needs few; L4 unattended needs all.

:::note
This stack is the answer to the module's central question — "how much autonomy, and how to make it safe?" More autonomy is not reckless if each rung up the ladder adds the layers that make *that* rung safe. The senior judgment is calibration: a low-stakes sandboxed coding agent needs a light stack; an agent that touches money, production, or the physical world needs all six layers, hard. Autonomy is earned with safeguards, and the safeguards are exactly these.
:::
