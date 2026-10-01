## You're asked to build an agent for a new task. What's your checklist?

- A senior answer is a disciplined design process, not "pick a framework":
  1. **Do you even need an agent?** Could a single call, workflow, or RAG do it? Start at the least autonomy.
  2. **Define success + eval** — what does "done" mean, and how will you measure it (golden tasks, checkable outcomes)? Build this first.
  3. **Scope the tools** — the minimal set, with clear schemas; decide what's read-only vs action, and which actions are irreversible.
  4. **Choose the pattern** — ReAct vs plan-execute vs a fixed workflow; single vs multi-agent (justify multi).
  5. **Design context/memory** — what's in the window each step, what's externalised, how memory is retrieved.
  6. **Reliability** — verification gates, budgets/step caps, termination, checkpoints, idempotency.
  7. **Safety** — least privilege, sandboxing, human approval on risky actions, injection containment.
  8. **Observability** — tracing from day one.
  9. **Iterate against the eval**, mine production traces, tighten.
- The theme: define success and bound the blast radius **before** adding autonomy.

:::interview
What's really being tested: a structured design method — need-check → eval → tools → pattern → context → reliability → safety → observability → iterate — showing you engineer agents rather than assemble them.
:::
