# The Stack

## OpenTelemetry

- Before OpenTelemetry, every observability vendor had its own agent and SDK, so instrumenting your code **locked you to a backend** — switching meant re-instrumenting everything. **OpenTelemetry (OTel)** is the vendor-neutral **standard** for generating, collecting, and exporting all signals, and it won: it **graduated CNCF in May 2026** and is the de-facto default. You instrument once against OTel and send the data anywhere.
- Three parts do the work:
  - **SDKs + auto-instrumentation** — libraries that produce spans, metrics, and logs from your app. **Auto-instrumentation** wraps common frameworks (HTTP servers, DB clients, gRPC) with **no code changes**, so traces and context propagation (Module 1.4) appear across every hop automatically.
  - **OTLP** — the **OpenTelemetry Protocol**, the single wire format all signals travel in. One protocol instead of a dozen vendor formats.
  - **The Collector** — a standalone service that **receives** OTLP, **processes** it (batch, filter, sample, redact PII, add metadata), and **exports** it to one or more backends.

<svg viewBox="0 0 360 88" role="img" aria-label="Apps send OTLP to the OpenTelemetry Collector, which processes and fans out to Prometheus for metrics, Loki for logs, and Tempo for traces; swapping a backend changes only the collector" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="72" height="26" rx="3" fill="#fbe9ee" stroke="#a63d57"/><text x="44" y="42" text-anchor="middle" font-size="6">apps (SDK /</text><text x="44" y="51" text-anchor="middle" font-size="6">auto-instr)</text>
  <rect x="120" y="28" width="90" height="30" rx="3" fill="#f6dce3" stroke="#a63d57"/><text x="165" y="41" text-anchor="middle" font-size="6.2">Collector</text><text x="165" y="51" text-anchor="middle" font-size="4.8" fill="#777">receive·process·export</text>
  <rect x="256" y="10" width="96" height="16" rx="2" fill="#fff" stroke="#888"/><text x="304" y="21" text-anchor="middle" font-size="5.6">Prometheus (metrics)</text>
  <rect x="256" y="34" width="96" height="16" rx="2" fill="#fff" stroke="#888"/><text x="304" y="45" text-anchor="middle" font-size="5.6">Loki (logs)</text>
  <rect x="256" y="58" width="96" height="16" rx="2" fill="#fff" stroke="#888"/><text x="304" y="69" text-anchor="middle" font-size="5.6">Tempo (traces)</text>
  <path d="M80 43 L120 43" stroke="#1a1a1a" marker-end="url(#ot)"/><text x="100" y="39" text-anchor="middle" font-size="4.8" fill="#777">OTLP</text>
  <path d="M210 40 L256 18" stroke="#999" marker-end="url(#ot)"/><path d="M210 43 L256 42" stroke="#999" marker-end="url(#ot)"/><path d="M210 46 L256 66" stroke="#999" marker-end="url(#ot)"/>
  <defs><marker id="ot" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The **Collector is the control point**, and it's why OTel matters operationally: because apps send OTLP to the Collector and the Collector decides where it goes, **switching backends or adding one is a Collector config change, not a redeploy of every service**. Route traces to Tempo and a vendor at once, drop noisy metrics, redact a field, sample — all in one place. Deploy it as a **DaemonSet** (per node) or gateway (Booklet 6), and recall the **eBPF profiling agent ships as a Collector receiver** (Module 1.5), so profiles join the same pipeline.

:::note
Instrument for the **standard**, not the vendor. The entire value is decoupling: your code and the OTLP data model stay put while backends come and go, which kills vendor lock-in and makes "evaluate a new tool" a config experiment instead of a migration. In 2026, "we emit OpenTelemetry" is the baseline expectation for a new service — auto-instrumentation first for breadth, hand-written spans only where the business logic needs a span the framework can't see.
:::
