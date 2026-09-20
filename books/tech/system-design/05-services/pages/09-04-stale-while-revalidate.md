## Stale-while-revalidate

- When a CDN cache expires (TTL reaches zero), the next user who requests that file will have to wait for the CDN to fetch it from the origin. This causes a sudden latency spike
- `stale-while-revalidate` (SWR) is a `Cache-Control` extension (RFC 5861) that fixes this. If a file is expired, but within the SWR window, the CDN immediately serves the stale file to the user (0ms latency), and then fetches the fresh file from the origin in the background

````http
Cache-Control: max-age=60, stale-while-revalidate=300, stale-if-error=86400
````

<svg viewBox="0 0 460 140" role="img" aria-label="SWR timeline. 0-60s fresh. 60-360s serves stale and refreshes async. After 360s waits for origin." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 70 L420 70" stroke="#1a1a1a" stroke-width="2"/>
  
  <rect x="40" y="55" width="100" height="30" fill="#e2fcf3" stroke="#4a8f3c"/>
  <text x="90" y="73" text-anchor="middle">Fresh (Cache Hit)</text>
  
  <rect x="140" y="55" width="160" height="30" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="220" y="73" text-anchor="middle">Stale-While-Revalidate</text>
  
  <rect x="300" y="55" width="120" height="30" fill="#fce4e2" stroke="#b8541a"/>
  <text x="360" y="73" text-anchor="middle">Stale (Wait for Origin)</text>
  
  <text x="40" y="100" text-anchor="middle" font-weight="bold">0s</text>
  <text x="140" y="100" text-anchor="middle" font-weight="bold">60s</text>
  <text x="300" y="100" text-anchor="middle" font-weight="bold">360s</text>
</svg>

- `stale-if-error` is even more powerful. If the origin server crashes (returns a 500), the CDN will continue serving the stale cached file for up to 24 hours, completely hiding the origin outage from your users

### The failure

- The failure is using `stale-while-revalidate` on data that must be strictly current, like inventory counts. If a user tries to buy the last pair of shoes, but the CDN serves a stale API response saying there are 5 pairs left, the purchase will fail at checkout. Use SWR for read-heavy UI data (like news articles or product descriptions), not transactional data
