## Request scheduling and priority

- Not all requests are equal. A paying user's chat, a free-tier query, and a background batch job all hit the same GPUs — and treating them identically means the batch job's giant prompt can delay the paying user. **Scheduling** decides who runs next; **admission control** decides who runs at all.
- Three policies stack on top of the engine's continuous batching:

| Policy | Does | For |
|---|---|---|
| **priority queues** | high-priority requests jump the line | tiered SLAs, paid vs free |
| **admission control** | reject/queue when the KV pool is near full | protect the goodput knee (17-18) |
| **fairness / quotas** | cap any one tenant's share | stop a noisy neighbour |

- **Priority is how you keep an SLO under mixed load.** Interactive traffic gets a high-priority lane; batch and background work get a low-priority lane that only fills spare capacity. The batch job still runs — it just yields to the user who is waiting.
- **Admission control is the pressure-release valve.** Past the goodput knee, admitting one more request degrades *everyone's* latency, so the right move is to *refuse* it (a fast 429 with a retry hint) rather than accept it and miss the SLO for the whole batch. Shedding load cleanly beats melting down.

:::note
This is where the KV-pool saturation signal (17-46) becomes an *action*, not just a dashboard: when occupancy nears the knee, admission control sheds low-priority load first and returns backpressure to callers. A server without admission control has only two states under overload — fine, then collapsed. With it, there is a third, essential state: *gracefully full*, serving its committed SLO to the traffic it admitted and politely refusing the rest.
:::
