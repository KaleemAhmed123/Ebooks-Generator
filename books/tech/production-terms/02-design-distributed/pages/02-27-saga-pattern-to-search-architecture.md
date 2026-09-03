## Saga Pattern

Replacing a distributed transaction with a sequence of local transactions, each
paired with a compensating action that undoes it.

Book the flight, charge the card, reserve the hotel. The hotel fails, so you
refund the card and cancel the flight. There is no rollback here — the flight
was really booked, and cancelling it is a new business action with its own
failure modes.

<svg viewBox="0 0 460 70" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three forward steps where the third fails, followed by compensating actions running backwards">
  <rect x="4" y="6" width="98" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="53" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">book flight</text>
  <path d="M104 17 H122" stroke="#1a1a1a" stroke-width="1.2"/><path d="M122 17 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="126" y="6" width="98" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="175" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">charge card</text>
  <path d="M226 17 H244" stroke="#1a1a1a" stroke-width="1.2"/><path d="M244 17 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="248" y="6" width="98" height="22" fill="none" stroke="#b32d2b" stroke-width="1.4"/><text x="297" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">hotel fails</text>
  <path d="M297 30 V42 H175" stroke="#b32d2b" stroke-width="1.2" fill="none"/><path d="M175 42 l5 -3 v6 z" fill="#b32d2b"/>
  <rect x="126" y="44" width="98" height="22" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.2"/><text x="175" y="59" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#2b5fa8">refund card</text>
  <path d="M124 55 H106" stroke="#2b5fa8" stroke-width="1.2"/><path d="M106 55 l5 -3 v6 z" fill="#2b5fa8"/>
  <rect x="4" y="44" width="98" height="22" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.2"/><text x="53" y="59" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#2b5fa8">cancel flight</text>
  <text x="358" y="59" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">compensate, never roll back</text>
</svg>

Compensations fail too, and there is nothing behind them. That path needs a
dead-letter queue and a human, not another retry.

## Schema Registry

A central store of message schemas with enforced compatibility rules, so a
producer is unable to publish a breaking change rather than merely discouraged
from it.

A producer tries to remove a required field. The registry rejects the schema at
publish time. Without it, the same change is discovered by forty consumers at
two in the morning, one deserialisation error at a time.

The compatibility mode is the real decision — backward, forward or full — and it
should be chosen from how your consumers deploy, not from the default in the
tutorial.

## Search Architecture

Search is a separate system fed from your primary store, not a query against it.
Accepting that up front gives you an indexing pipeline, a lag window and a
reconciliation job.

Writing to Postgres and OpenSearch in the same request is a dual write, and it
will drift — a failed second write leaves a document that exists and cannot be
found. Feeding the index from change data capture keeps one source of truth and
turns the drift into a measurable lag instead of a silent gap.

Measure that lag, and run a periodic full reconcile regardless. Every streaming
pipeline eventually drops something, and the only question is whether you find
out from a job or from a customer.
