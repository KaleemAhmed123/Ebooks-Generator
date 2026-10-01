## Pattern: evaluator-optimizer

- **Evaluator-optimizer** is a two-model loop: one LLM **generates** a solution, another **evaluates** it against criteria and gives feedback, and the generator revises — repeating until the evaluator is satisfied. It is self-refine (14-13) formalized as a workflow with a *separate* evaluator.

<svg viewBox="0 0 360 90" role="img" aria-label="A generator produces output, an evaluator judges against criteria and gives feedback, looping until it passes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="30" y="34" width="80" height="26" rx="4" fill="#24405e"/><text x="70" y="50" text-anchor="middle" fill="#fff" font-size="6.5">generator</text>
  <rect x="220" y="34" width="80" height="26" rx="4" fill="#a03050"/><text x="260" y="50" text-anchor="middle" fill="#fff" font-size="6.5">evaluator</text>
  <path d="M110 42 L218 42" stroke="#888" marker-end="url(#eo)"/><text x="164" y="38" text-anchor="middle" font-size="6">output</text>
  <path d="M218 54 L110 54" stroke="#888" marker-end="url(#eo)"/><text x="164" y="66" text-anchor="middle" font-size="6">feedback (fail → revise)</text>
  <rect x="316" y="36" width="38" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="335" y="50" text-anchor="middle" font-size="6">pass</text>
  <path d="M300 47 L314 47" stroke="#888" marker-end="url(#eo)"/>
  <defs><marker id="eo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Example:** translate a paragraph → an evaluator checks fluency and fidelity against the source → if it flags awkward phrasing, the generator revises → repeat until it passes. Or: write code → run tests → fix failures → repeat (the evaluator here is the *test suite*, not a model).
- **Why a separate evaluator helps:** a model critiquing its own output shares its blind spots (14-13). A distinct evaluator — a different prompt, a different model, or best of all an **objective check** (tests, a validator, a rubric) — catches what the generator missed. The more grounded the evaluator, the better the loop.
- **When to use:** the task has **clear evaluation criteria** and iteration measurably improves output — translation, code, structured writing. The evaluator must be trustworthy; a bad evaluator drives the generator toward worse answers.

:::interview
"When does an evaluator-optimizer loop help, and what's the catch?"

It helps when you have clear success criteria and iteration improves the output — code (tests as the evaluator), translation, structured writing. A generator produces, an evaluator judges against criteria and gives feedback, and it loops until it passes. The catch is the evaluator's quality: a self-evaluator shares the generator's blind spots, so prefer a *grounded* evaluator (tests, a validator, a rubric, or a different model). A weak or wrong evaluator actively drives the output worse.
:::
