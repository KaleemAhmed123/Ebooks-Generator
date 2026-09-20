## Why and where to cache

- A cache trades memory for speed. Instead of calculating a result or querying a disk-based database, you store the answer in fast memory (RAM) so the next requester gets it instantly
- Caching can happen at multiple layers of your architecture. As you move closer to the user, the cache is faster but harder to invalidate

<svg viewBox="0 0 460 140" role="img" aria-label="Cache layers. Browser, CDN, Gateway, Application, Database." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="44" text-anchor="middle">Browser</text>
  <text x="50" y="55" text-anchor="middle" font-size="7" fill="#666">Local disk</text>
  
  <rect x="100" y="30" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="44" text-anchor="middle">CDN Edge</text>
  <text x="130" y="55" text-anchor="middle" font-size="7" fill="#666">Shared cache</text>
  
  <rect x="180" y="30" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="210" y="44" text-anchor="middle">Gateway</text>
  <text x="210" y="55" text-anchor="middle" font-size="7" fill="#666">Varnish/NGINX</text>
  
  <rect x="260" y="30" width="60" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="290" y="44" text-anchor="middle">Application</text>
  <text x="290" y="55" text-anchor="middle" font-size="7" fill="#666">Redis/In-proc</text>
  
  <rect x="340" y="30" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="370" y="44" text-anchor="middle">Database</text>
  <text x="370" y="55" text-anchor="middle" font-size="7" fill="#666">Buffer pool</text>
  
  <path d="M80 45 L100 45" stroke="#1a1a1a" fill="none"/>
  <path d="M160 45 L180 45" stroke="#1a1a1a" fill="none"/>
  <path d="M240 45 L260 45" stroke="#1a1a1a" fill="none"/>
  <path d="M320 45 L340 45" stroke="#1a1a1a" fill="none"/>
  
  <path d="M40 80 L380 80" stroke="#1a1a1a" stroke-dasharray="2" fill="none"/>
  <text x="50" y="95" text-anchor="middle" font-style="italic">Fastest</text>
  <text x="370" y="95" text-anchor="middle" font-style="italic">Slowest</text>
  
  <path d="M40 100 L380 100" stroke="#1a1a1a" stroke-dasharray="2" fill="none"/>
  <text x="50" y="115" text-anchor="middle" font-style="italic">Hard to clear</text>
  <text x="370" y="115" text-anchor="middle" font-style="italic">Always correct</text>
</svg>

### The failure

- The failure is caching the exact same object at five different layers with five different invalidation paths
- If a user changes their profile picture, and the old picture is cached in the Database buffer, the Redis cluster, the NGINX proxy, the Cloudflare CDN, and the user's browser, you will have to successfully orchestrate a cache invalidation across all five layers before the user sees their new picture. Pick one or two layers and stick to them
