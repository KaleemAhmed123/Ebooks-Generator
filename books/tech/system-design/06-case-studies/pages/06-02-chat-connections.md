## Stateful connections

- HTTP request-response cannot push. A chat client opens a **WebSocket**, a long-lived two-way TCP connection upgraded from HTTP, and keeps it open; the server writes to it whenever a message arrives. The server end of that socket is state, and the design has to know which server holds it

<svg viewBox="0 0 460 156" role="img" aria-label="Two clients, Bob and Alice, each holding a WebSocket to a gateway server; Bob on gateway 1, Alice on gateway 7. Gateways register user to gateway in a Redis connection registry. Bob's message goes gateway 1 to the stateless chat service, which persists it to the message store, looks up Alice in the registry, and forwards to gateway 7, which pushes it down Alice's socket. Numbers: 10 million open connections, about 100 000 per gateway, so about 100 gateways. An orange cross marks a reconnect that lands on gateway 3 without updating the registry, so messages keep going to gateway 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="44" height="24" rx="3" fill="#fff" stroke="#333"/><text x="28" y="35" text-anchor="middle">Bob</text>
  <rect x="6" y="96" width="44" height="24" rx="3" fill="#fff" stroke="#333"/><text x="28" y="111" text-anchor="middle">Alice</text>
  <rect x="86" y="14" width="76" height="36" rx="3" fill="#fff" stroke="#1d4e89"/><text x="124" y="28" text-anchor="middle">gateway 1</text><text x="124" y="40" text-anchor="middle" font-size="7.5">holds 100 000 sockets</text>
  <rect x="86" y="90" width="76" height="36" rx="3" fill="#fff" stroke="#1d4e89"/><text x="124" y="104" text-anchor="middle">gateway 7</text><text x="124" y="116" text-anchor="middle" font-size="7.5">stateful: the socket</text>
  <line x1="50" y1="32" x2="86" y2="32" stroke="#333" marker-end="url(#d)"/><text x="68" y="26" text-anchor="middle" font-size="7">ws</text>
  <line x1="86" y1="108" x2="50" y2="108" stroke="#1d4e89" marker-end="url(#b)"/><text x="68" y="102" text-anchor="middle" font-size="7">push</text>
  <rect x="200" y="50" width="88" height="40" rx="3" fill="#fff" stroke="#333"/><text x="244" y="65" text-anchor="middle">chat service</text><text x="244" y="77" text-anchor="middle" font-size="7.5">stateless, N copies</text><text x="244" y="87" text-anchor="middle" font-size="7.5">persist → route</text>
  <line x1="162" y1="32" x2="200" y2="60" stroke="#333" marker-end="url(#d)"/>
  <line x1="200" y1="82" x2="162" y2="104" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="330" y="14" width="120" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="390" y="27" text-anchor="middle">connection registry (Redis)</text><text x="390" y="38" text-anchor="middle" font-size="7.5">alice → gateway 7, TTL 60 s</text>
  <rect x="330" y="96" width="120" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="390" y="109" text-anchor="middle">message store</text><text x="390" y="120" text-anchor="middle" font-size="7.5">wide-column, page 3</text>
  <line x1="288" y1="62" x2="330" y2="36" stroke="#333" marker-end="url(#d)"/><text x="294" y="46" font-size="7">2 lookup</text>
  <line x1="288" y1="80" x2="330" y2="104" stroke="#333" marker-end="url(#d)"/><text x="294" y="102" font-size="7">1 write</text>
  <line x1="162" y1="22" x2="330" y2="22" stroke="#999" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="246" y="18" text-anchor="middle" font-size="7" fill="#666">on connect: SET bob → gateway 1</text>
  <text x="6" y="140" font-size="7.5">10 M connections ÷ 100 000 per gateway ≈ 100 gateways; a gateway restart drops 100 000 clients, who reconnect anywhere</text>
  <text x="6" y="151" font-size="7.5" fill="#bf4c28">✕ reconnect lands on gateway 3 and the registry still says 7: every push for Alice goes to a socket that no longer exists</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The split: **gateways** hold sockets and nothing else; the **chat service** holds logic and no sockets. A message from Bob is persisted first, then routed: look up each recipient's gateway in the registry and forward over an internal connection. Gateways scale by connection count, services by message rate, and the two numbers are different (page 1)
- The registry is user → gateway with a TTL refreshed by the gateway's heartbeat, so a dead gateway's entries expire rather than pointing at a ghost. A recipient with no entry is offline: the message waits in the store and goes out as a push notification (Module 5)
- A load balancer in front of the gateways is fine, because any gateway will do at connect time. What must not happen is a registry that lags the connection; the gateway writes its entry before it acknowledges the socket

### The failure

- The registry as an afterthought. A client reconnects after a tunnel, lands on a new gateway, and nothing updates the mapping. The service keeps forwarding to the old gateway, which drops the frames on a closed socket, and the user sees a conversation that stopped
