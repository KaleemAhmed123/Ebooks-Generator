## Uvicorn Workers

One Python process uses one core. Four processes, each with its own event loop,
sit behind one socket: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker`.

Everything in process memory is now per-worker. A rate limiter counting to 100 a
minute admits 400, and a cache hits on one worker and misses on three.

<svg viewBox="0 0 460 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One socket distributes requests across four Uvicorn worker processes, each holding its own event loop and its own in-process state, so counters and caches have to move out to shared Redis">
  <rect x="4" y="18" width="82" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="45" y="35" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">one socket</text>
  <path d="M88 31 H106 M106 9 V54 M106 9 H126 M106 24 H126 M106 39 H126 M106 54 H126" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M126 9 l-7 -4 v8 z M126 24 l-7 -4 v8 z M126 39 l-7 -4 v8 z M126 54 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="130" y="3" width="148" height="13" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="204" y="12" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">worker 1 · own loop, own cache</text>
  <rect x="130" y="18" width="148" height="13" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="204" y="27" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">worker 2 · own loop, own cache</text>
  <rect x="130" y="33" width="148" height="13" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="204" y="42" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">worker 3 · own loop, own cache</text>
  <rect x="130" y="48" width="148" height="13" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="204" y="57" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">worker 4 · own loop, own cache</text>
  <path d="M280 9 H292 M280 24 H292 M280 39 H292 M280 54 H292 M292 9 V54 M292 31 H320" stroke="#5b2fa8" stroke-width="1.1" stroke-dasharray="3 2" fill="none"/>
  <path d="M320 31 l-7 -4 v8 z" fill="#5b2fa8"/>
  <rect x="324" y="18" width="116" height="26" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/>
  <text x="382" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">Redis — counters,</text>
  <text x="382" y="41" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">caches, locks</text>
</svg>

## WeakMap / WeakRef

References the garbage collector is allowed to ignore. If a `WeakMap` key is the
last thing pointing at an object, the object is still collected and the entry
goes with it.

Per-request metadata in a plain `Map` keyed by the request object keeps every
request the process ever handled alive. The same code against a `WeakMap` frees
each entry when the request is collected.

`WeakMap` keys are not enumerable and there is no `.size` — the answer would
change under you as the collector runs.
