## Recursive vs bounded self-improvement

- The pivotal distinction — for both capability and safety — is whether self-improvement is **bounded** (improves at a fixed task, within limits) or **recursive** (improves its *ability to improve*, potentially without limit). Every real system today is bounded; recursive is the theorized fast-takeoff scenario. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="Bounded self-improvement plateaus; recursive self-improvement accelerates without limit" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="76" x2="345" y2="76" stroke="#888"/><line x1="30" y1="10" x2="30" y2="76" stroke="#888"/>
  <path d="M30 72 Q120 40 200 34 Q280 32 340 32" stroke="#24405e" stroke-width="1.5" fill="none"/><text x="260" y="42" font-size="6" fill="#24405e">bounded → plateaus</text>
  <path d="M30 74 Q160 66 230 40 Q290 18 320 12" stroke="#a03050" stroke-width="1.5" fill="none"/><text x="250" y="20" font-size="6" fill="#a03050">recursive → accelerates</text>
  <text x="185" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">iterations →</text>
</svg>

- **Bounded self-improvement** improves performance on a *fixed* objective and hits a **ceiling** — set by the evaluator's quality, the search space, and the base model's capability. STaR gets better at reasoning until the answer-key signal is exhausted; AlphaEvolve finds better algorithms until the search plateaus; DGM improves the agent until its edits stop helping on the benchmark. It plateaus because the *thing doing the improving* does not itself get fundamentally more capable.
- **Recursive self-improvement** would improve the *improver* — the agent gets better at making itself better, so each round is more effective than the last, potentially compounding rapidly ("intelligence explosion", "fast takeoff"). This is theorized, not demonstrated: today's systems improve a *target*, not their own core capability to improve, and they rely on human-provided evaluators and compute.
- **Why the distinction is the whole safety question:** bounded systems are controllable — you set the objective, the evaluator, the budget, and it plateaus predictably. A genuinely recursive system could improve past your ability to oversee it, which is precisely the scenario responsible-scaling policies (15-32) and external evaluations (15-35) are built to detect *before* it happens.

:::interview
**"Are today's self-improving AIs a step toward recursive self-improvement / an intelligence explosion?"** They're the bounded version, not the recursive one. STaR, AlphaEvolve, and the Darwin-Gödel Machine improve performance on a *fixed* objective against a human-provided evaluator, and they plateau — the improver itself doesn't become fundamentally more capable, so gains taper. Recursive self-improvement means improving the *ability to improve*, compounding without limit — theorized, not demonstrated. The distinction is the core safety question: bounded systems are controllable and plateau predictably; a truly recursive one could outpace oversight, which is exactly what responsible-scaling policies and external evals are designed to catch early.
:::
