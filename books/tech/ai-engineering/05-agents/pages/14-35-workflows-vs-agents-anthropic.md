## Workflows vs agents (the Anthropic patterns)

- Anthropic's influential 2024 guide "Building Effective Agents" made one argument the field adopted: **most "agents" should be workflows.** It names a handful of composable patterns, ordered from simple to autonomous, and says start at the simple end.
- The core distinction (14-02) sharpened: a **workflow** orchestrates LLM calls on **predefined paths you code**; an **agent** lets the **model direct its own process** and tool use. Both are valid; the discipline is using the least autonomy the task needs.

<svg viewBox="0 0 360 100" role="img" aria-label="Five workflow patterns of rising complexity, then the autonomous agent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="30" width="54" height="30" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="35" y="42" text-anchor="middle">chaining</text><text x="35" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">steps</text>
  <rect x="66" y="30" width="54" height="30" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="93" y="42" text-anchor="middle">routing</text><text x="93" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">classify→</text>
  <rect x="124" y="30" width="54" height="30" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="151" y="42" text-anchor="middle">parallel</text><text x="151" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">fan-out</text>
  <rect x="182" y="30" width="66" height="30" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="215" y="42" text-anchor="middle">orchestrator</text><text x="215" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">-workers</text>
  <rect x="252" y="30" width="60" height="30" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="282" y="42" text-anchor="middle">evaluator</text><text x="282" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">-optimizer</text>
  <rect x="316" y="30" width="38" height="30" rx="3" fill="#24405e"/><text x="335" y="42" text-anchor="middle" fill="#fff">agent</text><text x="335" y="52" text-anchor="middle" fill="#cdd" font-size="5">auto</text>
  <text x="20" y="78" font-size="6" fill="#6b6b6b">predictable, cheap, testable</text><text x="300" y="78" text-anchor="middle" font-size="6" fill="#6b6b6b">flexible, costly</text>
  <line x1="20" y1="86" x2="340" y2="86" stroke="#888"/>
</svg>

- The five workflow patterns — **prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer** — cover most real "agentic" products. Each gets its own page next. Only when *none* fits, because the task's steps genuinely cannot be predetermined, do you reach for a true autonomous agent.
- **Why this framing won:** it gave engineers permission to *not* build a complex autonomous agent, which is usually the wrong tool — slower, pricier, less reliable — for a task a simple workflow handles.

:::note
The senior instinct this encodes: **complexity is a cost, not a badge.** A fully autonomous agent is impressive in a demo and painful in production — non-deterministic, hard to test, expensive. The patterns exist so you reach for the simplest structure that solves the problem, and add autonomy only where the task truly demands it. "We built an agent" should raise the question "did you need one?"
:::
