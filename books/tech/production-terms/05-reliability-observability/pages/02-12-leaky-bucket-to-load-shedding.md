## Leaky Bucket

Rate limiting that smooths instead of bursting. Requests drain at a fixed rate
however they arrive.

Two hundred requests land in one second against a 10/sec leak. They queue and
drain evenly over twenty seconds. Downstream sees a flat line.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A burst of two hundred requests enters a queue and leaves it at a steady ten per second">
  <rect x="4" y="14" width="3" height="14" fill="#1a1a1a"/><rect x="12" y="14" width="3" height="14" fill="#1a1a1a"/>
  <rect x="20" y="14" width="3" height="14" fill="#1a1a1a"/><rect x="28" y="14" width="3" height="14" fill="#1a1a1a"/>
  <rect x="36" y="14" width="3" height="14" fill="#1a1a1a"/><rect x="44" y="14" width="3" height="14" fill="#1a1a1a"/>
  <rect x="52" y="14" width="3" height="14" fill="#1a1a1a"/><rect x="60" y="14" width="3" height="14" fill="#1a1a1a"/>
  <text x="37" y="42" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">200 in 1s</text>
  <path d="M76 21 H124" stroke="#1a1a1a" stroke-width="1.2"/><path d="M126 21 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M140 8 V72 H222 V8" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="181" y="40" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#d0212f">queue</text>
  <text x="181" y="56" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">full → drop</text>
  <path d="M222 60 H272" stroke="#1a1a1a" stroke-width="1.2"/><path d="M274 60 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="288" y="53" width="3" height="14" fill="#d0212f"/><rect x="320" y="53" width="3" height="14" fill="#d0212f"/>
  <rect x="352" y="53" width="3" height="14" fill="#d0212f"/><rect x="384" y="53" width="3" height="14" fill="#d0212f"/>
  <rect x="416" y="53" width="3" height="14" fill="#d0212f"/><rect x="448" y="53" width="3" height="14" fill="#d0212f"/>
  <text x="368" y="84" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#d0212f">10/sec, flat</text>
</svg>

The queue is latency you cannot see on the limiter's graph. The two-hundredth
caller waits twenty seconds for a response it abandoned nineteen seconds ago.

## Load Shedding

Deliberately dropping low-value requests so high-value ones survive an overload.

During a spike the API returns 503 to analytics writes, prefetches and
recommendation calls, and keeps login, checkout and payments at full speed.
Revenue traffic survives; the product is degraded and alive.

Shedding only works if the classification already exists. Deciding which
endpoints are expendable at 2am, by editing config under load, is how the
checkout path gets shed by mistake.
