## At-least / at-most / exactly-once

- When a message crosses an unreliable network (Module 1), the sender faces the same ambiguity every time: it sent, but did the receiver get it and act? That uncertainty forces a choice of **delivery semantics**:
  - **At-most-once** — send and don't retry. Simple, never duplicates, but **loses** messages whenever one is dropped. Fine for a metric sample or a position update where the next one supersedes it.
  - **At-least-once** — retry until acknowledged. **Never loses**, but **duplicates** whenever the ack was the thing that got lost (the receiver already acted, the sender resends). This is the sane default for anything that matters.
  - **Exactly-once** — each message takes effect once and only once. The holy grail.

<svg viewBox="0 0 360 66" role="img" aria-label="At-most-once may lose messages; at-least-once may duplicate; exactly-once effect comes from at-least-once delivery plus idempotent processing" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="20" width="104" height="26" rx="3" fill="#fdf2e9" stroke="#b5651d"/><text x="60" y="32" text-anchor="middle" font-size="6">at-most-once</text><text x="60" y="42" text-anchor="middle" font-size="5.4" fill="#777">may LOSE</text>
  <rect x="128" y="20" width="104" height="26" rx="3" fill="#e6edf5" stroke="#1f487e"/><text x="180" y="32" text-anchor="middle" font-size="6">at-least-once</text><text x="180" y="42" text-anchor="middle" font-size="5.4" fill="#777">may DUPLICATE</text>
  <rect x="248" y="20" width="104" height="26" rx="3" fill="#dfe9d9" stroke="#2f7d4f"/><text x="300" y="32" text-anchor="middle" font-size="6">exactly-once EFFECT</text><text x="300" y="42" text-anchor="middle" font-size="5.4" fill="#777">= at-least-once + idempotent</text>
  <text x="180" y="60" text-anchor="middle" font-size="5.6" fill="#555">exactly-once DELIVERY is impossible; exactly-once EFFECT is achievable</text>
</svg>

- Here is the crucial truth interviews probe: **exactly-once *delivery* is impossible** over an unreliable network — it's the Two Generals problem (Module 1) again, and no broker can truly promise it. What's achievable is **exactly-once *effect***: use **at-least-once delivery** (so nothing is lost) and make the **processing idempotent** (so duplicates don't change the result). Delivery may happen 1..N times; the *effect* happens once.
- When Kafka or a cloud queue advertises "exactly-once," read the fine print: it means exactly-once **within its own boundary** — Kafka's idempotent producer plus transactions guarantee a record isn't written twice to its log and that read-process-write stays atomic *inside Kafka*. The moment your consumer calls an external API or a second database, that guarantee ends and **you** must supply idempotency. Which is the next page.
