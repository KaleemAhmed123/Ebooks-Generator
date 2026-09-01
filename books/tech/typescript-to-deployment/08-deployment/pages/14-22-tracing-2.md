### Where to send it

| Backend | Note |
|---|---|
| **X-Ray** | native on AWS, cheapest to start, weaker query interface |
| **Grafana Tempo** | self-hosted, pairs with the next page |
| Honeycomb, Datadog | strong analysis, billed per event |

- **X-Ray takes OpenTelemetry directly** through the ADOT collector, so the instrumentation is not vendor-specific

### The two things that make traces useful

- **Propagate the trace header across every boundary**, including into queue messages. A trace that stops at the queue hides the slow half
- **Put the trace id on every log line.** That is what turns "this span is slow" into "here is the error inside it"
- **Sample.** Tracing every request at volume is expensive. Ten percent, plus every error and every slow request, is the usual shape
