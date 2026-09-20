## What a load balancer does

- A single instance of a service can only handle a certain number of concurrent connections. To scale horizontally, you add more instances. The client now needs to know which instance to talk to
- Instead of giving the client a list of 50 IP addresses, you give the client one address. That address belongs to a Load Balancer
- A Load Balancer is a specialized piece of infrastructure (like AWS ALB or an NGINX server) that acts as a traffic cop. It accepts incoming requests and forwards them to a pool of backend instances

<svg viewBox="0 0 460 140" role="img" aria-label="Load balancer distributing traffic. Clients hit one LB, which spreads requests across three instances." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="40" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="54" text-anchor="middle">Client</text>
  
  <rect x="20" y="70" width="40" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="84" text-anchor="middle">Client</text>
  
  <path d="M60 50 L110 65" stroke="#1a1a1a" fill="none"/>
  <path d="M60 80 L110 65" stroke="#1a1a1a" fill="none"/>
  <path d="M110 65 l-5 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="120" y="50" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="68" text-anchor="middle" font-weight="bold">Load Balancer</text>
  
  <path d="M200 65 L260 30" stroke="#1a1a1a" fill="none"/>
  <path d="M260 30 l-5 3 l2 5 z" fill="#1a1a1a"/>
  
  <path d="M200 65 L260 65" stroke="#1a1a1a" fill="none"/>
  <path d="M260 65 l-5 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M200 65 L260 100" stroke="#1a1a1a" fill="none"/>
  <path d="M260 100 l-3 -5 l-5 2 z" fill="#1a1a1a"/>
  
  <rect x="270" y="15" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="310" y="33" text-anchor="middle">Instance A</text>
  
  <rect x="270" y="50" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="310" y="68" text-anchor="middle">Instance B</text>
  
  <rect x="270" y="85" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="310" y="103" text-anchor="middle">Instance C</text>
</svg>

- The load balancer does three things simultaneously:
  1. **Health checking:** It actively monitors the instances and removes dead ones from the pool
  2. **Distribution:** It uses an algorithm to evenly spread the load across the healthy instances
  3. **Failover:** If an instance dies mid-request, it can sometimes transparently retry on another instance

### The failure

- The failure is making the load balancer a single point of failure (SPOF). If you route all traffic through one NGINX box, and that box's power supply fails, your entire fleet of 50 healthy backend instances is unreachable
- Load balancers themselves must be highly available. This is usually achieved by deploying two load balancers in an Active-Passive pair, using a "floating IP" or Anycast routing that instantly moves to the healthy balancer if the primary dies. Managed cloud balancers (like AWS ALB) handle this invisibly
