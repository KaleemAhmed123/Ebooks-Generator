## Traces: spans and context propagation

- A metric says the system is slow; a **trace** says *where*. A trace is the end-to-end story of **one request** as it crosses services, built from **spans** — each span is one operation (an HTTP handler, a DB query, a cache call) with a start, a duration, and a parent. Nested spans form a tree; drawn on a timeline, it's a **waterfall** where the longest bar is your culprit.

<svg viewBox="0 0 360 96" role="img" aria-label="A trace waterfall: the root request span contains an auth span, a database query span that dominates the time, and a cache span; the long DB bar names the bottleneck" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="8" y="12" font-size="6" fill="#a63d57">trace 4bf92f… — total 3.4s</text>
  <rect x="8" y="18" width="320" height="14" rx="2" fill="#f6dce3" stroke="#a63d57"/><text x="12" y="28" font-size="5.6">GET /checkout — 3.4s (root span)</text>
  <rect x="28" y="36" width="40" height="12" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="72" y="45" font-size="5.4">auth 0.2s</text>
  <rect x="28" y="52" width="250" height="12" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="152" y="61" font-size="5.4" fill="#c0392b" text-anchor="middle">db.query SELECT … 3.0s  ← bottleneck</text>
  <rect x="28" y="68" width="30" height="12" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="62" y="77" font-size="5.4">cache 0.1s</text>
  <text x="8" y="92" font-size="5.4" fill="#777">each bar = a span (operation + duration); the long one is the cause</text>
</svg>

- What makes it cross services is **context propagation**. The first service generates a **trace ID** and, on every outbound call, injects it into the request **headers** — the **W3C `traceparent`** standard (trace ID + parent span ID). The next service reads that header, continues the same trace, and propagates it onward (Booklet 2's HTTP/gRPC). So a trace stitches together spans from a dozen services **because the ID rode along in the headers** — lose the propagation and you get disconnected fragments instead of one story.
- **Tail-based sampling** keeps it affordable: you can't store every trace at scale, so the collector (Module 2) keeps **all the interesting ones** — every error, every slow request — and a small sample of the normal ones. You get the traces you'd actually investigate without paying to store millions of identical fast ones.

:::warn
A single service that **drops the `traceparent` header** — an old proxy, a queue hop that doesn't forward context, a hand-rolled HTTP client — **breaks the trace** at that boundary: everything downstream starts a *new* trace, and your waterfall ends exactly where the problem often begins. Context propagation only works if **every** hop forwards it, which is the strongest argument for auto-instrumentation (Module 2.1) over wiring it by hand service-by-service.
:::
