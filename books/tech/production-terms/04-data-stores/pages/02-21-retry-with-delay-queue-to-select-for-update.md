## Retry with Delay Queue

Immediate requeue retries a transient failure while the dependency is still
down. A delay queue spaces the attempts out instead.

A message sits on a wait queue with a TTL, then dead-letters back to the main
queue when it expires. Retries land at 30 seconds, 2 minutes, 10 minutes —
rather than four hundred attempts a second against something that is not
answering.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A failed message moves through wait queues of increasing TTL, returning to the main queue after each, and finally to a parking lot for manual handling">
  <rect x="4" y="22" width="72" height="22" fill="#e2fcf3" stroke="#2a5673" stroke-width="1.3"/>
  <text x="40" y="37" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#2a5673">main</text>
  <path d="M78 33 H100" stroke="#1a1a1a" stroke-width="1.2"/><path d="M100 33 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="104" y="22" width="72" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="140" y="37" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">wait 30s</text>
  <path d="M178 33 H200" stroke="#1a1a1a" stroke-width="1.2"/><path d="M200 33 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="204" y="22" width="72" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="240" y="37" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">wait 2m</text>
  <path d="M278 33 H300" stroke="#1a1a1a" stroke-width="1.2"/><path d="M300 33 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="304" y="22" width="72" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="340" y="37" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">wait 10m</text>
  <path d="M378 33 H400" stroke="#1a1a1a" stroke-width="1.2"/><path d="M400 33 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <text x="406" y="30" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">parking</text>
  <text x="406" y="41" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">lot</text>
  <text x="104" y="60" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">each wait queue dead-letters back to main when its TTL expires</text>
</svg>

The parking lot at the end matters as much as the delays. Something has to stop
retrying eventually and hand the message to a person.

## SELECT ... FOR UPDATE

Row-level pessimistic locking. Other transactions touching those rows wait until
you commit.

Decrementing inventory: read with `FOR UPDATE` so two concurrent checkouts
cannot both see one item left. Without it, both read 1, both decrement, and you
have sold stock you do not have.

**`FOR UPDATE SKIP LOCKED` turns the same table into a work queue.** Each worker
takes rows nobody else has locked and skips the rest instead of blocking — which
is how you build a queue on Postgres without a broker, and it is a legitimate
choice well past the scale people assume.

The cost of the plain form is that everyone else waits. Keep the transaction
short, and never hold one across a network call.
