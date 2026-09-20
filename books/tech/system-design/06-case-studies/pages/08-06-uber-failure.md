## Failure

- **Driver disconnects mid-offer:** The Matcher sends the offer. The driver drives through a tunnel and loses WebSocket connection. The Matcher must use a **TTL (Time to Live)**. If the driver does not accept within 10 seconds, the transaction rolls back, and the Matcher offers it to Driver 2
- **Duplicate requests:** The rider app loses network, so the rider angrily hits "Request" three times. The API must require an `Idempotency-Key` (→01) so the backend recognizes it as the same ride request
- **Region outage:** If US-East goes down, can US-West handle New York drivers? Yes, but routing must immediately failover, and the in-memory location service in US-West will be cold. It will take ~4 seconds (one ping cycle) for the map to repopulate

<svg viewBox="0 0 460 100" role="img" aria-label="Idempotency key prevents duplicate trips from impatient riders" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="30" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="35" y="49" text-anchor="middle" font-weight="bold">Rider</text>
  
  <rect x="120" y="30" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="49" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Server</text>
  
  <rect x="260" y="30" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="300" y="49" text-anchor="middle" font-weight="bold" fill="#b8541a">Trip DB</text>
  
  <path d="M60 35 L120 35" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="90" y="30" text-anchor="middle" font-size="6">Req 1 (id=A)</text>
  
  <path d="M60 55 L120 55" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="90" y="50" text-anchor="middle" font-size="6">Req 2 (id=A)</text>
  
  <path d="M200 45 L260 45" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="230" y="40" text-anchor="middle" font-size="6">INSERT IF NOT EXISTS</text>
</svg>

### The failure

- Trusting the client's state. If a rider cancels a trip, do not just delete the trip. The driver might have already accepted it. Use a state machine on the server, and validate state transitions (e.g., `REQUESTED -> CANCELLED` is valid; `IN_PROGRESS -> CANCELLED` requires a fee)

:::interview
A rider taps "Request Ride" twice because the app froze. Your system dispatches two drivers to the exact same location. How do you prevent this?

The client must generate a UUID when the screen loads and pass it as an `Idempotency-Key` header. The backend uses this to deduplicate the second request.
:::
