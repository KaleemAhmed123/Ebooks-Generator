## Anycast

- One address, announced to the internet from many locations at once. Routers send each packet to whichever announcement is nearest by their own metric, so failover is a withdrawn route rather than an expiring cache — which is what makes it faster than DNS (page 5)

<svg viewBox="0 0 460 106" role="img" aria-label="Anycast. Three sites — Tokyo, Frankfurt and Virginia — all announce the same address, 203.0.113.9, over BGP. Users reach whichever site the internet's routing considers nearest, so a user in Asia lands in Tokyo and a user in Europe lands in Frankfurt. Withdrawing a site's announcement moves its traffic within seconds, with no cache to wait for. An orange cross marks the cost: routing can change mid-connection, and a long-lived TCP session re-routed to a different site arrives at a machine with no knowledge of it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">one address announced from many places; the network picks, not you</text>
  <rect x="4" y="28" width="60" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="34" y="42" text-anchor="middle" font-size="7">user · Asia</text>
  <rect x="4" y="62" width="60" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="34" y="76" text-anchor="middle" font-size="7">user · EU</text>
  <rect x="120" y="44" width="96" height="22" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="168" y="59" text-anchor="middle" font-size="7">203.0.113.9</text>
  <line x1="64" y1="40" x2="118" y2="50" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="64" y1="72" x2="118" y2="60" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="280" y="20" width="96" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="328" y="34" text-anchor="middle" font-size="7">Tokyo</text>
  <rect x="280" y="45" width="96" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="328" y="59" text-anchor="middle" font-size="7">Frankfurt</text>
  <rect x="280" y="70" width="96" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="328" y="84" text-anchor="middle" font-size="7">Virginia</text>
  <line x1="216" y1="50" x2="278" y2="30" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="216" y1="55" x2="278" y2="55" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="216" y1="60" x2="278" y2="80" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="384" y="37" font-size="6" fill="#666">all three</text>
  <text x="384" y="47" font-size="6" fill="#666">announce the</text>
  <text x="384" y="57" font-size="6" fill="#666">same address</text>
  <text x="384" y="72" font-size="6" fill="#1d4e89">withdraw one →</text>
  <text x="384" y="82" font-size="6" fill="#1d4e89">moved in seconds</text>
  <text x="4" y="102" font-size="7.5" fill="#bf4c28">✕ the route changes mid-session: packets arrive at a site that knows nothing about that connection</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- RFC 4786 is the operational guidance, and its caution is about duration rather than correctness: long-running flows have failure modes that short ones do not. DNS over UDP is the model use precisely because each exchange is one packet, so a route change between queries costs nothing
- That is why anycast fronts DNS resolvers and CDN edges comfortably and is a stronger commitment for long-lived TLS or WebSocket connections. It is usable there — large providers do it — but it requires the sites to be genuinely interchangeable, which is a property of the application, not of the routing

### The failure

- A route change during a session that carries state. The connection was established with one site, the path shifts for reasons entirely outside the operator's control — a peering change somewhere in between — and subsequent packets arrive at a different machine with no record of that TCP session, which resets it
- The failure is rare, unreproducible and looks like a client bug. It is also not fixable from inside the application, which is the real argument for keeping anycast on the short, stateless exchanges it suits and letting a regional address own anything long-lived
