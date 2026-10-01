## How do you put guardrails around an LLM in production?

- **Guardrails** are checks around the model that enforce safety, policy, and format — the model itself is not a reliable boundary, so you wrap it.
- Layers:
  - **Input guardrails** — filter/flag the user input: prompt-injection detection, PII redaction, off-topic/abuse classifiers, jailbreak patterns.
  - **Output guardrails** — scan the response before it reaches the user: toxicity/safety classifiers (e.g. Llama Guard), PII leak checks, groundedness checks, schema validation, policy rules.
  - **Action guardrails** — for agents, gate tool calls: allow-lists, confirmation on irreversible actions, sandboxing.
- Implementation: dedicated classifier models + deterministic rules (regex, schema) + an LLM judge for nuance; fail **closed** on high-risk paths (block/escalate rather than pass).
- Trade-off to manage: too aggressive → over-refusal and false positives frustrate users; too loose → unsafe output slips through. Tune against a labelled set and monitor both error types.

:::interview
What's really being tested: that guardrails sit *around* the model at input/output/action layers (classifiers + rules + judge), fail closed on risk, and are tuned for the over- vs under-blocking trade.
:::
