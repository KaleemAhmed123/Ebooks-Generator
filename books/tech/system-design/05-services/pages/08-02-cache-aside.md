## Cache-aside

- The most common caching pattern is Cache-Aside (also called look-aside). The application code is responsible for checking the cache, and if the data is missing, the application queries the database and puts the result into the cache

````typescript
async function getUser(id: string): Promise<User> {
  // 1. Check the cache
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  // 2. Cache miss: Read from database
  const user = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  
  // 3. Populate the cache for the next caller
  await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
  
  return user;
}
````

<svg viewBox="0 0 460 140" role="img" aria-label="Cache-aside. App checks cache, gets miss, reads DB, writes to cache." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="68" text-anchor="middle">Application</text>
  
  <rect x="180" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="38" text-anchor="middle">Cache (Redis)</text>
  
  <rect x="180" y="90" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="220" y="108" text-anchor="middle">Database</text>
  
  <path d="M70 50 L180 35" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <text x="125" y="30" text-anchor="middle" font-size="7">1. Miss</text>
  
  <path d="M100 65 L180 95" stroke="#1a1a1a" fill="none"/>
  <path d="M175 92 l5 3 l-2 -5 z" fill="#1a1a1a"/>
  <text x="140" y="90" text-anchor="middle" font-size="7">2. Read</text>
  
  <path d="M100 50 L180 40" stroke="#1a1a1a" fill="none"/>
  <path d="M175 38 l5 2 l-1 -5 z" fill="#1a1a1a"/>
  <text x="140" y="55" text-anchor="middle" font-size="7">3. Write</text>
</svg>

### The failure

- The failure is the read-fill race condition. Thread A misses the cache and reads the database (finding `count=1`). Before Thread A can write to the cache, Thread B updates the database (`count=2`) and deletes the cache key
- Finally, Thread A finishes its work and writes `count=1` into the cache. Thread B's update is completely overwritten in the cache by Thread A's stale read. The cache will serve the wrong data until the key expires
