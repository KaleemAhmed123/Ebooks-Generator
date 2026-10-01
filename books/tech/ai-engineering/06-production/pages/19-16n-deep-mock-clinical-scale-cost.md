## Deep mock: clinical assistant — scale and cost

- Do the capacity math, and note how the *non-interactive* requirement changes it versus the chat mock (19-03).

:::mint
```text
50k clinicians × 20 visits/day = 1M documents/day
  avg QPS = 1M / 86,400 ≈ 12   (low! — not a QPS problem)

BUT each visit: ~15-min audio + long transcript + history RAG + structured draft
  ASR: 15 min audio (batchable, not real-time)
  LLM: ~4k transcript + ~2k history in, ~1k structured out per visit

The insight: latency target is ~30s AFTER the visit, NOT real-time.
  => this is a NEAR-BATCH workload. Queue visits, process on a shared fleet.
  => no need for per-clinician low-latency serving; optimise THROUGHPUT.

Cost per document (self-host or batch-tier API):
  ~7k tok/visit × $ (blended)  -> cents/visit
  1M/day × cents ≈ thousands/day  -> optimise with quantization + batch tier
```
:::

- **The killer insight: it's not interactive.** The draft is needed ~30s after the visit ends, not in real-time — so this is a **near-batch** workload. Queue completed visits and process them on a throughput-optimised shared fleet, rather than provisioning low-latency per-clinician capacity. The 30-second SLA is generous, so you optimise cost (batching, quantization), not TTFT.
- **The QPS is low (~12 avg); the *work per request* is high** (long audio + transcript + history + structured generation). So sizing is dominated by per-visit compute and the ASR load, not by request rate — a different shape from the chat mock, where QPS drove everything.

:::interview
"How does the clinical assistant's scale differ from a chat product's?"

It inverts the profile. QPS is *low* (~12/s) but *work-per-request is high* (15-min audio + long transcript + history RAG + structured draft), and it's **not interactive** — the draft is needed ~30s after the visit. So instead of low-latency per-user serving, I'd treat it as **near-batch**: queue visits, process on a throughput-optimised shared fleet, and spend the generous latency budget on cost (batching, quantization, batch-tier). Recognising that a 30-second SLA makes this a throughput-and-cost problem, not a TTFT problem, is the insight — and it comes straight from the clarified latency requirement.
:::
