## Profiles: continuous profiling

- A trace ends at "the `checkout` service spent 3s in CPU" — but *which function*? **Profiling** answers that: it samples the call stack many times a second and aggregates where time (CPU) or memory actually goes, down to the line. You've seen its output already — the **flame graph** from Booklet 1, where width is time spent and the widest frame on top is the hot path.
- **Continuous profiling** is the shift that makes it a signal: instead of running a profiler by hand *after* an incident (when the slow code may not even be running), you profile **always, across the whole fleet, at low overhead**. Then "which function got slower after Tuesday's deploy?" is a query over stored profiles, not a reproduction exercise.

<svg viewBox="0 0 360 82" role="img" aria-label="A flame graph read: the request handler calls serialize which calls a slow JSON encode frame that dominates width, naming the hot function; an eBPF agent captures this fleet-wide" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="14" width="300" height="12" fill="#f6dce3" stroke="#a63d57"/><text x="170" y="23" text-anchor="middle" font-size="5.6">handler (100%)</text>
  <rect x="20" y="28" width="90" height="12" fill="#fbe9ee" stroke="#a63d57"/><text x="65" y="37" text-anchor="middle" font-size="5.2">auth 30%</text>
  <rect x="112" y="28" width="208" height="12" fill="#fdecea" stroke="#c0392b"/><text x="216" y="37" text-anchor="middle" font-size="5.2" fill="#c0392b">serialize 70%</text>
  <rect x="150" y="42" width="170" height="12" fill="#fdecea" stroke="#c0392b"/><text x="235" y="51" text-anchor="middle" font-size="5.2" fill="#c0392b">json.encode 57%  ← hot</text>
  <text x="20" y="70" font-size="5.6" fill="#777">width = CPU time · widest top frame = the line to fix</text>
</svg>

- The 2026 enabler is **eBPF** (Booklet 1): a kernel agent samples stacks for **every process on the node** — no code changes, no SDK, every language — at a few percent overhead. **OpenTelemetry Profiles** has adopted exactly this: it's the **fourth signal**, in **public alpha** (as of 2026), built on an **eBPF profiling agent donated by Elastic** that runs as an **OTel Collector receiver** (Module 2) — so whole-system continuous profiling joins the same pipeline as metrics, logs, and traces.
- Because it shares OTel's context, a profile can be **linked to a trace**: the slow span tells you *which service and when*, the profile tells you *which function* — closing the gap from "the request was slow" to "this line is the cost" (Module 1.1's correlation, completed).

### Module 1 — checkpoint
- **Key concepts:** four signals, each a different question — **metrics** (is it bad / when; counter/gauge/histogram; **RED** for services, **USE** for resources) · **logs** (what exactly; structured JSON + `trace_id`, levels, no PII) · **traces** (where in the path; spans → waterfall, **context propagation via W3C `traceparent`**, tail sampling) · **profiles** (which line; flame graph, **eBPF continuous profiling**, OTel's 4th signal, public alpha). The skill is **correlation** across them on one request, not collecting each.
- **Task + questions:** add structured logs with a `trace_id` and RED metrics to one service, then follow a slow request metric → trace → log. Why is average latency a lie and a histogram the fix? Why does one hop dropping `traceparent` break the whole trace?
- **Next:** Module 2 — the stack (OpenTelemetry, Prometheus, Grafana, correlation).
