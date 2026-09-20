## Hot keys

- A cache is typically partitioned (sharded) across many servers. If you have 10 Redis nodes, each node holds 10% of the keys
- A "Hot Key" is a single piece of data that suddenly receives an enormous amount of traffic (e.g., the profile of a celebrity who just did something viral). Because that one key lives on exactly one Redis node, that single node receives 100% of the viral traffic
- That Redis node hits 100% CPU and starts timing out, even though the other 9 nodes in the cluster are sitting idle

<svg viewBox="0 0 460 140" role="img" aria-label="Hot key melting a single shard. Traffic hits Shard A exclusively." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="73" text-anchor="middle">10k req/s</text>
  
  <rect x="250" y="20" width="80" height="25" rx="3" fill="#fce4e2" stroke="#b8541a" stroke-width="2"/>
  <text x="290" y="36" text-anchor="middle">Node A (100%)</text>
  
  <rect x="250" y="55" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="290" y="71" text-anchor="middle">Node B (2%)</text>
  
  <rect x="250" y="90" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="290" y="106" text-anchor="middle">Node C (2%)</text>
  
  <path d="M100 65 L240 32" stroke="#b8541a" fill="none" stroke-width="2"/>
  <path d="M235 30 l5 3 l-2 5 z" fill="#b8541a"/>
  <text x="160" y="45" text-anchor="middle" font-size="7" fill="#b8541a">Get 'celeb:123'</text>
</svg>

- To fix a hot key, you must stop sending all traffic to that one Redis node. The most common fix is an **In-Process Cache** (a local `Map` in the application memory with a 1-second TTL). The application checks its local memory before calling Redis. This absorbs 99% of the viral traffic before it ever hits the network

### The failure

- The failure is not knowing which key is hot until the node crashes. In Redis 8.6, you can run the `HOTKEYS` command to detect which keys are monopolizing CPU
- Another failure is trying to fix a hot key by adding more Redis nodes to the cluster. Adding nodes spreads out the *other* keys, but the hot key still lives on exactly one node, so the bottleneck remains
