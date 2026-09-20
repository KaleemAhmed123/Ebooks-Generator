## Failure handling and trade-offs

- Before you finish the interview, you must stress-test your architecture. Look at every arrow in your diagram (every network hop). As covered in Booklet 01, you must ask what happens when it breaks
- Use the five-question framework on your own design: Where is the state? Who owns it? What happens if the node dies? What happens if the network drops the reply? What happens if a request is duplicated?
- When you propose a solution, you must state its trade-off. "We will add a cache to fix the read latency, but that means we now have to handle cache invalidation and stale reads."

<svg viewBox="0 0 600 180" role="img" aria-label="A diagram mapping the five failure questions to a service-to-database arrow." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <rect x="50" y="70" width="100" height="50" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <text x="100" y="100" text-anchor="middle" fill="#3730a3">Service A</text>
  
  <path d="M 450 70 Q 480 50 510 70 L 510 120 Q 480 140 450 120 Z" fill="#ffe4e6" stroke="#f43f5e"/>
  <path d="M 450 70 Q 480 90 510 70" fill="none" stroke="#f43f5e"/>
  <text x="480" y="105" text-anchor="middle" fill="#9f1239">Database</text>
  
  <path d="M 160 95 L 440 95" stroke="#18181b" stroke-width="2" fill="none" marker-end="url(#arrow-black)"/>
  
  <rect x="230" y="75" width="120" height="40" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
  <text x="290" y="94" text-anchor="middle" fill="#92400e" font-weight="bold">Network Drop</text>
  <text x="290" y="108" text-anchor="middle" fill="#92400e" font-size="10">Timeout + Retry</text>
  
  <text x="100" y="55" text-anchor="middle" fill="#52525b" font-weight="bold">1. Node Dies</text>
  <text x="100" y="140" text-anchor="middle" fill="#52525b" font-weight="bold">3. Duplicate</text>
  
  <text x="480" y="50" text-anchor="middle" fill="#52525b" font-weight="bold">2. Store Dies</text>
  
  <path d="M 230 45 Q 260 20 290 45" stroke="#f59e0b" fill="none" stroke-dasharray="4"/>
  <text x="290" y="35" text-anchor="middle" fill="#92400e" font-size="10">Circuit Breaker</text>
  
  <defs>
    <marker id="arrow-black" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#18181b"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is treating infrastructure as magic. A candidate will say "we'll just use a message queue here to make it reliable" without acknowledging that queues have their own failure modes
- If you add a message queue, the interviewer expects you to answer: What happens when the consumer dies mid-processing? Is it at-least-once or at-most-once? If it is at-least-once, how is the consumer idempotent?

:::interview
**The trade-off test**
If a candidate cannot name three reasons why their own design is flawed, they do not understand the design. Every system is a compromise.
:::
