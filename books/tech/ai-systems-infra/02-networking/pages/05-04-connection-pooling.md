## Connection pooling

- Every module so far points at one conclusion: **opening a connection is expensive** — a TCP handshake (1 RTT), a TLS handshake (another), and a cold congestion window that hasn't ramped. A **connection pool** pays that cost once and reuses a **bounded set** of warm connections for many requests, instead of opening one per request.
- Pooling does two jobs at once: it **amortises setup** (warm, already-ramped connections) and it **bounds load** — the pool size caps how many concurrent connections you make to an upstream, which protects both ends from the `TIME_WAIT`/port-exhaustion and fd-exhaustion failures from Module 2 and Booklet 1.
- **Sizing is the skill.** Too **small** a pool and requests queue behind the few connections, adding latency under load while the upstream sits idle. Too **large** and you overwhelm the upstream (and risk exhausting ports/fds), turning a client problem into a server outage. The right size follows from concurrency and latency — roughly Little's Law (Booklet 3): `connections ≈ request_rate × avg_service_time`.

:::warn
The classic pool outage: a service with a connection pool of 10 suddenly gets 200 concurrent requests. 190 requests **queue waiting for a connection**, so client-observed latency explodes — even though the database is barely busy and CPU is low everywhere. It looks like "the database is slow"; it's actually "the pool is too small for this concurrency." The opposite failure — an unbounded pool — floods the database with thousands of connections until *it* falls over. Both are sizing bugs, and both are invisible unless you measure **pool wait time**, not just upstream latency.
:::

### Module 5 — checkpoint
- **Key concepts:** L4 (connection, fast) vs L7 (request, smart) balancing · the gRPC/L4 pinning trap · forward/reverse/sidecar proxies (+ ambient/eBPF direction) · CDN + Anycast shorten distance · connection pooling (amortise + bound) and sizing via Little's Law.
- **Task:** set your HTTP client's pool to 1 and then to a sane size under a small load test (k6, Booklet 8) and watch p99 change; graph pool **wait time**.
- **Questions:** Why does gRPC need L7 balancing? What does a CDN fundamentally shorten? What are the two opposite ways to size a pool wrong?
- **Next:** Module 6 — debugging the network.
