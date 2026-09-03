## Idempotency

Doing an operation N times leaves the system in the state one call would leave
it. The property that matters most for anything touching money or messages.

A user taps "Pay ₹500", the network hiccups, the client retries. Without
idempotency that is ₹1000. With a key on the request, the server recognises it
and replays the original result.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A payment request carrying an idempotency key either does the work and stores the result, or replays the stored result if the key has been seen before">
  <rect x="4" y="27" width="150" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="79" y="42" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">Idempotency-Key: abc123</text>
  <path d="M154 39 H180" stroke="#1a1a1a" stroke-width="1.3"/><path d="M182 39 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="186" y="27" width="82" height="24" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="227" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#d0212f">key seen?</text>
  <path d="M268 39 H296 M296 16 V62 M296 16 H322 M296 62 H322" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M324 16 l-7 -4 v8 z" fill="#1a1a1a"/><path d="M324 62 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="309" y="12" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">no</text>
  <text x="309" y="58" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">yes</text>
  <text x="330" y="20" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">charge ₹500, store result</text>
  <text x="330" y="66" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">replay stored result</text>
</svg>

Recording the key after doing the work leaves a window: the retry lands between
the charge and the write, and both calls see an unseen key. Claim the key in the
same transaction as the effect, or it is not idempotent, only usually idempotent.

## Idempotency Key

A client-generated unique ID on a mutating request, so the server can dedupe
retries. Stored with the response, usually for 24 hours.

Stripe requires one on every charge. The mobile app generates a UUID per
checkout attempt and reuses it across every retry of that attempt. A new attempt
gets a new key.

`INSERT key ... ON CONFLICT DO NOTHING` is the whole mechanism — inserted means
do the work, conflict means replay. Generating the key server-side, or fresh per
retry, removes the only thing it was doing: letting the client say *this is the
same intent as before*.
