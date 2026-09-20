## Sticky sessions

- In a stateless system, any request can go to any instance. But some legacy architectures store session state (like a shopping cart or user login) directly in the memory of the specific backend instance that served the first request
- If the load balancer sends the user's second request to a different instance, the user appears logged out, because that new instance does not have their session in memory
- **Sticky Sessions** (or Session Affinity) is a load balancer feature that forces all requests from a specific user to always route to the exact same backend instance. It usually works by injecting a cookie into the user's browser, which the balancer reads on subsequent requests

<svg viewBox="0 0 460 140" role="img" aria-label="Sticky sessions. User A's requests all route to Instance 1. User B's requests all route to Instance 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="40" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="44" text-anchor="middle">User A</text>
  
  <rect x="20" y="90" width="40" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="104" text-anchor="middle">User B</text>
  
  <rect x="120" y="55" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="73" text-anchor="middle">Load Balancer</text>
  
  <rect x="270" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="310" y="44" text-anchor="middle">Instance 1</text>
  
  <rect x="270" y="90" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="310" y="104" text-anchor="middle">Instance 2</text>
  
  <path d="M60 40 L120 60" stroke="#1a1a1a" fill="none"/>
  <path d="M60 100 L120 80" stroke="#1a1a1a" fill="none"/>
  
  <path d="M200 60 L270 40" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M265 43 l5 -3 l-1 5 z" fill="#1a1a1a"/>
  
  <path d="M200 80 L270 100" stroke="#1a1a1a" fill="none" stroke-width="2" stroke-dasharray="2"/>
  <path d="M265 97 l5 3 l-3 -5 z" fill="#1a1a1a"/>
</svg>

### The failure

- The failure is deploying new code to the instances. When Instance 1 is taken offline for an update, User A's session is permanently deleted from memory. Even if the balancer routes User A to Instance 2, they will be logged out and their cart will be empty
- Sticky sessions make load balancing uneven (if User A is a heavy scraper, Instance 1 melts while Instance 2 sits idle). You should avoid sticky sessions entirely. State belongs in a database or a shared Redis cluster, not in the instance's memory
