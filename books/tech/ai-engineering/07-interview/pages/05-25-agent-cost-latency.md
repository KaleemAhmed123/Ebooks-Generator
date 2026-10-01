## Agents are slow and expensive. How do you control cost and latency?

- Each step is an LLM call, and agents take many steps — cost and latency scale with step count, not just tokens. Attack both the per-step cost and the number of steps.
- Levers:
  - **Fewer steps** — better planning, batch independent tool calls in parallel, avoid redundant re-reasoning; cap max steps.
  - **Right-size the model per step** — a small model for routing/simple steps, the big model only for hard reasoning (intra-agent routing).
  - **Prompt caching** — the system prompt + tool definitions are a large static prefix reused every step; caching them cuts prefill cost dramatically.
  - **Trim context** — summarise/externalise so each step's prompt stays small (also helps latency).
  - **Parallelism** — run independent sub-tasks/sub-agents concurrently to cut wall-clock.
  - **Stream + early exit** — stop as soon as the goal is met; don't over-work.
- Then **budget and monitor** per-task cost/steps so a runaway agent is caught.

:::interview
What's really being tested: that agent cost is dominated by step count × per-step cost, and you pull both (fewer steps, caching, model right-sizing, parallelism) with budgets to catch runaways.
:::
