## Design a content moderation pipeline for a user-facing LLM product.

- You must screen **both** what users send in and what the model sends out — and do it at low latency.
- Layers:
  - **Input moderation** — classify the user message for disallowed content, abuse, and **prompt-injection/jailbreak** patterns before it hits the model. Block or flag.
  - **Output moderation** — classify the model's response before it reaches the user: safety classifiers (e.g. Llama Guard), PII-leak checks, and policy rules. Fail closed on high-risk categories.
  - **Mix of methods** — fast deterministic filters (regex, blocklists) + ML classifiers for nuance + an LLM judge for edge cases; cascade cheap→expensive.
  - **Actions** — block, safe-complete (refuse with explanation), redact, or escalate to human review for borderline cases.
- Operational needs: **human review queue** for appeals and ambiguous cases, **feedback loop** to retrain classifiers, per-category thresholds tuned against the over-block vs under-block trade, and auditing/metrics on both error types.
- Latency: run classifiers in parallel with (or streamed alongside) generation to avoid doubling response time.

:::interview
What's really being tested: that moderation covers input *and* output with layered methods (rules + classifiers + judge), fail-closed on risk, human review + feedback loop, and attention to latency and the two error types.
:::
