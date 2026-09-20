## Distributed counters

- A single server can store counters in memory, but a distributed system has many API gateways. If a user hits Gateway A for one request and Gateway B for the next, the limit must be enforced globally
- The standard solution is a fast, in-memory distributed store like Redis. The gateways write to Redis. However, Redis operations must be atomic. If a gateway reads the counter, increments it, and writes it back, two gateways acting simultaneously will cause a race condition
- The fix is to use Redis's `INCR` command, which is atomic, combined with an `EXPIRE` command to clear out old windows. To ensure both commands execute together without being interrupted, wrap them in a single Lua script
- **Scaling the limiter:** A single global Redis cluster will buckle under the traffic of a massive API. Instead of a global limit, enforce limits per Point of Presence (PoP) or datacenter. If a user is allowed 100 requests, and you have two active datacenters, give each datacenter a limit of 50

```lua
-- Redis Lua Script: Atomic increment and expire
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  -- If this is the first request in the window, set the expiry
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
return count
```

### The failure

- The failure mode is describing a read-modify-write cycle in the application code without addressing race conditions
- If you read `count = 5`, increment it to 6, and write it back, and another server does the exact same thing in the same millisecond, the final count is 6 instead of 7. You have effectively given the user free requests

:::interview
**The atomicity test**
If you propose a distributed cache for counters, the interviewer expects you to immediately explain how you prevent race conditions. Mentioning Lua scripts or atomic increments is mandatory.
:::
