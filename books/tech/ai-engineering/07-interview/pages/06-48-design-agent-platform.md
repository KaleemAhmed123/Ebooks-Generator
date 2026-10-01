## Design a platform for running autonomous agents at scale.

- **Requirements:** run many long-lived agents reliably, with tool access, safety, cost control, and observability — turning fragile scripts into a production service.
- **Execution core:**
  - **Durable execution** — persist agent state/step so runs survive crashes and support human-in-the-loop pauses; idempotent tool calls (a workflow engine like Temporal, or framework checkpointers).
  - **Isolated tool/code execution** — sandboxed per run (containers/microVMs), least-privilege credentials, network egress control.
- **Tool layer:** a registry (MCP servers) agents connect to; per-agent scoped tool sets; tool-call auth and quotas.
- **Safety/governance:** action policies (approval gates on irreversible actions), budgets/step caps/kill switches, injection containment (break the lethal trifecta), audit logs.
- **Scale & cost:** queue + workers for concurrency; per-run cost/step budgets; model routing per step; prefix caching for fixed system prompts.
- **Observability:** full trajectory tracing per run; outcome + trajectory evals; dashboards for success rate, steps, cost.
- **Control plane:** define/deploy/version agents, monitor runs, intervene (pause/stop/approve).
- **Tradeoffs:** autonomy vs control (gates everywhere slow it; too few are unsafe); shared vs isolated execution; framework vs build-your-own for durability.

:::interview
What's really being tested: that an agent *platform* is durable-execution + sandboxed tools + action governance + budgets + tracing + a control plane — production infra around the loop, not just the agent logic.
:::
