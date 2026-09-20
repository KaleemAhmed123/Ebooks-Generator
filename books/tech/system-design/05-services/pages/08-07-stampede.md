## The cache stampede

- A Cache Stampede (or Thundering Herd) happens when a highly popular piece of data expires from the cache while under heavy load
- Imagine a news website's front page is cached with a 60-second TTL. It receives 10,000 requests per second. At second 60, the cache key expires. In the exact millisecond the key expires, 10 requests arrive. All 10 check the cache, all 10 get a "miss", and all 10 query the database
- By the time the database answers the first query (which takes 200ms), another 2,000 requests have arrived, missed the cache, and hit the database. The database receives 2,010 identical heavy queries simultaneously and crashes

<svg viewBox="0 0 460 140" role="img" aria-label="Cache stampede graph. Steady line of cache hits, then a massive spike of DB queries at TTL expiry." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 120 L420 120" stroke="#1a1a1a" stroke-width="1"/>
  <path d="M40 120 L40 20" stroke="#1a1a1a" stroke-width="1"/>
  <text x="230" y="135" text-anchor="middle">Time (seconds)</text>
  <text x="30" y="70" text-anchor="middle" transform="rotate(-90 30 70)">DB Queries</text>
  
  <path d="M40 115 L200 115 L210 30 L220 115 L400 115" stroke="#b8541a" fill="none" stroke-width="2"/>
  
  <path d="M205 120 L205 30" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="205" y="25" text-anchor="middle" font-weight="bold">Key Expires (Stampede)</text>
</svg>

### The failure

- The failure is a "cold start" cache restart. If the entire Redis cluster crashes and reboots empty, every single piece of popular data expires simultaneously
- When the API comes back online, 100% of traffic misses the cache and hits the database, causing an immediate catastrophic outage. You must fix the stampede vulnerability before you can safely survive a cache reboot
