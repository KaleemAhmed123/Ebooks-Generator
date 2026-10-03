# Resilience and Tail Latency

## Timeouts, retries, backoff, jitter

- Every remote call needs a **timeout**, for the Module 1 reason: a hang is indistinguishable from a death, and without a deadline a caller waits **forever**, holding a thread, a connection, and memory — until enough stuck calls exhaust the pool and the *caller* falls over because a *callee* was slow. A missing timeout is how one slow dependency takes down everything upstream of it.
- Timeouts must be **budgeted and propagated**: if a user request has 1 s, an inner call can't be allowed 5 s. Pass a **deadline** down the call chain (gRPC does this natively) so every hop knows how much time is left and stops working on a request the user already gave up on.
- **Retries** recover from *transient* failures — but done naively they cause the failure. When a service is struggling and everyone retries, it receives **2–3× its normal load exactly when it's weakest**, guaranteeing collapse. The disciplines that make retries safe:
  - **Exponential backoff** — wait 1×, 2×, 4× … between attempts, not a fixed tiny interval.
  - **Jitter** — randomize each delay. Without it, all clients that failed at the same instant retry at the *same* later instant — a synchronized **thundering herd**. Jitter smears them out.
  - **Cap attempts** and only retry **idempotent, retriable** errors (a 500 or timeout, never a 400). Retrying a non-idempotent call without an idempotency key (Module 7) double-charges.
  - **Retry budgets** — cap retries to a small fraction (say 10%) of normal traffic, so retries can never multiply load without bound.

:::warn
The **retry storm / metastable failure**: a brief blip makes some calls fail; clients retry; the retries add load; more calls fail; more retries — the system stays collapsed **even after the original trigger is gone**, held down by its own retry traffic. It often needs a human to shed load before it recovers. This is why "just add retries" is dangerous advice: retries without backoff, jitter, caps, and budgets convert a hiccup into an outage.
:::
