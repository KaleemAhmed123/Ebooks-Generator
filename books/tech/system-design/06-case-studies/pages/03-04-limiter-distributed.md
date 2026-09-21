## Distributed counters

- Gateways are many and stateless; a client's requests land on any of them. A count kept in one gateway's memory is a limit per gateway, which with 20 gateways is 20× the limit. The count lives in a shared store, and the store is the limiter's only state
- The store is a key-value cache, not a database: the value is an integer, the operation is increment, and a lost count costs a few extra requests, not money. Redis `INCR` is atomic on the server, so two gateways incrementing at once produce 7, never 6. The window's expiry has to be set in the same atomic step, or a key whose `EXPIRE` was lost counts forever

```lua
-- one Redis call per request, atomic: EVAL script 1 key window_seconds
local n = redis.call("INCR", KEYS[1])
if n == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
return n
```

- Where the store lives decides the accuracy. Cloudflare keeps the counters in memcached inside each point of presence, spread across nodes by consistent hashing, so a limit is enforced per PoP and a client that reaches two PoPs gets two allowances. A single global store would be one round trip across the world per request; the per-PoP inaccuracy is the price of the latency budget on page 1, and it is stated as such
- Key shape `rl:{tenant}:{route}:{window start}`; sliding (page 3) reads this window's key and the previous one's. A hot tenant is a hot key on one shard (booklet 02): split it into `key:0 … key:7` and sum on read, or batch increments in the gateway

:::interview
"How does the limit hold across many gateways?" — It does not hold in the gateways. Every gateway increments one key in a shared cache with an atomic `INCR` whose expiry is set in the same script. Then the two costs: one cache round trip per request, and a limit that is per cache, so per region or per PoP, not global, unless the design pays for a global round trip.
:::

### The failure

- Read, add one, write back. Two gateways read 5 in the same millisecond, both write 6, and the client got a free request; at a thousand a second it gets hundreds. The store's atomic increment exists so that the count is never held in the caller's hands
