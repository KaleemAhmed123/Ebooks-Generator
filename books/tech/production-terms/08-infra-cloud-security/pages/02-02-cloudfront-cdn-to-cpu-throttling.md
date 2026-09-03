## CloudFront / CDN

Edge caches serving bytes from close to the user. Two things decide the hit
ratio: the `Cache-Control` header, and the cache key.

The key is where it goes wrong. Forwarding all cookies to the origin makes every
request unique, so nothing is ever reused — the origin serves 100% of traffic
and you pay for the CDN on top. Every field added to the key multiplies the
variants and divides the hit ratio.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A request reaches the nearest edge; a hit returns in fifteen milliseconds without touching the origin, and a miss fetches from the origin and is then cached">
  <rect x="4" y="30" width="72" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="40" y="49" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">user</text>
  <path d="M78 45 H112" stroke="#1a1a1a" stroke-width="1.3"/><path d="M112 45 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="116" y="28" width="96" height="34" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.5"/>
  <text x="164" y="49" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#3f7a33">nearest edge</text>
  <path d="M214 45 H244 M244 20 V70 M244 20 H274 M244 70 H274" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M274 20 l-7 -4 v8 z M274 70 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="280" y="17" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">hit</text>
  <text x="280" y="31" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">15ms, origin never hears about it</text>
  <text x="280" y="67" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">miss</text>
  <text x="280" y="81" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">origin fetch, then cached</text>
</svg>

## CPU Throttling

*cgroup*

A CPU limit is a quota per 100ms period, not a speed setting. Spend the quota
early in a period and the process is frozen until the next one begins.

A pod capped at 0.5 CPU needs a 60ms burst to serve a request. It gets 50ms,
freezes for 50ms, then finishes. P99 jumps to 300ms while the CPU graph shows a
comfortable 40%, so nobody looks at the limit.

Average CPU cannot show this. `container_cpu_cfs_throttled_seconds` is the only
metric that does.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Within a hundred millisecond period the container runs for its fifty millisecond quota then is frozen until the next period begins">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">period 1</text>
  <text x="236" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">period 2</text>
  <rect x="4" y="18" width="100" height="22" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="54" y="33" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#3f7a33">run 50ms</text>
  <rect x="104" y="18" width="126" height="22" fill="#f0f0f0" stroke="#e0e0e4" stroke-width="1"/>
  <text x="167" y="33" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">frozen 50ms</text>
  <rect x="236" y="18" width="28" height="22" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="270" y="33" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">resume — request finally completes</text>
  <path d="M233 14 V46 M4 46 H444" stroke="#e0e0e4" stroke-width="1"/>
  <text x="4" y="66" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">60ms of work · 160ms of wall clock · average CPU still reads 40%</text>
</svg>
