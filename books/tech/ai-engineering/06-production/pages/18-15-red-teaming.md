## Red-teaming, PAIR and automated attacks

- **Red-teaming** is adversarial testing: deliberately trying to break the model's safety before an attacker does. It started manual — humans crafting jailbreaks — but manual red-teaming does not scale to the size of the attack space, so the field automated it.
- **PAIR** (Prompt Automatic Iterative Refinement, Chao et al. 2023) is the canonical automated jailbreak: one LLM *attacks* another, using the target's refusals as feedback to refine the next attempt, converging on a working jailbreak in a handful of queries. **[VERIFY]**

<svg viewBox="0 0 360 84" role="img" aria-label="An attacker LLM sends a prompt to the target, reads the refusal, and refines iteratively until the target complies" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="34" width="76" height="24" rx="3" fill="#24405e"/><text x="58" y="44" text-anchor="middle" font-size="6" fill="#fff">attacker LLM</text><text x="58" y="53" text-anchor="middle" font-size="5.5" fill="#cdd">refines prompt</text>
  <rect x="180" y="34" width="76" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="218" y="44" text-anchor="middle" font-size="6">target LLM</text><text x="218" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">refuses / complies</text>
  <path d="M96 42 L178 42" stroke="#888" marker-end="url(#pr)"/><text x="137" y="38" text-anchor="middle" font-size="5.5">attack prompt</text>
  <path d="M178 52 L98 52" stroke="#a03050" marker-end="url(#pr2)"/><text x="137" y="64" text-anchor="middle" font-size="5.5" fill="#a03050">refusal = feedback</text>
  <rect x="288" y="34" width="60" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="318" y="47" text-anchor="middle" font-size="6">jailbreak</text>
  <path d="M256 46 L286 46" stroke="#888" marker-end="url(#pr)"/>
  <defs><marker id="pr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="pr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Why automation changed the game.** A human finds a few jailbreaks a day; an attacker LLM finds thousands, adapts to each target, and transfers attacks across models. Defenders must red-team at the same scale — which is what the tooling (garak, PyRIT, next pages) provides.
- **Red-teaming is a continuous process, not a launch gate.** Every model update, prompt change, and new capability reopens the attack surface, and public jailbreaks spread within hours. Safety is a moving target measured by a *rate* (how many attacks land) that you track over time, like any other production metric.

:::interview
"How would you red-team an LLM feature before launch?"

Combine three layers. **Automated** — run a jailbreak tool (garak/PyRIT) with an attacker model (PAIR-style iterative refinement) across the known attack taxonomy, measuring attack-success rate. **Targeted** — hand-probe *your* specific risks (what is the worst output for this product? what tools can the agent reach?). **Continuous** — wire the attack suite into CI so every model/prompt change is re-tested, and monitor live traffic for jailbreak attempts. The framing that scores: red-teaming is an ongoing measured rate, not a one-time checkbox.
:::
