## Redis, the parts that matter in production

### Pipelines cut round trips

```ts
const results = await redis
  .pipeline()
  .get("seller:s1")
  .get("seller:s2")
  .incr("hits")
  .exec()
```

- One network round trip instead of three
- A loop of a hundred `await redis.get()` calls is a hundred round trips

### Lua for atomicity

```ts
const takeToken = `
  local current = tonumber(redis.call('GET', KEYS[1]) or 0)
  if current >= tonumber(ARGV[1]) then return 0 end
  redis.call('INCR', KEYS[1])
  redis.call('EXPIRE', KEYS[1], ARGV[2])
  return 1
`

const allowed = await redis.eval(takeToken, 1, `rl:${ip}`, 100, 60)
```

- A script runs as one atomic unit. Check and increment cannot interleave
- `MULTI` queues commands but cannot branch on a value. Lua can

### Locks are harder than they look

- `SET key value NX PX 5000` is a lock
- Deleting it needs a Lua script that checks the token first, or you release someone else's lock
- Single-node locks are best effort. If correctness depends on it, use a database constraint instead

### `redis` versus `ioredis`

- `redis` 6.2.1 is the official client, and modern versions are good
- `ioredis` still wins on cluster support and is what BullMQ requires
