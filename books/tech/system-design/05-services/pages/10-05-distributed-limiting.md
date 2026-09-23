## Limiting across many servers

- One process counting in memory is easy and wrong the moment there are two processes. Either the count is shared, which costs a round trip on the hot path, or each server enforces a fraction of the limit, which is wrong whenever traffic is unevenly spread

<svg viewBox="0 0 460 118" role="img" aria-label="Two ways to limit across a fleet. On the left, a shared counter: three API servers each call Redis, which runs INCR and EXPIRE, giving an exact count at the cost of a round trip on every request. On the right, dividing the limit by the number of servers: with a global limit of 100 per second and three servers, each enforces 33 per second locally. When 50 requests arrive at the first server and only 5 at each of the others, the first server rejects 17 of them even though only 60 requests arrived against a limit of 100. An orange cross marks three replicas each enforcing the full limit, which makes the effective limit three times the published one." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="102" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">one shared counter</text>
  <rect x="8" y="22" width="52" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="34" y="33" text-anchor="middle" font-size="6.5">api 1</text>
  <rect x="8" y="44" width="52" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="34" y="55" text-anchor="middle" font-size="6.5">api 2</text>
  <rect x="8" y="66" width="52" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="34" y="77" text-anchor="middle" font-size="6.5">api 3</text>
  <rect x="120" y="36" width="76" height="32" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="158" y="48" text-anchor="middle" font-size="7">Redis</text><text x="158" y="59" text-anchor="middle" font-size="6">INCR + EXPIRE</text>
  <line x1="60" y1="30" x2="118" y2="44" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="60" y1="52" x2="118" y2="52" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="60" y1="74" x2="118" y2="60" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="102" y="92" text-anchor="middle" font-size="6.5">exact — and a round trip on every request</text>
  <text x="347" y="13" text-anchor="middle" font-size="7.5" fill="#bf4c28">limit ÷ N, enforced locally</text>
  <rect x="254" y="22" width="100" height="16" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="304" y="33" text-anchor="middle" font-size="6.5">api 1 · 50 arrive</text>
  <rect x="254" y="44" width="100" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="304" y="55" text-anchor="middle" font-size="6.5">api 2 · 5 arrive</text>
  <rect x="254" y="66" width="100" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="304" y="77" text-anchor="middle" font-size="6.5">api 3 · 5 arrive</text>
  <text x="360" y="34" font-size="6" fill="#bf4c28">17 rejected</text>
  <text x="360" y="56" font-size="6">all allowed</text>
  <text x="360" y="78" font-size="6">all allowed</text>
  <text x="347" y="92" text-anchor="middle" font-size="6.5" fill="#bf4c28">60 arrived against a 100/s limit; 17 refused</text>
  <text x="4" y="112" font-size="7.5" fill="#bf4c28">✕ three replicas each enforcing the whole limit: the effective limit is three times the published one</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

```lua
-- one round trip, atomic: set the expiry only on the first hit of a window
local n = redis.call("INCR", KEYS[1])
if n == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])   -- window in seconds; set once, never extended
end
return n
```

- Both lines matter. Splitting `INCR` and `EXPIRE` into two round trips means a crash between them leaves a counter that never expires, so that key is limited forever. And re-applying `EXPIRE` on every hit would push the reset forward with each request, so a busy caller's window never ends
- The middle path is usually the right one: enforce a generous local limit with no round trip, and a shared counter only on the routes expensive enough to deserve one. Perfect accuracy is rarely what a rate limit is for

### The failure

- Rolling out a third replica and tripling the published limit without noticing. Each instance enforces "100 per second" from the same configuration file, nothing in the code is wrong, and the limit silently becomes a function of how many pods happen to be running — which an autoscaler changes during exactly the traffic that made the limit matter
