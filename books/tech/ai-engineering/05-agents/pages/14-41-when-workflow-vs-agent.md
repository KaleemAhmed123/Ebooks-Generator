## When to use a workflow vs an agent

- With the five patterns and the autonomous agent in view, the decision tree is simple — and it almost always lands on a workflow.

<svg viewBox="0 0 360 108" role="img" aria-label="A decision tree from known steps to a full agent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="120" y="8" width="120" height="18" rx="3" fill="#24405e"/><text x="180" y="20" text-anchor="middle" fill="#fff">steps known in advance?</text>
  <rect x="20" y="38" width="130" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="85" y="50" text-anchor="middle">yes → workflow</text>
  <rect x="210" y="38" width="140" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="280" y="50" text-anchor="middle">no → who decides split?</text>
  <rect x="200" y="66" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="235" y="78" text-anchor="middle">you → orchestrator</text>
  <rect x="278" y="66" width="72" height="18" rx="3" fill="#24405e"/><text x="314" y="78" text-anchor="middle" fill="#fff">model → agent</text>
  <path d="M150 26 L85 36" stroke="#888" marker-end="url(#wa)"/><path d="M210 26 L280 36" stroke="#888" marker-end="url(#wa)"/><path d="M260 56 L235 64" stroke="#888" marker-end="url(#wa)"/><path d="M300 56 L314 64" stroke="#888" marker-end="url(#wa)"/>
  <text x="180" y="100" text-anchor="middle" font-size="6" fill="#6b6b6b">default left; move right only when forced</text>
  <defs><marker id="wa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Ask in order:**
  1. **Are the steps known?** → **workflow** (chaining, routing, parallelization). Cheapest, most predictable.
  2. **Unknown decomposition, but bounded?** → **orchestrator-workers**. The model splits, you keep the frame.
  3. **Genuinely open-ended, path unknowable?** → **autonomous agent**. Full loop, tools, memory — and all the reliability work of this module.
- **Cost of moving right:** each step right adds non-determinism, cost, latency, and failure surface. A workflow you can unit-test; an agent you can only evaluate statistically (14-46+). Pay that cost only when the task truly requires the flexibility.
- **Combine freely.** Real systems nest patterns — a workflow whose one step is an agent, an agent whose tools are workflows. The patterns are building blocks, not a single choice.

:::note
The whole Anthropic framing reduces to one habit: **reach for the simplest pattern that works, and justify every step toward autonomy.** Most production "AI agents" are, correctly, workflows with a sprinkle of agency. Knowing these five patterns by name — and when each applies — is exactly what agent-engineering interviews probe, because it shows you optimize for reliability over novelty.
:::
