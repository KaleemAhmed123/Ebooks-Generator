## "How do you explain to a non-technical stakeholder that the AI is 'wrong sometimes'?"

- **What they're screening for:** communication — setting realistic expectations without either over-promising or killing the project with doom.
- **A strong answer shows:**
  - **Frame it honestly but constructively** — AI is **probabilistic**, like a very capable assistant that's usually right but occasionally wrong; we design for that, we don't pretend it won't happen.
  - **Quantify it** — "it's correct ~95% on our test set; here's the 5% failure profile and what we do about it." Numbers beat vague reassurance or vague alarm.
  - **Show the safeguards** — guardrails, human review on high-stakes paths, "I don't know" fallbacks, monitoring. The error is managed, not ignored.
  - **Tie risk to use case** — a wrong movie recommendation is fine; a wrong medical/legal answer needs a human gate. Match the control to the stakes.
- Avoid both extremes: "it's perfect" (sets you up to fail) and "it's unreliable" (kills adoption).

:::warn
Weak: "It'll be accurate, don't worry" or "LLMs hallucinate, it's risky." Strong: "~95% right; here's the failure mode, the safeguard, and the human gate on risky actions."
:::

:::interview
What's really being tested: that you communicate probabilistic behaviour with numbers + safeguards + stakes-appropriate controls — managing expectations, not hiding or exaggerating the risk.
:::
