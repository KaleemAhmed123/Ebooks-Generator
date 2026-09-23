## Leaky bucket

- The token bucket permits bursts; the leaky bucket removes them. Arrivals enter at whatever rate they like, output leaves at a fixed rate, and the bucket absorbs the difference until it is full

<svg viewBox="0 0 460 100" role="img" aria-label="A leaky bucket. Arrivals come in at an uneven rate, enter a bucket whose depth sets how much burst it will hold, and leave at a fixed rate as an even stream. When the bucket is full, further arrivals are dropped with a 429. The meter form rejects when full; the queue form makes the request wait its turn instead. An orange cross marks the queue form a hundred deep draining at ten per second: the last request in the queue waits ten seconds, which is fine for a background job and not for a person." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">arrivals at any rate, output at a fixed rate — the bucket absorbs the difference</text>
  <text x="4" y="28" font-size="6.5">arrivals</text>
  <rect x="4" y="34" width="8" height="30" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="16" y="46" width="8" height="18" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="28" y="30" width="8" height="34" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="40" y="52" width="8" height="12" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="52" y="36" width="8" height="28" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <line x1="66" y1="49" x2="106" y2="49" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="110" y="30" width="90" height="40" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="155" y="46" text-anchor="middle" font-size="7.5">bucket</text><text x="155" y="58" text-anchor="middle" font-size="6">depth = burst it holds</text>
  <line x1="200" y1="49" x2="244" y2="49" stroke="#1d4e89" marker-end="url(#b)"/><text x="222" y="45" text-anchor="middle" font-size="6">fixed r</text>
  <text x="250" y="28" font-size="6.5">output</text>
  <rect x="250" y="42" width="8" height="22" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="262" y="42" width="8" height="22" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="274" y="42" width="8" height="22" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="286" y="42" width="8" height="22" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="298" y="42" width="8" height="22" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <text x="326" y="52" font-size="6.5" fill="#bf4c28">full → dropped, 429</text>
  <text x="4" y="82" font-size="7">the meter form rejects when the bucket is full; the queue form makes the request wait its turn instead</text>
  <text x="4" y="95" font-size="7.5" fill="#bf4c28">✕ queue form 100 deep at 10/s: the last one waits 10 seconds — fine for a job, not for a person</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The two forms differ in what they do when full, and it is the whole choice. The **meter** form rejects immediately, so a caller learns at once. The **queue** form holds the request and serves it later, converting rejection into latency
- Smoothing is worth having where the thing downstream genuinely cannot absorb a spike — a third-party API with its own limit, a modem, a billing partner. For an ordinary HTTP endpoint the token bucket is usually right, because a short burst is exactly what a healthy backend can absorb

### The failure

- The queue form in front of a person. A hundred-deep bucket draining at ten per second means the last arrival waits ten seconds before it is even attempted, and by then the caller's own timeout (booklet 01) has expired — so the work is done for a request nobody is listening to
- Queueing is deferral, not capacity. It is right for background jobs where the caller is a scheduler, and wrong wherever a human is holding a spinner, because the honest answer at that depth is a fast `429` telling them when to come back (page 6)
