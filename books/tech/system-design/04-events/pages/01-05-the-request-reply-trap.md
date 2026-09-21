## The request-reply trap

- The first thing a team misses after going async is the return value. The usual patch: publish with a **correlation id** (a unique id the reply must carry back) and a **reply-to** queue name, then wait for the message with that id

```typescript
async function call<T>(queue: string, body: unknown, ms = 5000): Promise<T> {
  const correlationId = crypto.randomUUID();
  const reply = new Promise<T>((resolve, reject) => {
    const off = broker.consume(replyQueue, (m) => {
      if (m.correlationId !== correlationId) return;
      off(); resolve(m.body as T);
    });
    setTimeout(() => { off(); reject(new Error("reply timeout")); }, ms);
  });
  await broker.publish(queue, body, { correlationId, replyTo: replyQueue });
  return reply;
}
```

- This is RPC rebuilt on a broker, and it inherits both failure sets. The caller still blocks, still times out, still needs a retry policy (booklet 01). The broker adds its own: the reply can be duplicated, arrive after the timeout, or reach a caller that has restarted since
- Two details carry the correctness. Subscribe before publishing, or a fast reply is missed. Filter by id, because a shared reply queue carries other callers' replies. Both mistakes pass a local test
- If the caller needs the answer to continue, call the service directly. The broker is for the part nobody waits for

### The failure

- A reply that never comes because the reply queue was recreated. The API process restarts and declares a fresh, auto-named reply queue; the worker finishes and publishes to the old name, which no longer exists. The message is dropped and the caller times out with no error anywhere. Every deploy puts every in-flight reply at risk
