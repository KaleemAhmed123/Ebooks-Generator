## `cluster`

- One Node process uses one core. On an eight core machine, seven are idle while requests queue
- The obvious fix is to run eight copies, but two processes cannot both listen on port 3000
- **cluster** solves that by having one primary process own the port and hand accepted connections to worker processes
- Every worker runs your whole server, so eight cores serve eight requests at once
- What breaks is anything the workers assumed they were alone with
- An in-memory cache, a rate limit counter or a session store now exists eight times, each with different values
- A `setInterval` for a nightly job now runs eight times, which is the same trap as the scheduler page

```js
import cluster from "node:cluster"
import { availableParallelism } from "node:os"

if (cluster.isPrimary) {
  for (let i = 0; i < availableParallelism(); i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died, restarting`)
    cluster.fork()
  })
} else {
  app.listen(3000)
}
```

- The primary process accepts connections and hands them to workers
- `availableParallelism()` respects container CPU limits. `os.cpus().length` does not
