## Backpressure and load shedding

- No system has infinite capacity, so every system must have a planned answer to "more work is arriving than I can handle." There are only two honest answers, and a system that implements **neither** fails the worst — by silently queueing until it runs out of memory and dies.
- **Backpressure** pushes the "slow down" signal **upstream**. A full bounded queue, a blocking `write` on a full socket buffer (Booklet 2), or an explicit "not ready" response tells the producer to ease off. The signal propagates back through the chain until the ultimate source throttles. This is the graceful answer when the producer *can* slow down (an internal pipeline, a stream consumer).
- **Load shedding** is the answer when it can't (public traffic doesn't take "slow down" for an answer): **reject excess work fast** — return `429 Too Many Requests`, drop low-priority requests, serve a degraded response — to protect the core. The principle is blunt and correct: **serving 80% of traffic well beats serving 100% of it into collapse.** Shed the cheap/low-value work first (health-check noise, retries, background jobs) and protect the requests that matter.

:::warn
**Unbounded queues are a latency-and-memory time bomb.** A queue with no limit "absorbs" a burst — and hides it — by growing: requests pile up, each now waiting behind a huge backlog, so **latency climbs without bound** while the queue eats memory until the process is **OOM-killed** (Booklet 1). The queue didn't add capacity; it converted "fast rejection" into "slow failure for everyone." **Always bound your queues**, and when the bound is hit, apply backpressure or shed — never queue forever. An unbounded queue is load shedding you refused to design, happening later and worse.
:::

- The design rule that ties the module together: decide, **explicitly and in advance**, your behaviour at the limit — bound every queue, set the shed threshold below the point where latency explodes (next page), and make the rejection fast and cheap. Overload is not an exceptional case to handle someday; it's a normal operating condition you design for on day one.
