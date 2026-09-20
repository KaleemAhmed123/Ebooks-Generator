## Service discovery

- In a cloud environment, instances come and go continuously due to auto-scaling and failures. A service cannot hardcode the IP addresses of its dependencies
- Service discovery solves this. A registry (like Consul or etcd) keeps a live directory of which instances are currently running for each service. When Service A wants to call Service B, it asks the registry, "Where is Service B right now?"

<svg viewBox="0 0 460 140" role="img" aria-label="Service Discovery. Service A asks the Registry for Service B. Registry returns IPs. Service A calls Service B." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="200" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-width="2"/>
  <text x="240" y="28" text-anchor="middle" font-weight="bold">Registry</text>
  
  <rect x="50" y="80" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="98" text-anchor="middle">Service A</text>
  
  <rect x="350" y="50" width="60" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="64" text-anchor="middle">B (10.0.1.4)</text>
  
  <rect x="350" y="80" width="60" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="94" text-anchor="middle">B (10.0.1.5)</text>
  
  <rect x="350" y="110" width="60" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="124" text-anchor="middle">B (10.0.1.6)</text>
  
  <path d="M110 80 L195 40" stroke="#1d4e89" fill="none" stroke-width="1"/>
  <path d="M195 40 l-6 0 v5 z" fill="#1d4e89" transform="rotate(-25 195 40)"/>
  <text x="140" y="55" text-anchor="middle" font-size="7">1. "Where is B?"</text>
  
  <path d="M205 35 L120 75" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2"/>
  <path d="M120 75 l6 0 v-5 z" fill="#1a1a1a" transform="rotate(-25 120 75)"/>
  <text x="160" y="75" text-anchor="middle" font-size="7">2. "10.0.1.4, .5, .6"</text>
  
  <path d="M130 95 L340 95" stroke="#b8541a" fill="none" stroke-width="2"/>
  <path d="M340 95 l-6 -3 v6 z" fill="#b8541a"/>
  <text x="240" y="90" text-anchor="middle">3. Call instance directly</text>
</svg>

- In Kubernetes, DNS acts as the service discovery mechanism. A service named `billing` gets a DNS record like `billing.default.svc.cluster.local`. This abstracts away the complexity of a dedicated registry

### The failure

- The most common failure is a stale registry. If an instance of Service B crashes, but the registry still returns its IP for 30 seconds, Service A will send traffic to a dead IP and fail
- Registries solve this with short-lived TTLs, active health checks, or persistent connections (like gRPC) that detect socket closures instantly. Your client must be prepared to handle connection failures and retry on a different instance
