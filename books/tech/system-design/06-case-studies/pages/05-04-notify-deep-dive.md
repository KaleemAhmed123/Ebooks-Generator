## Deep dive: retries and dedupe

- The queue delivers at least once, the provider call can time out after succeeding, and the worker can die between the send and the ack. Every one of those produces a second attempt at the same message, so the worker's loop is built around the attempt, not the message

<svg viewBox="0 0 460 150" role="img" aria-label="A worker's loop for one message: claim a delivery marker keyed by notification id and channel; if already sent, ack and skip. Otherwise call the provider with a per-provider timeout. On success, mark sent and ack. On failure, increment attempts and re-enqueue with exponential backoff and jitter: 1, 2, 4, 8, 16 seconds. After 5 attempts the message goes to the dead-letter queue. An orange cross marks immediate re-enqueue at the head of the queue, the retry storm." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="41" y="36" text-anchor="middle">take message</text>
  <rect x="104" y="20" width="104" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="156" y="31" text-anchor="middle" font-size="7.5">SET sent:{id}:{ch} NX EX 30</text><text x="156" y="42" text-anchor="middle" font-size="7.5">claim: 0 = already sent → ack</text>
  <rect x="236" y="20" width="96" height="26" rx="3" fill="#fff" stroke="#333"/><text x="284" y="31" text-anchor="middle">call provider</text><text x="284" y="42" text-anchor="middle" font-size="7.5">timeout 5 s (per provider)</text>
  <rect x="362" y="20" width="92" height="26" rx="3" fill="#fff" stroke="#333"/><text x="408" y="31" text-anchor="middle">ok: mark sent</text><text x="408" y="42" text-anchor="middle" font-size="7.5">EXPIRE 86400; ack</text>
  <line x1="76" y1="33" x2="104" y2="33" stroke="#333" marker-end="url(#d)"/>
  <line x1="208" y1="33" x2="236" y2="33" stroke="#333" marker-end="url(#d)"/>
  <line x1="332" y1="33" x2="362" y2="33" stroke="#333" marker-end="url(#d)"/>
  <line x1="284" y1="46" x2="284" y2="76" stroke="#333" marker-end="url(#d)"/>
  <rect x="204" y="76" width="160" height="26" rx="3" fill="#fff" stroke="#333"/><text x="284" y="87" text-anchor="middle">fail or timeout: attempts + 1</text><text x="284" y="98" text-anchor="middle" font-size="7.5">DEL claim; re-enqueue with delay</text>
  <text x="6" y="110" font-size="7.5">delay = 2^attempt s ± jitter:</text>
  <text x="6" y="121" font-size="7.5">1 · 2 · 4 · 8 · 16 (≈ 31 s total)</text>
  <line x1="204" y1="89" x2="76" y2="89" stroke="#333"/><line x1="41" y1="89" x2="41" y2="46" stroke="#333" marker-end="url(#d)"/><line x1="76" y1="89" x2="41" y2="89" stroke="#333"/>
  <line x1="284" y1="102" x2="284" y2="122" stroke="#bf4c28" marker-end="url(#e)"/>
  <rect x="236" y="122" width="96" height="22" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="284" y="136" text-anchor="middle" fill="#bf4c28">attempt 6: dead letters</text>
  <text x="340" y="130" font-size="7.5">a human or a replay job decides;</text>
  <text x="340" y="141" font-size="7.5">the message is never dropped</text>
  <text x="6" y="136" font-size="7.5" fill="#bf4c28">✕ re-enqueue at the head, no delay:</text>
  <text x="6" y="147" font-size="7.5" fill="#bf4c28">10 000 retries/s on a provider that is already failing</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- The claim is a short lease, not a permanent mark. Marking "sent" before the send loses the message if the worker dies; marking it only after sends twice if it dies in between. The lease bounds the second case to one duplicate per crash and never produces the first
- Backoff is exponential with jitter (booklet 01), and the retry goes to the back of the queue with a delay, never to the front. Failures that cannot succeed on retry, an invalid token or an opted-out number, skip the loop and record why. Dead letters are inspected and replayed once the provider is back, never deleted (booklet 04)

:::interview
"How do you avoid sending the same notification twice?" — Accept that the send is at-least-once, then make the second attempt cheap: a claim keyed by notification id and channel, set with `NX` before the provider call and made durable after it, so a redelivered message is acked without a send. Then the honest edge: a worker that dies between a successful provider call and the durable mark still sends twice, and only the provider's own idempotency key closes that.
:::

### The failure

- Retry now, retry forever. The provider returns 503, the worker puts the message back on the front of the queue, and the queue drains at full speed into a provider that is already down while healthy messages behind it wait
