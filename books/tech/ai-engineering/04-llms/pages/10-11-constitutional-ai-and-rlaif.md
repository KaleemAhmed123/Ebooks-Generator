## Constitutional AI and RLAIF

- Human preference labels are slow and costly. **RLAIF (RL from AI feedback)** replaces the human labeller with an LLM that judges answers against written rules. **Constitutional AI (CAI)** (Anthropic, 2022) is the best-known version.
- A **constitution** is a short list of plain-language principles ("prefer the answer that is more honest and less harmful"). The model critiques and revises its own answers against them, then a model judges pairs to build preference data — no human in the pair-labelling loop.

<svg viewBox="0 0 330 84" role="img" aria-label="Constitutional AI: the model answers, critiques itself against principles, revises, then AI preference judging feeds DPO or RLHF" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="40" text-anchor="middle">answer</text><text x="38" y="49" text-anchor="middle" fill="#6b6b6b">draft</text>
  <rect x="88" y="30" width="70" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="123" y="40" text-anchor="middle">self-critique</text><text x="123" y="49" text-anchor="middle" fill="#6b6b6b">vs constitution</text>
  <rect x="178" y="30" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="208" y="40" text-anchor="middle">revise</text>
  <rect x="258" y="30" width="66" height="22" rx="3" fill="#24405e"/><text x="291" y="40" text-anchor="middle" fill="#fff">AI-judged</text><text x="291" y="49" text-anchor="middle" fill="#fff">pairs → DPO</text>
  <path d="M68 41 L86 41" stroke="#1a1a1a" marker-end="url(#c)"/><path d="M158 41 L176 41" stroke="#1a1a1a" marker-end="url(#c)"/><path d="M238 41 L256 41" stroke="#1a1a1a" marker-end="url(#c)"/>
  <rect x="88" y="10" width="150" height="14" rx="2" fill="none" stroke="#c0392b"/><text x="163" y="20" text-anchor="middle" fill="#c0392b">constitution: written principles</text>
  <defs><marker id="c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The win is **scale and consistency**: AI feedback is fast, cheap, and applies the same rules every time, where human labellers drift and disagree. It also makes the values **auditable** — they are written down, not buried in labellers' judgment.
- RLAIF now supplements human feedback in most frontier pipelines; fully-human labelling at scale is largely gone.

:::note
Same rails apply. The AI-generated preferences still feed a standard DPO or RLHF run — CAI/RLAIF change *where the labels come from*, not the alignment algorithm underneath.
:::

:::warn
The judge inherits the judge's flaws. If the grading model is biased, sycophantic, or misreads a principle, that bias is stamped into every label at scale — and no human is watching each one. RLAIF trades human cost for a **single point of failure in the grader**, so the constitution and the judge model must themselves be checked hard.
:::
