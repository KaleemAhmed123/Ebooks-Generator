## Push vs pull

- How does the central server get the data from the 10,000 application nodes?
- **Pull (Prometheus):** The central server runs an HTTP GET `/metrics` on every application node every 10 seconds.
  - *Pros:* The central server controls the rate. If the server is overloaded, it just pulls slower. If an application node goes down, the server immediately knows because the pull fails
- **Push (Datadog, StatsD):** The application nodes actively send UDP/TCP packets to the central server.
  - *Pros:* Works well for short-lived ephemeral jobs (like AWS Lambda) that only exist for 100ms and cannot wait to be pulled

<svg viewBox="0 0 460 110" role="img" aria-label="Pull model vs Push model for metrics collection" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="10" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="29" text-anchor="middle" font-weight="bold" fill="#1d4e89">Central Server</text>
  
  <rect x="180" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="220" y="29" text-anchor="middle" font-weight="bold">App Node</text>
  <text x="220" y="100" text-anchor="middle" font-weight="bold">PULL MODEL</text>
  
  <path d="M100 25 L180 25" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="140" y="20" text-anchor="middle" font-size="6">HTTP GET</text>
  
  <rect x="280" y="60" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="320" y="79" text-anchor="middle" font-weight="bold">App Node</text>
  
  <rect x="120" y="60" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="79" text-anchor="middle" font-weight="bold" fill="#1d4e89">Central Server</text>
  <text x="220" y="45" text-anchor="middle" font-weight="bold">PUSH MODEL</text>
  
  <path d="M280 75 L200 75" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="240" y="70" text-anchor="middle" font-size="6">UDP Send</text>
</svg>

### The failure

- Using Pull for short-lived batch jobs. If a script runs for 2 seconds and exits, the Prometheus server (scraping every 10 seconds) will miss it completely. Short-lived jobs must push to a Pushgateway.

:::interview
You use Prometheus (Pull model) to monitor 10,000 servers. A developer adds a cron job that runs for 5 seconds every hour. Prometheus never sees the metrics. Why?

Prometheus scrapes every 10-15 seconds. It misses the 5-second window entirely. Ephemeral jobs must push their metrics to an intermediate caching layer (a Pushgateway), which Prometheus then scrapes.
:::\n