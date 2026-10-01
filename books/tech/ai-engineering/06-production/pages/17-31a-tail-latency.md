## Tail latency

- Averages lie about user experience; the **tail** — P95, P99, P99.9 — is what users feel and SLOs are written against. A service with a great median and an ugly P99 has a real problem for a meaningful slice of requests, and at scale that slice is many people.

<svg viewBox="0 0 340 82" role="img" aria-label="A latency distribution with a long right tail; median is low but P99 is far out" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="30" y1="64" x2="320" y2="64" stroke="#888"/>
  <path d="M30 64 Q70 14 100 30 Q140 54 320 60 L320 64 L30 64 Z" fill="#e8f4fd" stroke="#24405e"/>
  <line x1="80" y1="64" x2="80" y2="24" stroke="#1a3a2a" stroke-dasharray="2 2"/><text x="80" y="20" text-anchor="middle" font-size="5.5" fill="#1a3a2a">P50</text>
  <line x1="250" y1="64" x2="250" y2="34" stroke="#a03050" stroke-dasharray="2 2"/><text x="250" y="30" text-anchor="middle" font-size="5.5" fill="#a03050">P99</text>
  <text x="175" y="78" text-anchor="middle" font-size="5.5" fill="#6b6b6b">latency →  (long right tail)</text>
</svg>

- **Where LLM tail latency comes from.** A queued request behind a long prefill (17-15); a preemption under memory pressure (17-18); a cold-start pod (17-34); a cross-region hop (17-35); an unusually long generation; a slow tool call in an agent. Each adds a spike to the tail even when the median is fine.
- **P99 compounds across a request.** A RAG request that calls retrieval + rerank + generation has *three* chances to hit a tail; if each has a 1% slow rate, the combined request is slow ~3% of the time. This is why microservice-heavy LLM pipelines have worse tails than a single call — the tails add up.

:::note
The discipline is to **alert and design against the tail, not the average** (17-51). Set SLOs at P95/P99, load-test to find where the tail explodes (17-50), and attack the specific tail sources: chunked prefill for the long-prefill spike, warm pools for cold-start, admission control for the preemption spike, timeouts + hedging (next page) for the straggler. "Our average latency is fine" is the sentence that precedes a churn problem — the user who leaves is the one who hit the P99, and there are more of them than the average suggests.
:::
