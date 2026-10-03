## HTTP/3 and QUIC

- **HTTP/3** is HTTP over **QUIC**, and QUIC runs over **UDP**. Moving off TCP is the whole point: QUIC implements its own **independent streams**, so a lost packet on one stream no longer blocks the others — the transport-level head-of-line blocking that limited HTTP/2 is gone. The application protocol barely changes; the transport underneath is replaced.
- QUIC folds several wins into one layer:
  - **Faster setup** — the transport and **TLS 1.3** handshakes are combined, so a new connection is ready in **1 RTT**, and a resumed one in **0 RTT** (first request rides along with the handshake).
  - **Encryption is not optional** — QUIC is always encrypted; there's no plaintext mode to misconfigure.
  - **Connection migration** — a connection is identified by a connection ID, not the IP/port 4-tuple, so it **survives a network change** (Wi-Fi → cellular) without reconnecting. Huge for mobile.
- By 2026 HTTP/3 is widely deployed across major CDNs and browsers; serving it is a config choice at your edge/CDN (Module 5), not an application rewrite.

:::warn
Two operational realities of running on UDP. **(1)** Some corporate firewalls and middleboxes **block or throttle UDP/443**, so clients must be able to **fall back to HTTP/2 over TCP** — always offer both, don't force HTTP/3. **(2)** QUIC's stack runs in **user space**, which historically cost more CPU per byte than the kernel's battle-tuned TCP; it's improved a lot, but on a very high-throughput service, measure before assuming HTTP/3 is strictly cheaper. The right default: enable HTTP/3 at the edge, keep HTTP/2 as the fallback.
:::
