### The parts that are not obvious

| Line | Why |
|---|---|
| `npm ci`, not `npm install` | Installs exactly the lock file. `install` may resolve a different tree |
| `tini` | A tiny init that reaps orphaned child processes and forwards signals |
| `USER node` | The base image already provides this account. The process is not root |
| `HEALTHCHECK` | Compose gates dependent services and the deploy on this. Page 05-15 |
| `ENTRYPOINT` plus `CMD` | The entrypoint always runs, the command can be overridden |

### Why `tini` when the exec form already forwards signals

- Node as PID 1 does not reap zombie children. A service that shells out repeatedly accumulates them until the process table is full
- If nothing spawns child processes, `tini` can be dropped
