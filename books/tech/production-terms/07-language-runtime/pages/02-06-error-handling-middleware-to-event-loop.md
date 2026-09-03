## Error-Handling Middleware

Express identifies the error handler by its arity: four arguments — `(err, req,
res, next)`. It must be registered after every route, because Express walks the
stack in registration order.

An `async` route that throws in Express 4 never reaches it. The rejection has no
listener, `next(err)` is never called, and the request hangs until the client
gives up.

| | An async route throws |
|---|---|
| Express 4 | request hangs — wrap the handler, or call `next(err)` yourself |
| Express 5 | rejection forwarded to the error middleware automatically |

A hung request is worse than a 500. It holds a socket, a pool connection and a
timeout budget, and it never appears in the error rate you alert on.

## Event Loop

The scheduler that lets single-threaded JavaScript do concurrent I/O. It runs
your synchronous code to completion, drains the queues of finished async work,
then repeats.

A 400ms synchronous `JSON.parse` of a 60MB payload owns the loop for the whole
400ms. Every other request on that process waits — and so does the health check,
which is how one large upload becomes a restarted container.

<svg viewBox="0 0 460 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The event loop runs the call stack to empty, drains the entire microtask queue, then takes macrotasks such as timers and I/O before repeating">
  <rect x="10" y="8" width="150" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="85" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">call stack</text>
  <text x="172" y="24" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">your synchronous code, to completion</text>
  <path d="M85 34 V42" stroke="#1a1a1a" stroke-width="1.2"/><path d="M85 44 l-4 -7 h8 z" fill="#1a1a1a"/>
  <rect x="10" y="44" width="150" height="24" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/>
  <text x="85" y="60" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#5b2fa8">microtasks</text>
  <text x="172" y="60" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">promises — drained fully, every pass</text>
  <path d="M85 70 V78" stroke="#1a1a1a" stroke-width="1.2"/><path d="M85 80 l-4 -7 h8 z" fill="#1a1a1a"/>
  <rect x="10" y="80" width="150" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="85" y="96" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">macrotasks</text>
  <text x="172" y="96" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">timers, I/O, setImmediate — then repeat</text>
</svg>

Concurrency here is not parallelism. The loop overlaps waiting, never
computation. CPU work belongs on a worker thread or in another process.
