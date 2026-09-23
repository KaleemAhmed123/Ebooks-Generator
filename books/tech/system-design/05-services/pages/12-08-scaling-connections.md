## Scaling persistent connections

- A held connection is state living in one process. Any message for that client has to reach the exact node holding its socket, which is why a socket tier always comes with a backplane behind it

<svg viewBox="0 0 460 112" role="img" aria-label="A socket tier with a publish-subscribe backplane. Clients connect to one of three socket nodes, each holding its own set of sockets. Behind them a publish-subscribe backplane uses a channel per user rather than one global channel, so a message is delivered only to the node holding that client's socket. Redis publish-subscribe is at-most-once: a message for a disconnected subscriber is lost, so anything that must survive a reconnect needs Streams. An orange cross marks a deploy dropping two million sockets at once, after which every client reconnects immediately; without jitter the tier cannot come back up." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="13" font-size="7.5">the connection is state — the backplane exists to reach the node that holds it</text>
  <rect x="4" y="42" width="60" height="36" rx="3" fill="#fff" stroke="#1d4e89"/><text x="34" y="64" text-anchor="middle" font-size="7">clients</text>
  <rect x="100" y="22" width="76" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="36" text-anchor="middle" font-size="7">socket 1</text>
  <rect x="100" y="50" width="76" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="64" text-anchor="middle" font-size="7">socket 2</text>
  <rect x="100" y="78" width="76" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="92" text-anchor="middle" font-size="7">socket 3</text>
  <line x1="64" y1="50" x2="98" y2="34" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="64" y1="60" x2="98" y2="60" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="64" y1="70" x2="98" y2="86" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="230" y="42" width="120" height="36" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="290" y="56" text-anchor="middle" font-size="7">pub/sub backplane</text><text x="290" y="68" text-anchor="middle" font-size="6">a channel per user</text>
  <line x1="176" y1="34" x2="228" y2="50" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="176" y1="60" x2="228" y2="60" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="176" y1="88" x2="228" y2="72" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="360" y="42" font-size="6" fill="#666">Redis Pub/Sub is</text>
  <text x="360" y="52" font-size="6" fill="#666">at-most-once: a</text>
  <text x="360" y="62" font-size="6" fill="#666">disconnected</text>
  <text x="360" y="72" font-size="6" fill="#666">subscriber's message</text>
  <text x="360" y="82" font-size="6" fill="#666">is gone — use Streams</text>
  <text x="4" y="108" font-size="7.5" fill="#bf4c28">✕ a deploy drops 2 M sockets and every client reconnects at once — without jitter the tier cannot come back</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The channel granularity is the design. A channel per user means a message reaches exactly the node that needs it; a single global channel means every node receives every message and discards what is not theirs, so internal traffic grows with nodes times messages rather than with messages
- Redis Pub/Sub is **at-most-once** — its own documentation is blunt that a message a subscriber could not handle "is forever lost" — which is correct for presence and live cursors and wrong for anything the user would notice missing. Streams give at-least-once for those. Sharded Pub/Sub, since Redis 7.0, keeps a channel's traffic on one shard instead of flooding the cluster bus

### The failure

- The reconnect storm, and a deploy causes it deliberately. Every socket on a node closes at once, every client notices immediately, and every client reconnects — so the remaining nodes take the full reconnect load while also being replaced themselves
- Reconnection is more expensive than the steady state it restores: a TLS handshake, an authentication, a subscription, and usually a backlog fetch. Jittered backoff on the client is what makes the tier recoverable at all, and it must be in the client, shipped long before the day it is needed
