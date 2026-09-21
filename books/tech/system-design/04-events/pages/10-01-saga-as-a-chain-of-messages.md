# Module 10 - Sagas as message flow

## A saga is a chain of local transactions

- A **saga** is a sequence of local transactions joined by messages: each step commits to its own service's database, then emits an event or command that triggers the next step. If a step fails, earlier steps run **compensating transactions** — their own local undo — in reverse (booklet 03 owns the isolation anomalies and countermeasures this creates; these four pages are the message plumbing only)

<svg viewBox="0 0 460 100" role="img" aria-label="A saga as a chain of messages. Order, payment, and shipping services each commit locally and emit an event to the next. A dashed reverse arrow shows a compensation." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="90" height="30" fill="none" stroke="#333"/>
  <text x="65" y="49" text-anchor="middle" font-size="7">order</text>
  <path d="M110 40 L180 40" stroke="#333" marker-end="url(#sg10)"/>
  <text x="145" y="33" text-anchor="middle" font-size="6">OrderPlaced</text>
  <rect x="180" y="30" width="90" height="30" fill="none" stroke="#333"/>
  <text x="225" y="49" text-anchor="middle" font-size="7">payment</text>
  <path d="M270 40 L340 40" stroke="#333" marker-end="url(#sg10)"/>
  <text x="305" y="33" text-anchor="middle" font-size="6">PaymentTaken</text>
  <rect x="340" y="30" width="90" height="30" fill="none" stroke="#333"/>
  <text x="385" y="49" text-anchor="middle" font-size="7">shipping</text>
  <path d="M340 70 L110 70" stroke="#bf4c28" stroke-dasharray="3 2" marker-end="url(#sg10r)"/>
  <text x="225" y="83" text-anchor="middle" font-size="6" fill="#bf4c28">compensate backwards on failure</text>
  <defs>
    <marker id="sg10" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="sg10r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- Every step is itself a dual-write risk (Module 8, page 1): a step that commits locally but never emits leaves the saga stuck exactly where the plain dual-write problem leaves a single service — the outbox pattern applies to a saga step exactly as it does anywhere else
- The two ways to wire the messages between steps are choreography and orchestration (page 2); both solve the same coordination problem with a different owner

### The failure

- A step that commits and then crashes before its outbox relay publishes. Nothing downstream knows the step happened, the saga looks stuck to everyone watching it, and the fix is the same as Module 8: the emit belongs in the same local transaction as the commit, via an outbox row, not as a separate call after it
