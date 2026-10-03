## UDP, and when you want it

- **UDP** is the opposite trade from TCP: send a **datagram** and forget it. No handshake, no ordering, no acknowledgements, no retransmission, no congestion control of its own. You give up reliability and get three things in return: **no setup round trip, no head-of-line blocking** (next page), and **full control** over what reliability you add.
- That trade is right in three places:
  - **Request/response that fits in one packet** — classic **DNS**: one small question, one small answer. A handshake would double the cost for nothing.
  - **Real-time media and games** — voice, video, position updates. A packet that arrives late is *useless*; you'd rather drop it and show the next frame than wait for a retransmit. TCP's "deliver everything in order" is actively wrong here.
  - **A foundation to build on** — **QUIC** runs over UDP and rebuilds reliability, ordering, and encryption in *user space*, where it can do them better than TCP's decades-old kernel implementation. That's the basis of HTTP/3 (Module 4).

- The mental model: **TCP is a phone call** (connect, converse in order, hang up); **UDP is postcards** (drop them in the box, some may not arrive, order not guaranteed, no setup). Neither is "better" — you pick by whether a late or lost message is worth waiting for.

:::note
"UDP is unreliable" doesn't mean "UDP is bad." It means reliability is *your* decision, not the protocol's. QUIC proves the point: starting from bare UDP, it delivers a faster, more reliable, fully encrypted transport than TCP — precisely because it wasn't locked into TCP's fixed behaviour in the kernel.
:::
