## How does AI system design differ from classic system design?

- The scaffolding (APIs, load balancing, data stores, caching, queues) is the same. What's new:
  - **Quality is a first-class, fuzzy requirement.** There's no "correct" — you must *define and measure* quality (evals, judges, SLOs). Classic systems are either up or down; AI systems can be up and wrong.
  - **The expensive component is a GPU model**, so capacity planning is **KV-cache-memory and token-throughput** math, not CPU/QPS, and cost per request is orders of magnitude higher.
  - **Non-determinism** — same input, different output — breaks caching assumptions, testing, and reproducibility.
  - **Latency has two parts** (TTFT/TPOT) and you stream.
  - **New failure modes** — hallucination, prompt injection, drift, jailbreaks — that classic systems don't have.
  - **Evaluation and monitoring include output quality**, continuously.
- So in an AI design you spend extra time on **evaluation strategy, the model/RAG/agent choice, GPU capacity+cost, and safety** — layered on top of normal distributed-systems design.

:::interview
What's really being tested: that you can articulate the specific additions (measurable-quality requirement, GPU capacity/cost, non-determinism, two-part latency, AI failure modes) rather than treating it as a normal CRUD design.
:::
