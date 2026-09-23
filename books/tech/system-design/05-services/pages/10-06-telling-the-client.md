## Telling the client

- A rejection the caller cannot interpret produces a retry loop. The status says what happened, `Retry-After` says when to come back, and the `RateLimit` fields let a well-written client slow down before it is rejected at all

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
RateLimit-Policy: "burst";q=100;w=60
RateLimit: "burst";r=0;t=30
```

- `429` is the only correct status. A `403` tells the client its credentials are wrong, so it stops and pages a human; a `500` tells it the server is broken, so its retry logic treats it as transient and may retry harder. Both send the caller down a path that cannot resolve
- The `RateLimit` fields come from `draft-ietf-httpapi-ratelimit-headers`, revision 11 dated 23 May 2026 — **an active Internet-Draft, not yet an RFC**, so the names can still move. `q` is the quota, `w` the window in seconds, `r` what remains, `t` the seconds until reset
- Sending them on *successful* responses is where the value is. A client that can see `r` falling has the information to pace itself, which turns limiting from a wall it hits into a signal it follows

### The failure

- A `429` with no `Retry-After`. The client knows it was refused and not when to return, so a reasonable implementation retries immediately — and a limiter that rejects cheaply now serves a tight loop from every throttled caller at once
- The limiter still works, in that it refuses the requests. But it is now absorbing far more traffic than the limit it enforces, and the callers doing this are not attackers: they are ordinary clients behaving sensibly with the only information they were given. Backoff and jitter are booklet 01's subject; `Retry-After` is how the server tells a client which of them to use
