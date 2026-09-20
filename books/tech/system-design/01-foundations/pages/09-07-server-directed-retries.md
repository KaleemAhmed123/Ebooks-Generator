## Server-directed retries

- The client's backoff math is a guess. The server knows exactly when it will be ready
- A server shedding load (429 Too Many Requests or 503 Service Unavailable) should return a **`Retry-After`** header. RFC 9110 allows this to be either an HTTP date or a number of seconds

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

- A smart client reads this header. If the server says wait 60 seconds, the client waits 60 seconds, bypassing its own exponential backoff calculation

### The clamp

- The server's hint is still a hint. If 1,000 clients all obey `Retry-After: 60` exactly, they will all retry at exactly T+60, creating a new storm
- Treat it as a floor, not a schedule: wait at least `Retry-After`, then add jitter, and clamp it to your own cap so a hostile or broken server cannot park you for a day

### The failure

- A client ignores the `Retry-After` header. The server is rate limiting the client, telling it to come back in an hour. The client's exponential backoff caps at 20 seconds. The client hammers the rate limiter every 20 seconds for an hour, wasting its own CPU, the network, and the server's ingress bandwidth
