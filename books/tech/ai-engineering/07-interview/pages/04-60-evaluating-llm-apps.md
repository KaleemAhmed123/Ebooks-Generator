## How do you evaluate an LLM application, offline and in production?

- There's no single accuracy number for open-ended output, so you build a **harness**, not a one-off check.
- **Offline (pre-deploy):**
  - A **golden/eval set** of representative inputs with expected outputs or rubrics.
  - **Deterministic checks** where possible (exact match, schema valid, regex, did-it-call-the-right-tool).
  - **LLM-as-judge** for subjective quality (helpfulness, faithfulness) — cheaper/faster than humans, but validate the judge against human labels and watch its biases (length, position, self-preference).
  - Run it in **CI** so every prompt/model change is scored, not vibe-checked.
- **Online (post-deploy):**
  - **Tracing** every call (inputs, retrieved context, tools, output, cost, latency).
  - **Product metrics** (thumbs, task success, deflection, retry rate) and **guardrail hit rates**.
  - **A/B tests** for changes; sample real traffic into the offline judge continuously (online eval).
- The frame: **offline for fast iteration, online for ground truth** — real users reveal what your eval set missed.

:::interview
What's really being tested: that you build an eval harness (golden set + deterministic + judge) in CI, validate the judge, and close the loop with production tracing/A-B — not manual spot-checking.
:::
