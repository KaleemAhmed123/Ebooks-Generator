## One more round trip for encryption

- **TLS 1.3** adds one more round trip on top of TCP. The client and server exchange keys, verify certificates, and agree on a cipher

<svg viewBox="0 0 460 80" role="img" aria-label="TLS 1.3 handshake: 1-RTT for full handshake; 0-RTT resumption sends early data with the ClientHello but that data can be replayed" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <text x="30" y="10" font-size="8" fill="#6b6b6b">1-RTT (new connection)</text>
  <line x1="40" y1="16" x2="40" y2="52" stroke="#1a1a1a"/>
  <line x1="200" y1="16" x2="200" y2="52" stroke="#1a1a1a"/>
  <path d="M40 20 L194 30" stroke="#1d4e89"/><path d="M194 30 l-7 -4 v6 z" fill="#1d4e89"/>
  <text x="120" y="20" text-anchor="middle" font-size="7.5" fill="#1d4e89">ClientHello</text>
  <path d="M200 34 L46 44" stroke="#1d4e89"/><path d="M46 44 l7 -4 v6 z" fill="#1d4e89"/>
  <text x="120" y="38" text-anchor="middle" font-size="7.5" fill="#1d4e89">ServerHello + cert + Finished</text>
  <text x="120" y="52" text-anchor="middle" font-size="7.5">data flows</text>

  <text x="290" y="10" font-size="8" fill="#6b6b6b">0-RTT (resumption)</text>
  <line x1="300" y1="16" x2="300" y2="52" stroke="#1a1a1a"/>
  <line x1="440" y1="16" x2="440" y2="52" stroke="#1a1a1a"/>
  <path d="M300 20 L434 30" stroke="#1d4e89"/><path d="M434 30 l-7 -4 v6 z" fill="#1d4e89"/>
  <text x="370" y="20" text-anchor="middle" font-size="7.5" fill="#1d4e89">ClientHello + early data</text>
  <text x="370" y="38" text-anchor="middle" font-size="7.5" fill="#b8541a">⚠ early data can be replayed</text>
  <text x="370" y="52" text-anchor="middle" font-size="7.5">data flows</text>
  <text x="230" y="72" text-anchor="middle" font-size="8" fill="#6b6b6b">0-RTT early data has "no non-replay guarantee between connections" — RFC 8446</text>
</svg>

- **0-RTT resumption** lets a returning client send data immediately, skipping the round trip. But the server cannot distinguish a legitimate resumption from a replayed one. RFC 8446: the early data "does not depend on the ServerHello and therefore has weaker guarantees"
- A safe 0-RTT payload must be **idempotent**. A GET is fine. A POST that creates a payment is not

### The failure

- Sending a POST to create an order as 0-RTT early data. An attacker captures the ClientHello + early data and replays it. Two orders created. The protocol allows this by design
