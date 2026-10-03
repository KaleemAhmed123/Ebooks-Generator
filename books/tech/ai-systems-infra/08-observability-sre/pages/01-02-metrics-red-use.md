## Metrics: RED and USE

- You can't measure everything, so two **method frameworks** tell you *what* to measure — one for services, one for resources. Together they cover almost every "is this healthy?" question with a handful of signals instead of a thousand noisy graphs.
- **RED — for request-driven services** (an API, Booklet 6's pods): **R**ate (requests/sec), **E**rrors (failed requests/sec or %), **D**uration (latency distribution — p50/p95/p99). These three describe user-facing health: how much traffic, how much is failing, how slow. Alert on RED and you catch what users actually feel.
- **USE — for resources** (CPU, memory, disk, a queue — Booklet 1): **U**tilisation (% busy), **S**aturation (how much work is queued/waiting), **E**rrors. USE finds the *cause* under a RED symptom: duration climbed (RED) because the DB connection pool is saturated (USE).

<svg viewBox="0 0 360 82" role="img" aria-label="RED describes service health as rate, errors and duration; USE describes resource health as utilisation, saturation and errors; RED is the symptom, USE is the cause" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="14" width="160" height="56" rx="4" fill="#fbe9ee" stroke="#a63d57"/><text x="88" y="27" text-anchor="middle" font-size="6.4" fill="#a63d57">RED — services</text><text x="88" y="42" text-anchor="middle" font-size="5.8">Rate · Errors · Duration</text><text x="88" y="56" text-anchor="middle" font-size="5.4" fill="#777">what users feel (symptom)</text>
  <rect x="192" y="14" width="160" height="56" rx="4" fill="#e7efe9" stroke="#2f7d4f"/><text x="272" y="27" text-anchor="middle" font-size="6.4" fill="#2f7d4f">USE — resources</text><text x="272" y="42" text-anchor="middle" font-size="5.8">Utilisation · Saturation · Errors</text><text x="272" y="56" text-anchor="middle" font-size="5.4" fill="#777">why it's slow (cause)</text>
  <path d="M168 42 L192 42" stroke="#1a1a1a" marker-end="url(#ru)"/>
  <defs><marker id="ru" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The metric **types** you'll emit: a **counter** (only goes up — total requests, total errors; you `rate()` it to get per-second), a **gauge** (goes up and down — current memory, queue depth, in-flight requests), and a **histogram** (buckets a distribution — the basis of real percentiles, Module 3.3). Latency must be a histogram, never an average: an average hides the tail where the pain lives.
- **Duration is the hard one and the one that matters** — "average latency 100ms" can mean everyone sees 100ms, or 95% see 20ms and 5% see 2s. Only the distribution (the histogram → p99) tells you, which is why RED's D is a percentile, not a mean.

:::note
RED and USE are **guides, not laws** — they tell you where to start so you instrument the four-or-five signals that matter instead of drowning in hundreds. Pick RED for anything that serves requests, USE for anything that holds a resource, and you have a dashboard that answers "healthy?" at a glance and points at the cause when it's not. Every metric you add beyond them should earn its place (and its cardinality cost — Module 2.2).
:::
