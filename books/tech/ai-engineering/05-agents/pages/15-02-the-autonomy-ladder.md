## The autonomy ladder

- Autonomy comes in levels, like the SAE levels for self-driving cars. Placing your system on the ladder tells you what safeguards it needs and what to build next.

<svg viewBox="0 0 360 108" role="img" aria-label="Five autonomy levels from human-does-all to fully autonomous, with the human's role shrinking" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="20" y="14" width="320" height="16" rx="2" fill="#eef6fb" stroke="#24405e"/><text x="28" y="25" font-size="6">L1 assist — human acts, AI suggests</text>
  <rect x="40" y="34" width="300" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="48" y="45" font-size="6">L2 human approves each action</text>
  <rect x="60" y="54" width="280" height="16" rx="2" fill="#d5e8fb" stroke="#24405e"/><text x="68" y="65" font-size="6">L3 agent acts, human reviews after</text>
  <rect x="80" y="74" width="260" height="16" rx="2" fill="#6a9bd0"/><text x="88" y="85" fill="#fff" font-size="6">L4 agent runs unattended, gated on consequential acts</text>
  <rect x="100" y="94" width="240" height="14" rx="2" fill="#24405e"/><text x="108" y="104" fill="#fff" font-size="6">L5 fully autonomous — no human in loop</text>
</svg>

- **L1 — Assist.** The AI suggests; the human does everything (autocomplete, a draft). No agent risk — the human is fully in control.
- **L2 — Approve each action.** The agent proposes each step; a human approves before it runs (14-52). Safe, but human-bounded — does not scale.
- **L3 — Act, review after.** The agent completes a task autonomously; a human reviews the *result* before it takes effect (propose-then-commit, 15-26). The common sweet spot — autonomy with a final gate.
- **L4 — Unattended, gated on the dangerous.** The agent runs for a long horizon on its own, pausing only for genuinely consequential actions. Needs the full safety stack (kill switches, cost governors, monitoring).
- **L5 — Fully autonomous.** No human in the loop at all. Reserved for low-stakes or extremely well-bounded tasks — the risk is unsupervised and total.

- **The rule:** operate at the *lowest* level that delivers the value. Most production agents belong at L2–L4; L5 is rare and dangerous. Moving up a rung is a deliberate decision that *adds required safeguards*, not a default.

:::interview
**"How do you think about how much autonomy to give an agent?"** As a ladder, and I pick the lowest rung that delivers the value. Assist (suggest only) → approve-each-action → act-then-human-reviews → unattended-but-gated-on-consequential-actions → fully autonomous. Each rung up removes a human safeguard, so it must add engineered ones — the review gate, kill switches, cost governors, monitoring. Most production agents sit at "act then review" or "unattended with gates on dangerous actions." Full autonomy is reserved for low-stakes, tightly-bounded tasks, because its mistakes are unsupervised and irreversible.
:::
