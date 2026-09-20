## Deadline propagation

- When Service A has 5 seconds to reply to a user, and it calls Service B (which calls Service C), the timeout budget must be shared across the entire chain. If A waits 4 seconds for a database query, B only has 1 second left
- Deadline propagation means sending the remaining time budget in the HTTP header (or gRPC context). Each hop reads the budget, subtracts the time already spent, and passes the remainder down the line

<svg viewBox="0 0 460 140" role="img" aria-label="Deadline propagation. Gateway sets 5s deadline. Service A takes 2s, passes 3s to Service B. Service B takes 1s, passes 2s to C." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="68" text-anchor="middle">Gateway</text>
  <text x="60" y="85" text-anchor="middle" font-weight="bold">5s budget</text>
  
  <rect x="150" y="50" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="68" text-anchor="middle">Service A</text>
  <text x="190" y="85" text-anchor="middle" font-weight="bold">3s left</text>
  
  <rect x="280" y="50" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="68" text-anchor="middle">Service B</text>
  <text x="320" y="85" text-anchor="middle" font-weight="bold">2s left</text>
  
  <rect x="410" y="50" width="30" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="425" y="68" text-anchor="middle">C</text>
  
  <path d="M100 65 L150 65" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M150 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="125" y="60" text-anchor="middle" font-size="7">Header: 5000</text>
  
  <path d="M230 65 L280 65" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M280 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="255" y="60" text-anchor="middle" font-size="7">Header: 3000</text>
  
  <path d="M360 65 L410 65" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M410 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="385" y="60" text-anchor="middle" font-size="7">Header: 2000</text>
</svg>

````typescript
// TypeScript (Node): using AbortSignal to enforce local timeouts
export async function callServiceB(remainingMs: number) {
  // If remainingMs is < 0, it aborts instantly
  const signal = AbortSignal.timeout(Math.max(0, remainingMs));
  
  return fetch('http://service-b', {
    headers: { 'X-Request-Deadline': String(remainingMs) },
    signal
  });
}
````

### The failure

- The failure is a 30-second inner timeout inside a 5-second outer timeout. The user gives up and closes the browser after 5 seconds, but Service C continues processing a heavy query for 25 more seconds
- This is "dead work." The system burns CPU and database connections generating an answer that the caller has already abandoned. Under heavy load, dead work spirals into a cascading failure
