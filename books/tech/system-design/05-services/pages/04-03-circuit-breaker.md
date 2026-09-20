## Circuit breaker

- Retrying is only useful for transient failures. If a dependency is completely down, waiting for a 10-second timeout on every request will instantly exhaust your thread pool. You must "fail fast"
- The circuit breaker pattern tracks failures. If the failure rate crosses a threshold (e.g., 50% over the last 100 calls), the breaker trips to the **Open** state. All subsequent calls instantly return an error without touching the network
- Periodically, it allows a single request through (**Half-Open** state) to test if the dependency has recovered. If the test succeeds, it resets to **Closed**

<svg viewBox="0 0 460 140" role="img" aria-label="Circuit breaker state machine. Closed state (normal). Failure threshold trips to Open state (fail fast). Timeout triggers Half-Open (test). Success goes back to Closed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="50" width="80" height="40" rx="20" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2"/>
  <text x="90" y="74" text-anchor="middle" font-weight="bold">CLOSED</text>
  <text x="90" y="110" text-anchor="middle" font-size="7">Traffic flows</text>
  
  <rect x="200" y="10" width="80" height="40" rx="20" fill="#fce4e2" stroke="#cc0000" stroke-width="2"/>
  <text x="240" y="34" text-anchor="middle" font-weight="bold">OPEN</text>
  <text x="240" y="65" text-anchor="middle" font-size="7">Fail fast</text>
  
  <rect x="330" y="50" width="80" height="40" rx="20" fill="#fcfcfc" stroke="#b8541a" stroke-width="2"/>
  <text x="370" y="74" text-anchor="middle" font-weight="bold">HALF-OPEN</text>
  <text x="370" y="110" text-anchor="middle" font-size="7">Test one request</text>
  
  <path d="M120 50 Q160 25 200 30" stroke="#cc0000" fill="none" stroke-width="2"/>
  <path d="M200 30 l-6 -4 v8 z" fill="#cc0000" transform="rotate(-15 200 30)"/>
  <text x="140" y="30" text-anchor="middle" font-size="7">> 50% errors</text>
  
  <path d="M280 30 Q320 25 350 50" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M350 50 l-3 -5 h6 z" fill="#1a1a1a" transform="rotate(30 350 50)"/>
  <text x="330" y="30" text-anchor="middle" font-size="7">Wait 60s</text>
  
  <path d="M330 70 Q210 90 130 70" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <path d="M130 70 l6 -4 v8 z" fill="#1d4e89" transform="rotate(15 130 70)"/>
  <text x="240" y="95" text-anchor="middle" font-size="7">Test succeeds</text>
  
  <path d="M360 50 Q300 35 280 40" stroke="#cc0000" fill="none" stroke-width="1"/>
  <path d="M280 40 l6 4 v-8 z" fill="#cc0000" transform="rotate(15 280 40)"/>
  <text x="310" y="60" text-anchor="middle" font-size="7">Test fails</text>
</svg>

### The failure

- The failure mode is using a single circuit breaker for an entire host, rather than per-endpoint. If the `/generate-pdf` endpoint is broken, it trips the whole breaker, taking down the `/health` and `/read-fast` endpoints with it
- Another failure is setting the trip threshold without a minimum call volume. If the service gets 1 request per minute and it fails, the error rate is 100%. The breaker trips on a single blip. A standard configuration (like Resilience4j's defaults) requires a minimum of 100 calls in the window before calculating the percentage
