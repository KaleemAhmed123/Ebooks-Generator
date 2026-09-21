# Module 3 - Rate limiter

## Requirements and numbers

- Asked wherever there is a public API: Stripe, Atlassian, Amazon, Uber all report it. The design is small; the grade is on where it sits, how the count is shared, and what happens when the count is unavailable
- Functional, three in: a limit per key, where the key is a user, an API token or an IP; reject over-limit requests with 429; limits configurable per endpoint. Out: billing quotas, per-tenant dashboards, DDoS mitigation below layer 7
- Non-functional: the decision adds under a millisecond to every request; the limiter never becomes the outage (page 5); accuracy within a few percent is fine, because a limit is a fence, not a ledger
- Inputs, as assumptions: say 10 000 requests a second at the edge, 1 M distinct keys active in any minute, one 64-bit counter per key per window: about 100 MB of counters, which is memory, not disk

<svg viewBox="0 0 460 128" role="img" aria-label="Client to an edge gateway that holds the rate limiter, then to the service and its database. Beside the gateway a counter store, Redis or memcached, one per point of presence. The limiter decision is one store round trip, about a millisecond. An orange cross marks a limiter placed inside the service, after the gateway and load balancer have already spent their work." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="8" y="40" width="54" height="28" rx="3" fill="#fff" stroke="#333"/><text x="35" y="58" text-anchor="middle">client</text>
  <rect x="104" y="30" width="96" height="48" rx="3" fill="#fff" stroke="#1d4e89"/><text x="152" y="44" text-anchor="middle">edge gateway</text><text x="152" y="56" text-anchor="middle" font-size="7.5" fill="#1d4e89">limiter: key → count</text><text x="152" y="68" text-anchor="middle" font-size="7.5">allow / 429 + Retry-After</text>
  <rect x="100" y="96" width="104" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="152" y="107" text-anchor="middle" font-size="7.5">counter store, per PoP</text><text x="152" y="118" text-anchor="middle" font-size="7.5">Redis or memcached, 100 MB</text>
  <rect x="250" y="40" width="70" height="28" rx="3" fill="#fff" stroke="#333"/><text x="285" y="58" text-anchor="middle">service</text>
  <rect x="370" y="40" width="70" height="28" rx="3" fill="#e6f2ff" stroke="#333"/><text x="405" y="58" text-anchor="middle">database</text>
  <line x1="62" y1="54" x2="104" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="200" y1="54" x2="250" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="320" y1="54" x2="370" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="140" y1="78" x2="140" y2="96" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="164" y1="96" x2="164" y2="78" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="83" y="36" text-anchor="middle" font-size="7.5">10 000/s</text>
  <text x="225" y="36" text-anchor="middle" font-size="7.5">allowed only</text>
  <text x="212" y="100" font-size="7.5" fill="#1d4e89">one round trip ≈ 1 ms</text>
  <text x="212" y="111" font-size="7.5" fill="#1d4e89">INCR, atomic (page 4)</text>
  <text x="250" y="24" font-size="7.5" fill="#bf4c28">✕ limiter here: LB, TLS, gateway CPU already spent</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The limiter is the first thing a request meets after TLS, at the gateway (booklet 05), so a rejected request costs one counter lookup and nothing downstream. The rest of this module is the counter: its algorithm (pages 2–3), its sharing across gateways (page 4), its absence (page 5)

### The failure

- The limiter inside the service. By the time it says no, the load balancer accepted a connection, TLS was terminated, the gateway authenticated the token and the service deserialised the body. The attack the limiter exists for has already spent the resources it was meant to protect. A fence goes at the edge of the field
