## Retry amplification

- Retrying a failed request is a standard reliability pattern (see the Foundations booklet for exponential backoff and jitter). However, in a deep service chain, uncoordinated retries act as a denial-of-service attack
- If the Gateway retries 3 times, and Service A retries 3 times, and Service B retries 3 times, a single struggling database at the bottom of the chain is hit with 27 requests (3 × 3 × 3)

<svg viewBox="0 0 460 140" role="img" aria-label="Retry storm. Gateway sends 3 requests. Service A turns them into 9. Service B turns them into 27." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle">Gateway</text>
  
  <rect x="150" y="55" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="74" text-anchor="middle">Service A</text>
  
  <rect x="280" y="55" width="60" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="310" y="74" text-anchor="middle">Service B</text>
  
  <rect x="410" y="55" width="30" height="30" rx="3" fill="#fcfcfc" stroke="#cc0000" stroke-width="2"/>
  <text x="425" y="74" text-anchor="middle" fill="#cc0000">DB</text>
  
  <path d="M80 65 L150 65" stroke="#1a1a1a" fill="none" stroke-width="3"/>
  <path d="M150 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="115" y="60" text-anchor="middle" font-weight="bold">3×</text>
  
  <path d="M210 65 L280 65" stroke="#1a1a1a" fill="none" stroke-width="5"/>
  <path d="M280 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="245" y="60" text-anchor="middle" font-weight="bold">9×</text>
  
  <path d="M340 65 L410 65" stroke="#1a1a1a" fill="none" stroke-width="8"/>
  <path d="M410 65 l-6 -4 v8 z" fill="#1a1a1a"/>
  <text x="375" y="60" text-anchor="middle" font-weight="bold">27×</text>
  
  <text x="245" y="120" text-anchor="middle" fill="#cc0000" font-weight="bold">A 100 QPS brownout becomes a 2,700 QPS outage</text>
</svg>

- To prevent this, services must use retry budgets. Instead of allowing 3 retries per request, the service enforces a global limit: "only 10% of total outbound requests may be retries"

### The failure

- The failure mode is the retry storm. A minor latency blip causes a few timeouts. The callers immediately retry, tripling the load. The service slows down further, causing more timeouts and more retries
- What started as a momentary brownout amplifies into a total outage. The only way to recover is to block all incoming traffic at the edge to let the overloaded service drain its queue
