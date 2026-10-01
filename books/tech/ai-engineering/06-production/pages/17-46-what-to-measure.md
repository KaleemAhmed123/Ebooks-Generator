## The golden signals for LLM serving

- Classic SRE watches four "golden signals": latency, traffic, errors, saturation. LLM serving keeps those and adds three the tokens force on you. Measure all seven or you are flying blind.

| Signal | What | Alarm when |
|---|---|---|
| **latency** | TTFT, TPOT, e2e (P50/P95/P99) | P95 breaches SLO |
| **traffic** | requests/s, tokens/s in+out | unexpected spike/drop |
| **errors** | 5xx, timeouts, refusals, schema-fails | rate climbs |
| **saturation** | GPU util, KV-pool %, queue depth | near the goodput knee (17-18) |
| **cost** | $/request, $/user, $/feature | budget burn rate |
| **quality** | eval score, thumbs, groundedness | regression vs baseline |
| **safety** | jailbreak/injection hits, block rate | anomaly |

- **The three LLM-specific ones matter most in interviews.** *Cost* per request/user/feature is the FinOps hook (cluster 17-55). *Quality* is measured live by sampling outputs through evals or user feedback — because a model can silently get worse after a prompt change or a model swap. *Safety* counts blocked jailbreaks and injections (Module 18).
- **Percentiles, never averages.** A mean TTFT of 300 ms can hide a P99 of 6 seconds — and the P99 is the user who churns. Alert on P95/P99; the average is a comfort number that lies about the tail.

:::interview
"What would you put on the on-call dashboard for an LLM service?"

The four golden signals at P95/P99 — latency (TTFT/TPOT), traffic, errors (including timeouts and schema failures), saturation (GPU util, KV-pool %, queue depth) — plus the three LLM-specific: cost burn rate, a live quality score, and safety-block counts. The tell of a senior answer is naming **saturation as the KV-pool and queue depth** (the real capacity limits) and insisting on **percentiles**, because the tail is the SLO.
:::
