## Layered defenses against injection

- Since no single defense stops prompt injection, you stack many — **defense in depth** — so an attack must beat all of them. Each layer is imperfect; together they shrink the risk to acceptable.

<svg viewBox="0 0 360 104" role="img" aria-label="Concentric defense layers: input filtering, privilege limits, human approval, output filtering, monitoring around the agent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="20" y="10" width="320" height="86" rx="6" fill="#fdeef2" stroke="#a03050"/><text x="180" y="20" text-anchor="middle" fill="#a03050">monitoring / logging</text>
  <rect x="46" y="26" width="268" height="64" rx="5" fill="#fff" stroke="#24405e"/><text x="180" y="35" text-anchor="middle">least privilege + break the trifecta</text>
  <rect x="76" y="40" width="208" height="44" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="49" text-anchor="middle">human approval on consequential acts</text>
  <rect x="108" y="54" width="144" height="24" rx="3" fill="#24405e"/><text x="180" y="69" text-anchor="middle" fill="#fff" font-size="6">the agent</text>
</svg>

- **The layers, outside-in:**
  - **Limit privilege / break the trifecta** (14-129) — the strongest layer. An agent that cannot both access secrets and send externally cannot exfiltrate, whatever it is told. Scope tools tightly (13-15) and separate capabilities across contexts.
  - **Human approval on consequential actions** (14-52) — a person confirms sends, purchases, deletes. Injection that needs a gated action stalls at the gate.
  - **Input filtering** — scan incoming content for known injection patterns and strip or flag it. Catches the crude attacks; not the clever ones (an incomplete but cheap layer).
  - **Output filtering** — check the agent's outputs/actions for leaks (secrets, unexpected recipients) before they leave (the output guardrails of 14-80).
  - **Isolation / sandboxing** — run untrusted-content processing in a context with no access to secrets or dangerous tools (13-49).
  - **Monitoring** — trace and alert on anomalous behavior (14-113), so an attack in progress is caught and contained.
- **No layer is sufficient alone**; the point is that an attacker must defeat *all* of them, which is far harder than beating one.

:::note
The mental shift for agent security: you are not building a wall that keeps injection out — you cannot, because reading untrusted content is the job. You are **containing the blast radius** so that even a successful injection cannot do serious harm — it hits an agent with no secrets, or no outbound channel, or a human gate on the dangerous action. Assume injection *will* succeed sometimes, and design so that when it does, the worst case is tolerable.
:::
