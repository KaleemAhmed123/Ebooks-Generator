## Load shedding

- When a service receives more traffic than it can handle, queueing the requests seems polite. It is actually lethal. If requests sit in a queue for 10 seconds, the client has already timed out. When the server finally processes the request, it is doing dead work
- Load shedding is the practice of intentionally rejecting traffic at the front door to protect the server's capacity. You drop requests early and cheaply with a 503 so the requests you *do* accept can finish in time

<svg viewBox="0 0 460 140" role="img" aria-label="Load shedding vs queueing. Without shedding, goodput crashes to zero when overloaded. With shedding, goodput plateaus at max capacity." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 120 L200 120" stroke="#1a1a1a" stroke-width="1"/>
  <path d="M40 120 L40 20" stroke="#1a1a1a" stroke-width="1"/>
  <text x="120" y="135" text-anchor="middle">Offered Load (QPS)</text>
  <text x="30" y="70" text-anchor="middle" transform="rotate(-90 30 70)">Goodput</text>
  
  <path d="M40 120 L100 40 Q130 40 180 110" stroke="#cc0000" fill="none" stroke-width="2"/>
  <text x="160" y="80" text-anchor="middle" fill="#cc0000">No Shedding</text>
  
  <path d="M260 120 L420 120" stroke="#1a1a1a" stroke-width="1"/>
  <path d="M260 120 L260 20" stroke="#1a1a1a" stroke-width="1"/>
  <text x="340" y="135" text-anchor="middle">Offered Load (QPS)</text>
  
  <path d="M260 120 L320 40 L410 40" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="380" y="30" text-anchor="middle" fill="#1d4e89">With Shedding</text>
  <path d="M320 40 L320 120" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="320" y="115" text-anchor="middle" font-size="7">Capacity limit</text>
</svg>

- To shed load safely, requests must be categorized by priority. Stripe, for example, assigns four priority classes: Critical (payment captures), POST (mutations), GET (reads), and Test mode. When saturated, it drops test-mode traffic first, then reads, to preserve the capacity for payments

### The failure

- The failure is an unbounded in-memory queue. As load increases, memory fills up, garbage collection thrashes, and the server OOMs at 03:00. The classic "goodput goes to zero" curve
- Even if the server doesn't crash, queueing creates latency. A load balancer that buffers requests while the application servers are saturated will just guarantee that every single request times out
