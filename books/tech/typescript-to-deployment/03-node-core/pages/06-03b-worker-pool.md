## Pooling workers

- A worker thread costs tens of milliseconds to start and a few megabytes of memory
- Creating one per request means the startup cost is paid on every call, which is often slower than doing the work inline
- A **pool** starts a fixed number once and reuses them, so the cost is paid at boot
- It also caps concurrency. Without a limit, a burst of traffic spawns hundreds of threads and the machine runs out of memory

```bash
npm i piscina
```

```js
import Piscina from "piscina"
import { availableParallelism } from "node:os"

const pool = new Piscina({
  filename: new URL("./worker.js", import.meta.url).href,
  maxThreads: availableParallelism(),
  idleTimeout: 30_000,
})

const total = await pool.run({ rows })
```

```js
// worker.js
export default ({ rows }) => rows.reduce((sum, r) => sum + r.amount, 0)
```

### Sizing it

- Start at the number of cores, from `availableParallelism()` which respects container limits
- More threads than cores does not add throughput for CPU-bound work. It adds context switching
- Leave a core for the main thread, which still has to serve requests

### The cost that decides whether it is worth it

- Arguments and results are **structured cloned**, so a large payload is copied twice
- Sending a hundred megabyte array to a worker can cost more than the calculation
- Pass a `SharedArrayBuffer`, or send an id and let the worker fetch the data itself
