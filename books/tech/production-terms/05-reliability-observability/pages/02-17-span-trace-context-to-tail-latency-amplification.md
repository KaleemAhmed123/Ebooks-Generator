## Span & Trace Context

A trace is a tree of spans, each carrying its own ID and its parent's. The
context has to travel in HTTP headers and in message metadata, or the tree
breaks in half.

The trace stops at the queue boundary because `traceparent` was never copied
into the message headers. The consumer's work appears as a separate,
parentless trace, and the slow half of the request is invisible.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Trace context propagates automatically over HTTP but is lost across a message queue, leaving the consumer as an orphaned trace">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">traceparent: 00-{trace_id}-{span_id}-01</text>
  <rect x="4" y="26" width="96" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="52" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">gateway</text>
  <path d="M100 38 H146" stroke="#1a1a1a" stroke-width="1.3"/><path d="M148 38 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="123" y="32" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">HTTP</text>
  <rect x="152" y="26" width="96" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="200" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">service</text>
  <path d="M248 38 H288" stroke="#d0212f" stroke-width="1.3" stroke-dasharray="4 3"/>
  <text x="272" y="32" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#d0212f">queue</text>
  <rect x="304" y="26" width="152" height="24" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="380" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#d0212f">consumer — orphan trace</text>
  <text x="230" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">the HTTP header is copied for you · the message header is not</text>
</svg>

## Symptom-Based Alerting

Alert on what users experience, not on the causes somebody happened to think of.

| Alert | What it does |
|---|---|
| `CPU > 80%` | pages during a harmless nightly batch |
| `pod restarted` | pages when the restart worked |
| `checkout success < 99%` | pages when users cannot buy |

Cause-based alerts are noisy, and worse, incomplete: they only cover failures
already imagined. The novel outage arrives with every resource graph green.

## Tail Latency Amplification

Fanning out to many services makes a slow response near-certain. A 1% chance of
slowness per call is a near-guarantee across a hundred of them.

A page calls 100 services, each with a P99 of one second. The chance all hundred
are fast is 0.99^100 ≈ 37%, so 63% of page loads wait on at least one slow call.
Shaving that P99 barely moves the page. Fewer fan-outs, or hedged requests, do.
