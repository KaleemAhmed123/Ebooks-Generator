## The stampede

- One popular key expires. Every request that arrives before the first refill completes sees a miss and goes to the database, so the load is not one query but every query that fits inside the query's own duration

<svg viewBox="0 0 460 118" role="img" aria-label="Database query rate over time under a cache stampede. The rate sits near zero while the key is being served from cache, then spikes vertically the moment the key expires, because every arriving request misses until the first refill lands. The rate decays back down once the key is filled again. The window is the query's own duration: at ten thousand requests per second and a two hundred millisecond query, two thousand requests miss before the first fill lands. An orange cross marks a cache restart, which expires every key at once and produces the same spike across the whole keyspace onto a cold database." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40,76 L238,76 L248,16 L300,30 L360,68 L440,74" fill="none" stroke="#bf4c28" stroke-width="1.2"/>
  <line x1="243" y1="12" x2="243" y2="80" stroke="#333" stroke-dasharray="2 2"/>
  <text x="243" y="10" text-anchor="middle" font-size="6.5">the key expires</text>
  <line x1="40" y1="80" x2="440" y2="80" stroke="#333"/>
  <text x="4" y="46" font-size="6.5">DB queries</text>
  <text x="4" y="55" font-size="6.5">per second</text>
  <text x="440" y="90" text-anchor="end" font-size="6.5">time →</text>
  <text x="60" y="71" font-size="6.5">served from cache</text>
  <text x="300" y="12" font-size="6.5" fill="#bf4c28">every request misses until the first fill lands</text>
  <text x="4" y="102" font-size="7">the window is the query's own duration: at 10 000 rps and a 200 ms query, 2 000 miss before the first fill lands</text>
  <text x="4" y="114" font-size="7.5" fill="#bf4c28">✕ a cache restart expires every key at once: the same spike across the whole keyspace, onto a cold database</text>
</svg>

- The arithmetic is the page. The spike is the arrival rate multiplied by the refill duration, so it grows with popularity *and* with how slow the query is — the expensive queries worth caching are exactly the ones that produce the largest stampede
- It also means the database sees a load it has never been sized for. It was protected by the cache at a 99 % hit rate, so it has been running at 1 % of the read traffic for months, and the spike asks it for 100 % of a very popular key at once

### The failure

- The cold start, which is the same event across every key simultaneously. A cache cluster restarts empty, the hit rate goes to zero, and the full read volume of the service arrives at a database that has been sized against the cached rate
- The order matters: the stampede defences on page 8 have to already be in place before a cache restart can be survived, because during the restart there is no cache to hold a lease in. Recovery has to be planned for while the cache is healthy, since the moment it is needed is the moment the tools are gone
