## What "microservice" actually means

- A microservice is a process that can be deployed independently, owns its own data, and communicates with other services over a network. The "micro" refers to the scope of responsibility, not the lines of code
- Independent deployment is the defining trait. If you must deploy the Inventory service and the Billing service at exactly the same time, you do not have microservices. You have a distributed monolith

<svg viewBox="0 0 460 140" role="img" aria-label="Microservices vs Distributed Monolith. Microservices show independent deploy cycles. Distributed monolith shows all services forced to deploy together." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Microservices</text>
  
  <rect x="40" y="45" width="60" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="70" y="60" text-anchor="middle">v1.2</text>
  
  <rect x="120" y="65" width="60" height="25" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="150" y="80" text-anchor="middle">v3.0</text>
  <text x="110" y="105" text-anchor="middle" font-size="7">Deploy at any time</text>

  <rect x="240" y="20" width="200" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="35" text-anchor="middle" font-weight="bold">Distributed Monolith</text>
  
  <rect x="260" y="55" width="60" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="290" y="70" text-anchor="middle">v2.1</text>
  
  <rect x="360" y="55" width="60" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="390" y="70" text-anchor="middle">v2.1</text>
  
  <path d="M290 85 L290 95 L390 95 L390 85" fill="none" stroke="#b8541a" stroke-width="2"/>
  <text x="340" y="105" text-anchor="middle" font-size="7" fill="#b8541a">Must deploy together</text>
</svg>

- Data ownership is the second requirement. A service must be the sole writer to its tables. If another service can write directly to its database, the services are coupled at the storage layer, breaking independent deployment
- The network hop is the price you pay for this independence. You trade in-memory reliability and speed for organizational scalability

### The failure

- The most common failure is building a distributed monolith. Teams split a system into network-connected pieces but fail to decouple the data or the release cycle
- You pay the latency and failure costs of distributed systems, but you get none of the agility. A single feature requires coordinating changes across four repositories, and deploying one service breaks the others
