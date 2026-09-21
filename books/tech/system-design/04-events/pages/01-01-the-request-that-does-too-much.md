# Module 1 - Why a broker at all

## The request that does too much

- `POST /orders` starts as one insert. A year later it also charges the card, reserves stock, sends the receipt and reindexes search, each a synchronous call, each awaited before the user gets a response
- Two things are now true at once. The response time is the sum of four calls. And the order fails if any one of them fails, including the one that only sends an email

<svg viewBox="0 0 460 140" role="img" aria-label="One request fanning to four sync calls. The User Request hits the Order Service. The Order Service sequentially calls Payment (500ms), Inventory (200ms), Email (300ms), and Search Index (100ms). The user waits for the sum of all latencies." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="65" text-anchor="middle" font-weight="bold">User Request</text>
  <text x="60" y="80" text-anchor="middle" font-size="7">Waiting...</text>
  
  <rect x="150" y="40" width="80" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="65" text-anchor="middle" font-weight="bold">Order Service</text>
  <text x="190" y="80" text-anchor="middle" font-size="6">Sync calls to 4 APIs</text>
  
  <rect x="300" y="10" width="80" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="340" y="24" text-anchor="middle">Payment (500ms)</text>
  
  <rect x="300" y="40" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="54" text-anchor="middle">Inventory (200ms)</text>
  
  <rect x="300" y="70" width="80" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="340" y="84" text-anchor="middle">Email (300ms)</text>
  
  <rect x="300" y="100" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="114" text-anchor="middle">Search Index (100ms)</text>
  
  <path d="M100 70 L150 70" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M150 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M230 60 L300 20" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M300 20 l-6 0 v5 z" fill="#b8541a" transform="rotate(-30 300 20)"/>
  <path d="M230 65 L300 50" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M300 50 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-15 300 50)"/>
  <path d="M230 75 L300 80" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M300 80 l-6 -2 v5 z" fill="#b8541a" transform="rotate(10 300 80)"/>
  <path d="M230 80 L300 110" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M300 110 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(25 300 110)"/>
</svg>

- **p99** is the latency that 99 requests in 100 beat. Four calls in sequence do not add their averages; each slow tail adds to the wait, so the endpoint's p99 is close to the sum of the four p99s
- The fix is not "make the calls parallel". Parallel calls still fail together, and the caller still holds a connection open until the slowest returns. The fix is to let the order commit and hand the rest to something that runs it later. That something is a **message broker**: a server that stores messages from producers and hands them to consumers
- Booklet 05 owns the wider question of when one service should call another directly. This module is only the case for a broker

### The failure

- A payment that succeeded and an order that reported failure. The card was charged in call 1; call 3, the email, timed out; the endpoint returned 500; the user retried and was charged again. The request did too much, and what "failed" meant was nobody's design
