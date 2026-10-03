# TCP, UDP, and Flow

## The TCP handshake and teardown

- TCP turns unreliable IP packets into a **reliable, ordered byte stream** between two processes. It can only do that after both sides agree to start — the **three-way handshake**: the client sends `SYN`, the server replies `SYN-ACK`, the client answers `ACK`. Each side picks a random initial sequence number; from then on every byte is numbered, acknowledged, and retransmitted if its ACK doesn't come.

<svg viewBox="0 0 360 104" role="img" aria-label="TCP three-way handshake: client SYN, server SYN-ACK, client ACK, then data flows; costs one round trip before any data" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle" font-size="7" fill="#0f6e6e">client</text>
  <text x="300" y="14" text-anchor="middle" font-size="7" fill="#0f6e6e">server</text>
  <line x1="60" y1="18" x2="60" y2="98" stroke="#bbb"/><line x1="300" y1="18" x2="300" y2="98" stroke="#bbb"/>
  <path d="M62 28 L298 40" stroke="#1a1a1a" marker-end="url(#t1)"/><text x="180" y="31" text-anchor="middle" font-size="6">SYN</text>
  <path d="M298 50 L62 62" stroke="#1a1a1a" marker-end="url(#t1)"/><text x="180" y="53" text-anchor="middle" font-size="6">SYN-ACK</text>
  <path d="M62 72 L298 84" stroke="#1a1a1a" marker-end="url(#t1)"/><text x="180" y="75" text-anchor="middle" font-size="6">ACK + first data</text>
  <text x="332" y="46" text-anchor="end" font-size="5.4" fill="#777">1 RTT</text>
  <defs><marker id="t1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- That handshake costs **one full round trip before a single byte of data**. On a 1 ms LAN it's nothing; across regions (say 80 ms each way) it's 80 ms of dead time per new connection — and TLS adds more (Module 3). This single fact is why **connection reuse** (keep-alive, pooling) is the highest-leverage latency win there is (Module 5).
- **Teardown** is a `FIN`/`ACK` in each direction. The side that closes first sits in **`TIME_WAIT`** for a couple of minutes, holding the port so late stray packets can't corrupt a new connection on the same tuple.

:::warn
A client that opens and closes a fresh TCP connection per request piles up thousands of sockets in **`TIME_WAIT`** and can exhaust its **ephemeral ports** — new connections then fail with "cannot assign requested address" while the box looks idle. You'll see it as a client-side ceiling that no amount of server capacity fixes. The fix is not tuning `TIME_WAIT` away (it's protecting you) — it's **reusing connections** via keep-alive and a bounded pool.
:::
