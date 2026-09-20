## What a CDN is

- If your servers are in New York, a user in Tokyo will always experience at least 150ms of latency on every HTTP request, just because of the physical speed of light through fiber optic cables
- A Content Delivery Network (CDN) is a massive network of reverse proxies scattered all over the globe. These servers are called Points of Presence (PoPs)
- When a user in Tokyo requests `style.css`, DNS routes them to the Tokyo PoP. The Tokyo PoP checks its local cache. If it misses, it fetches the file from your New York server (the "Origin"), caches it in Tokyo, and serves it. The next Tokyo user gets it in 5ms

<svg viewBox="0 0 460 140" role="img" aria-label="CDN architecture. User in Tokyo hits Tokyo PoP which caches from NY Origin." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="73" text-anchor="middle">User (Tokyo)</text>
  
  <rect x="140" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="38" text-anchor="middle">Tokyo PoP</text>
  
  <rect x="140" y="90" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="108" text-anchor="middle">London PoP</text>
  
  <rect x="280" y="55" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="73" text-anchor="middle">Origin Server (NY)</text>
  
  <path d="M80 70 L140 35" stroke="#1a1a1a" fill="none"/>
  <path d="M135 38 l5 -3 l-1 5 z" fill="#1a1a1a"/>
  <text x="115" y="45" text-anchor="middle" font-size="7">1. Request</text>
  
  <path d="M220 35 L280 60" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M275 58 l5 2 l-3 -5 z" fill="#1a1a1a"/>
  <text x="250" y="45" text-anchor="middle" font-size="7">2. Cache Miss</text>
  
  <path d="M220 105 L280 80" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
</svg>

- A CDN is a "Shared Cache". It caches a single copy of a file and serves it to thousands of different users

### The failure

- The failure is the CDN caching a personalized page. If a logged-in user requests `/dashboard`, and your origin server returns the HTML for their dashboard without telling the CDN to keep it private, the CDN might cache it
- The next user who requests `/dashboard` will be served the first user's private HTML, instantly leaking sensitive data across accounts. You must strictly control what the CDN is allowed to cache
