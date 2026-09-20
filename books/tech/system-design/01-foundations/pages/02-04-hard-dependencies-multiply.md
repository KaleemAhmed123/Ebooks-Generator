## Hard dependencies multiply

- A **hard dependency** is one your request cannot complete without. When it fails, you fail
- Availability in series is a product. Your service is only up when every hard dependency is up at the same moment

<svg viewBox="0 0 460 84" role="img" aria-label="A request passes through three boxes in series, each 99.99% available; the end-to-end availability is their product, 99.97%" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <text x="8" y="40">request</text>
  <path d="M56 36 L84 36" stroke="#1a1a1a"/><path d="M84 36 l-7 -4 v8 z" fill="#1a1a1a"/>
  <g>
    <rect x="88" y="18" width="80" height="36" rx="3" fill="none" stroke="#1a1a1a"/><text x="128" y="34" text-anchor="middle">auth</text><text x="128" y="48" text-anchor="middle" font-family="Consolas,monospace" font-size="9">99.99%</text>
    <path d="M168 36 L196 36" stroke="#1a1a1a"/><path d="M196 36 l-7 -4 v8 z" fill="#1a1a1a"/>
    <rect x="200" y="18" width="80" height="36" rx="3" fill="none" stroke="#1a1a1a"/><text x="240" y="34" text-anchor="middle">api</text><text x="240" y="48" text-anchor="middle" font-family="Consolas,monospace" font-size="9">99.99%</text>
    <path d="M280 36 L308 36" stroke="#1a1a1a"/><path d="M308 36 l-7 -4 v8 z" fill="#1a1a1a"/>
    <rect x="312" y="18" width="80" height="36" rx="3" fill="none" stroke="#1a1a1a"/><text x="352" y="34" text-anchor="middle">database</text><text x="352" y="48" text-anchor="middle" font-family="Consolas,monospace" font-size="9">99.99%</text>
  </g>
  <path d="M392 36 L420 36" stroke="#1a1a1a"/><path d="M420 36 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="88" y="62" width="304" height="18" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="240" y="75" text-anchor="middle" font-family="Consolas,monospace" font-size="9.5">0.9999 × 0.9999 × 0.9999 = 0.9997 → 99.97%</text>
</svg>

- Three four-nines components in a row are 99.97%: no longer four nines. Each hard dependency subtracts; the more boxes on the whiteboard, the lower the number
- Six four-nines hard dependencies: 0.9999⁶ ≈ 99.94%. The "four nines" in the title was never available to that design

### Soft dependencies do not multiply

- A **soft dependency** is one you can do without, badly. Recommendations missing from a product page. Search falling back to a simpler index. A profile picture replaced by initials
- When it fails, the request still completes. Its availability does not enter the product
- Turning a hard dependency soft is the cheapest nine there is: a timeout, a fallback value, and the code path that uses it. Module 8 covers the timeout; the services booklet covers the fallback

### The failure

- A design review that counts the nines of the database and forgets the auth service, the config service, the secrets manager, the DNS that resolves them, and the load balancer in front. Every one is in the product. Draw the whole chain before quoting a number
