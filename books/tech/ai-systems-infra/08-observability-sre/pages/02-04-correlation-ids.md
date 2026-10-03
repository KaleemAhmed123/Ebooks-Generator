## Correlation across signals

- Every signal is more valuable *joined* than alone, and the join key is one **trace ID** carried everywhere (Module 1.4). The investigation you want is: metric alert → the exact traces behind it → each trace's logs and profile — no copy-pasting timestamps between tools, no guessing which log line belongs to which slow request.
- Three links make it work, and each is a small, deliberate setup:
  - **Metric → trace: exemplars.** A Prometheus **exemplar** attaches a sample `trace_id` to a histogram bucket, so a point on your p99 graph links straight to *a trace that was that slow* — the bridge from aggregate to example.
  - **Trace ↔ logs: the `trace_id` field.** Because every log carries the current `trace_id` (Module 1.3), a trace lists its own logs and a log jumps to its trace.
  - **Trace → profile: shared context.** OTel profiles (Module 1.5) carry the same IDs, so a slow span links to the flame graph of that execution.

<svg viewBox="0 0 360 72" role="img" aria-label="One trace ID flows from the edge through each service to the database, stamped on every span, log and profile, so all signals for one request join on that single ID" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="28" width="60" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="36" y="40" text-anchor="middle" font-size="5.8">edge / GW</text>
  <rect x="86" y="28" width="60" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="116" y="40" text-anchor="middle" font-size="5.8">service A</text>
  <rect x="166" y="28" width="60" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="196" y="40" text-anchor="middle" font-size="5.8">service B</text>
  <rect x="246" y="28" width="60" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="276" y="40" text-anchor="middle" font-size="5.8">database</text>
  <path d="M66 37 L86 37" stroke="#1a1a1a" marker-end="url(#co)"/><path d="M146 37 L166 37" stroke="#1a1a1a" marker-end="url(#co)"/><path d="M226 37 L246 37" stroke="#1a1a1a" marker-end="url(#co)"/>
  <text x="180" y="16" text-anchor="middle" font-size="6" fill="#a63d57">trace_id = 4bf92f3577b34da6  (one ID, every hop)</text>
  <text x="180" y="62" text-anchor="middle" font-size="5.4" fill="#777">stamped on every span · log · profile → all signals join here</text>
  <defs><marker id="co" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

:::lab
Instrument a two-service app (API → worker, Booklet 6) with the OTel SDK/auto-instrumentation. Confirm the **same `trace_id`** appears in (1) the API's logs, (2) the worker's logs, and (3) the trace waterfall — by propagating `traceparent` on the call between them. Add an exemplar to your latency histogram, then in Grafana click a p99 spike → its trace → that trace's logs. Finally, drop the header on one hop and watch the trace split in two — proving correlation is only as good as propagation (Module 1.4). You now have the end-to-end pivot the rest of the booklet relies on.
:::
