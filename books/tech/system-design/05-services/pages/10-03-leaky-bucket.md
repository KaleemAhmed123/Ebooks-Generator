## Leaky bucket

- The Token Bucket allows sudden bursts of traffic. The Leaky Bucket does the exact opposite: it smooths traffic out into a perfectly steady stream
- Imagine a bucket with a hole in the bottom. Water (requests) pours into the top at any speed. But water leaks out the bottom at a strict, fixed rate (e.g., 10 requests per second). If water pours in faster than it leaks out, the bucket fills up. If the bucket overflows, new requests are discarded (429)

<svg viewBox="0 0 460 140" role="img" aria-label="Leaky bucket algorithm. Requests pour in fast, but leak out at a slow, fixed rate." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M160 40 L160 110 L180 110 L180 120 L190 120 L190 110 L210 110 L210 40" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  
  <rect x="165" y="70" width="40" height="38" fill="#e2fcf3"/>
  <text x="185" y="93" text-anchor="middle" font-size="7">Queue</text>
  
  <path d="M170 10 L170 35" stroke="#4a8f3c" stroke-width="2" fill="none"/>
  <path d="M190 20 L190 35" stroke="#4a8f3c" stroke-width="2" fill="none"/>
  <path d="M200 15 L200 35" stroke="#4a8f3c" stroke-width="2" fill="none"/>
  <text x="185" y="5" text-anchor="middle" font-size="7">Bursty Input</text>
  
  <path d="M185 125 L185 140" stroke="#b8541a" stroke-width="2" fill="none"/>
  <path d="M182 137 l3 5 l3 -5 z" fill="#b8541a"/>
  <text x="245" y="135" text-anchor="middle" font-size="7">Steady Output Rate</text>
</svg>

- **Meter form:** Simply rejects requests when the bucket is full.
- **Queue form:** The bucket is an actual FIFO queue. Requests enter the queue. A background worker pulls from the queue exactly 10 times a second and processes them.

### The failure

- The failure is the added latency during a burst. If you use the queue form of the Leaky Bucket, and the bucket holds 100 requests leaking at 10 requests per second, the 100th request will sit in the queue for 10 seconds before it is processed
- This is acceptable for async background jobs, but completely unacceptable for a user-facing HTTP API. Users will close the browser tab before the request finishes
