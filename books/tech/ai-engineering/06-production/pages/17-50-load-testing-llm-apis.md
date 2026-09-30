## Load-testing LLM APIs

- Load-testing a normal API sends N requests/second and watches latency. LLM load-testing has an extra dimension that changes everything: **request cost varies enormously with token counts.** 100 requests/second of 100-token prompts and 100 rps of 8k-token prompts are utterly different loads on the same server.
- So you cannot test with a fixed dummy payload. You must **replay a realistic token distribution** — the input and output lengths your real traffic actually has.

:::mint
```text
A valid LLM load test specifies BOTH axes:
  request rate:   e.g. 50 → 100 → 200 rps (ramp)
  token profile:  input len distribution + output len distribution
                  (drawn from real traffic logs, not a constant)

Measure at each step, at P95/P99:
  TTFT, TPOT, e2e latency, error/timeout rate,
  GPU util, KV-pool occupancy, queue depth
Find: the rps where GOODPUT peaks and where it collapses (17-18 knee).
```
:::

- **The goal is to find the knee**, not to prove a headline number. You are locating the offered load at which goodput peaks and the load at which preemption thrashing collapses it — so autoscaling and admission control can be set to keep the server on the healthy side.
- **Test at peak context × concurrency**, because the KV-cache OOM (17-18) only appears when both are high at once. A load test at short prompts passes and hides the failure that ships to production.

:::warn
The number-one invalid LLM load test uses a single short fixed prompt. It reports a beautiful throughput, the team sizes capacity to it, and launch day — with real 4k-token prompts — OOMs at a fraction of that load. The token distribution *is* the load. If your test does not model input and output length distributions from real traffic, it is measuring a workload you will never serve.
:::
