## Server-Sent Events

*SSE*

One-way server-to-client streaming over ordinary HTTP, with automatic reconnect
and event IDs built in.

Streaming model tokens to a browser is the ideal case: the client sends one
request and then only reads.

Reach for it before WebSocket whenever the client does not need to push. It
travels through ordinary HTTP infrastructure without the upgrade negotiation or
the sticky-session question.

**Reconnection and `Last-Event-ID` are part of the protocol**, so the replay
problem you would otherwise design by hand is already specified.

## SFU vs Mesh

Mesh means every participant sends to every other. Fine for three people,
impossible at ten. A selective forwarding unit receives one stream per peer and
forwards it on.

A ten-person mesh call means each client uploads nine streams. On home broadband
that is unusable — and it is the upload that fails, which is the direction
nobody tests.

| Topology | Streams | Cost lands on |
|---|---|---|
| Mesh | n × (n−1) — ten people is 90 | every client's upload |
| SFU | each uploads once | server bandwidth |
| MCU | server mixes into one | server CPU, heavily |

**Past about four participants, mesh stops being viable.** The threshold is
lower than most people expect, because it is bounded by the worst upload link in
the call rather than the average.
