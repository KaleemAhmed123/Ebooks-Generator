## Why do agents fail on long-horizon tasks, and what can you do about it?

- **Error compounding:** if each step is 95% reliable, a 20-step task succeeds only ~0.95²⁰ ≈ **36%** of the time. Small per-step error rates multiply into likely failure over long horizons.
- Compounding sources: one wrong tool result or misread observation poisons all later steps; context grows and the model loses the thread; and the agent can't tell it's off-track without feedback.
- Mitigations:
  - **Raise per-step reliability** — better tools, constrained outputs, verification after each risky step.
  - **Shorten the horizon** — decompose into smaller verified sub-tasks; check in with a human or a gate at milestones.
  - **Add feedback/grounding** — tests, validators, so errors are caught early, not at the end.
  - **Checkpoint and allow rollback** so a failure doesn't lose everything.
  - **Budgets/stops** so a lost agent fails fast instead of burning cost.
- Interview framing: reliability over long horizons is a **multiplication problem** — the lever is per-step accuracy and early error detection, not a smarter single prompt.

<svg viewBox="0 0 240 60" role="img" aria-label="Success probability falls steeply as the number of steps grows, for several per-step reliabilities" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <path d="M18 52 L18 8 M18 52 L228 52" stroke="#888"/>
  <path d="M18 12 C70 20, 140 46, 228 50" stroke="#c0392b" fill="none" stroke-width="1.6"/><text x="150" y="44" fill="#c0392b">0.95/step</text>
  <path d="M18 12 C50 14, 110 20, 228 30" stroke="#24405e" fill="none" stroke-width="1.6"/><text x="150" y="24" fill="#24405e">0.99/step</text>
  <text x="120" y="60" text-anchor="middle" fill="#6b6b6b">steps →</text>
</svg>

:::interview
What's really being tested: that long-horizon reliability compounds multiplicatively, so the fix is higher per-step accuracy + decomposition + early verification, not a better single model call.
:::
