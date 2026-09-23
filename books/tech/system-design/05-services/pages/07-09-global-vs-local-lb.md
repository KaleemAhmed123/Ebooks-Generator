## Global and local balancing

- Two layers with different jobs. The global layer picks a region before a connection exists; the regional balancer picks an instance once it does. They use different mechanisms and fail independently

<svg viewBox="0 0 460 112" role="img" aria-label="Two layers of balancing. A user reaches a global layer, DNS or anycast, which picks a region. Each region — New York, London and Tokyo — has its own local balancer in front of its own instances, and that local balancer picks the instance. The two layers are two failure domains: the global layer chooses where, the regional balancer chooses which. An orange cross marks relying on DNS alone for regional failover, because a 300-second time to live means five minutes of resolvers still handing out the dead region's address." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="4" y="42" width="44" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="26" y="56" text-anchor="middle" font-size="7.5">user</text>
  <rect x="76" y="36" width="90" height="32" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="121" y="49" text-anchor="middle" font-size="7.5">DNS or anycast</text><text x="121" y="60" text-anchor="middle" font-size="6.5">picks the region</text>
  <line x1="48" y1="52" x2="74" y2="52" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="210" y="12" width="106" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="263" y="25" text-anchor="middle" font-size="7">New York · local LB</text>
  <rect x="210" y="42" width="106" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="263" y="55" text-anchor="middle" font-size="7">London · local LB</text>
  <rect x="210" y="72" width="106" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="263" y="85" text-anchor="middle" font-size="7">Tokyo · local LB</text>
  <line x1="166" y1="46" x2="208" y2="24" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="166" y1="52" x2="208" y2="52" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="166" y1="58" x2="208" y2="82" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="348" y="12" width="96" height="20" rx="3" fill="#f3f3f3" stroke="#666"/><text x="396" y="25" text-anchor="middle" font-size="7">instances</text>
  <rect x="348" y="42" width="96" height="20" rx="3" fill="#f3f3f3" stroke="#666"/><text x="396" y="55" text-anchor="middle" font-size="7">instances</text>
  <rect x="348" y="72" width="96" height="20" rx="3" fill="#f3f3f3" stroke="#666"/><text x="396" y="85" text-anchor="middle" font-size="7">instances</text>
  <line x1="316" y1="22" x2="346" y2="22" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="316" y1="52" x2="346" y2="52" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="316" y1="82" x2="346" y2="82" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="4" y="104" font-size="7.5" fill="#bf4c28">✕ failover by DNS alone: a 300 s TTL is five minutes of resolvers still handing out the dead region's address</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- **DNS** answers the name with the address of a healthy region. It is simple and works everywhere, and its weakness is that the answer is cached by resolvers the operator does not control, so withdrawing a region takes as long as the longest cache honours the record
- **Anycast** announces one address from many locations and lets internet routing pick. Failover is a routing change rather than a cache expiry, so it is fast. RFC 4786 names the cost: routing "ought to be stable for substantially longer than the expected transaction time", and long-lived flows have failure modes short ones do not — a path change mid-connection lands packets at a different site with no knowledge of that TCP session. That is why DNS over UDP is its model use, and why long TLS sessions on anycast need the sites to be equivalent

### The failure

- Treating a short TTL as a failover plan. Resolvers honour the record for its lifetime and some ignore short values entirely, so a dead region keeps receiving traffic for minutes after the change. DNS moves traffic on a schedule; it does not move it on an event, and regional failover is an event
