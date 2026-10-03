## Prometheus and PromQL

- **Prometheus** is the de-facto metrics engine (a graduated CNCF project), and its defining choice is the **pull model**: instead of apps pushing metrics out, Prometheus **scrapes** a `/metrics` HTTP endpoint on each target on a schedule. It discovers targets dynamically (in Kubernetes, via the API — Booklet 6), so new pods are scraped automatically. Pull means Prometheus controls the rate and instantly knows a target is *down* (the scrape fails), which is itself a signal.
- Data is **time series** identified by a metric name plus **labels** — `http_requests_total{method="GET", status="500", service="api"}`. Each unique label combination is its own series, which is powerful and dangerous (below).
- **PromQL** turns series into answers. The two expressions you'll write constantly:

:::mint
```promql
# error ratio over 5m (RED: errors ÷ rate)
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m]))

# p99 latency from a histogram
histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))
```
:::

- `rate()` converts a counter into per-second over a window; `histogram_quantile()` reads a percentile out of histogram buckets (Module 1.2) — real p99, not an average. **Prometheus 3.0 (Nov 2024)**, the first major release since 2.0 in 2017, added **native histograms** (far cheaper, auto-bucketed — stable in v3.8, Nov 2025), **UTF-8** metric/label names, and a native **OTLP receiver** so it ingests OpenTelemetry metrics directly.

:::warn
**Cardinality is the number-one way to blow up Prometheus.** Every distinct label-value combination is a stored series, so putting a **high-cardinality** value in a label — `user_id`, `request_id`, an email, a full URL with IDs — can create millions of series from one metric, and memory/cost explode. The rule: labels are for **bounded, low-cardinality** dimensions (status, method, service, region). High-cardinality identifiers belong on **traces and logs** (Module 1), never on a metric label. "Prometheus OOM-killed after a deploy" is almost always a new unbounded label.
:::
