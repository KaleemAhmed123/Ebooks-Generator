## Scaling past two people

- Peer to peer works beautifully for two. It falls apart quickly beyond that

| Topology | Connections per peer | Upload per peer | Fits |
|---|---|---|---|
| **Mesh** | n-1 | n-1 streams | 2 to 4 people |
| **SFU** | 1 up, n-1 down | 1 stream | 4 to 50 people |
| **MCU** | 1 up, 1 down | 1 stream | very weak clients |

### Why mesh stops working

- In a five person call each browser uploads its video four times, which is roughly 6 megabits up from a home connection
- Most home uplinks cannot do it, and laptops start encoding four separate streams

### SFU

- A **Selective Forwarding Unit** is a server each peer sends one stream to, which then forwards it to everyone else
- It does not decode or re-encode, so it stays cheap, and it can drop quality per receiver on a weak connection
- The media now goes through a server, which is the trade for making group calls possible
- `mediasoup`, `LiveKit` and `Janus` are the usual choices

### The rest of the reality

- **Recording** requires an SFU or a dedicated recorder. There is no server-side copy in a peer to peer call
- **Glare** is both sides sending an offer at once. Designate one peer as polite and have it back off
- **Reconnection** needs ICE restart, not a new connection, or the call visibly drops
- A `RTCDataChannel` carries arbitrary data over the same connection, which is how cursors and game state avoid a server round trip
