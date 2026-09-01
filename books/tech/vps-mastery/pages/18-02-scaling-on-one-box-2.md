### Node uses one core per process

- A single Node process uses one core regardless of how many the box has. On four cores, four replicas is roughly four times the throughput
- Cluster mode inside one container achieves the same thing with less orchestration:

```ts
import cluster from "node:cluster";
import { availableParallelism } from "node:os";

if (cluster.isPrimary) {
  for (let i = 0; i < availableParallelism(); i++) cluster.fork();
} else {
  startServer();
}
```

- **Set a container CPU limit when doing this**, or the process count is based on the host's cores rather than the container's allowance

### The order to try things

1. Fix the slow query. Usually worth more than any amount of scaling
2. Add a cache
3. Vertical, a bigger box
4. Horizontal, replicas behind Nginx
