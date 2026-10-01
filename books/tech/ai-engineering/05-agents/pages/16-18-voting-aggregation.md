## Voting and aggregation

- The practical, everyday consensus mechanism for LLM agents: run several agents on the same question and **aggregate** their answers into one. Simple, effective, and the basis of the reliability gains from ensembles (14-38 voting). **[VERIFY]**

<svg viewBox="0 0 360 84" role="img" aria-label="Several agent answers aggregated by majority vote, weighting, or a judge into a final decision" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#6a9bd0"><rect x="14" y="16" width="60" height="14" rx="2"/><rect x="14" y="34" width="60" height="14" rx="2"/><rect x="14" y="52" width="60" height="14" rx="2"/></g>
  <text x="44" y="26" text-anchor="middle" fill="#fff" font-size="5.5">A</text><text x="44" y="44" text-anchor="middle" fill="#fff" font-size="5.5">A</text><text x="44" y="62" text-anchor="middle" fill="#fff" font-size="5.5">B</text>
  <rect x="130" y="28" width="90" height="26" rx="3" fill="#a03050"/><text x="175" y="41" text-anchor="middle" fill="#fff" font-size="6">aggregate</text><text x="175" y="50" text-anchor="middle" fill="#fc8" font-size="5.5">majority / weight / judge</text>
  <rect x="260" y="30" width="80" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="44" text-anchor="middle" font-size="6">"A" (2 of 3)</text>
  <g stroke="#888"><path d="M74 23 L128 38" marker-end="url(#vo)"/><path d="M74 41 L128 41" marker-end="url(#vo)"/><path d="M74 59 L128 44" marker-end="url(#vo)"/><path d="M220 41 L258 41" marker-end="url(#vo)"/></g>
  <defs><marker id="vo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Aggregation methods, increasing in sophistication:**
  - **Majority vote** — take the answer most agents gave (self-consistency, Booklet 4). Great for questions with a discrete answer; reduces the impact of any single agent's error.
  - **Weighted vote** — weight agents by confidence, past accuracy, or expertise, so a trusted specialist's vote counts more than a generalist's.
  - **Judge/synthesizer** — an aggregator agent reads all answers *and their reasoning* and decides (or synthesizes a better answer than any input) — the MoA aggregator (16-14), better for open-ended answers where votes do not apply.
- **Why it works:** independent errors *cancel*. If each agent is 70% accurate and errs *independently*, a majority of several is far more accurate than any one — the ensemble effect (Booklet 1). The catch is the *independence* assumption: if all agents share the same blind spot (same model, same prompt), they err *together* and voting does not help (16-10's clone trap). Diversity of agents is what makes voting powerful.

:::interview
"How do you aggregate multiple agents' answers into one reliable decision?"

By voting, scaled to the task. Majority vote for discrete answers (self-consistency — independent errors cancel, so a majority beats any single agent). Weighted vote when agents differ in reliability or expertise (trusted specialists count more). A judge/synthesizer agent for open-ended answers, reading all responses and their reasoning to decide or produce a better combined answer. The crucial caveat is *independence*: voting only helps if agents err independently — same model with the same prompt shares blind spots and votes wrong together, so genuine diversity (different models, prompts, or perspectives) is what makes aggregation reliable.
:::
