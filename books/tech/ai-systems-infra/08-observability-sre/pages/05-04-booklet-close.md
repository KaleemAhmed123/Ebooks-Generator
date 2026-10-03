## Booklet 8 — what you can now do

- **Emit the four signals well**: metrics (**RED** for services, **USE** for resources; histograms not averages), **structured logs** with a `trace_id`, **traces** with context propagation, and **continuous profiling** — and, crucially, **correlate** them on one request.
- **Run the stack**: **OpenTelemetry** (instrument once, Collector as the control point) into Prometheus/PromQL + Grafana/Loki/Tempo/Pyroscope, watching **cardinality**.
- **Set targets that mean something**: **SLI → SLO → SLA**, **error budgets** that decide ship-vs-freeze, honest **percentiles** (no averaging, beware coordinated omission), and **symptom-based** alerting that fights fatigue.
- **Keep it up**: size capacity with **Little's Law** and stay left of the **knee**, **load-test** to find the real breaking point (k6, arrival-rate), and **verify resilience with chaos**.
- **Handle failure**: the incident method (**mitigate before diagnose**, "what changed?"), **trace the request** to the failing hop, and close the loop with **runbooks, RCA, and blameless postmortems**.

<svg viewBox="0 0 360 54" role="img" aria-label="The arc: the signals, the stack, SRE discipline, keeping it up, and when it breaks" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="5.8" fill="#1a1a1a">
  <rect x="6" y="20" width="60" height="16" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="36" y="31" text-anchor="middle">signals</text>
  <rect x="74" y="20" width="60" height="16" rx="2" fill="#f6dce3" stroke="#a63d57"/><text x="104" y="31" text-anchor="middle">the stack</text>
  <rect x="142" y="20" width="76" height="16" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="180" y="31" text-anchor="middle">SLO / budgets</text>
  <rect x="226" y="20" width="66" height="16" rx="2" fill="#f6dce3" stroke="#a63d57"/><text x="259" y="31" text-anchor="middle">capacity</text>
  <rect x="300" y="20" width="54" height="16" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="327" y="31" text-anchor="middle">incidents</text>
</svg>

- **Next booklet:** *GPU & AI Infrastructure* — point everything you now know at the hardest, most expensive workload. Treat GPUs as a new resource type on the Kubernetes cluster (Booklet 6): the CUDA model and VRAM, prefill/decode and the KV cache, DRA/MIG scheduling, and the cost engineering that decides whether inference is profitable — observed and SLO'd with exactly the method from this booklet.
