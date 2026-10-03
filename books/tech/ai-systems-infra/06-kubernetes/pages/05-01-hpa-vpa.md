# Scaling and Packaging

## HPA and VPA

- Two autoscalers resize *workloads* (adding nodes is the next page). They answer different questions and **fight if you point them at the same metric**.
- **HPA — Horizontal Pod Autoscaler** — changes the **replica count**. It reads a metric (CPU utilisation by default, or custom/external metrics via the metrics API), compares to a target, and scales replicas with a simple ratio: `desired = ceil(current × actual/target)`. At 80% CPU against a 50% target on 4 pods, it goes to `ceil(4 × 80/50) = 7`. This is the workhorse — scale out under load, scale in when quiet. It only works if the app is **stateless and horizontally scalable** (Module 2).
- **VPA — Vertical Pod Autoscaler** — changes the **requests/limits** (Module 3.2) of each pod, right-sizing a workload you *can't* scale horizontally (a single-writer process). It must **recreate** pods to apply new sizes, so it's disruptive and usually run in "recommend" mode to inform your requests rather than acting live.

<svg viewBox="0 0 360 78" role="img" aria-label="HPA scales the number of pods out and in on a metric; VPA resizes each pod's CPU and memory requests; they conflict if both act on CPU" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="166" height="56" rx="4" fill="#eaf1fb" stroke="#2a5db0"/><text x="91" y="25" text-anchor="middle" font-size="6.4" fill="#2a5db0">HPA — more/fewer pods</text><text x="91" y="40" text-anchor="middle" font-size="5.8">▢ ▢ ▢ → ▢ ▢ ▢ ▢ ▢</text><text x="91" y="54" text-anchor="middle" font-size="5.4" fill="#777">metric vs target, stateless apps</text>
  <rect x="186" y="12" width="166" height="56" rx="4" fill="#f3f7fc" stroke="#2a5db0"/><text x="269" y="25" text-anchor="middle" font-size="6.4" fill="#2a5db0">VPA — bigger/smaller pod</text><text x="269" y="40" text-anchor="middle" font-size="5.8">▢ → ▣  (recreates pod)</text><text x="269" y="54" text-anchor="middle" font-size="5.4" fill="#777">right-size requests</text>
</svg>

- **For events, HPA on CPU is the wrong signal.** A queue consumer (Booklet 4) is busy but low-CPU; scale it on **queue depth** instead. **KEDA** (Kubernetes Event-Driven Autoscaling, a CNCF project) extends the HPA to scale on external signals — Kafka lag, SQS depth, Prometheus queries — and uniquely **scales to zero** when idle. In Booklet 10, inference is scaled on **queue depth / pending requests**, not CPU, for exactly this reason.

:::warn
Running **HPA and VPA on the same resource (CPU)** is a feedback loop that oscillates: VPA raises the pod's CPU request, which lowers measured utilisation, which makes HPA scale *in*, which raises per-pod load, which makes VPA grow pods again. Keep them on **different** signals — e.g. VPA on memory, HPA on a custom throughput metric — or don't combine them. Also give HPA a **stabilisation window** so it doesn't thrash on spiky metrics.
:::
