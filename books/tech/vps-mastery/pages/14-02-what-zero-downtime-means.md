## What zero downtime means

- **No request fails because of the deploy.** Requests in flight when the switch happens complete against the version that started them

### What it does not mean

- No slow requests. A new stack has cold caches and empty connection pools
- No dropped WebSocket connections. Long-lived connections to the old stack end when it stops
- No user-visible change. A frontend deploy still means the next page load is a different build

### The three approaches

| | How | Extra RAM | Complexity |
|---|---|---|---|
| **Rolling** | Replace containers one at a time | One container | Medium |
| **Blue-green** | Two full stacks, switch, remove the old | **Double** | Low to reason about |
| **Canary** | Send a percentage to the new version | Double | High. Needs traffic splitting |

### Why this booklet uses blue-green

- **It is the one that is easy to reason about at 3am.** There is an old stack and a new stack. One is live. Rolling back is switching back
- Rolling updates on one box mean a window where old and new run simultaneously anyway, with no clean rollback point
- The cost is honest: the box must fit two copies of the application. Page 14-11 covers what to do when it does not

### The rule that makes it work

- **Old and new run at the same time, against the same database.** Every deploy must be backwards compatible for the length of the flip
- That constraint is not optional and it is not new. Page 12-09 is where it is handled
