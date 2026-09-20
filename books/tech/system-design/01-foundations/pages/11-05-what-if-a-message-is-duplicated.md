## 4. What if a message is duplicated?

- Because the network is unreliable, exactly-once delivery is impossible. The only delivery guarantee a distributed system can actually provide is at-least-once (Module 7)
- Therefore, you must assume every message, event, and HTTP request will eventually arrive twice

### The deduplication layer

- Every consumer of a message or request must be idempotent. This usually means keeping a record of recently processed message IDs
- If you process 1,000 messages a second, keeping every ID forever is too expensive. You must set a Time-To-Live (TTL) on the deduplication store
- The TTL must be longer than the maximum possible retry window. If the client gives up retrying after 24 hours, the deduplication store must keep the ID for 24 hours

### The failure

- A deduplication store with a 5-minute TTL. A client sends a request. The server processes it, but the reply is lost. The client's network goes down for 10 minutes. The client reconnects and retries. The server's deduplication store has forgotten the ID, so the server processes it again
- The TTL on the server's deduplication store must strictly exceed the client's maximum retry window
