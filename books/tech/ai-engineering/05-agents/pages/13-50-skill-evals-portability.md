## Skill evals and portability

- Two things separate a toy skill from a production one: you can **measure** whether it works, and it **runs anywhere**.

### Evals — does the skill actually help?
- A skill is a change to behavior, so test it like code. Build a small **eval set** — tasks the skill should improve — and measure the agent *with* and *without* the skill. If the "pr-review" skill does not raise review quality on held-out PRs, it is not earning its context cost.
- Evals catch the subtle failure: a skill whose instructions the model *misreads* or that conflicts with another skill. Numbers, not vibes, decide whether a skill ships (the eval-driven-development discipline of Module 14).

<svg viewBox="0 0 360 74" role="img" aria-label="Run the agent with and without the skill on an eval set and compare scores" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="20" width="100" height="34" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="34" text-anchor="middle" font-size="6">without skill</text><text x="64" y="47" text-anchor="middle" font-size="6" fill="#a03050">score 0.61</text>
  <rect x="130" y="20" width="100" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="34" text-anchor="middle" font-size="6">with skill</text><text x="180" y="47" text-anchor="middle" font-size="6" fill="#1a3a2a">score 0.84</text>
  <text x="250" y="41" font-size="6.5" fill="#1a3a2a">→ ship it</text>
</svg>

### Portability — write once, run anywhere
- A skill's value multiplies if it is not tied to one host or model. Keep skills as **plain files with a standard structure** (Markdown + frontmatter + optional scripts) so the same skill works across agents, IDEs, and model providers — the same portability argument as MCP for tools.
- Avoid host-specific assumptions in the body (hard-coded paths, one provider's quirks) so the skill survives a model or platform swap.

:::interview
"How do you know a skill is worth adding to an agent?"

Evaluate it. Assemble a task set the skill targets, run the agent with and without it, and compare on quality, cost, and latency. A skill must measurably improve outcomes to justify the context it consumes; some skills even hurt by adding noise or conflicting with others. Ship on the numbers, keep the skill portable (standard format, no host-specific assumptions) so the win transfers across models and platforms.
:::
