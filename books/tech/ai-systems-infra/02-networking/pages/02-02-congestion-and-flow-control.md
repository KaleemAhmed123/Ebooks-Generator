## Congestion and flow control

- TCP runs **two** independent brakes, often confused:
  - **Flow control** protects the *receiver*. Each side advertises a **receive window** — "I have this much buffer free." The sender never sends more unacknowledged data than that window, so a fast sender can't drown a slow reader.
  - **Congestion control** protects the *network*. The sender keeps a **congestion window** (`cwnd`) it grows over time and shrinks on packet loss, so many senders sharing a link don't collectively melt it.
- Congestion control starts cautious: **slow start** ramps `cwnd` up (roughly doubling each round trip) until loss, then settles into a steady probe-and-back-off (CUBIC is the common default; **BBR** models bandwidth and latency instead of waiting for loss). The consequence for you: a **brand-new connection is slow** — it hasn't ramped yet. Short-lived connections never reach full throughput, which (again) is why reuse matters.

:::note
**Backpressure starts here.** When the network or receiver can't keep up, the sender's socket buffer fills; the kernel then makes `write` block, or return `EAGAIN` on a non-blocking socket (Booklet 1). That signal — "slow down, I'm full" — is backpressure at the transport layer. Distributed systems rebuild the same idea at the application layer (bounded queues, load shedding) in Booklet 3; it's the same principle one level up.
:::

- **Bufferbloat** is the trap: oversized buffers in the path hide loss, so congestion control keeps pushing and latency balloons even though throughput looks fine. It's why a saturated uplink makes *everything* laggy, not just the big transfer. BBR and modern queue management exist to fight exactly this.
