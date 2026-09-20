## High-level design and buy-in

- Draw the simplest possible architecture that satisfies the API. Do not add caches, message queues, or CDNs yet. A high-level design has a client, a load balancer, an API gateway, a service, and a database
- Trace one request path per functional requirement. Physically point to the diagram and walk the interviewer through it: "For the 'create post' requirement, the mobile client hits the load balancer, passes to the API gateway which checks auth, hits the Post Service, and writes to the primary database"
- Once the basic paths are drawn, ask the interviewer for buy-in: "This satisfies our core requirements. Should we dive into how this scales to our target throughput, or is there a specific area you want to focus on?"

<svg viewBox="0 0 600 200" role="img" aria-label="A simple high level design with Client, LB, Gateway, Service, and Database, tracing the write path." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <rect x="20" y="70" width="60" height="60" fill="#e2fcf3" stroke="#10b981" rx="4"/>
  <text x="50" y="105" text-anchor="middle" fill="#065f46">Client</text>
  
  <rect x="140" y="60" width="40" height="80" fill="#f4f4f5" stroke="#52525b" rx="20"/>
  <text x="160" y="105" text-anchor="middle" fill="#52525b" transform="rotate(-90 160 105)">LB</text>
  
  <rect x="240" y="70" width="80" height="60" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <text x="280" y="100" text-anchor="middle" fill="#3730a3">API</text>
  <text x="280" y="115" text-anchor="middle" fill="#3730a3">Gateway</text>
  
  <rect x="380" y="70" width="80" height="60" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
  <text x="420" y="100" text-anchor="middle" fill="#92400e">Post</text>
  <text x="420" y="115" text-anchor="middle" fill="#92400e">Service</text>
  
  <path d="M 520 70 Q 550 50 580 70 L 580 130 Q 550 150 520 130 Z" fill="#ffe4e6" stroke="#f43f5e"/>
  <path d="M 520 70 Q 550 90 580 70" fill="none" stroke="#f43f5e"/>
  <text x="550" y="110" text-anchor="middle" fill="#9f1239">Post DB</text>
  
  <path d="M 85 100 L 130 100" stroke="#10b981" fill="none" marker-end="url(#arrow-green)"/>
  <path d="M 185 100 L 230 100" stroke="#52525b" fill="none" marker-end="url(#arrow-gray)"/>
  <path d="M 325 100 L 370 100" stroke="#6366f1" fill="none" marker-end="url(#arrow-blue)"/>
  <path d="M 465 100 L 510 100" stroke="#f59e0b" fill="none" marker-end="url(#arrow-orange)"/>
  
  <text x="300" y="40" text-anchor="middle" font-weight="bold" fill="#18181b">Trace the functional path first</text>
  <path d="M 50 60 Q 250 20 420 60" stroke="#18181b" stroke-dasharray="4" fill="none" marker-end="url(#arrow-black)"/>
  
  <defs>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
    <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#52525b"/></marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1"/></marker>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/></marker>
    <marker id="arrow-black" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#18181b"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is drawing fifteen boxes on the board—adding Kafka, Redis, CDN, and Elasticsearch immediately—without ever tracing a request end to end
- If you build a massive complex architecture before proving the simple one works, you have no baseline. You must start simple and add complexity only when the scaling numbers demand it

:::interview
**The buy-in test**
Good candidates check in with their stakeholders. Asking the interviewer where they want to focus proves you view them as a collaborative partner, not an adversary.
:::
