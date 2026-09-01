## SDP, ICE, STUN and TURN

### SDP

- **Session Description Protocol**, a text blob describing what a peer can do: codecs, resolutions, encryption keys, network candidates
- The **offer** lists what one peer supports. The **answer** picks what both will actually use
- Your server never parses it. It is opaque, and it moves from one peer to the other unchanged

### ICE

- **Interactive Connectivity Establishment**, the process of finding a path that actually works
- Each peer gathers **candidates**, which are possible addresses it could be reached on

| Candidate | Is |
|---|---|
| host | the machine's own local address |
| srflx | its public address as seen through the router, discovered by STUN |
| relay | an address on a TURN server, used when nothing else connects |

- Candidates arrive over time, which is why they are sent separately as **trickle ICE** rather than waiting for a complete list
- Both sides try every combination and keep the first that works

### STUN and TURN

- **STUN** answers one question, what a peer address looks like from outside. It is tiny, stateless and effectively free
- **TURN** relays the entire media stream when no direct path exists, which happens on strict corporate networks and some mobile carriers
- **TURN is where the money goes.** It carries every byte of the call, and it is billed by the gigabyte
- Around 15 to 20 percent of connections need it, so it cannot be treated as an edge case
- `coturn` is the standard self-hosted server. Twilio and Cloudflare sell hosted equivalents
- TURN credentials must be short-lived and generated per session, or anyone who finds them gets free bandwidth
