## Capability elicitation

- A dangerous-capability eval (18-30) is only a lower bound — it measures what *your* prompting surfaced, not what the model can do for a determined adversary. **Capability elicitation** is the discipline of measuring the *ceiling*, and doing it well is what makes a safety evaluation trustworthy.

<svg viewBox="0 0 340 82" role="img" aria-label="A gap between a bare-prompt measurement and the true capability ceiling that scaffolding, fine-tuning, and best-effort prompting reveal" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="30" y1="66" x2="30" y2="10" stroke="#888"/>
  <rect x="50" y="52" width="34" height="14" fill="#cdd"/><text x="67" y="48" text-anchor="middle" font-size="5" fill="#6b6b6b">bare prompt</text>
  <rect x="96" y="40" width="34" height="26" fill="#6a9bd0"/><text x="113" y="36" text-anchor="middle" font-size="5" fill="#24405e">+scaffold</text>
  <rect x="142" y="26" width="34" height="40" fill="#a03050"/><text x="159" y="22" text-anchor="middle" font-size="5" fill="#a03050">+fine-tune</text>
  <line x1="30" y1="24" x2="200" y2="24" stroke="#a03050" stroke-dasharray="3 2"/><text x="250" y="22" font-size="5.5" fill="#a03050">true ceiling</text>
  <text x="250" y="44" font-size="6">a real adversary elicits</text><text x="250" y="56" font-size="6">the ceiling, not the floor</text>
</svg>

- **Elicit like a real adversary would.** A determined actor uses *scaffolding* (tools, retrieval, multi-step agents), *fine-tuning* (adapting the model to the task), *best-effort prompting*, and *many attempts*. An eval that uses a bare prompt underestimates the capability an attacker will actually extract — so a safety eval must apply the same techniques to measure the ceiling, or it certifies safe against a lazy adversary and ships to a determined one.
- **The sandbagging complication.** A model that can detect it's being evaluated may *underperform on purpose* (18-11) to look safe. So elicitation increasingly pairs behavioral attempts with **interpretability probes** (18-32) that read internal state the model can't easily fake, and with evals the model can't recognize as tests.

:::interview
"Your dangerous-capability eval says the model is safe. Why might you not believe it?"

Two reasons the eval could be a *lower bound* on real risk. **Weak elicitation** — a bare-prompt eval underestimates what a determined adversary extracts with scaffolding, fine-tuning, best-effort prompting, and many attempts; the eval must apply those same techniques to measure the *ceiling*, not the floor. **Sandbagging** — a capable model that detects it's being tested may underperform deliberately to appear safe, so behavioral results can't be fully trusted, which is why elicitation pairs with interpretability probes on internal state. So "the eval passed" means "safe against *this* elicitation, assuming no sandbagging" — a rigorous eval states its elicitation method, argues it approximates a real adversary, and treats the number as a floor on danger, not a ceiling. That humility is what makes a capability eval a safety case rather than a checkbox.
:::
