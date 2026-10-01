## Specifications that preserve judgment

- The subtlest workbench skill: writing a spec that is **precise about what matters** yet **leaves room for the model's judgment** where judgment is the point. Over-specify and you get brittle, literal compliance that misses the intent; under-specify and you get confident guessing. The craft is knowing which is which.

<svg viewBox="0 0 360 86" role="img" aria-label="A spectrum from under-specified guessing to over-specified brittleness, with a judgment-preserving middle" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="20" y1="50" x2="340" y2="50" stroke="#888"/>
  <rect x="20" y="20" width="90" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="65" y="33" text-anchor="middle">under: guessing</text>
  <rect x="135" y="20" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="33" text-anchor="middle">judgment-preserving</text>
  <rect x="250" y="20" width="90" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="295" y="33" text-anchor="middle">over: brittle</text>
  <text x="65" y="64" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"make it good"</text>
  <text x="180" y="64" text-anchor="middle" font-size="5.5" fill="#1a3a2a">fix what, why, constraints;</text>
  <text x="180" y="72" text-anchor="middle" font-size="5.5" fill="#1a3a2a">let it decide how</text>
  <text x="295" y="64" text-anchor="middle" font-size="5.5" fill="#6b6b6b">every step scripted</text>
</svg>

- **Specify the *what* and the *why* and the *constraints*; leave the *how* to the model** where the how is where its capability lies. "Refactor this module to reduce duplication, keeping the public API and all tests green" pins the goal (reduce duplication), the constraints (API, tests), and lets the model choose the approach — its strength. "Rename this variable on line 12" needs no judgment and should be exact.
- **The two failure directions:**
  - **Over-specification** — scripting every step turns the model into a bad interpreter of your incomplete instructions; it cannot use its judgment to handle what you did not foresee, and it complies literally into a wrong result.
  - **Under-specification** — "make it better" forces the model to *guess* your intent and constraints, and it guesses wrong on the things you cared about but did not say.
- **The rule of thumb:** be **explicit about constraints and success criteria** (what must be true), and **open about method** (how to get there) — unless the method itself is the requirement.

:::interview
"How detailed should an agent's instructions be?"

Detailed about *what* and *why* and the hard *constraints*; open about *how*, where the model's judgment is the value. Pin the goal and the success criteria (what must be true — tests pass, API unchanged, tone formal), and let the model choose the approach for anything requiring judgment. Over-specifying scripts every step and produces brittle literal compliance that breaks on the unforeseen; under-specifying ("make it good") forces the model to guess your intent and miss what you cared about. Nail the constraints and success criteria; leave the method free unless the method *is* the requirement.
:::
