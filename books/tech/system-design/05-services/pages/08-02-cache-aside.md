## Cache-aside

- The application owns both stores: check the cache, and on a miss read the database and fill. Facebook calls it a "demand-filled look-aside cache", and the name is the design — nothing is in the cache until somebody asks for it

```typescript
async function getUser(id: string): Promise<User | null> {
  const hit = await redis.get(`user:${id}`).catch(() => null);  // cache down → a miss
  if (hit) return JSON.parse(hit);                  // may be the marker from page 14

  const user = await db.one("SELECT * FROM users WHERE id = $1", [id]);
  void redis.set(`user:${id}`, JSON.stringify(user), { EX: 3600 })
    .catch(() => {});                               // the fill is best-effort, not awaited
  return user;
}
```

<svg viewBox="0 0 460 76" role="img" aria-label="The read-fill race in cache-aside. Reader A misses the cache and starts a database read that returns the value 1, and its read stays in flight for a long time. While it is in flight, writer B writes the value 2 to the database and deletes the cache key. Reader A then completes and sets the key to 1. The database holds 2, the cache holds 1, and nothing will correct it before the entry expires." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="26" font-size="6.5">reader A</text>
  <rect x="70" y="18" width="310" height="10" rx="2" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="76" y="26" font-size="6">miss → reads the database → gets 1</text>
  <text x="384" y="26" font-size="6" fill="#bf4c28">SET = 1</text>
  <text x="4" y="48" font-size="6.5">writer B</text>
  <rect x="180" y="40" width="130" height="10" rx="2" fill="#fbe9e2" stroke="#bf4c28"/>
  <text x="186" y="48" font-size="6">writes 2 → deletes the key</text>
  <line x1="70" y1="58" x2="440" y2="58" stroke="#333"/><text x="440" y="68" text-anchor="end" font-size="6">time →</text>
  <text x="4" y="72" font-size="7" fill="#bf4c28">✕ the database holds 2, the cache holds 1, and nothing corrects it before the TTL</text>
</svg>

- Two properties make it the default. A cache node dying costs latency, not correctness, because the database is still the only source of truth. And only data somebody actually requested occupies memory, which for most workloads is a small fraction of the table
- The fill is deliberately not awaited for correctness: if Redis is down, the function still returns the user. A cache-aside read path that throws when the cache is unavailable has converted an optimisation into a dependency

### The failure

- The read-fill race in the diagram. A's read is already in flight when B writes and deletes, so B's delete lands on a key that does not exist yet, and A then creates it holding the value B just replaced. The cache is now wrong and no further write will fix it
- The window is the duration of the read, so it widens exactly when the database is slow. Mitigations are leases (page 8) and keeping TTLs short enough to bound the damage, which is why "delete on write" alone is not sufficient and page 6 has more to say
