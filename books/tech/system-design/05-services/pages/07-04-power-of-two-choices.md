## The Power of Two Choices

- At massive scale, "Least Connections" stops working. A load balancer with 10,000 instances cannot loop through all 10,000 to find the absolute least-loaded instance on every request. It takes too long
- Furthermore, in a distributed system, you might have multiple load balancers all making independent decisions based on stale data. If Instance A suddenly reports zero connections, every load balancer simultaneously routes all new traffic to Instance A, instantly killing it (the "Herding" problem)
- The solution is the Power of Two Choices (P2C)

<svg viewBox="0 0 460 140" role="img" aria-label="Power of Two Choices. The balancer picks two instances at random, checks their load, and routes to the less loaded one." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="73" text-anchor="middle">Load Balancer</text>
  
  <rect x="250" y="20" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="290" y="36" text-anchor="middle">Instance 1 (90%)</text>
  
  <rect x="250" y="55" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="290" y="71" text-anchor="middle">Instance 2 (30%)</text>
  
  <rect x="250" y="90" width="80" height="25" rx="3" fill="#fce4e2" stroke="#b8541a" stroke-width="2"/>
  <text x="290" y="106" text-anchor="middle">Instance 3 (80%)</text>
  
  <path d="M100 70 L240 67" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M100 70 L240 102" stroke="#b8541a" fill="none" stroke-width="2"/>
  
  <text x="160" y="55" text-anchor="middle" font-size="7">Random pick A</text>
  <text x="160" y="100" text-anchor="middle" font-size="7" fill="#b8541a">Random pick B</text>
</svg>

- P2C is simple: The load balancer picks two instances completely at random. It compares their current load. It sends the request to the less loaded of those two
- Math proves that P2C prevents the herding effect and performs almost exactly as well as a full search of all 10,000 instances, but in `O(1)` time instead of `O(N)`. This is why Envoy uses P2C as its default algorithm
