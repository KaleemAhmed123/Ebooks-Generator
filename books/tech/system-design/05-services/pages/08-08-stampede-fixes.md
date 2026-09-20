## Fixing the stampede

- There are three primary ways to fix a cache stampede:

| Fix | How it works | When to use it |
|---|---|---|
| **Request Coalescing** | The app tracks in-flight queries. If 10 requests for the same key arrive, the app sends 1 query and makes the other 9 wait. | Always. It is easy to implement and costs nothing. |
| **Cache Leases** | On a miss, Redis returns a short-lived "lease" token to the first caller, and tells subsequent callers to wait or retry. | When you have dozens of app instances hitting the DB at once. |
| **Probabilistic Refresh** | The app checks if the key is *almost* expired. It uses math (`now - Δ·β·ln(rand) ≥ expiry`) to randomly decide if it should recompute early. | When queries take a very long time and users cannot wait. |

````typescript
// Single-flight request coalescing in Node.js
const inFlight = new Map<string, Promise<any>>();

async function getWithCoalescing(key: string) {
  if (inFlight.has(key)) return inFlight.get(key);
  
  const promise = fetchFromDb(key).finally(() => {
    inFlight.delete(key);
  });
  
  inFlight.set(key, promise);
  return promise;
}
````

### The failure

- The failure is implementing a distributed lock with no TTL. If the thread holding the lease crashes before writing to the cache, all other threads will wait forever for a lock that never unlocks
- Every distributed lock or lease must have a strict timeout (e.g., 10 seconds)
