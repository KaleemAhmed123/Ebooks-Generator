## How do you load test an LLM service, and what's different from normal load testing?

- The goal is to find where **goodput** peaks and SLOs break — but LLM load tests must mirror LLM reality, or the numbers lie.
- What's different:
  - **Request shape matters** — latency/throughput depend heavily on **input and output token lengths**. Replay a realistic distribution of prompt and generation lengths, not uniform tiny requests.
  - **Report token throughput and TTFT/TPOT percentiles**, not just requests/sec — a "req/s" number is meaningless without token sizes.
  - **Warm vs cold** — measure with warmed caches/replicas; separately measure cold-start behaviour.
  - **Concurrency sweep** — ramp concurrent requests and watch where TTFT/TPOT cross the SLO; that's your per-replica capacity.
  - **Cache effects** — include prefix-cache hit patterns representative of production (shared system prompts inflate throughput unrealistically if over-represented).
- Output: a capacity number (requests or tokens/sec per replica within SLO) that feeds autoscaling and cost models.

:::interview
What's really being tested: that you load test with realistic token-length distributions and report TTFT/TPOT/token-throughput percentiles, sweeping concurrency to find the SLO-bound capacity — not naive req/s.
:::
