# Module 6 - Observability for distributed systems

## Logs, metrics, and traces

- No debugger attaches to a fleet in production, so internal state has to be inferred from what the system emits. **Observability** is that property: enough is emitted to answer questions nobody wrote down in advance
- Three signals, three questions, three costs. The costs differ by orders of magnitude, and that is what decides which one a given question belongs to

| Signal | The question it answers | What it costs |
|---|---|---|
| Metrics | is it broken now, how much, how fast | one number per series per interval, whatever the traffic |
| Traces | where did the time go inside this one request | one sampled fraction of requests, tens of spans each |
| Logs | exactly what happened in this specific failure | grows with traffic, stored and indexed as text |

- The costs explain the division of labour. Metrics stay flat as traffic grows, so they carry the always-on questions. Logs scale with every request, so they carry the rare ones. Traces sit between and answer the question neither of the others can: which hop
- The three are joined by identifiers, not by timestamps. A trace id on every log line (page 3) is what turns three separate stores into one investigation

### The failure

- Counting with logs. `logger.info("user logged in")` looks free, and the login rate then costs a text search over millions of lines per minute, every time someone opens the dashboard
- A counter increments an integer already in memory and is read for nothing. The same question answered by the wrong signal can be four orders of magnitude more expensive, and the bill arrives as a logging invoice nobody can attribute. Metrics measure how often; logs explain one occurrence
