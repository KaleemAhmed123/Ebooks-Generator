## Load shedding

- **Load shedding** is refusing work at admission, cheaply and early, when the server is at capacity, so that the work it accepts finishes in time. A refused request costs microseconds and a `503`; an accepted one that queues past its deadline costs the full work and returns nothing useful. Above saturation, rejecting is how goodput stays up; booklet 06's rate-limiter and ticketing designs both end here

<svg viewBox="0 0 460 140" role="img" aria-label="Throughput against offered load. The x axis is offered load in requests per second, the y axis is goodput, requests completed within their deadline. Up to capacity, 1 000 per second here, goodput rises with load. Past it, the curve without shedding bends down and falls toward zero: every accepted request queues, queueing time exceeds the deadline, and the server completes work nobody is waiting for. The curve with shedding stays flat at capacity: excess is rejected at admission with a 503 and Retry-After, and the accepted 1 000 per second finish in time. Beside the chart, Stripe's four priority classes from its load-shedder post: critical, then POST, then GET, then test mode, shed from the bottom up. An orange cross marks the queue-everything line." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="40" y1="110" x2="300" y2="110" stroke="#333" marker-end="url(#d)"/><line x1="40" y1="110" x2="40" y2="14" stroke="#333" marker-end="url(#d)"/>
  <text x="250" y="122" text-anchor="middle" font-size="7">offered load (req/s)</text><text x="14" y="60" font-size="7" transform="rotate(-90 14 60)">goodput</text>
  <line x1="40" y1="110" x2="150" y2="40" stroke="#333" stroke-width="1.5"/>
  <line x1="150" y1="40" x2="290" y2="40" stroke="#1d4e89" stroke-width="1.5"/><text x="220" y="34" text-anchor="middle" font-size="7" fill="#1d4e89">with shedding: flat at capacity</text>
  <path d="M150,40 C190,44 220,80 290,106" fill="none" stroke="#bf4c28" stroke-width="1.5" stroke-dasharray="4 3"/><text x="232" y="98" text-anchor="end" font-size="7" fill="#bf4c28">queue everything: goodput → 0</text>
  <line x1="150" y1="110" x2="150" y2="40" stroke="#333" stroke-dasharray="2 2"/><text x="150" y="118" text-anchor="middle" font-size="7">capacity: 1 000/s</text>
  <text x="46" y="24" font-size="7">completed within deadline</text>
  <rect x="316" y="14" width="138" height="96" rx="3" fill="#fff" stroke="#1d4e89"/><text x="385" y="28" text-anchor="middle">shed by priority (Stripe)</text>
  <g font-size="7"><text x="324" y="44">1  critical: payment captures — last to go</text><text x="324" y="56">2  POST: other mutations</text><text x="324" y="68">3  GET: reads</text><text x="324" y="80">4  test mode — first to go</text><text x="324" y="96" fill="#1d4e89">fleet level: reserve a fraction for critical;</text><text x="324" y="106" fill="#1d4e89">per worker: drop the lowest class first</text></g>
  <text x="6" y="136" font-size="7.5" fill="#bf4c28">✕ queueing everything until every request times out: the server is 100 % busy and 0 % useful, and the queue is what made it so</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Shedding needs a saturation signal and a priority. The signal is local: worker utilisation, queue depth, or queue wait time against the deadline (page 1). The priority is on the request: Stripe's load shedders classify every request as critical, POST, GET or test mode, reserve a fraction of fleet capacity for the critical class, and per worker drop the lowest class first when utilisation is high. A single limit with no classes sheds a payment to protect a test call
- The refused request gets a `503` and a `Retry-After` (page 10), so a well-behaved client backs off (booklet 01), and the limiter (Module 10) has already refused the clients who exceeded their share; shedding is what remains when the sum of well-behaved clients is still too much (Module 10, page 7)

### The failure

- Queueing everything. It feels polite; it means every request waits, the wait exceeds every deadline, and the server does full work on requests whose callers have already given up (page 1). Goodput falls toward zero while CPU sits at 100 %. Capacity does not queue; it is spent or refused
