## Design a content moderation system for a large platform.

- **Requirements:** classify user content across policy categories (hate, violence, sexual, self-harm, spam), at very high volume, low latency, multilingual, with appeals and evolving policy.
- **Pipeline (tiered for cost/latency):**
  - **Cheap first pass** — hash/blocklist/regex for known-bad; fast ML classifiers for obvious cases. Handle the bulk here.
  - **ML classifiers** — fine-tuned models per category (or a multi-label model); output category + confidence.
  - **LLM judge** — only for the ambiguous middle, where nuance/context matters (sarcasm, context-dependent). Expensive, so gate it behind confidence thresholds.
  - **Human review queue** — borderline + appeals; their labels **retrain** the classifiers (feedback loop).
- **Decisions:** per-category thresholds tuned to the cost of false-positive (over-censoring) vs false-negative (harmful content slips). Actions: allow / remove / age-gate / shadow / escalate.
- **Scale:** stream/async for non-real-time; parallel classifier calls; cache by content hash.
- **Ops:** monitor precision/recall per category and per language, drift as new abuse appears, and auditability for every decision (compliance).
- **Tradeoffs:** cheap-first tiering balances cost vs accuracy; thresholds balance the two error types by category.

:::interview
What's really being tested: a tiered cheap→expensive classifier pipeline with an LLM judge only for ambiguity, a human-review/retraining loop, per-category threshold tuning, and per-language monitoring.
:::
