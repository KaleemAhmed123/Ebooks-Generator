## External evaluation and red-teaming

- Two practices give the governance frameworks teeth: **external evaluation** (independent parties test the model) and **red-teaming** (experts actively try to make it misbehave). Both counter the core problem that a lab evaluating its own model has every incentive to under-find risk.

<svg viewBox="0 0 360 84" role="img" aria-label="Independent evaluators and red-teamers probe a model for dangerous capabilities before release" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="130" y="12" width="100" height="20" rx="4" fill="#24405e"/><text x="180" y="25" text-anchor="middle" fill="#fff">model (pre-release)</text>
  <rect x="14" y="50" width="104" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="66" y="61" text-anchor="middle">external eval</text><text x="66" y="70" text-anchor="middle" font-size="5.5" fill="#6b6b6b">independent labs (METR…)</text>
  <rect x="128" y="50" width="104" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="61" text-anchor="middle">red team</text><text x="180" y="70" text-anchor="middle" font-size="5.5" fill="#6b6b6b">try to break it</text>
  <rect x="242" y="50" width="104" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="294" y="61" text-anchor="middle">domain experts</text><text x="294" y="70" text-anchor="middle" font-size="5.5" fill="#6b6b6b">bio/cyber specialists</text>
  <path d="M160 32 L70 48" stroke="#888" marker-end="url(#ee)"/><path d="M180 32 L180 48" stroke="#888" marker-end="url(#ee)"/><path d="M200 32 L292 48" stroke="#888" marker-end="url(#ee)"/>
  <defs><marker id="ee" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **External evaluation** — independent organizations (like METR, 15-34, or government AI safety institutes) test a model for dangerous capabilities before or around release, with access the public does not have. Independence is the value: they have no incentive to ship, and their consistent methodology compares models across labs.
- **Red-teaming** — instead of scoring average behavior, experts *adversarially* attack the model: try to jailbreak it, elicit dangerous knowledge, or make an agent misbehave, including with domain specialists (bio, cyber, security). Red-teaming finds the *ceiling* of harm a determined attacker could reach — the number that actually matters for risk (15-33's elicitation point).
- **How they fit the frameworks:** the responsible-scaling policies increasingly commit to *external* evaluation and red-teaming as inputs to the deploy decision — a check on the lab's own assessment. This is the governance analogue of the reviewer agent (14-136) and layered defense (14-130): an independent second opinion catches what the first misses.
- **For the engineer:** red-teaming is also a practice you apply to *your* agent — actively try to injection-attack it (14-131), make it over-act (14-127), or break its guardrails, before an attacker does. Governance red-teaming and product red-teaming are the same discipline at different scales.

:::note
The emphasis on *independent* evaluation and adversarial red-teaming reflects a mature understanding: safety cannot be self-certified. A party with an incentive to ship, testing its own product with cooperative evaluations, will systematically under-find risk — not from bad faith but from structural incentive and shared blind spots. The same logic runs through the whole booklet — reviewer agents over self-review (14-136), separate evaluators for self-improvement (15-10), independent guard models (15-28). At every scale, from a single agent to the frontier, **an outside adversarial check finds what the inside cooperative one cannot.**
:::
