## Failure on every arrow

- Every arrow on the board is a network hop, and every hop has the same four questions: what is the timeout, is it retried, is the retry safe (idempotent), and what happens instead when it stays down (fallback). Booklet 01 owns the mechanisms; the interview only asks that each arrow has an answer

<svg viewBox="0 0 460 150" role="img" aria-label="A request path client to service to database, with a side path service to queue to worker to provider. Each arrow carries a four-letter tag: timeout, retry, idempotent, fallback, with the values for that hop. The queue-to-worker arrow is marked with an orange cross: consumer dies mid-message, no answer given." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="26" width="56" height="26" rx="3" fill="#fff" stroke="#333"/><text x="38" y="43" text-anchor="middle">client</text>
  <rect x="130" y="26" width="64" height="26" rx="3" fill="#fff" stroke="#333"/><text x="162" y="43" text-anchor="middle">service</text>
  <rect x="270" y="26" width="64" height="26" rx="3" fill="#e6f2ff" stroke="#333"/><text x="302" y="43" text-anchor="middle">database</text>
  <rect x="130" y="96" width="64" height="26" rx="3" fill="#fff" stroke="#333"/><text x="162" y="113" text-anchor="middle">queue</text>
  <rect x="270" y="96" width="64" height="26" rx="3" fill="#fff" stroke="#333"/><text x="302" y="113" text-anchor="middle">worker</text>
  <rect x="384" y="96" width="64" height="26" rx="3" fill="#fff" stroke="#333"/><text x="416" y="113" text-anchor="middle">provider</text>
  <line x1="66" y1="39" x2="130" y2="39" stroke="#333" marker-end="url(#d)"/>
  <line x1="194" y1="39" x2="270" y2="39" stroke="#333" marker-end="url(#d)"/>
  <line x1="162" y1="52" x2="162" y2="96" stroke="#333" marker-end="url(#d)"/>
  <line x1="194" y1="109" x2="270" y2="109" stroke="#bf4c28" marker-end="url(#e)"/>
  <line x1="334" y1="109" x2="384" y2="109" stroke="#333" marker-end="url(#d)"/>
  <text x="98" y="20" text-anchor="middle" font-size="7">t 2 s · r 3× · i key · f error page</text>
  <text x="232" y="20" text-anchor="middle" font-size="7">t 500 ms · r 1× · i by row id · f 503</text>
  <text x="166" y="76" font-size="7">t 100 ms · r outbox · i msg id · f none needed</text>
  <text x="232" y="136" text-anchor="middle" font-size="7" fill="#bf4c28">✕ worker dies mid-message: redelivered? twice?</text>
  <text x="359" y="90" text-anchor="middle" font-size="7">t 5 s · r backoff · i key · f 2nd provider</text>
  <text x="390" y="43" font-size="7">t timeout  r retry</text>
  <text x="390" y="54" font-size="7">i idempotent  f fallback</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- Then the five questions about state, asked of the design as a whole: where is the state, who owns it, what if that node dies, what if the network drops the reply, what if the request arrives twice
- Every addition is named with its cost in the same breath. "A cache for the read path; the cost is a stale window and one more thing to invalidate." A trade-off stated by the candidate is a strength; the same one found by the interviewer is a hole

:::interview
"What happens if this call fails?" — Point at the arrow and answer the four in order: it times out at N, it is retried M times with backoff, the retry is safe because the request carries a key, and if the target stays down the caller does X instead. Then the one the question is really about: which of those four this arrow does not have yet, and what that costs.
:::

### The failure

- "We would add a queue here to make it reliable." The queue has arrows too. The interviewer asks what happens to the message when the worker dies after the side effect and before the ack, and the answer decides whether the queue made anything reliable or just moved the failure out of sight (booklet 04)
