## The strangler fig

- When migrating from a legacy monolith to microservices, the worst strategy is the "Big Bang" rewrite. Building a replacement in secret for two years and switching over on a Sunday night almost always fails
- The Strangler Fig pattern (named by Martin Fowler after a vine that slowly wraps and replaces a tree) is the safe alternative. You put a routing façade (a reverse proxy) in front of the legacy system

<svg viewBox="0 0 460 140" role="img" aria-label="Strangler Fig pattern. Proxy routes /billing to new microservice, and everything else to the legacy monolith." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="60" width="40" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="74" text-anchor="middle">Client</text>
  
  <rect x="100" y="20" width="60" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="74" text-anchor="middle" font-weight="bold">Façade</text>
  
  <path d="M60 70 L100 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M100 70 l-5 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="250" y="10" width="120" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="310" y="34" text-anchor="middle" font-weight="bold">New Service</text>
  
  <rect x="250" y="70" width="120" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="310" y="104" text-anchor="middle">Legacy Monolith</text>
  
  <path d="M160 50 L250 30" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <path d="M250 30 l-5 -1 v5 z" fill="#1d4e89" transform="rotate(-15 250 30)"/>
  <text x="210" y="30" text-anchor="middle" font-size="7">if /billing</text>
  
  <path d="M160 90 L250 100" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M250 100 l-5 -4 v6 z" fill="#1a1a1a" transform="rotate(10 250 100)"/>
  <text x="210" y="110" text-anchor="middle" font-size="7">else (default)</text>
</svg>

- You build one small piece (e.g., `/billing`) in the new system. You configure the façade to route `/billing` requests to the new service, and everything else falls through to the legacy system
- You move slices one by one. The new system slowly grows, the old system shrinks, until the old system is completely strangled and can be deleted

### The failure

- The failure mode is the permanent façade. The team migrates the easy 80% of the monolith and stops. The project loses funding, and the legacy system is never decommissioned
- You are now maintaining both systems indefinitely, plus the routing logic in the façade. A strangler fig migration must be funded all the way to deletion
