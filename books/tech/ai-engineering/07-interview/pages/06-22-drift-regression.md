## How do you detect quality regressions and drift in a deployed LLM app?

- Two distinct problems:
  - **Regression** — *you* changed something (prompt, model version, retrieval, a provider silently updated their model) and quality dropped on tasks that used to work.
  - **Drift** — the *world* changed: input distribution shifts (new topics, new user behaviour), making the frozen system gradually less fit even though nothing in it changed.
- Detection:
  - **Continuous eval** — run the golden set on every change *and* on a schedule; alert on score drops. Catches regressions, including silent provider model updates.
  - **Online quality sampling** — score a sample of live traffic with an LLM judge; watch the trend.
  - **Input monitoring** — track embedding-space distribution of incoming queries; a shift flags drift and tells you to refresh the eval set / retrieval corpus.
  - **Proxy signals** — rising thumbs-down, retries, edits, fallbacks, or refusal rates are early warnings.
- Response: pin model versions (don't float on "latest"), roll back regressions, and refresh data/prompts/eval sets for drift.

:::interview
What's really being tested: that you separate regression (internal change, incl. silent provider updates) from drift (external change), and detect both with continuous eval + online sampling + input-distribution monitoring.
:::
