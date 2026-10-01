## Rapid mock: large-scale batch inference

- **Prompt:** "Process a backlog of 500M documents through an LLM (classify, extract, enrich)." **Clarify:** no user waiting, must finish within days, minimize cost, some documents fail and must retry, results into a data warehouse.
- This is the pure **throughput-and-cost** problem — the opposite of the latency mocks. Every decision optimizes tokens-per-dollar, and latency doesn't matter at all.

- **The design.** A **queue** of documents → a fleet of workers pulling batches → the model on the **batch tier** (17-43, ~50% off) or self-hosted on **spot GPUs** (17-05b, interruptible is fine here) → results written to the warehouse, with **checkpointing** so a preempted/failed batch resumes, not restarts. **Prompt-cache** the fixed instruction prefix (17-41) since it repeats across all 500M calls.
- **The cost levers are all of cluster 17-G at once:** batch-tier or spot pricing, aggressive quantization (quality bar is usually lower for classification/extraction), prompt caching the shared prefix, model routing (a small model for the easy majority, 17-44), and maximum batching (no latency constraint means batch as deep as memory allows for peak goodput).

:::interview
"Run 500M documents through an LLM as cheaply as possible."

Pure throughput optimization, since nothing's interactive. Queue the documents and process on the **batch tier** (~50% off) or **self-hosted on spot GPUs** (interruptible is fine — checkpoint so preemptions resume). Stack every cost lever: **prompt-cache** the shared instruction prefix (it repeats 500M times), **quantize** aggressively (extraction/classification tolerates it), **route** the easy majority to a small model, and **batch as deep as memory allows** since there's no latency constraint — run at the goodput *throughput* peak, not the latency knee. Handle failures with retries and dead-letter queues, write results idempotently to the warehouse. The framing: with no user waiting, this is a tokens-per-dollar problem, so I pull every cost lever and none of the latency ones.
:::
