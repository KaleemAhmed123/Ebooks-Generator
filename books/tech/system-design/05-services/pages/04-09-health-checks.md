## Liveness vs readiness

- Two questions, two endpoints, two consequences. **Liveness**: "is this process stuck?" A failure means restart me. **Readiness**: "can this instance take traffic right now?" A failure means stop routing to me, and leave me running. Kubernetes probes both and acts on each differently, and the balancer (Module 7, page 5) reads the second

| | Liveness | Readiness |
| :--- | :--- | :--- |
| the question | is the process alive and able to run its event loop | is this instance able to serve: config loaded, caches warmed, not draining |
| on failure | the orchestrator kills and restarts the container | the instance leaves the Service's endpoints; no new requests; the process keeps running |
| checks | nothing but itself: return 200 if the handler ran | itself and its own startup state; never a shared dependency |
| cost of a false failure | a restart, and a fleet-wide restart if every instance fails together | an instance out of rotation, and a fleet-wide outage if every instance fails together |

```typescript
// shallow liveness; readiness reports this instance's own state, never a dependency's
let ready = false;                      // set true after config + warm-up, false on SIGTERM
app.get("/health/live", (_req, res) => res.status(200).send("ok"));
app.get("/health/ready", (_req, res) => res.status(ready ? 200 : 503).send(ready ? "ok" : "not ready"));
process.on("SIGTERM", () => { ready = false; /* then drain, Module 7 page 7 */ });
```

- A dependency's health is not this instance's readiness. If the database is down, every instance is equally unable; taking them all out gives a connection error instead of a `503` with a fallback (page 8), restarting them all gives the database a reconnect storm. A dependency's state is a metric and a degraded response (Module 6, page 8), never a probe result

### The failure

- A readiness or liveness check that queries the database. It blips for two seconds; every instance fails its probe in the same two seconds; the tier leaves rotation or restarts, and the database returns to a thousand simultaneous reconnects and falls over again. One outage became two, and the probe caused the second
