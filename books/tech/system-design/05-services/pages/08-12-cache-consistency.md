## What "consistent" means for a cache

- A cache is naturally eventually consistent. If you tolerate a 5-minute TTL, you are accepting that users might see 5-minute-old data
- However, there is one consistency guarantee that users demand: **Read-Your-Writes**. If a user edits their own profile, and then refreshes the page, they expect to see their changes immediately. If they see the old data, they assume the save failed and will click "Save" again, duplicating the work

<svg viewBox="0 0 460 140" role="img" aria-label="Read-your-writes. Write hits DB and deletes cache. Read hits cache miss and fills from DB." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="44" text-anchor="middle">User Client</text>
  
  <rect x="180" y="30" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="44" text-anchor="middle">Cache</text>
  
  <rect x="180" y="90" width="80" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="220" y="104" text-anchor="middle">Database</text>
  
  <path d="M100 40 L180 95" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M175 92 l5 3 l-2 -5 z" fill="#1a1a1a"/>
  <text x="140" y="85" text-anchor="middle" font-size="7">1. Update DB</text>
  
  <path d="M180 100 L260 50" stroke="#1a1a1a" fill="none"/>
  <path d="M255 53 l5 -3 l-1 5 z" fill="#1a1a1a"/>
  <text x="240" y="80" text-anchor="middle" font-size="7">2. Clear Cache</text>
</svg>

- To achieve this, the write path *must* synchronously invalidate the cache for that specific user's data before returning HTTP 200 OK to the client. The client's subsequent refresh will then be forced to read the fresh data from the database

### The failure

- The failure is relying on a background async invalidation (like tailing the commit log) when the client expects Read-Your-Writes. If the async invalidation takes 1 second, and the user refreshes in 200ms, they see the old data
- You can fix this by writing the new value directly into the cache (with the race-condition risks discussed earlier), or by having the client pass a version token (an ETag) that forces the server to bypass the cache if the cache is older than the client's token
