## Fan-out and the tail

- Parallel fan-out is when a root service makes simultaneous requests to N backends (like a search query hitting 100 partitions) and waits for all of them to reply. It seems faster than a serial chain, but it hides a mathematical trap
- The root request is only as fast as the *slowest* backend. If one backend experiences a garbage collection pause, the entire user request is delayed

<svg viewBox="0 0 460 140" role="img" aria-label="Fan-out tail latency. Root service sends requests to 100 leaves. 99 are fast (10ms). One is slow (1s). The user waits 1s." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="200" y="10" width="60" height="25" rx="3" fill="#1a1a1a" stroke="#1a1a1a"/>
  <text x="230" y="26" text-anchor="middle" fill="#fcfcfc">Root</text>
  
  <rect x="60" y="70" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="110" y="70" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="160" y="70" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  
  <text x="230" y="84" text-anchor="middle">... 95 more ...</text>
  
  <rect x="310" y="70" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="360" y="70" width="40" height="20" rx="3" fill="#fce4e2" stroke="#b8541a" stroke-width="2"/>
  
  <path d="M220 35 L80 70" stroke="#1d4e89" fill="none"/>
  <path d="M225 35 L130 70" stroke="#1d4e89" fill="none"/>
  <path d="M230 35 L180 70" stroke="#1d4e89" fill="none"/>
  <path d="M235 35 L330 70" stroke="#1d4e89" fill="none"/>
  <path d="M240 35 L380 70" stroke="#b8541a" fill="none" stroke-width="2"/>
  
  <text x="380" y="105" text-anchor="middle" fill="#b8541a" font-weight="bold">1000ms delay</text>
  <text x="130" y="105" text-anchor="middle" fill="#1d4e89">10ms</text>
  <text x="230" y="125" text-anchor="middle" font-weight="bold">Total wait time: 1000ms</text>
</svg>

- In their paper *The Tail at Scale*, Google engineers Jeff Dean and Luiz Barroso showed that if a single server has a 1-in-100 chance of being slow, and you fan out to 100 servers, **63%** of all user requests will experience that delay

### The failure

- The failure mode is treating the median (p50) latency of a backend as the latency the user will experience. In a fan-out architecture, the p99 latency of the leaf nodes becomes the median latency of the root node
- If you fan out to 100 instances, you are practically guaranteed to hit the p99 latency every single time. You must fix the tail (via timeouts, hedging, or caching) to keep the system usable
