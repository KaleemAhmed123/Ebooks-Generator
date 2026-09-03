## Exactly-Once Delivery

The guarantee a message broker cannot give you across a network. What exists is
at-least-once delivery plus an idempotent consumer, which looks the same from
outside.

| Guarantee | What it means |
|---|---|
| at-most-once | may lose messages |
| at-least-once | may duplicate — this is what you actually have |
| exactly-once | at-least-once, plus a dedupe table you wrote |

RabbitMQ redelivers after a consumer crashes between finishing the work and
acknowledging it. The work already ran. Only your own dedupe makes the outcome
happen once.

## Exponential Backoff with Jitter

Wait longer after each failed retry, and randomise the wait so clients do not all
come back on the same tick.

A thousand clients fail at the same instant. Fixed backoff returns all thousand
at exactly t+1s, then t+2s — the same wave, rebuilt on schedule. Jitter spreads
them: `sleep = random(0, base × 2^attempt)`.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Without jitter retries arrive in three synchronised waves; with jitter the same retries are spread evenly across the window">
  <text x="4" y="25" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">no jitter</text>
  <path d="M76 28 H452" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="148" y="10" width="6" height="18" fill="#1a1a1a"/>
  <rect x="258" y="10" width="6" height="18" fill="#1a1a1a"/>
  <rect x="378" y="10" width="6" height="18" fill="#1a1a1a"/>
  <text x="4" y="61" font-family="Consolas,monospace" font-size="8.5" fill="#d0212f">jitter</text>
  <path d="M76 64 H452" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="96" y="52" width="2" height="12" fill="#d0212f"/><rect x="118" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="131" y="52" width="2" height="12" fill="#d0212f"/><rect x="153" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="168" y="52" width="2" height="12" fill="#d0212f"/><rect x="184" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="201" y="52" width="2" height="12" fill="#d0212f"/><rect x="216" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="234" y="52" width="2" height="12" fill="#d0212f"/><rect x="249" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="268" y="52" width="2" height="12" fill="#d0212f"/><rect x="283" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="301" y="52" width="2" height="12" fill="#d0212f"/><rect x="320" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="333" y="52" width="2" height="12" fill="#d0212f"/><rect x="352" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="370" y="52" width="2" height="12" fill="#d0212f"/><rect x="385" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="403" y="52" width="2" height="12" fill="#d0212f"/><rect x="422" y="52" width="2" height="12" fill="#d0212f"/>
  <rect x="440" y="52" width="2" height="12" fill="#d0212f"/>
</svg>

Backoff without jitter is worse than no retry policy at all: it takes load that
was arriving spread out and synchronises it.
