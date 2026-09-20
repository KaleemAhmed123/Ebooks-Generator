## Reading data you do not own

- Because there are no cross-database joins, displaying a screen that requires data from three services is difficult. You have two options: API composition or a materialized read model
- **API Composition** means a gateway or client makes three separate API calls and stitches the JSON together in memory. It is simple but slow
- **Materialized Read Model (CQRS)** means creating a local, read-only copy of the data. Service A listens to events from Service B and C, and builds a denormalized table optimised exactly for the screen it needs to render

<svg viewBox="0 0 460 140" role="img" aria-label="API Composition vs Materialized View. API composition fans out to three APIs. Materialized view reads one local DB built by events." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="115" y="20" text-anchor="middle" font-weight="bold">API Composition</text>
  <rect x="75" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="115" y="44" text-anchor="middle">Gateway</text>
  
  <rect x="25" y="80" width="50" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="90" y="80" width="50" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <rect x="155" y="80" width="50" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  
  <path d="M115 50 L50 80" stroke="#1a1a1a" fill="none"/>
  <path d="M115 50 L115 80" stroke="#1a1a1a" fill="none"/>
  <path d="M115 50 L180 80" stroke="#1a1a1a" fill="none"/>
  <text x="115" y="120" text-anchor="middle">Slow, simple</text>

  <text x="345" y="20" text-anchor="middle" font-weight="bold">Materialized View</text>
  <rect x="305" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="345" y="44" text-anchor="middle">Gateway</text>
  
  <rect x="305" y="80" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-width="2"/>
  <text x="345" y="94" text-anchor="middle">Read Model</text>
  <path d="M345 50 L345 80" stroke="#1a1a1a" fill="none"/>
  
  <path d="M410 80 L385 85" stroke="#b8541a" fill="none" stroke-dasharray="2"/>
  <text x="430" y="80" text-anchor="middle" font-size="7">Events</text>
  
  <text x="345" y="120" text-anchor="middle">Fast, eventually consistent</text>
  
  <path d="M230 10 L230 130" stroke="#cccccc" stroke-dasharray="4"/>
</svg>

- If you need to search or filter across domains (e.g., "find all orders for users in Canada"), API composition fails. You cannot fetch all orders and all Canadian users to join them in memory. You must build a read model

### The failure

- The most common failure is an N+1 query over the network. A service fetches a list of 50 orders, and then makes 50 sequential HTTP calls to the User service to fetch the names
- This brings both services to a crawl. If you must use API composition, you must use batch endpoints (`GET /users?ids=1,2,3`) to fetch the related data in one hop
