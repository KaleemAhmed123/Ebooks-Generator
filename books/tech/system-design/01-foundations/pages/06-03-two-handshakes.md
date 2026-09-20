## Two round trips before the first byte

- **TCP** opens a connection with a three-way handshake: SYN, SYN-ACK, ACK. One round trip before any data
- **TLS 1.3** adds one more: keys exchanged, certificate checked, cipher agreed. Then the request goes
- Same region, 250 µs RTT: nobody notices. Cross-continent, 80 ms RTT: 160 ms of setup before the server runs one line

<svg viewBox="0 0 460 72" role="img" aria-label="Timeline of a new connection: one round trip for the TCP handshake, one for the TLS 1.3 handshake, then the HTTP request; a resumed connection with 0-RTT skips both but its early data can be replayed" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="8" y="20" font-size="8.5" fill="#6b6b6b">new</text>
  <rect x="50" y="8" width="110" height="16" rx="2" fill="none" stroke="#1a1a1a"/><text x="105" y="19" text-anchor="middle" font-size="8">TCP · 1 RTT</text>
  <rect x="164" y="8" width="110" height="16" rx="2" fill="none" stroke="#1a1a1a"/><text x="219" y="19" text-anchor="middle" font-size="8">TLS 1.3 · 1 RTT</text>
  <rect x="278" y="8" width="110" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="333" y="19" text-anchor="middle" font-size="8">request · 1 RTT</text>
  <text x="394" y="19" font-size="8" fill="#6b6b6b">3 RTT</text>
  <text x="8" y="52" font-size="8.5" fill="#6b6b6b">resumed</text>
  <rect x="50" y="40" width="110" height="16" rx="2" fill="none" stroke="#1a1a1a"/><text x="105" y="51" text-anchor="middle" font-size="8">TCP · 1 RTT</text>
  <rect x="164" y="40" width="110" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="219" y="51" text-anchor="middle" font-size="8">TLS + early data · 0-RTT</text>
  <text x="280" y="51" font-size="8" fill="#6b6b6b">2 RTT · early data replayable</text>
</svg>

### The two traps

- **No connect timeout.** A firewall drops the SYN silently. Linux retries it with exponential backoff, 6 times by default, about 127 seconds in total, before `connect()` fails. The thread, or Node's single **event loop**, waits two minutes per attempt. Set a connect timeout; never inherit the kernel's
- **0-RTT is replayable.** A returning client may send data with its first TLS message and skip a round trip. The server cannot tell a genuine resumption from a captured copy sent again. RFC 8446 says the early data has "weaker guarantees". Only idempotent requests belong there: a GET, yes; a POST that creates an order, no

### The failure

- An order-creation POST allowed as 0-RTT early data. An attacker replays the captured handshake. Two orders. The protocol permits it; the application had to refuse it
