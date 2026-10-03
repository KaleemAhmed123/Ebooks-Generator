# The Protocols Services Speak

## HTTP/1.1 and keep-alive

- HTTP is a **request/response** protocol: the client sends a method, path, headers, and optional body; the server returns a status, headers, and body. Originally each request opened a fresh TCP connection, paid the handshake (and later TLS), used it once, and closed it — brutal at scale.
- **HTTP/1.1 keep-alive** fixed the worst of it: the TCP connection **stays open** and carries many requests in sequence, so you pay the handshake once per connection, not once per request. This is the single biggest reason to reuse connections (Module 2's point, made concrete).
- But HTTP/1.1 sends **one request at a time per connection** — the response must come back before the next request goes out. **Pipelining** (firing the next request without waiting) was specified but broke on buggy proxies and application-level head-of-line blocking, so it's effectively dead.

:::note
The workaround baked into every browser: open **several parallel connections** per host (commonly ~6) to get concurrency, since one connection is serial. That's a hack with real costs — 6× the handshakes, 6× the slow-starts, 6× the server sockets — and removing the need for it is exactly what HTTP/2 set out to do. Keep this "one connection = serial" limit in mind; the next two pages are the industry escaping it.
:::
