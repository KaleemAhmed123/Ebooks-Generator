### Finding a leak

```bash
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}"
```

- Memory rising steadily and never falling, across hours, is a leak. Memory rising then flattening is a cache filling, which is normal

```bash
node --max-old-space-size=384 dist/main.js
```

- Setting the heap limit below the container limit makes Node throw a heap error, which is diagnosable, instead of being killed silently

### The immediate mitigations

- Add swap, page 02-11. It converts a kill into slowness
- Lower `maxmemory` on Redis and `shared_buffers` on Postgres
- Reduce the number of services running two colors at once during a deploy
