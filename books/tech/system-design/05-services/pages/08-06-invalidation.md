## Cache invalidation

- The hardest problem in caching is knowing when to remove data. If an application updates a record in the database, it must also invalidate that record in the cache
- The safest rule is: **Delete on write, do not update on write**. Because deletes are idempotent, sending multiple deletes is safe. Trying to compute the new value and write it into the cache risks a race condition

<svg viewBox="0 0 460 140" role="img" aria-label="Cache invalidation. App writes to DB, then deletes from cache." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="68" text-anchor="middle">Application</text>
  
  <rect x="180" y="90" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="220" y="108" text-anchor="middle">Database</text>
  
  <rect x="180" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="38" text-anchor="middle">Cache (Redis)</text>
  
  <path d="M100 65 L180 95" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M175 92 l5 3 l-2 -5 z" fill="#1a1a1a"/>
  <text x="140" y="90" text-anchor="middle" font-size="7">1. Write</text>
  
  <path d="M100 50 L180 40" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M175 38 l5 2 l-1 -5 z" fill="#1a1a1a"/>
  <text x="140" y="35" text-anchor="middle" font-size="7">2. Delete Key</text>
</svg>

- Even "delete on write" is flawed if the application crashes between step 1 and step 2. To solve this at scale, companies like Facebook use event-driven invalidation (e.g., `mcsqueal`). A separate daemon tails the database commit log, parses the successful writes, and reliably sends the delete commands to the cache. This ensures the cache is always cleared, even if the application crashes

### The failure

- The failure is using "update-on-write" without distributed locks. Thread A reads `count=1`, increments to 2, writes to the DB, and pauses. Thread B reads `count=2`, increments to 3, writes to the DB, and writes `3` to the cache. Thread A wakes up and writes `2` to the cache
- The database correctly holds `3`, but the cache holds `2`. The cache is permanently poisoned until the key expires. Deleting the key instead of updating it avoids this reordering bug entirely
