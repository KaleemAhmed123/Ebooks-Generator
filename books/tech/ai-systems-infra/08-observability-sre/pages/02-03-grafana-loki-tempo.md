## Grafana, Loki, Tempo

- Backends store one signal each; **Grafana** is the single pane that queries all of them, so you investigate in one place instead of four tabs. A common open stack pairs it with three stores that share a design idea — **index less, store cheaply**:
  - **Loki** — logs. Its trick: it **indexes only labels** (service, level, namespace), not the full log text. That makes it far cheaper than a full-text engine; you narrow by labels to a small set, then grep *within* it. Logs become affordable at volume (Module 1.3).
  - **Tempo** — traces. It stores traces in cheap object storage (S3) keyed by **trace ID** and relies on metrics/logs to *find* the ID — so it doesn't pay to index every span, just to retrieve by ID (Module 1.4).
  - **Pyroscope** — profiles, the fourth store, for the continuous profiling of Module 1.5.

<svg viewBox="0 0 360 86" role="img" aria-label="Grafana sits over Prometheus, Loki, Tempo and Pyroscope; from a metric spike you click to the trace, then to that trace's logs and profile, pivoting on the shared trace ID" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="116" y="6" width="128" height="18" rx="3" fill="#f6dce3" stroke="#a63d57"/><text x="180" y="18" text-anchor="middle">Grafana (one pane)</text>
  <rect x="6" y="40" width="80" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="46" y="52" text-anchor="middle" font-size="5.8">Prometheus</text>
  <rect x="94" y="40" width="80" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="134" y="52" text-anchor="middle" font-size="5.8">Loki (logs)</text>
  <rect x="182" y="40" width="80" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="222" y="52" text-anchor="middle" font-size="5.8">Tempo (traces)</text>
  <rect x="270" y="40" width="84" height="18" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="312" y="52" text-anchor="middle" font-size="5.8">Pyroscope</text>
  <path d="M150 24 L46 40" stroke="#999" marker-end="url(#gl)"/><path d="M165 24 L134 40" stroke="#999" marker-end="url(#gl)"/><path d="M195 24 L222 40" stroke="#999" marker-end="url(#gl)"/><path d="M210 24 L312 40" stroke="#999" marker-end="url(#gl)"/>
  <text x="180" y="78" text-anchor="middle" font-size="5.4" fill="#777">metric spike → trace (by exemplar) → its logs + profile (by trace_id)</text>
  <defs><marker id="gl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The reason to run them *together* is the **pivot**: in Grafana you see a p99 spike (Prometheus), click an **exemplar** on that metric to jump to a representative **trace** (Tempo), click the slow span to its **logs** (Loki) and its **profile** (Pyroscope) — all joined by the shared **trace ID** (Module 1.1). The stack is designed so the four signals cross-link instead of sitting in silos.
- This is one popular open stack, not the only one — the point is the **shape** (dashboards over cheap, label-indexed, cross-linked stores), which managed platforms (Datadog, Grafana Cloud, cloud-native CloudWatch/X-Ray) reproduce. Because you emit **OpenTelemetry** (Module 2.1), the backend is a choice you can change without touching the apps.

:::note
"Index less" is the cost lever that makes observability affordable at scale. Full-text-indexing every log and every span is what makes legacy tools ruinously expensive; Loki and Tempo flip it — **cheap storage, index only what you search by** (labels, trace IDs), and reach the detail by narrowing first. Retention and sampling (Modules 1.3–1.4) are the other two knobs. Observability cost is a real FinOps line (Booklet 5); these defaults keep it sane.
:::
