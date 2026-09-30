## Reviewer agents

- A powerful pattern: a **second agent that reviews the first's work.** The doer produces; the reviewer critiques against explicit criteria; the doer revises. It is the evaluator-optimizer pattern (14-40) staffed by a dedicated critic, and it catches what the doer cannot see itself.

<svg viewBox="0 0 360 80" role="img" aria-label="A doer agent produces work, a reviewer agent critiques it, and the doer revises" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="30" y="30" width="80" height="26" rx="4" fill="#24405e"/><text x="70" y="46" text-anchor="middle" fill="#fff" font-size="6.5">doer agent</text>
  <rect x="250" y="30" width="80" height="26" rx="4" fill="#a03050"/><text x="290" y="46" text-anchor="middle" fill="#fff" font-size="6.5">reviewer agent</text>
  <path d="M110 40 L248 40" stroke="#888" marker-end="url(#rv)"/><text x="180" y="35" text-anchor="middle" font-size="6">work</text>
  <path d="M248 50 L110 50" stroke="#888" marker-end="url(#rv)"/><text x="180" y="63" text-anchor="middle" font-size="6">specific critique → revise</text>
  <defs><marker id="rv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why a separate reviewer beats self-review:** an agent critiquing its own output shares its blind spots (14-13) — it made the mistake because it could not see it, and re-reading does not reveal it. A **fresh** reviewer, with its own context and a critic's brief ("find bugs, security issues, unmet requirements"), approaches the work adversarially and catches more.
- **Make the reviewer specific.** A vague "review this" yields vague praise. Give it a **checklist or rubric** — the exact criteria the work must meet — so its critique is actionable ("line 40 doesn't handle the empty case") not decorative. The reviewer is most useful when it is a *demanding* specialist, not a cheerleader.
- **Reviewer + verification gate.** Pair a reviewer agent (judgment on subjective quality) with an objective gate (14-135, tests/validation) — the gate catches mechanical failures, the reviewer catches design and requirement failures. Together they cover both.
- **Cost note:** a reviewer doubles the calls for that step. Use it where quality justifies the cost — final outputs, code that ships, consequential decisions — not every trivial step.

:::interview
**"How do you improve agent output quality with another agent?"** A reviewer agent. The doer produces the work; a *separate* reviewer, with a concrete rubric ("check correctness, security, unmet requirements"), critiques it adversarially; the doer revises. A fresh reviewer beats self-review because it doesn't share the doer's blind spots — the doer made the error precisely because it couldn't see it. Pair the reviewer (subjective judgment) with an objective verification gate (tests/validation) for full coverage, and reserve it for high-value steps since it doubles the cost.
:::
