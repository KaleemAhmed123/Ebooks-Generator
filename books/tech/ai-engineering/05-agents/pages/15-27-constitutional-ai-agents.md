## Constitutional AI for agents

- Applying constitutional principles to *agents* — systems that take actions, not just produce text — extends the idea from "what to say" to "what to do." An agent can be given a constitution governing its **actions** and made to check proposed actions against it before acting.

<svg viewBox="0 0 360 84" role="img" aria-label="Before acting, the agent checks a proposed action against action principles and blocks disallowed ones" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="32" width="80" height="26" rx="3" fill="#24405e"/><text x="50" y="48" text-anchor="middle" fill="#fff" font-size="6">proposed action</text>
  <rect x="116" y="28" width="96" height="34" rx="4" fill="#a03050"/><text x="164" y="42" text-anchor="middle" fill="#fff" font-size="6">check vs action</text><text x="164" y="53" text-anchor="middle" fill="#fc8" font-size="5.5">constitution</text>
  <rect x="236" y="20" width="114" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="293" y="32" text-anchor="middle" font-size="6">allowed → act</text>
  <rect x="236" y="44" width="114" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="293" y="56" text-anchor="middle" font-size="6">disallowed → block/escalate</text>
  <path d="M90 45 L114 45" stroke="#888" marker-end="url(#ca3)"/><path d="M212 42 L234 30" stroke="#888" marker-end="url(#ca3)"/><path d="M212 48 L234 52" stroke="#888" marker-end="url(#ca3)"/>
  <defs><marker id="ca3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **An action constitution** states what the agent may and may not *do*: "never delete user data without explicit confirmation", "do not spend beyond the budget", "escalate anything that affects other users", "refuse tasks outside the assigned scope". These are the agent-level analogue of behavioral principles.
- **Two ways to enforce it:**
  - **Trained-in** (the CAI way, 15-26) — the model is trained to internally refuse disallowed actions, so it declines them on its own.
  - **Checked at runtime** — before each consequential action, a step (the agent itself, or a separate guardrail model, 15-28) evaluates the proposed action against the constitution and blocks violations. This is executable constraints (14-133) with a *principled, natural-language* policy rather than hard-coded rules — flexible enough to catch cases you did not enumerate.
- **Why both trained-in and runtime:** trained-in dispositions handle the vast common case cheaply and cover situations you never anticipated; a runtime check is the explicit, auditable gate for the actions that matter most. Defense in depth (14-130) applied to agent behavior.

:::interview
"How do you constrain what an autonomous agent is willing to do, beyond hard-coded rules?"

Give it a constitution — explicit natural-language principles about permissible *actions* ("never delete data without confirmation", "escalate anything affecting other users", "stay in scope") — and enforce it two ways. Trained-in: the model is aligned (Constitutional AI / RLAIF) to internally refuse disallowed actions, covering even unanticipated cases. Runtime: before consequential actions, the agent or a separate guardrail model checks the proposal against the constitution and blocks violations. It's more flexible than hard-coded rules (it generalizes to cases you didn't enumerate) and, combined with hard constraints for the absolute must-nots, gives layered, auditable behavioral control.
:::
