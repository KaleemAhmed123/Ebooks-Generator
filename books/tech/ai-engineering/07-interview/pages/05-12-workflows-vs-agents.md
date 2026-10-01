## When should you build a workflow instead of an agent?

- Anthropic's framing: **workflows** orchestrate LLMs through **predefined code paths**; **agents** let the LLM **direct its own process** dynamically. Prefer the simplest thing that works.
- Choose a **workflow** when the task decomposes into **known steps**: the path is predictable, so hard-code it. More reliable, cheaper, easier to test and debug. Common workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer.
- Choose an **agent** when steps **depend on intermediate results you can't predict**, the environment is open-ended, or the number of steps is unknown — and you can accept lower predictability for flexibility.
- The mistake is reaching for an autonomous agent when a three-step workflow would be more reliable and a tenth of the cost. Start with a single call, escalate to a workflow, and only to a full agent when the task genuinely demands dynamic control.

:::interview
What's really being tested: the discipline to default to the least autonomy (call → workflow → agent) and to justify an agent only when the path is genuinely unpredictable.
:::
