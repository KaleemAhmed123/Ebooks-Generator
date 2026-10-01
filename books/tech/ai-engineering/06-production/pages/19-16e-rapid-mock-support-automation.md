## Rapid mock: customer-support automation

- **Prompt:** "Design an AI system that handles customer support end to end." **Clarify:** answers from the company KB, takes actions (refunds, order changes), must escalate to humans, low tolerance for wrong actions, measured on resolution rate + CSAT.
- This composes RAG (Flagship 3), agents (Flagship 4/19-09), and safety (Flagship 12) — and the key design is the **confidence-gated escalation**.

<svg viewBox="0 0 360 62" role="img" aria-label="Support flow: query, RAG answer or agent action, confidence gate, resolve or escalate to human" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="22" width="42" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="29" y="33" text-anchor="middle">query</text>
  <rect x="56" y="22" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="91" y="33" text-anchor="middle">RAG / agent</text>
  <rect x="132" y="22" width="60" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="162" y="33" text-anchor="middle">confidence?</text>
  <rect x="200" y="8" width="78" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="239" y="18" text-anchor="middle" font-size="5.5">high → resolve/act</text>
  <rect x="200" y="38" width="78" height="14" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="239" y="48" text-anchor="middle" font-size="5.5">low → human handoff</text>
  <path d="M50 30 L54 30 M126 30 L130 30 M192 28 L198 17 M192 32 L198 43" stroke="#888" marker-end="url(#su)"/>
  <defs><marker id="su" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Answer vs act.** Informational queries → grounded RAG with citations. Action requests (refund, change) → an **agent with least-privilege tools** and **confirmation on consequential/irreversible actions** (19-09). Actions carry the real risk, so they're gated harder than answers.
- **Escalation is a feature, not a failure.** When confidence is low, the KB lacks the answer, or the action is high-stakes, hand to a human *with context* — the transcript and the agent's best guess — so the human starts warm. Measured on resolution rate *and* wrong-action rate, not deflection alone.

:::interview
"How do you keep a support agent from taking a wrong action, like a bad refund?"

Separate *answering* from *acting* and gate them differently. Informational answers are grounded RAG with citations; **actions** go through a least-privilege agent with **confirmation on anything consequential or irreversible** (propose-then-commit), and **confidence-gated escalation** hands low-confidence or high-stakes cases to a human *with the full context*. Measure wrong-action rate as a first-class metric alongside resolution rate, and treat escalation as a success path, not a failure. The framing — actions are riskier than answers, so verify and gate them harder, and make graceful human handoff a feature — is what separates a safe support system from a deflection-chasing one.
:::
