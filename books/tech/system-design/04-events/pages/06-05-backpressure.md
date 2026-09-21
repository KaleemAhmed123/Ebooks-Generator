## Backpressure

- **Backpressure** is the consumer telling the producer how much it can take. Without it, a fast producer and a slow consumer meet in a buffer, and a buffer with no bound is a delayed crash

<svg viewBox="0 0 460 140" role="img" aria-label="Backpressure as a protocol. Left: push without demand, a producer fires records at a consumer whose buffer overflows. Right: the consumer signals request(3), the producer sends three, waits for the next request(n). A pull-based log consumer does the same thing by fetching only when it has room." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="110" y="16" text-anchor="middle" font-weight="bold">push, no demand signal</text>
  <rect x="20" y="28" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="55" y="45" text-anchor="middle">producer</text>
  <rect x="140" y="28" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="175" y="45" text-anchor="middle">consumer</text>
  <line x1="90" y1="36" x2="140" y2="36" stroke="#333" marker-end="url(#d)"/>
  <line x1="90" y1="41" x2="140" y2="41" stroke="#333" marker-end="url(#d)"/>
  <line x1="90" y1="46" x2="140" y2="46" stroke="#333" marker-end="url(#d)"/>
  <rect x="140" y="66" width="70" height="14" fill="#fbe9e2" stroke="#bf4c28"/>
  <text x="175" y="76" text-anchor="middle" font-size="7.5" fill="#bf4c28">buffer: unbounded</text>
  <text x="110" y="100" text-anchor="middle" font-size="7.5">memory grows until the process dies</text>
  <line x1="230" y1="10" x2="230" y2="130" stroke="#999" stroke-dasharray="3 3"/>
  <text x="345" y="16" text-anchor="middle" font-weight="bold">demand first</text>
  <rect x="250" y="28" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="285" y="45" text-anchor="middle">producer</text>
  <rect x="370" y="28" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="405" y="45" text-anchor="middle">consumer</text>
  <line x1="370" y1="34" x2="320" y2="34" stroke="#bf4c28" marker-end="url(#e)"/>
  <text x="345" y="30" text-anchor="middle" font-size="7.5" fill="#bf4c28">request(3)</text>
  <line x1="320" y1="46" x2="370" y2="46" stroke="#333" marker-end="url(#d)"/>
  <text x="345" y="58" text-anchor="middle" font-size="7.5">3 records, then wait</text>
  <text x="345" y="84" text-anchor="middle" font-size="7.5">Reactive Streams: a subscriber must signal</text>
  <text x="345" y="95" text-anchor="middle" font-size="7.5">demand via request(n) to receive anything</text>
  <text x="345" y="116" text-anchor="middle" font-size="7.5">a log consumer's fetch is request(n) already:</text>
  <text x="345" y="127" text-anchor="middle" font-size="7.5">it asks when it has room, and not before</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- The Reactive Streams rule is the whole protocol: a subscriber must signal demand with `request(n)` to receive anything; the publisher sends at most n. Demand flows upstream; data flows downstream, never faster than demand
- A pull-based log has this built in. A Kafka consumer's fetch is a `request(n)` with n bounded by `max.poll.records` (500 by default) and by bytes; a consumer that is busy does not fetch. The broker never pushes, so it cannot overrun anyone; the backlog stays on disk, where it belongs, as lag
- A push queue gets it from prefetch (Module 3, page 6): the broker stops at the unacked limit. Set, that is `request(prefetch)`; unset, it is the left side of the picture
- Between the broker and the consumer is not the only place. Inside the consumer, a handler that fans out to a thread pool or an unbounded promise array has re-created the unbounded buffer one hop down

### The failure

- "Handled" by buffering. The consumer reads faster than it writes to the database, so it queues records in memory to keep the poll loop alive. The queue grows with the gap; the process dies of memory at 3am; every buffered record is redelivered to the next consumer, which does the same. The fix is to make the poll wait on the write, which is what the lag was for. Shedding at the edge, when the whole system is over capacity, is booklet 05
