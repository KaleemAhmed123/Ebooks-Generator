# Module 9 - Retries, backoff, jitter

## What to retry

- When a call fails, the client must classify the error before retrying. Retrying a failure that is permanent is a waste of concurrency

| Class | HTTP Codes | Meaning | Action |
|---|---|---|---|
| **Transient** | 500, 502, 503, 504 | the server is struggling or network dropped | Retry soon, with backoff |
| **Throttling** | 429, 503 | the server is shedding load deliberately | Retry later, respecting headers |
| **Terminal** | 400, 401, 403, 404 | the request is malformed or forbidden | Never retry |

- Timeouts (Module 8) and connection resets are transient errors. They should be retried like a 503

### The failure

- Treating a `400 Bad Request` as retryable. The client sends a malformed payload. The server rejects it. The client retries it three times, sleeping in between, holding open a connection on its own side for a request that is mathematically guaranteed to fail every time
- This applies to database queries too: a deadlock is transient (retry), a syntax error is terminal (do not retry)
