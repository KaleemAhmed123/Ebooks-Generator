## Load levelling

- Some workloads are incredibly spiky. Imagine a batch job that fires at midnight and generates 100,000 PDF invoices. If you send 100,000 synchronous HTTP POST requests to your PDF generation microservice, it will run out of memory and crash
- A broker acts as a shock absorber. This is called **Load Levelling**

<svg viewBox="0 0 460 140" role="img" aria-label="Load levelling. A spiky input of 100,000 events/sec hits the queue. The queue drains at a flat output of 500 events/sec, protecting the fragile worker." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M20 100 L50 100 L60 20 L70 100 L120 100" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="70" y="40" text-anchor="middle" font-size="6" fill="#b8541a" font-weight="bold">100k events / sec</text>
  
  <rect x="150" y="40" width="100" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="55" text-anchor="middle" font-weight="bold">Message Queue</text>
  <text x="200" y="70" text-anchor="middle" font-size="6">Absorbs the spike</text>
  <text x="200" y="85" text-anchor="middle" font-size="6">into RAM/Disk</text>
  
  <path d="M280 100 L400 100" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="340" y="90" text-anchor="middle" font-size="6" fill="#1d4e89" font-weight="bold">Flat output: 500 events / sec</text>
  
  <rect x="400" y="40" width="40" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="420" y="70" text-anchor="middle" font-weight="bold">Worker</text>
  
  <path d="M120 100 L150 100" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M150 100 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M250 100 L280 100" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M280 100 l-6 -3 v6 z" fill="#1a1a1a"/>
</svg>

- The queue absorbs the 100,000 messages instantly. The PDF generator consumes messages from the queue *at its own pace* (e.g., 500 per second). It might take 3 minutes to clear the queue, but the worker will never crash. You have traded latency (waiting 3 minutes for an invoice) for throughput and stability

### The failure

- Drain time longer than the burst interval. If your worker processes 500 PDFs per second, but a new batch of 100,000 messages arrives every 100 seconds, your queue will never empty. The math is brutal: if arrival rate exceeds processing rate over the long term, the queue grows to infinity and crashes the broker. A queue only levels load if there are quiet periods to drain the backlog
