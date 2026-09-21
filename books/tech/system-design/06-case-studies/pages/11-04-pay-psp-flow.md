## The PSP flow

- Money crosses into the PSP and the result comes back out of band, as a **webhook**, an HTTP `POST` from the PSP to a URL the design registered. The card details never touch the design's servers, and the truth about whether a payment succeeded arrives only by webhook, never from the browser

<svg viewBox="0 0 460 178" role="img" aria-label="The PSP flow. 1: the browser asks the payments API to create an intent; the API, under an idempotency key, 2: creates the intent at the PSP with the amount and gets 3: a client secret back, which it hands to the browser. 4: the browser sends the card details straight to the PSP, so PCI scope stays at the PSP. 5: the PSP posts a signed event, payment intent succeeded, to the webhook handler; delivery is at least once and unordered. The handler verifies the HMAC-SHA256 signature, returns 2xx at once, queues the event, dedupes by event id and 6: applies the state transition, ledger rows and outbox event in one transaction in the payments store. Stripe specifics: Stripe-Signature carries a timestamp and an HMAC-SHA256 of timestamp dot body, 5-minute tolerance by default, retries for up to three days with exponential backoff in live mode. An orange cross marks fulfilling on the browser's word: a forged POST from the developer tools gets the goods for free." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="46" width="56" height="34" rx="3" fill="#fff" stroke="#333"/><text x="34" y="60" text-anchor="middle">browser</text><text x="34" y="72" text-anchor="middle" font-size="7">checkout page</text>
  <rect x="104" y="10" width="92" height="46" rx="3" fill="#fff" stroke="#1d4e89"/><text x="150" y="24" text-anchor="middle">payments API</text><text x="150" y="35" text-anchor="middle" font-size="7">1. create intent, under an</text><text x="150" y="45" text-anchor="middle" font-size="7">idempotency key (page 2)</text>
  <line x1="62" y1="54" x2="104" y2="36" stroke="#333" marker-end="url(#d)"/><text x="72" y="40" font-size="7">1.</text>
  <rect x="256" y="10" width="92" height="46" rx="3" fill="#fff" stroke="#b8541a"/><text x="302" y="24" text-anchor="middle">PSP</text><text x="302" y="35" text-anchor="middle" font-size="7">Stripe, Adyen: card networks</text><text x="302" y="45" text-anchor="middle" font-size="7">outside the design's control</text>
  <line x1="196" y1="28" x2="256" y2="28" stroke="#333" marker-end="url(#d)"/><text x="226" y="24" text-anchor="middle" font-size="7">2. intent, amount</text>
  <line x1="256" y1="42" x2="196" y2="42" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="226" y="60" text-anchor="middle" font-size="7">3. client secret</text>
  <line x1="62" y1="70" x2="256" y2="50" stroke="#1d4e89" marker-end="url(#b)"/><text x="150" y="74" text-anchor="middle" font-size="7" fill="#1d4e89">4. card details straight to the PSP: PCI scope stays there</text>
  <rect x="250" y="100" width="104" height="52" rx="3" fill="#fff" stroke="#1d4e89"/><text x="302" y="113" text-anchor="middle">webhook handler</text><text x="302" y="124" text-anchor="middle" font-size="7">verify the HMAC signature</text><text x="302" y="134" text-anchor="middle" font-size="7">2xx at once → queue (booklet 04)</text><text x="302" y="144" text-anchor="middle" font-size="7">dedupe by event id</text>
  <line x1="302" y1="56" x2="302" y2="100" stroke="#b8541a" marker-end="url(#o)"/><text x="296" y="86" font-size="7" fill="#b8541a" text-anchor="end">5. signed event, at-least-once,</text><text x="296" y="95" font-size="7" fill="#b8541a" text-anchor="end">unordered, retried for days</text>
  <rect x="104" y="104" width="92" height="46" rx="3" fill="#e6f2ff" stroke="#333"/><text x="150" y="117" text-anchor="middle">payments store</text><text x="150" y="128" text-anchor="middle" font-size="7">state (page 5) · ledger (page 3)</text><text x="150" y="138" text-anchor="middle" font-size="7">· outbox event, one transaction</text>
  <line x1="250" y1="126" x2="196" y2="126" stroke="#333" marker-end="url(#d)"/><text x="223" y="122" text-anchor="middle" font-size="7">6. apply</text>
  <text x="360" y="112" font-size="7">Stripe: Stripe-Signature =</text><text x="360" y="121" font-size="7">t + HMAC-SHA256(t.body)</text><text x="360" y="130" font-size="7">5 min tolerance by default;</text><text x="360" y="139" font-size="7">retried up to 3 days with</text><text x="360" y="148" font-size="7">exponential backoff, live mode</text>
  <text x="6" y="170" font-size="7.5" fill="#bf4c28">✕ browser says "succeeded" → fulfil: a forged POST from the developer tools gets the goods free; only step 5 counts</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
    <marker id="o" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#b8541a"/></marker>
  </defs>
</svg>

- Webhooks are at-least-once and unordered, and Stripe's docs say both plainly: an endpoint "might occasionally receive the same event more than once", events are not delivered in the order generated, and the guard is to log processed event ids and skip repeats. The handler is therefore idempotent by event id, and every transition it applies is conditional (page 5)
- Verification is an HMAC: Stripe's `Stripe-Signature` header carries a timestamp and an HMAC-SHA256 over `timestamp.body` under the endpoint's secret, checked with a constant-time compare and a 5-minute default tolerance against replay. Return 2xx before doing the work, per the same docs, and do the work from a queue

### The failure

- Trusting the client's "payment succeeded". The checkout page's callback fires, the front end tells the API, and the API ships the order. Anyone can send that request with a browser's developer tools. The PSP's signed event is the only input that moves a payment forward
