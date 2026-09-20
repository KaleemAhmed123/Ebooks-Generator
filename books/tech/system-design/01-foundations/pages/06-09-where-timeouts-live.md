## One knob per layer

- Every layer in the request path has its own timeout. If you set one and leave the rest, the others default to "forever" or to a value you did not choose

| Layer | Knob | Node / Linux default |
|---|---|---|
| TCP connect | SYN retries | 6 retries ≈ 127 s |
| TLS | handshake timeout | varies by library |
| HTTP client headers | `headersTimeout` | undici: 300 s |
| HTTP client body | `bodyTimeout` | undici: 300 s |
| HTTP client connect | `connectTimeout` | undici: 10 s |
| HTTP server headers | `headersTimeout` | 60 s (408 + close) |
| HTTP server total | `requestTimeout` | 300 s |
| HTTP server idle | `keepAliveTimeout` | 5 s (Node 24) |
| Database statement | `statement_timeout` | 0 (Postgres: no limit) |

- A "2 s timeout" that only covers the response body does nothing if the connect phase takes 10 seconds on a dead host. Set all three: connect, headers/body, and total

### The failure

- A 2-second request timeout set on top of a 10-second connect timeout. The user sees a 10-second hang, not a 2-second one, because the connect timeout fires first. The request-level timeout only starts counting after the connection is open
- Read the defaults for your stack before shipping. If you see a `0` or a large number, it means "no limit." Replace it with a number derived from Module 9's guidance: the callee's p99.9 plus a margin
