## Production-readiness checklist (1/2)

- Before an LLM feature ships, this checklist is what the whole booklet reduces to — the items that, missing, cause the outages, cost blowouts, and safety incidents dissected in Modules 17–18. This page covers **serving, cost, and reliability**; the next covers **quality, safety, and ops**.

**Serving & scale**
- [ ] load-tested at *peak* context × concurrency, so the goodput knee is known (17-50)
- [ ] autoscaling with a warm floor — no cold-start timeouts at peak (17-34)
- [ ] streaming with cancel-on-disconnect; graceful drain on deploy (17-51a)
- [ ] admission control + load shedding past the knee (17-30a)

**Cost**
- [ ] cost attributed per feature / user / pipeline step, with budgets + burn alerts (17-55)
- [ ] cost-per-*outcome* computed, not just cost-per-token (17-46b)
- [ ] the obvious levers applied where they pay: quantization, caching, routing, batch tier (cluster 17-G)

**Reliability**
- [ ] two-provider failover or a fallback chain, with a circuit breaker (17-52b)
- [ ] rate limits with client backoff; retries are idempotent (17-47a)
- [ ] tail latency (P99) addressed — timeouts, hedging where it earns it (17-50a)

:::note
Each serving/cost/reliability item maps to a concrete failure this booklet dissected: no peak load test → the KV-cache OOM on launch day (17-18); no cost attribution → the 5× bill nobody can explain (17-55); no circuit breaker → one provider's outage becoming your latency spike (17-52b); no P99 work → the churning user who always hits the slow tail (17-31a). None of these show up in a demo or a light test — they appear at real scale, under real load, which is exactly why they belong on a pre-launch checklist rather than being discovered in production.
:::
