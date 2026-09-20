## Percentiles, not averages

- If 9 requests take 10ms, and 1 request takes 1,000ms, the average latency is 109ms. Measuring the average hides the fact that 90% of your users had a lightning-fast experience, and 10% of your users had a terrible experience
- You must measure latency in percentiles:
  - **p50 (Median):** 50% of requests are faster than this. This is the typical user experience
  - **p95:** 95% of requests are faster than this
  - **p99:** The tail latency. The worst 1% of requests

<svg viewBox="0 0 460 140" role="img" aria-label="Latency distribution curve. A massive spike at 10ms (p50). A long flat tail extending out to 1000ms (p99)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 120 L420 120" stroke="#1a1a1a" stroke-width="1"/>
  <path d="M40 120 L40 20" stroke="#1a1a1a" stroke-width="1"/>
  <text x="230" y="135" text-anchor="middle">Latency (ms)</text>
  <text x="30" y="70" text-anchor="middle" transform="rotate(-90 30 70)">Count</text>
  
  <path d="M40 120 Q50 120 70 30 Q90 120 150 115 Q300 110 400 118" stroke="#1d4e89" fill="none" stroke-width="2"/>
  
  <path d="M70 30 L70 120" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="70" y="25" text-anchor="middle" font-weight="bold">p50 (10ms)</text>
  
  <path d="M150 115 L150 120" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="150" y="105" text-anchor="middle" font-weight="bold">p95 (80ms)</text>
  
  <path d="M380 118 L380 120" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="380" y="105" text-anchor="middle" font-weight="bold">p99 (1000ms)</text>
</svg>

- Why does the p99 matter so much? Because in a microservice architecture, a single user request might fan out to 100 backend services. If the p99 latency is 1,000ms, and you fan out to 100 services, 63% of your users will experience that 1,000ms delay

### The failure

- The failure is averaging percentiles across instances. You cannot take the p99 latency of Node A (100ms) and the p99 latency of Node B (300ms), average them together, and say your fleet p99 is 200ms
- Percentiles are not mathematically aggregatable. To get an accurate fleet-wide p99, your instances must emit histogram buckets (e.g., "count of requests in the 100ms-200ms bucket") to a central time-series database, which calculates the percentile across the aggregated histogram
