## When the limiter store is down

- A rate limiter requires an external dependency (like Redis). Dependencies fail. When the Redis cluster holding your counters goes down or a network partition isolates it, your gateways cannot check the limits
- You have two choices: **fail-closed** or **fail-open**. Fail-closed means rejecting all traffic if the limiter cannot be reached. This turns a rate-limiter outage into a total system outage. For almost all public APIs, this is unacceptable
- The correct choice is usually **fail-open**. If the gateway cannot reach Redis, it allows the request through to the business logic. It is better to temporarily risk backend overload than to proactively block all paying customers
- Advanced systems use a local fallback. If Redis is unreachable, the gateway falls back to an in-memory token bucket. It will not be perfectly accurate across the cluster, but it protects the backend from severe spikes until Redis returns

<svg viewBox="0 0 600 200" role="img" aria-label="Fail-open architecture when Redis is down." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <rect x="50" y="80" width="120" height="40" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <text x="110" y="105" text-anchor="middle" font-weight="bold" fill="#3730a3">API Gateway</text>
  
  <rect x="250" y="20" width="100" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-dasharray="4" rx="4"/>
  <text x="300" y="45" text-anchor="middle" fill="#92400e" font-weight="bold">Redis</text>
  <text x="300" y="65" text-anchor="middle" fill="#92400e">(Down)</text>
  
  <rect x="420" y="80" width="120" height="40" fill="#e2fcf3" stroke="#10b981" rx="4"/>
  <text x="480" y="105" text-anchor="middle" fill="#065f46" font-weight="bold">Backend Services</text>
  
  <path d="M 140 80 Q 180 50 240 50" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrow-red)"/>
  <line x1="180" y1="45" x2="200" y2="75" stroke="#f43f5e" stroke-width="2"/>
  <line x1="180" y1="75" x2="200" y2="45" stroke="#f43f5e" stroke-width="2"/>
  <text x="170" y="30" fill="#9f1239" font-weight="bold">Timeout</text>
  
  <path d="M 170 100 L 410 100" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow-green)"/>
  <text x="290" y="125" text-anchor="middle" fill="#065f46" font-weight="bold">Fail-Open: Traffic allowed through</text>
  
  <defs>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/></marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is building a rigid dependency. If your rate limiter is required for every request, and your rate limiter dies, you have engineered a self-inflicted outage
- Infrastructure fails. You must explicitly state what the system does when the network drops a packet to the Redis cluster

:::interview
**The blast radius test**
An interviewer wants to see if you can contain failures. A good answer explicitly defends the choice between fail-open (prioritising availability) and fail-closed (prioritising backend protection).
:::
