## "How do you measure the success of an AI feature?"

- **What they're screening for:** that you connect model metrics to **business/user outcomes**, not just offline scores.
- **A strong answer shows three layers:**
  - **Model/quality metrics** — accuracy, groundedness, task success on an eval set. Necessary but not sufficient.
  - **Product metrics** — the behaviour you actually want to change: deflection, conversion, time saved, acceptance/edit rate, retention, CSAT. This is the real success.
  - **Operational metrics** — latency, cost per request, error/guardrail rates — the constraints the win must respect.
- And the method: **define the target metric before launch**, measure with an **A/B test** where possible to establish causation, and watch for gaming (a metric going up for the wrong reason).
- The senior point: a model metric improving means nothing if the product metric doesn't move; optimise for the outcome.

:::warn
Weak: "Accuracy went from 85% to 90%." Strong: "Accuracy rose, and more importantly A/B showed a 12% lift in task completion at acceptable cost/latency — that's the win we shipped for."
:::

:::interview
What's really being tested: that you tie model quality to a product outcome (ideally A/B-proven) and respect operational constraints — outcome-driven, not metric-driven.
:::
