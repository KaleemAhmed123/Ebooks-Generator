## Service discovery and configuration

- The second most common use case for ZooKeeper is **Service Discovery**. When you have 50 microservices spinning up and down randomly on different IP addresses, how does the API Gateway know where to send traffic?

<svg viewBox="0 0 460 140" role="img" aria-label="Service Discovery with ZooKeeper. Workers boot up and create ephemeral nodes with their IP. The API Gateway watches the folder and routes traffic only to alive IPs." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="74" text-anchor="middle" font-weight="bold">API Gateway</text>
  
  <rect x="180" y="20" width="100" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="35" text-anchor="middle" font-weight="bold">ZooKeeper</text>
  
  <text x="230" y="55" text-anchor="middle" font-family="monospace" font-size="7">/workers</text>
  <text x="230" y="70" text-anchor="middle" font-family="monospace" font-size="7">├─ node1 (10.0.0.1)</text>
  <text x="230" y="85" text-anchor="middle" font-family="monospace" font-size="7">├─ node2 (10.0.0.2)</text>
  <text x="230" y="100" text-anchor="middle" font-family="monospace" font-size="7" fill="#b8541a">└─ node3 (deleted!)</text>
  
  <rect x="360" y="20" width="60" height="30" rx="3" fill="#fff" stroke="#1a1a1a"/>
  <text x="390" y="39" text-anchor="middle">Worker 1</text>
  <rect x="360" y="60" width="60" height="30" rx="3" fill="#fff" stroke="#1a1a1a"/>
  <text x="390" y="79" text-anchor="middle">Worker 2</text>
  <rect x="360" y="100" width="60" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="390" y="119" text-anchor="middle">Worker 3</text>
  
  <path d="M100 60 L180 50" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M180 50 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-5 180 50)"/>
  <text x="140" y="45" font-size="6">Watch /workers</text>
  
  <path d="M360 40 L280 60" stroke="#1a1a1a" fill="none"/><path d="M280 60 l6 -1 v-5 z" fill="#1a1a1a" transform="rotate(-15 280 60)"/>
  <path d="M360 80 L280 80" stroke="#1a1a1a" fill="none"/><path d="M280 80 l6 -3 v6 z" fill="#1a1a1a"/>
  <text x="320" y="65" font-size="6">Create</text>
</svg>

- When Worker 1 boots up, it creates an ephemeral node at `/workers/node1` containing its IP address. The API Gateway places a Watch on the `/workers` directory. Whenever a node boots up or crashes, ZooKeeper instantly notifies the API Gateway, which updates its internal routing table
- You can use the exact same mechanism for **Configuration Management**. You store your database passwords or feature flags in ZooKeeper, and place a Watch on them. When you change the flag, ZooKeeper pushes the update to all 50 microservices instantly, without requiring a restart

### The failure

- Hardcoding IPs in config files. The alternative to service discovery is maintaining a static list of IP addresses in an `.env` file. When an AWS EC2 instance dies and auto-scales a new one with a new IP, you have to manually SSH into the load balancer and update the config file while users get 502 errors
