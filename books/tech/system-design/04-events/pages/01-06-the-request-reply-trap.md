## The request-reply trap

- When developers first adopt a message broker, they often realize they *do* need the return value of the asynchronous function. So, they try to reinvent synchronous HTTP on top of the queue using **Request-Reply**
- They publish a message to a `requests` queue, attach a unique ID, and then block the thread waiting for a response on a `replies` queue

```typescript
// Rebuilding RPC on a broker (A very bad idea)
async function createUserAndGetId(userData) {
  const correlationId = uuidv4();
  
  // 1. Publish to the request queue, telling the worker where to reply
  await broker.publish('users.create', userData, {
    replyTo: 'users.replies',
    correlationId: correlationId
  });
  
  // 2. Block the HTTP request waiting for the broker!
  return new Promise((resolve, reject) => {
    // Listen to the reply queue and hope our ID comes back
    broker.consume('users.replies', (msg) => {
      if (msg.correlationId === correlationId) {
        resolve(msg.payload.newUserId);
      }
    });
    
    setTimeout(() => reject("Timeout!"), 5000);
  });
}
```

- This is the worst of both worlds. You have the complexity, eventual consistency, and operational burden of a message broker, but you have reintroduced the exact temporal coupling you were trying to escape. If the worker is slow, the HTTP request times out anyway

### The failure

- Waiting on a reply that never comes because the reply queue was recreated. In Request-Reply patterns, if the API server crashes and restarts, it often generates a new temporary reply queue. The worker finishes the job and sends the reply to the old queue, which no longer exists. The message is dropped into the void. If you need a synchronous response, use synchronous HTTP/gRPC. Do not force a queue to be an RPC framework
