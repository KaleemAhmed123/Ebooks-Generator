## API gateway

- An **API gateway** is the one address the outside world calls. It does four things every request needs and no service should repeat: terminate TLS, authenticate, rate limit, route. Behind it the services trust the request's identity, speak plain protocols to each other, and are invisible to the client; booklet 06's designs all start with this box

<svg viewBox="0 0 460 134" role="img" aria-label="The API gateway at the edge. Clients, browsers, mobile apps and partners, reach one address. Inside the gateway, four responsibilities in order: TLS termination; authentication, validating the token and attaching the caller's identity as a header; rate limiting per caller, Module 10; routing by path and header to the service, with the service registry, page 7, as its map. Behind it, orders, identity and catalog talk plain HTTP or gRPC and trust the identity header. Off to the side, a box of what does not belong in the gateway: business rules, data transformation, orchestration across services, marked with an orange cross: the gateway that holds them is a second monolith that every team must change to ship." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="30" width="60" height="50" rx="3" fill="#fff" stroke="#333"/><text x="36" y="46" text-anchor="middle">clients</text><text x="36" y="58" text-anchor="middle" font-size="7">browser, mobile,</text><text x="36" y="68" text-anchor="middle" font-size="7">partners</text>
  <rect x="92" y="10" width="150" height="90" rx="4" fill="#fff" stroke="#1d4e89" stroke-width="1.5"/><text x="167" y="24" text-anchor="middle">API gateway: one address</text>
  <g font-size="7">
    <rect x="100" y="30" width="134" height="14" rx="2" fill="#e6f2ff" stroke="#333"/><text x="167" y="40" text-anchor="middle">1  TLS termination</text>
    <rect x="100" y="47" width="134" height="14" rx="2" fill="#e6f2ff" stroke="#333"/><text x="167" y="57" text-anchor="middle">2  authenticate → identity header</text>
    <rect x="100" y="64" width="134" height="14" rx="2" fill="#e6f2ff" stroke="#333"/><text x="167" y="74" text-anchor="middle">3  rate limit per caller (Module 10)</text>
    <rect x="100" y="81" width="134" height="14" rx="2" fill="#e6f2ff" stroke="#333"/><text x="167" y="91" text-anchor="middle">4  route by path / header (page 7)</text>
  </g>
  <line x1="66" y1="55" x2="92" y2="55" stroke="#333" marker-end="url(#d)"/><text x="79" y="50" text-anchor="middle" font-size="7">https</text>
  <rect x="270" y="10" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="305" y="24" text-anchor="middle" font-size="7.5">orders</text>
  <rect x="270" y="44" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="305" y="58" text-anchor="middle" font-size="7.5">identity</text>
  <rect x="270" y="78" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="305" y="92" text-anchor="middle" font-size="7.5">catalog</text>
  <line x1="242" y1="40" x2="270" y2="21" stroke="#333" marker-end="url(#d)"/><line x1="242" y1="55" x2="270" y2="55" stroke="#333" marker-end="url(#d)"/><line x1="242" y1="70" x2="270" y2="89" stroke="#333" marker-end="url(#d)"/>
  <text x="305" y="114" text-anchor="middle" font-size="7">plain HTTP / gRPC inside; trust the identity header</text>
  <rect x="362" y="20" width="92" height="70" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="408" y="34" text-anchor="middle" font-size="7.5" fill="#bf4c28">✕ not here</text><text x="408" y="48" text-anchor="middle" font-size="7" fill="#bf4c28">business rules</text><text x="408" y="59" text-anchor="middle" font-size="7" fill="#bf4c28">data transformation</text><text x="408" y="70" text-anchor="middle" font-size="7" fill="#bf4c28">orchestration</text><text x="408" y="82" text-anchor="middle" font-size="7" fill="#bf4c28">(that is a BFF, page 6)</text>
  <text x="6" y="128" font-size="7">the gateway knows every service's address and nothing about any service's domain; a change to a domain rule never touches it</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Each of the four is a cross-cutting concern with one correct implementation: TLS once, so certificates live in one place; authentication once, so a service never sees an unauthenticated request and does not carry a token library; rate limiting once, where the caller is known (Module 10); routing once, from a registry (page 7), so services move without clients noticing. Services get simpler by exactly what the gateway takes
- What it is not: a place for logic. The moment it transforms a payload for one client or calls two services to build one answer, it has a domain, and every team that ships a feature must change it. That job exists and has a name, the BFF (page 6), owned by the client's team, not by the edge

### The failure

- Business logic in the gateway. It starts with one field mapping for the mobile app, then an orchestration for checkout, and a year later the gateway is a second monolith with every team in its deploy queue (Module 1, page 1), the one component that can never be down and is changed most. A gateway routes and protects; it does not know what an order is
