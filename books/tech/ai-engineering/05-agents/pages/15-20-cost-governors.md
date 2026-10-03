## Cost governors

- An autonomous agent spends money *on its own* — every model call and many tools cost. Without limits, a stuck loop (14-05) or a runaway task can burn a fortune before anyone notices. A **cost governor** is the safeguard that caps and controls agent spend.

<svg viewBox="0 0 360 88" role="img" aria-label="A cost governor tracks spend per run and halts or downgrades when a budget is hit" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="34" width="70" height="24" rx="3" fill="#24405e"/><text x="49" y="49" text-anchor="middle" fill="#fff" font-size="6">agent step</text>
  <rect x="112" y="30" width="80" height="32" rx="4" fill="#a03050"/><text x="152" y="44" text-anchor="middle" fill="#fff" font-size="6">meter spend</text><text x="152" y="54" text-anchor="middle" fill="#fc8" font-size="5.5">vs budget</text>
  <rect x="224" y="20" width="120" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="284" y="32" text-anchor="middle" font-size="6">under → continue</text>
  <rect x="224" y="44" width="120" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="284" y="56" text-anchor="middle" font-size="6">over → halt / escalate</text>
  <path d="M84 46 L110 46" stroke="#888" marker-end="url(#cg)"/><path d="M192 42 L222 30" stroke="#888" marker-end="url(#cg)"/><path d="M192 50 L222 52" stroke="#888" marker-end="url(#cg)"/>
  <defs><marker id="cg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What a cost governor does:** track spend (tokens × price, plus tool costs) in real time, per run and per user/tenant, and enforce **budgets** — hard caps that halt a run, soft caps that alert, and rate limits that throttle. When a budget is hit, the agent stops (or escalates to a human) rather than spending unbounded.
- **Graduated responses, not just a hard stop:**
  - **Downgrade** — switch to a cheaper model as spend rises (the routing idea, 13-45), finishing the task cheaply rather than aborting.
  - **Alert** — notify at 50%/80% of budget so a human can intervene before the cap.
  - **Halt + escalate** — at the hard cap, stop and hand to a human with the state (multi-session handoff, 14-137).
- **Why it is essential for autonomy:** the whole point of an autonomous agent is that no one is watching — which is exactly when a runaway spend goes unnoticed. The cost governor is the unsupervised-spend equivalent of the loop guard (14-05): a mechanical limit that fires without a human.

:::warn
The horror story every team learns once: an agent hits a subtle loop (retrying a failing tool, or two agents talking forever, 14-66) overnight and burns thousands of dollars in API calls before morning. Autonomy removes the human who would have noticed. A per-run token/dollar budget with a hard cap is not optional for any unattended agent — it is the single cheapest insurance against the most common expensive failure. Set it before you let an agent run unwatched.
:::
