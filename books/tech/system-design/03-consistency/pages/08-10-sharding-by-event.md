## Sharding by Event

- Even with Redis locks and CDN waiting rooms, a single Postgres database cannot hold the connections for a Taylor Swift ticket drop. Ticketmaster must shard their database
- The natural shard key for a ticketing system is `event_id`. The Taylor Swift concert in New York has absolutely no data overlap with a local comedy show in Chicago

<svg viewBox="0 0 460 140" role="img" aria-label="Sharding by Event. The proxy routes Taylor Swift traffic to Shard 1 (bursting at 100%), while the Comedy Show traffic goes to Shard 2 (running at 5%), isolating the blast radius." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="65" text-anchor="middle" font-weight="bold">API</text>
  <text x="60" y="80" text-anchor="middle" font-weight="bold">Gateway</text>
  
  <rect x="150" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="74" text-anchor="middle" font-weight="bold">Router</text>
  
  <rect x="280" y="20" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="35" text-anchor="middle" font-weight="bold">Shard 1</text>
  <text x="330" y="50" text-anchor="middle" font-size="6">Event: Taylor Swift</text>
  <text x="330" y="60" text-anchor="middle" font-size="6" fill="#b8541a">100% CPU (Bursting)</text>
  
  <rect x="280" y="80" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="330" y="95" text-anchor="middle" font-weight="bold">Shard 2</text>
  <text x="330" y="110" text-anchor="middle" font-size="6">Event: Comedy Show</text>
  <text x="330" y="120" text-anchor="middle" font-size="6">5% CPU (Idle)</text>
  
  <path d="M100 70 L150 70" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M150 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M210 60 L280 40" stroke="#b8541a" fill="none" stroke-width="3"/><path d="M280 40 l-6 1 v5 z" fill="#b8541a" transform="rotate(-15 280 40)"/>
  
  <path d="M210 80 L280 100" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M280 100 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(15 280 100)"/>
</svg>

- **Isolating the blast radius**: By sharding on `event_id`, Ticketmaster ensures that even if the Taylor Swift drop completely melts Shard 1, it will not affect the local comedy show on Shard 2. Sharding is not just for storage capacity; it is for failure isolation

### The failure

- Sharding by `user_id` when the bottleneck is the event. If you shard by `user_id`, User A (who wants Taylor Swift) is routed to Shard 1, and User B (who wants Taylor Swift) is routed to Shard 2. Both shards must now coordinate to see if Seat 12A is available. You have reintroduced distributed transactions (2PC) during a massive traffic spike, guaranteeing a system failure
