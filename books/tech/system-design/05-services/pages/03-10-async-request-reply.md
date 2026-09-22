## Async request/reply

- A reply is needed, but not now: a report that takes minutes, an export, a render. The request goes on a queue with a **correlation id** and a reply address, a reply queue or a callback URL; the caller records "pending" and returns; the worker does the job and sends the reply with the same id; a separate handler matches it and updates the record. Booklet 04 owns the queue; this page is the shape around it

<svg viewBox="0 0 460 136" role="img" aria-label="Async request and reply. A client asks the API for a report. The API writes a job row, status pending, with a correlation id, puts a message on a request queue carrying the id and a reply-to, and returns 202 with the id at once. A worker takes the message, runs for ten minutes, and sends the result to the reply queue with the same id. A reply handler in the API, not the original request thread, reads it, updates the job row to done with the result's location, and notifies the client by a callback or lets it poll GET jobs by id. An orange cross marks the API thread that blocks waiting for the reply: ten minutes per thread, and the pool is gone after a handful of requests." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="52" height="26" rx="3" fill="#fff" stroke="#333"/><text x="32" y="26" text-anchor="middle">client</text>
  <rect x="88" y="6" width="100" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="19" text-anchor="middle">API</text><text x="138" y="31" text-anchor="middle" font-size="7">job row: pending, id=c1</text>
  <line x1="58" y1="18" x2="88" y2="18" stroke="#333" marker-end="url(#d)"/><text x="73" y="14" text-anchor="middle" font-size="7">POST</text>
  <line x1="88" y1="30" x2="58" y2="30" stroke="#333" marker-end="url(#d)"/><text x="73" y="47" text-anchor="middle" font-size="7">202 {id: c1}</text>
  <rect x="218" y="6" width="90" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="263" y="19" text-anchor="middle">request queue</text><text x="263" y="31" text-anchor="middle" font-size="7">{id: c1, replyTo: rq}</text>
  <line x1="188" y1="23" x2="218" y2="23" stroke="#333" marker-end="url(#d)"/>
  <rect x="338" y="6" width="116" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="396" y="19" text-anchor="middle">worker</text><text x="396" y="31" text-anchor="middle" font-size="7">runs 10 min, result to blob store</text>
  <line x1="308" y1="23" x2="338" y2="23" stroke="#333" marker-end="url(#d)"/>
  <rect x="218" y="60" width="90" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="263" y="73" text-anchor="middle">reply queue rq</text><text x="263" y="85" text-anchor="middle" font-size="7">{id: c1, url: …}</text>
  <line x1="396" y1="40" x2="396" y2="77" stroke="#333"/><line x1="396" y1="77" x2="308" y2="77" stroke="#333" marker-end="url(#d)"/>
  <rect x="88" y="60" width="100" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="73" text-anchor="middle">reply handler</text><text x="138" y="85" text-anchor="middle" font-size="7">match c1 → job done, url</text>
  <line x1="218" y1="77" x2="188" y2="77" stroke="#333" marker-end="url(#d)"/>
  <line x1="88" y1="84" x2="58" y2="84" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="32" y="70" text-anchor="middle" font-size="7">callback, or</text><text x="32" y="80" text-anchor="middle" font-size="7">GET /jobs/c1</text>
  <text x="6" y="112" font-size="7">the id is the whole protocol: it is in the job row, the request, the reply, and the client's hand; nothing waits in memory</text>
  <text x="6" y="130" font-size="7.5" fill="#bf4c28">✕ the request thread blocks on the reply queue: ten minutes per thread, the pool is empty after a handful of requests, and the API is down</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Three rules make it work. The initial request completes at once, with a `202` and an id, and the state lives in a row, not a thread. The reply is handled by whoever is running when it arrives, matched by the id, because the process that sent the request may have restarted meanwhile. The worker's result goes somewhere durable, a blob store (Module 11, page 6), and the reply carries a pointer, not the bytes
- The client learns the outcome by polling `GET /jobs/{id}` or by a callback the request named; both are the id again. Delivery to the reply queue is at-least-once (booklet 04), so the handler updating the row is idempotent: "done" twice is done

### The failure

- The reply arrives and nobody is waiting. The request thread blocked on the reply, the pod was replaced during the ten minutes, and the reply lands on a queue whose consumer is gone, or on a callback for a request nobody recorded. State that must outlive a request lives in a store keyed by the correlation id; a thread is not a place to wait
