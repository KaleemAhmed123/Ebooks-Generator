## Safety cases: claims vs evidence

- The worked case (previous page) had a ✓ on each control. What makes it a *safety case* rather than a wish-list is that each ✓ is backed by **evidence** a reviewer can attack — this is the discipline that separates a real argument from reassurance.
- **A claim is falsifiable; a reassurance is not.** "We monitor actions" is a claim with no teeth. "Red-teaming shows the monitor catches 94% of injected malicious actions, and the residual 6% are bounded by the sandbox's no-network containment" is a *safety case* — each number is a target a reviewer can test, reproduce, and challenge.

<svg viewBox="0 0 360 70" role="img" aria-label="Each safety-case claim must be backed by testable evidence: a red-team result, a sandbox escape test, an eval score" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="24" width="120" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="72" y="37" text-anchor="middle" font-size="6">claim: "we monitor"</text>
  <rect x="152" y="14" width="196" height="16" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="250" y="25" text-anchor="middle" font-size="5.5">reassurance if unbacked → reviewer can't test it</text>
  <rect x="152" y="38" width="196" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="250" y="49" text-anchor="middle" font-size="5.5">safety case if backed by a red-team catch-rate number</text>
  <path d="M132 30 L150 22 M132 38 L150 46" stroke="#888" marker-end="url(#se2)"/>
  <defs><marker id="se2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The evidence types** a safety case draws on: red-team results (attack-success rates against the monitor), sandbox-escape tests, dangerous-capability eval scores (18-30), unlearning verification (18-33), and interpretability probes (18-32). Each pillar's claims cite the evidence that supports them, and the strength of the case is the strength of that evidence under adversarial review.

:::interview
"Build a safety case for an agent that runs code in production."

Pick the pillars the situation supports, and back each with evidence. **Incapability** fails — running code is the point — so lean on **monitoring** (log/trace every action, a trusted classifier reviews, anomalies escalate to a human, backed by a *red-team catch-rate number*) and **containment** (sandbox with no network, filesystem denylist, resource limits, least-privilege scope, backed by escape tests). Then *state the residual risk* explicitly — a novel action that evades the monitor *and* escapes the sandbox — and decide whether it's accepted or needs human approval on irreversible actions. The mature moves: name the weakest pillar, compensate with the others, **back every claim with testable evidence**, and be honest about what risk remains — never "we added guardrails, it's safe."
:::
