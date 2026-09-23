## Fixing the stampede

- Three mechanisms at three scopes. They stack rather than compete, and which are needed follows from how many processes can miss one key at once

| Fix | Scope | Mechanism |
|---|---|---|
| Single-flight | one process | in-flight calls per key are shared; later callers await the first |
| Leases | the whole fleet | the cache hands the first misser a token and makes the rest wait |
| Early refresh | one key | recompute slightly before expiry, chosen at random per request |

- Memcache's leases are the fleet-wide version: a 64-bit token issued on a miss, returned **only once every 10 seconds per key**, so every other process waits or serves stale. That cut peak database queries on stampede-prone keys from 17 000/s to 1 300/s
- Early refresh removes the cliff rather than guarding it. XFetch recomputes when `now − Δ·β·ln(rand) ≥ expiry`, with `Δ` the last recompute's duration and `β` defaulting to 1, so expensive keys start earlier and no two requests decide together

```typescript
const inFlight = new Map<string, Promise<unknown>>();

function singleFlight<T>(key: string, work: () => Promise<T>): Promise<T> {
  const running = inFlight.get(key) as Promise<T> | undefined;
  if (running) return running;                        // join the call already in progress
  const p = work().finally(() => inFlight.delete(key));
  inFlight.set(key, p);                               // set before awaiting: no gap to race in
  return p;
}
```

- Single-flight is per process, so forty instances still make forty queries — but it is the only one of the three that keeps working when the cache itself is unreachable

### The failure

- A lease or lock with no expiry. The holder crashes between taking it and filling the key, every other caller waits on something never released, and the stampede has become a hang — worse, because it never recovers on its own. Every lease needs a timeout, and it is an upper bound on the refill rather than a guess: Memcache's ten-second rule reissues the token on a schedule whatever became of the last holder
