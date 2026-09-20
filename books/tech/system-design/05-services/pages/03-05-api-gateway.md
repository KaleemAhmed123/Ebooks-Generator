## API gateway

- An API Gateway sits between external clients and your internal microservices. It acts as the single point of entry, shielding the outside world from your internal routing topology
- The gateway handles cross-cutting concerns that you do not want to implement in every single service: TLS termination, authentication (validating JWTs), rate limiting, and routing (path-based or header-based)

<svg viewBox="0 0 460 140" role="img" aria-label="API Gateway. Clients talk to the Gateway. The Gateway handles TLS, Auth, Rate Limit, and Routing, then talks to internal services." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="60" width="40" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="74" text-anchor="middle">Client</text>
  
  <path d="M60 70 L110 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M110 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="120" y="20" width="140" height="100" rx="4" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="35" text-anchor="middle" font-weight="bold">API Gateway</text>
  <text x="190" y="55" text-anchor="middle">1. TLS Termination</text>
  <text x="190" y="70" text-anchor="middle">2. Auth Validation</text>
  <text x="190" y="85" text-anchor="middle">3. Rate Limiting</text>
  <text x="190" y="100" text-anchor="middle">4. Routing</text>
  
  <path d="M260 70 L310 40" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <path d="M310 40 l-5 1 v5 z" fill="#1d4e89" transform="rotate(-30 310 40)"/>
  
  <path d="M260 70 L310 100" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <path d="M310 100 l-5 -6 v5 z" fill="#1d4e89" transform="rotate(30 310 100)"/>
  
  <rect x="320" y="25" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="360" y="44" text-anchor="middle">Service A</text>
  
  <rect x="320" y="85" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="360" y="104" text-anchor="middle">Service B</text>
</svg>

- By centralizing these features, the individual services can be "dumb". They assume the request is authenticated by the time it reaches them, and they communicate internally over plain HTTP without TLS overhead

### The failure

- The failure mode is treating the API gateway as an integration layer and stuffing it with business logic. Developers start adding custom data transformation, orchestration, and business rules to the gateway
- The gateway becomes a second monolith. Because every team needs to modify the gateway to launch their features, it becomes a massive bottleneck for deployments. A gateway should route packets, not parse business rules
