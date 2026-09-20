# Module 9 - Clocks

## Time-of-day clocks and monotonic clocks

- A machine has two clocks. The **time-of-day clock** answers "when": milliseconds since 1970, set from NTP, and therefore able to jump forwards or backwards when NTP corrects it. The **monotonic clock** answers "how long": a counter since some arbitrary point, meaningless across machines, and guaranteed never to go backwards
- The rule falls out of the definitions. Timestamps for humans and logs: time-of-day. Timeouts, durations, rate windows, retries: monotonic. Never subtract two time-of-day readings and trust the sign

```typescript
const t0 = performance.now();                       // monotonic, ms, fractional
await work();
const elapsedMs = performance.now() - t0;           // always ≥ 0, unaffected by NTP

const n0 = process.hrtime.bigint();                 // monotonic, ns, for finer intervals
await work();
const elapsedNs = process.hrtime.bigint() - n0;

const stamp = new Date().toISOString();             // time-of-day: for the log line, the record, the user
```

- Node's documentation says it of `process.hrtime.bigint()` directly: not related to wall-clock time, not subject to clock drift, for measuring intervals. `performance.now()` is the same clock in milliseconds
- A `setTimeout` or an HTTP client's timeout already uses the monotonic clock. The bug appears in code that builds its own: a lease expiry, a rate-limit window, a "retry after" computed from `Date.now()` on one side and compared on another

### The failure

- Measuring a timeout with `Date.now()`. NTP steps the clock back 300 ms during the call; the elapsed time is negative; the retry loop that checks `elapsed > limit` never fires, or the one that checks `elapsed < 0` throws. Page 2 has the day this took a DNS provider down
