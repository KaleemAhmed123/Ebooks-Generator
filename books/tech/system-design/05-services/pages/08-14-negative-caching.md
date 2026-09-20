## Negative caching

- When an application asks the cache for `user:999`, and the user does not exist in the database, the cache cannot simply stay empty. If the cache stays empty, every subsequent request for `user:999` will result in a cache miss, forcing another query to the database
- If an attacker scans your API for millions of random, non-existent IDs, they will bypass your cache entirely and crash your database. This is a cache bypass attack
- To fix this, you must use Negative Caching. You cache the "Not Found" result itself

````typescript
async function getUser(id: string) {
  const cached = await redis.get(`user:${id}`);
  
  // 1. Check for the negative cache marker
  if (cached === "NOT_FOUND") return null;
  if (cached) return JSON.parse(cached);
  
  const user = await db.query("...", [id]);
  
  // 2. If missing, write the negative marker with a short TTL
  if (!user) {
    await redis.set(`user:${id}`, "NOT_FOUND", 'EX', 30);
    return null;
  }
  
  await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
  return user;
}
````

### The failure

- The failure is giving the negative cache entry an infinite TTL. If a user tries to view a product page before the admin has finished publishing it, the cache will record "Not Found" forever
- Even after the admin publishes the product, the users will see a 404. Negative cache entries must always have a short TTL (e.g., 10 to 30 seconds), so the system naturally heals if the item is later created
