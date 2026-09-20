## Distributed tracing

- When a single user request traverses five microservices, you need to see exactly how much time was spent in each one. This is Distributed Tracing (OpenTelemetry is the standard)
- A Trace represents the entire journey. It is made of Spans. A Span is a unit of work (e.g., "Query Database", "Call Payment API"). Every Span has a start time, a duration, and a Parent ID

<svg viewBox="0 0 460 140" role="img" aria-label="Trace waterfall. Gateway (100ms) calls Order (90ms) which calls Payment (50ms) and DB (30ms)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="400" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="25" y="34">API Gateway (100ms)</text>
  
  <rect x="30" y="45" width="380" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="35" y="59">Order Service (90ms)</text>
  
  <rect x="40" y="70" width="100" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="45" y="84">DB Query (20ms)</text>
  
  <rect x="150" y="70" width="250" height="20" rx="3" fill="#e2fcf3" stroke="#4a8f3c"/>
  <text x="155" y="84">Payment Service (50ms)</text>
  
  <rect x="160" y="95" width="200" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="165" y="109">Stripe API (40ms)</text>
</svg>

- The tracing backend visualizes this as a waterfall. It makes it instantly obvious that the request was slow because the Stripe API took 40ms, not because the database was slow

### The failure

- The failure is trying to trace 100% of requests. A single request might generate 50 spans. If you handle 10,000 requests per second, you are generating 500,000 spans per second. The observability system will cost more than the application
- You must use **Sampling**.
- **Head sampling:** The Gateway randomly decides to trace 1% of requests and passes the "sample=true" flag down the chain. This is cheap, but you might miss the rare slow requests
- **Tail sampling:** Every service records every span in memory. The tracing agent looks at the finished trace and decides whether to keep it (e.g., "Keep all errors, keep all traces slower than 500ms, randomly keep 1% of the rest")
