## Stateless vs stateful

- A **stateless** process can be replaced without anyone noticing. Kill it, start a new one, route the next request there. Nothing was lost
- A **stateful** process holds data that no other process has. Kill it and that data is gone until it recovers
- The twelve-factor rule: "Twelve-factor processes are stateless and share-nothing." Anything that must persist lives in a backing service: a database, Redis, an object store

| Thing people store in process memory | Why it breaks on the second replica |
|---|---|
| Session (logged-in user) | request lands on the other node, user is logged out |
| In-memory cache | one node has the value, the other does not; responses differ |
| Upload progress | the next chunk goes to a different node; the upload restarts |
| In-process rate limiter | each node counts separately; the limit is N× what it should be |

- Sticky sessions — routing a user to the same node — are a workaround, not a fix. The twelve-factor manifesto: "Sticky sessions are a violation of twelve-factor and should never be used or relied upon." They break on scale-in, deploys, and node failure

### The test

- If a pod dies and a user does not notice, the process was stateless
- If a pod dies and a user loses their session, their upload, or their count, the process was stateful and nobody said so

### The failure

- An in-memory cache on one of four replicas. That replica always returns fast; the other three always miss. Response times look random. Nobody suspects the cache that only one replica has
