# Module 14 - Observability

## Knowing what it is doing

- **Monitoring answers questions you knew to ask.** Is CPU high, is the disk full, is the service up
- **Observability is being able to answer a question you did not anticipate**, from data already collected, without deploying anything
- The difference matters at 2am, when the question is "why are checkout requests from one customer timing out" and nobody built a dashboard for it

### The three signals

| Signal | Is | Answers |
|---|---|---|
| **logs** | discrete events with detail | what happened to this one request |
| **metrics** | numbers aggregated over time | is it happening more than usual |
| **traces** | one request across every service | where the time went |

- **Metrics tell you something is wrong. Traces tell you where. Logs tell you why.** All three, in that order

### What to instrument, in order of value

1. **The four golden signals**: latency, traffic, errors, saturation
2. **A correlation id on everything**, so a log line, a trace and a metric join up
3. **Business events**: orders created, payments failed, signups. These catch outages that leave every technical metric green

### The rule that governs the cost

- **Observability is billed by volume, and it is easy to spend more on logs than on the servers producing them**
- Log at `info`, sample the noisy paths, keep detail for errors, and set a retention period on everything
- A dashboard nobody reads and an alert nobody acts on both cost money and attention. **Delete them**
