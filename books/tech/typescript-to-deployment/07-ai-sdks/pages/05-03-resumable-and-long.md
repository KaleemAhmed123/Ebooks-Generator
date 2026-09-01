## Long answers and lost connections

- A ninety second answer will outlive some connections. Mobile networks drop, laptops sleep, and load balancers close idle sockets
- With a naive implementation the user gets half an answer, refreshes, and pays for the whole thing again

### The load balancer is the first thing to check

- An **idle timeout** counts time between bytes, so a stream that keeps sending is fine and a model thinking for seventy seconds is not
- Send a comment line as a heartbeat every fifteen seconds. It is ignored by the client and resets every idle timer between you and it

```ts
const heartbeat = setInterval(() => res.write(": ping\n\n"), 15_000)
res.on("close", () => clearInterval(heartbeat))
```

### Making a stream resumable

- The shape is the same as the async API pattern in Booklet 6, and the pieces are already familiar

1. Give every generation an id, and return it before the stream starts
2. Write each chunk to Redis under that id as well as to the socket
3. Send the chunk index as the SSE `id:` field on every event
4. On reconnect the browser sends `Last-Event-ID`, and you replay from Redis, then continue live

- The generation keeps running when the socket dies, so the answer is complete and paid for once

### When not to stream at all

- A batch job, a classification, or anything whose output feeds another function. Streaming there is complexity with no user watching
- Anything longer than roughly two minutes belongs on a queue with a job id, not on a held connection
