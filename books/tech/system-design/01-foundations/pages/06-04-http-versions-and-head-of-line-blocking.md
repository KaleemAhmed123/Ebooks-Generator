## One connection, many requests

- **HTTP/1.1** serialises requests on a connection. Browsers open a handful of connections per host to work around this
- **HTTP/2** multiplexes many requests on one TCP connection as independent **streams**. But one lost TCP packet stalls every stream — **head-of-line blocking** at the transport layer. RFC 9114: "a lost or reordered packet causes all active transactions to experience a stall"
- **HTTP/3** runs over **QUIC** (UDP + TLS 1.3). Each stream recovers independently; one lost packet stalls only that stream. Setup is 1 RTT (TCP handshake + TLS rolled into one); resumption is 0 RTT

<svg viewBox="0 0 460 70" role="img" aria-label="Three protocols side by side: HTTP/1.1 serialises requests, HTTP/2 multiplexes but shares one TCP loss domain, HTTP/3 over QUIC isolates each stream" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="60" y="10" text-anchor="middle" fill="#6b6b6b">HTTP/1.1</text>
  <rect x="10" y="14" width="100" height="10" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="60" y="22" text-anchor="middle" font-size="7">req 1</text>
  <rect x="10" y="26" width="100" height="10" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="60" y="34" text-anchor="middle" font-size="7">req 2 waits</text>
  <rect x="10" y="38" width="100" height="10" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="60" y="46" text-anchor="middle" font-size="7">req 3 waits</text>
  <text x="60" y="58" text-anchor="middle" font-size="7" fill="#6b6b6b">serial · 6 conns</text>

  <text x="230" y="10" text-anchor="middle" fill="#6b6b6b">HTTP/2</text>
  <rect x="170" y="14" width="32" height="34" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="186" y="34" text-anchor="middle" font-size="7">s1</text>
  <rect x="206" y="14" width="32" height="34" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="222" y="34" text-anchor="middle" font-size="7">s2</text>
  <rect x="242" y="14" width="32" height="34" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="258" y="34" text-anchor="middle" font-size="7">s3</text>
  <rect x="170" y="50" width="104" height="10" rx="2" fill="none" stroke="#b8541a"/><text x="222" y="58" text-anchor="middle" font-size="7" fill="#b8541a">1 TCP loss → all stall</text>

  <text x="400" y="10" text-anchor="middle" fill="#6b6b6b">HTTP/3 (QUIC)</text>
  <rect x="340" y="14" width="32" height="34" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="356" y="34" text-anchor="middle" font-size="7">s1</text>
  <rect x="376" y="14" width="32" height="34" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="392" y="34" text-anchor="middle" font-size="7">s2</text>
  <rect x="412" y="14" width="32" height="34" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="428" y="34" text-anchor="middle" font-size="7">s3</text>
  <text x="400" y="58" text-anchor="middle" font-size="7" fill="#1d4e89">per-stream recovery</text>
</svg>

### The failure

- HTTP/1.1 with a few connections per host: that many requests in flight, at most. A waterfall when a page has 30 assets. HTTP/2 raises the limit to a hundred or more streams per connection; HTTP/3 removes the shared-loss problem too
