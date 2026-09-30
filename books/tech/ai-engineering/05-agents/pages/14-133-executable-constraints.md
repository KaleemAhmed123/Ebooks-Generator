## Instructions as executable constraints

- Prose instructions are suggestions the model may ignore, misread, or forget over a long run. **Executable constraints** are rules enforced by *code*, not hope — they make a requirement impossible to violate rather than merely requested.

<svg viewBox="0 0 360 84" role="img" aria-label="A prose instruction can be ignored; an executable constraint is enforced and blocks violations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="160" height="52" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="90" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">prose: "always run tests"</text><text x="90" y="44" text-anchor="middle" font-size="6">model may skip it</text><text x="90" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">a hope</text>
  <rect x="190" y="16" width="160" height="52" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="270" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">gate: block "done" until</text><text x="270" y="44" text-anchor="middle" font-size="6">tests actually pass</text><text x="270" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">a guarantee</text>
</svg>

- **The shift:** instead of *telling* the agent "always validate output before finishing," build a step that **runs the validation and rejects** an unfinished result. Instead of "don't touch the config file," a hook (14-88) that **blocks** any write to it. The constraint lives in your code, where the model cannot talk its way past it.
- **Where to use executable constraints:**
  - **Preconditions** — code checks the inputs are valid before the agent acts.
  - **Postconditions** — code checks the output meets requirements before accepting it (tests pass, schema validates, no secrets — the verification gate, 14-135).
  - **Guardrails on actions** — hooks/permissions that hard-block forbidden operations (14-88, 14-130).
- **Why it beats better prompting:** a prompt is probabilistic — the model *usually* follows it. For anything that *must* hold (safety, correctness, cost limits), "usually" is a bug. Encode the must-holds as code; reserve prompts for guidance where flexibility is fine.

:::interview
**"An agent keeps skipping a required step no matter how you word the instruction — what do you do?"** Stop wording it and enforce it in code. Turn the requirement into an executable constraint: a gate that blocks completion until the step's effect is verified (e.g. reject "done" until tests actually pass), or a hook that hard-blocks the forbidden action. Prompts are probabilistic guidance the model follows *usually*; for anything that must always hold — correctness, safety, cost — "usually" is a defect. Encode must-holds as code around the agent; keep prompts for the genuinely flexible parts.
:::
