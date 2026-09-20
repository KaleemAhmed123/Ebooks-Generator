## Backpressure at the service level

- Systems that accept work faster than they can process it will eventually die. Backpressure is the mechanism of pushing back on the caller to slow down the influx of work
- In asynchronous systems (like Kafka), backpressure is natural: the consumer just stops pulling from the log. In synchronous HTTP systems, you must implement it explicitly

<svg viewBox="0 0 460 140" role="img" aria-label="Bounded vs Unbounded queues. Unbounded queue grows until OOM. Bounded queue rejects at capacity with a 429." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Unbounded Queue</text>
  
  <rect x="50" y="50" width="120" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="64" text-anchor="middle">Queue depth: 10,000</text>
  
  <rect x="50" y="80" width="120" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="110" y="94" text-anchor="middle">Queue depth: 50,000</text>
  <text x="110" y="110" text-anchor="middle" fill="#cc0000" font-weight="bold">OOM Crash</text>

  <rect x="240" y="20" width="180" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="330" y="35" text-anchor="middle" font-weight="bold">Bounded Queue (Backpressure)</text>
  
  <rect x="270" y="50" width="120" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-width="2"/>
  <text x="330" y="64" text-anchor="middle">Max Queue: 500</text>
  
  <path d="M220 90 L260 90" stroke="#1a1a1a" stroke-width="2"/>
  <path d="M260 90 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M260 100 L220 100" stroke="#cc0000" stroke-width="2"/>
  <path d="M220 100 l6 3 v-6 z" fill="#cc0000"/>
  
  <text x="330" y="94" text-anchor="middle" fill="#cc0000" font-weight="bold">Return 429 or 503</text>
  <text x="330" y="110" text-anchor="middle" font-size="7">with Retry-After header</text>
</svg>

- HTTP backpressure means using a bounded queue. When the queue is full, admission control rejects the request with a `429 Too Many Requests` or `503 Service Unavailable`, ideally accompanied by a `Retry-After` header telling the client exactly when to try again

### The failure

- The failure is the unbounded in-memory queue. Frameworks often buffer incoming HTTP requests in memory by default. When the database slows down, the web workers block, and the buffer fills up with thousands of waiting requests
- The process exhausts its memory and is killed by the OS (Out of Memory - OOM). A system without explicit limits is a system waiting to crash
