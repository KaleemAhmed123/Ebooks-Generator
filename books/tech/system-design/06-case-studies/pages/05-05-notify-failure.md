## Provider is down

- Retries handle a provider that fails one call in a hundred. A provider that is down for an hour needs a different answer, because a hundred workers each waiting five seconds per attempt are a hundred workers doing nothing, and the queue behind them grows at every message the channel receives

<svg viewBox="0 0 460 150" role="img" aria-label="SMS workers call the primary SMS provider through a circuit breaker. The breaker is open: the provider is marked with an orange cross. Calls are routed to a fallback SMS provider, but through a rate cap of 10 per second, its contracted limit; the rest of the 50 per second wait in the queue. A half-open probe every 30 seconds tests the primary. A second orange cross marks the alternative: all 50 per second sent to the fallback, which then also fails." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="50" width="66" height="28" rx="3" fill="#fff" stroke="#333"/><text x="39" y="63" text-anchor="middle">SMS workers</text><text x="39" y="74" text-anchor="middle" font-size="7.5">50/s at peak</text>
  <rect x="108" y="40" width="90" height="48" rx="3" fill="#fff" stroke="#1d4e89"/><text x="153" y="54" text-anchor="middle">circuit breaker</text><text x="153" y="66" text-anchor="middle" font-size="7">open: 50 % failed in 10 s</text><text x="153" y="78" text-anchor="middle" font-size="7">half-open probe every 30 s</text>
  <line x1="72" y1="64" x2="108" y2="64" stroke="#333" marker-end="url(#d)"/>
  <rect x="236" y="14" width="90" height="28" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="281" y="27" text-anchor="middle" fill="#bf4c28">✕ primary SMS</text><text x="281" y="38" text-anchor="middle" font-size="7.5" fill="#bf4c28">timeouts, 503</text>
  <line x1="198" y1="52" x2="236" y2="30" stroke="#bf4c28" stroke-dasharray="3 3" marker-end="url(#e)"/>
  <text x="186" y="22" font-size="7" fill="#bf4c28">probe only</text>
  <rect x="236" y="62" width="64" height="28" rx="3" fill="#fff" stroke="#1d4e89"/><text x="268" y="75" text-anchor="middle">rate cap</text><text x="268" y="86" text-anchor="middle" font-size="7.5" fill="#1d4e89">10/s: the contract</text>
  <line x1="198" y1="72" x2="236" y2="76" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="336" y="62" width="90" height="28" rx="3" fill="#fff" stroke="#b8541a"/><text x="381" y="75" text-anchor="middle">fallback SMS</text><text x="381" y="86" text-anchor="middle" font-size="7.5">a second vendor</text>
  <line x1="300" y1="76" x2="336" y2="76" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="236" y="106" font-size="7.5">40/s stay in the queue with their backoff;</text>
  <text x="236" y="117" font-size="7.5">OTPs and resets go first (priority lane, page 6)</text>
  <text x="6" y="106" font-size="7.5" fill="#bf4c28">✕ no cap: 50/s to a vendor</text>
  <text x="6" y="117" font-size="7.5" fill="#bf4c28">contracted for 10/s; it throttles</text>
  <text x="6" y="128" font-size="7.5" fill="#bf4c28">or suspends the account, and now</text>
  <text x="6" y="139" font-size="7.5" fill="#bf4c28">both providers are down</text>
  <text x="236" y="139" font-size="7.5">a breaker per provider, per channel: one state each</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- A **circuit breaker** counts recent failures on one dependency and, past a threshold, stops calling it for a while, failing fast instead of waiting on the timeout; after a cooling period it lets one probe through and closes again if the probe succeeds. Booklet 05 owns the mechanism; here the breaker is per provider, so an SMS outage never opens the push breaker
- With the breaker open, the workers have a choice per message: route to a fallback vendor, or hold in the queue with backoff. The fallback is capped at the rate the contract allows, because a vendor that normally sees 1 % of traffic has been provisioned, and priced, for 1 %
- What is held is chosen by priority. A one-time passcode is worth the fallback's scarce capacity; a "your parcel is nearby" text waits for the primary to return. The queue per priority on page 6 is what makes that choice cheap

### The failure

- Failover as a switch. The breaker opens and the whole 50 messages a second is pointed at the fallback vendor, which was contracted, and rate-limited, for 10. It throttles or suspends the account within seconds, and the design has converted one vendor outage into two, with a queue that is still growing
