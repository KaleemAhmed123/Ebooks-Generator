## The virtual waiting room

- Redis solves contention for a single seat, but what if 10 million users try to hit the site at exactly 10:00:00 AM? Even a giant Redis cluster will struggle. We need to throttle the traffic before it even reaches our application servers
- This requires **Queueing Theory**. We introduce a **Virtual Waiting Room** at the CDN edge (e.g., Cloudflare Workers or AWS Lambda@Edge)

<svg viewBox="0 0 460 140" role="img" aria-label="The virtual waiting room. 10 million users hit the CDN. The CDN queues them and only lets 5,000 users per minute through to the backend API." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="60" text-anchor="middle" font-weight="bold">10 Million</text>
  <text x="60" y="70" text-anchor="middle" font-weight="bold">Users</text>
  
  <rect x="150" y="20" width="100" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="35" text-anchor="middle" font-weight="bold">CDN Edge</text>
  <text x="200" y="55" text-anchor="middle" font-size="7">Virtual Queue</text>
  <text x="200" y="80" text-anchor="middle" font-size="6">"You are number</text>
  <text x="200" y="90" text-anchor="middle" font-size="6">4,000,000 in line"</text>
  
  <rect x="330" y="40" width="100" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="380" y="65" text-anchor="middle" font-weight="bold">Backend API</text>
  <text x="380" y="85" text-anchor="middle" font-size="7">(Safely scaled)</text>
  
  <path d="M100 70 L150 70" stroke="#1a1a1a" fill="none" stroke-width="4"/><path d="M150 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M250 70 L330 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M330 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="290" y="65" text-anchor="middle" font-size="6" fill="#1d4e89" font-weight="bold">5,000 / minute</text>
</svg>

- The Waiting Room acts as a massive shock absorber. The 10 million users are held in a lightweight HTML queue managed entirely by the CDN. The backend API is completely shielded. The CDN slowly trickles users through to the backend at a rate the database is mathematically proven to handle (e.g., 5,000 users per minute)

### The failure

- Letting users hammer the backend to "see if it works". If you don't use a CDN waiting room, your users will naturally spam the refresh button at 10:00:00 AM, amplifying your 10 million users into 100 million requests per second. The infrastructure will catch fire. You must strictly control the inflow
