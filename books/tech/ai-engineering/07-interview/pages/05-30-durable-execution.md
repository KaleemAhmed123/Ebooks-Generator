## Why do long-running agents need durable execution and checkpointing?

- An agent task can run for minutes to hours across many tool calls. If the process crashes, the machine restarts, or it pauses for human approval, you don't want to **lose all progress** or **re-run side effects** (re-sending an email, re-charging a card).
- **Durable execution** persists the agent's **state** (step, history, intermediate results) so it can **resume exactly where it left off** after a crash, restart, or pause.
- Requirements:
  - **Checkpoints** — save state after each step (e.g. LangGraph checkpointers, or a workflow engine like Temporal).
  - **Idempotency** — tool calls must be safe to retry; use idempotency keys so a replayed step doesn't duplicate a side effect.
  - **Replayability** — reconstruct state from a log/event history.
- This is what turns a fragile script into a production system that survives infra failures and supports human-in-the-loop pauses.

:::interview
What's really being tested: that long agents need persisted, resumable state + idempotent tool calls so crashes/pauses don't lose progress or double side effects — the production-robustness concern.
:::
