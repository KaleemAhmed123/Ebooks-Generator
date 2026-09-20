## Canary and rolling deployments

- Blue-green deployments require you to provision 200% of your production capacity, which is expensive. Canary and rolling deployments solve this
- **Rolling deployment:** You update your fleet one machine at a time. Kubernetes does this by default (shutting down 25% of old pods, booting 25% of new pods, waiting for health checks, repeating)
- **Canary deployment:** A strategy where you route a tiny fraction of real traffic (e.g., 1%) to a new version (the canary). You watch its metrics closely. If it crashes, only 1% of users are affected. If it succeeds, you widen the traffic split to 10%, then 50%, then 100%

<svg viewBox="0 0 460 140" role="img" aria-label="Canary deployment. Router sends 95% traffic to v1 (control) and 5% to v2 (canary). Metrics are compared." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle">Traffic</text>
  
  <rect x="150" y="20" width="120" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="210" y="44" text-anchor="middle">Control (v1)</text>
  <text x="210" y="55" text-anchor="middle" font-size="7">Error rate: 0.01%</text>
  
  <rect x="150" y="80" width="120" height="40" rx="3" fill="#e2fcf3" stroke="#4a8f3c" stroke-width="2"/>
  <text x="210" y="104" text-anchor="middle" font-weight="bold">Canary (v2)</text>
  <text x="210" y="115" text-anchor="middle" font-size="7">Error rate: 0.01%</text>
  
  <path d="M80 65 L150 40" stroke="#1a1a1a" fill="none" stroke-width="5"/>
  <path d="M150 40 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(-25 150 40)"/>
  <text x="115" y="45" text-anchor="middle" font-weight="bold">95%</text>
  
  <path d="M80 75 L150 100" stroke="#4a8f3c" fill="none" stroke-width="1"/>
  <path d="M150 100 l-6 -2 v4 z" fill="#4a8f3c" transform="rotate(25 150 100)"/>
  <text x="115" y="105" text-anchor="middle" fill="#4a8f3c" font-weight="bold">5%</text>
</svg>

### The failure

- A common failure is comparing the canary's metrics against the entire fleet. If your service has 1,000 instances and your canary is 1 instance, a memory leak in the canary will barely move the fleet-wide graphs
- You must compare the canary specifically against a "control" instance of the exact same size that received the exact same amount of traffic
- Another failure is making the canary too small. If you send 0.1% of traffic to the canary, and the bug only triggers once every 1,000 requests, it might take hours to see the error. The rollout proceeds, and production crashes
