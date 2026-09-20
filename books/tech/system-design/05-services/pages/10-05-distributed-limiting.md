## Distributed rate limiting

- Rate limiting is easy on a single instance. It is hard when you have 50 API servers, because the count must be shared
- To share the count, you usually put the rate limiting counters in a central Redis cluster. When an API server gets a request, it asks Redis to increment the counter and return the new value. If the value is over the limit, it rejects the request

````lua
-- Redis Lua script to atomically increment and set expiry
local current = redis.call("INCR", KEYS[1])
if tonumber(current) == 1 then
    redis.call("EXPIRE", KEYS[1], 60) -- Expire after 1 minute
end
return current
````

- Executing this as a single Lua script ensures the `INCR` and `EXPIRE` are atomic. If the script was split into two round trips, a crash between them would leave a counter in Redis that never expires

### The failure

- The failure is adding 50ms of Redis latency to every single API request. If you have to do a network round trip to Redis before you can process the user's request, you have severely degraded performance
- If performance matters more than perfect accuracy, you can divide the limit. If the global limit is 100/sec, and you have 10 servers, you configure each server with a local in-memory limit of 10/sec. You avoid the Redis call entirely, but if the load balancer sends 15 requests to Server A and 5 to Server B, Server A will reject 5 requests even though the global limit was not breached
