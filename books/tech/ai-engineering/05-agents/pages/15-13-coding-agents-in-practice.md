## Coding agents in practice

- Where coding agents genuinely work in 2026, where they still fail, and how to use them well — the practitioner's view, since this is likely the agent you will build or use first. **[VERIFY]**

- **Where they shine:**
  - **Well-specified, verifiable tasks** — fix a failing test, implement a function to a spec, add a small feature, write tests, do a mechanical refactor. Anything with a clear success check (14-135) plays to their strength.
  - **Navigating unfamiliar code** — answering "where is X handled?" and making a localized change in a codebase no human on the team fully remembers.
  - **Boilerplate and breadth** — repetitive changes across many files (orchestrator-workers, 14-39), migrations, scaffolding.
- **Where they fail:**
  - **Large, ambiguous, or cross-cutting changes** — a vague "make the app faster" or a redesign touching many subsystems. Error compounding (14-125) and goal drift (14-126) bite hard; no clean verifier exists.
  - **Subtle correctness** — concurrency bugs, security issues, and things the tests do not cover. Passing tests is necessary, not sufficient (the SWE-bench caveat, 14-120).
  - **Novel design judgment** — architecture decisions with taste and long-term tradeoffs, where "right" is not checkable.

<svg viewBox="0 0 360 56" role="img" aria-label="Coding agents excel at verifiable localized tasks and struggle with ambiguous cross-cutting judgment" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="14" width="165" height="30" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="27" text-anchor="middle" fill="#1a3a2a">✓ verifiable · localized · specced</text><text x="92" y="39" text-anchor="middle" font-size="5.5" fill="#6b6b6b">fix test, add feature, refactor</text>
  <rect x="190" y="14" width="160" height="30" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="270" y="27" text-anchor="middle" fill="#a03050">✗ ambiguous · cross-cutting · taste</text><text x="270" y="39" text-anchor="middle" font-size="5.5" fill="#6b6b6b">redesign, subtle bugs, architecture</text>
</svg>

- **Using them well:** give a clear spec and constraints (14-139), scope them tightly (14-134), let them iterate against tests, and *review the diff* — you are the merge gate. Treat the agent as a fast junior engineer: great at bounded, checkable work; needs supervision on judgment and scope.

:::interview
**"What coding tasks would you trust an agent with, and which not?"** Trust it with verifiable, localized, well-specified work — fixing a failing test, implementing to a clear spec, writing tests, mechanical refactors, navigating unfamiliar code — because a test or check confirms success. Don't trust it unsupervised with large ambiguous changes ("make it faster"), cross-cutting redesigns, subtle correctness (concurrency, security) that tests miss, or architecture decisions requiring taste — error compounding and the lack of a verifier make those fail. Use it as a fast junior engineer: bounded checkable tasks with you as the reviewing merge gate.
:::
