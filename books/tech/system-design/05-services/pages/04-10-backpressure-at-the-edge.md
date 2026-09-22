## Backpressure at the service level

- **Backpressure** is the receiver telling the sender to slow down. In a stream it is built in, the consumer pulls when it has room (booklet 04 owns that side). In a synchronous service it must be built: a bounded queue in front of the workers, an admission check that refuses when the queue is full, and a `429` or `503` with `Retry-After` so the caller knows it was refused and when to return

<svg viewBox="0 0 460 120" role="img" aria-label="Backpressure in a synchronous service. Requests arrive at an admission check in front of a bounded queue of 200 slots feeding 50 workers. When the queue has room the request is queued and served; when it is full the admission check returns 503 with Retry-After 2 at once, costing microseconds. The queue's bound is set from the deadline: 200 slots at 50 workers and 20 milliseconds each is about 80 milliseconds of wait, inside a 1-second deadline. An orange cross marks the unbounded in-memory queue: the database slows, workers block, the buffer grows without limit, memory runs out and the process is killed at 03:00 with every queued request lost." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="30" width="60" height="30" rx="3" fill="#fff" stroke="#333"/><text x="36" y="49" text-anchor="middle">requests</text>
  <rect x="96" y="24" width="84" height="42" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="38" text-anchor="middle">admission</text><text x="138" y="50" text-anchor="middle" font-size="7">room in the queue?</text><text x="138" y="60" text-anchor="middle" font-size="7">no → 503 + Retry-After</text>
  <line x1="66" y1="45" x2="96" y2="45" stroke="#333" marker-end="url(#d)"/>
  <rect x="210" y="24" width="110" height="42" rx="3" fill="#e6f2ff" stroke="#333"/><text x="265" y="38" text-anchor="middle">bounded queue</text><text x="265" y="50" text-anchor="middle" font-size="7">200 slots, no more</text><text x="265" y="60" text-anchor="middle" font-size="7">≈ 80 ms of wait at most</text>
  <line x1="180" y1="45" x2="210" y2="45" stroke="#333" marker-end="url(#d)"/><text x="195" y="40" text-anchor="middle" font-size="7">yes</text>
  <rect x="350" y="24" width="104" height="42" rx="3" fill="#fff" stroke="#1d4e89"/><text x="402" y="38" text-anchor="middle">50 workers</text><text x="402" y="50" text-anchor="middle" font-size="7">≈ 20 ms each</text><text x="402" y="60" text-anchor="middle" font-size="7">2 500 req/s capacity</text>
  <line x1="320" y1="45" x2="350" y2="45" stroke="#333" marker-end="url(#d)"/>
  <line x1="138" y1="66" x2="138" y2="84" stroke="#bf4c28" marker-end="url(#e)"/><text x="138" y="96" text-anchor="middle" font-size="7" fill="#bf4c28">503, Retry-After: 2 — microseconds, no work done</text>
  <text x="6" y="116" font-size="7.5" fill="#bf4c28">✕ unbounded in-memory queue: the database slows, workers block, the buffer grows without limit, the process is OOM-killed at 03:00</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- The bound is derived, not guessed: queue slots × service time ÷ workers is the wait a queued request will see, and it must sit inside the deadline (page 1). 200 slots at 50 workers and 20 ms each is about 80 ms; a queue of 10 000 would be 4 s, longer than the deadline, so those requests would be served late and thrown away, which is the goodput collapse on page 5
- `429` says "you, specifically, sent too much" (Module 10); `503` says "I, right now, cannot take more". Both carry `Retry-After`, and a client that honours it with backoff and jitter (booklet 01) turns a refusal into a delay. Load shedding (page 5) is admission control with priorities; this page is the queue it protects

### The failure

- An unbounded in-memory queue. Frameworks buffer accepted connections by default, and a slow database turns that buffer into a growing list of requests that will all time out; memory is exhausted first, the process dies, and every queued request dies with it. A system with no limit on waiting work has chosen the crash as its limit
