## Why use RAG for knowledge instead of just fine-tuning the facts in?

- Fine-tuning is a poor knowledge store:
  - **Hard to update** — new or corrected facts need retraining; RAG updates by editing the document store.
  - **No citations** — a fine-tuned fact is baked into weights opaquely; RAG can show the source, which matters for trust and compliance.
  - **Still hallucinates** — fine-tuning teaches patterns, not reliable recall of specific facts, and rarely-seen facts don't stick.
  - **Access control** — RAG can filter by user permissions at query time; weights can't.
- RAG gives **fresh, private, citable** knowledge without touching the model, and lets you add/remove documents instantly.
- Use fine-tuning for **behaviour/format/skill**, RAG for **knowledge**. The two compose; they're not competitors.

:::warn
"Our docs change, so let's fine-tune on them nightly" is an anti-pattern — expensive, no citations, and still leaky. That's exactly the job RAG does cheaply.
:::

:::interview
What's really being tested: that you route *knowledge* to RAG for freshness, citations, and access control — and recognise fine-tuning-for-facts as a common mistake.
:::
