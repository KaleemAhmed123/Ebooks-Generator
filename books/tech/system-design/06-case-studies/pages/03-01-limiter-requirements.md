## Rate Limiter: Requirements and numbers

- The prompt "design a rate limiter" tests whether you understand algorithms, distributed state, and how to protect a system from abuse. It is frequently asked at companies with public APIs (Stripe, Atlassian) or high burst traffic
- The core requirements are defining limits per user, per IP address, or per API key. The system must accurately accept or reject requests without slowing down legitimate traffic
- For numbers, the decision budget is microscopic. The limiter sits on the critical path for every single request. The decision must be made in less than 10 microseconds. It usually sits in the API Gateway (as covered in Booklet 05), before the request touches any business logic

<svg viewBox="0 0 600 120" role="img" aria-label="Rate limiter position. Client hits Gateway. Gateway hits Limiter. If allowed, hits Service." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <rect x="20" y="40" width="60" height="40" fill="#e2fcf3" stroke="#10b981" rx="4"/>
  <text x="50" y="65" text-anchor="middle" fill="#065f46">Client</text>
  
  <rect x="180" y="20" width="140" height="80" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <text x="250" y="45" text-anchor="middle" font-weight="bold" fill="#3730a3">API Gateway</text>
  
  <rect x="200" y="60" width="100" height="30" fill="#ffe4e6" stroke="#f43f5e" rx="4"/>
  <text x="250" y="80" text-anchor="middle" fill="#9f1239">Rate Limiter</text>
  
  <rect x="440" y="40" width="80" height="40" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
  <text x="480" y="65" text-anchor="middle" fill="#92400e">Service</text>
  
  <path d="M 85 60 L 175 60" stroke="#10b981" fill="none" marker-end="url(#arrow-green)"/>
  <path d="M 325 60 L 435 60" stroke="#6366f1" fill="none" marker-end="url(#arrow-blue)"/>
  <path d="M 250 95 L 250 120" stroke="#f43f5e" stroke-dasharray="4" fill="none"/>
  <text x="250" y="140" text-anchor="middle" fill="#9f1239">429 Too Many Requests</text>
  
  <defs>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is placing the rate limiter after the expensive work. If you put the rate limiter inside the application service, the request has already consumed load balancer connections, API gateway CPU, and internal network bandwidth
- Rate limiting is a shield. A shield belongs on the outside of the castle. It must sit at the edge, terminating bad requests before they consume internal resources

:::interview
**The defense-in-depth test**
If you place the limiter deep in the stack, the interviewer knows you have never dealt with a true volumetric attack. Attackers will exhaust your connection pools before your limiter even sees the request.
:::
