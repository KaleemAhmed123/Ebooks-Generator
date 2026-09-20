## Telling the client

- When you reject a request, you must tell the client why, and exactly how long they need to wait before trying again
- Return HTTP `429 Too Many Requests`. Never return a `500 Internal Server Error` or a `403 Forbidden` for a rate limit, as this breaks standard client retry logic

````http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
RateLimit-Policy: "burst";q=100;w=60
RateLimit: "default";r=0;t=30
````

- The `Retry-After: 30` header tells the client to wait 30 seconds.
- The IETF `RateLimit` draft headers provide exact transparency. In the example above, the client knows the policy is "100 requests per 60 seconds", that they currently have "0 requests remaining", and that the bucket will reset in "30 seconds"

### The failure

- The failure is rejecting requests without a `Retry-After` header. If an automated client receives a 429 but has no idea when to retry, it might retry immediately in a tight loop. This turns a well-behaved client into an accidental DDoS attack (as discussed in Booklet 01)
- If you provide a `Retry-After` header, modern SDKs will automatically pause execution for that duration before retrying, instantly solving the overload problem
