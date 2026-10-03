## Requests, limits, and QoS

- Every container can declare **requests** and **limits** for CPU and memory, and they do two *different* jobs that people constantly conflate.
- **Requests are a reservation for the scheduler.** When placing a pod, the scheduler bin-packs by **requests**: it will only put the pod on a node with that much CPU/memory still unreserved. Requests don't cap usage — they reserve a floor and drive placement. Set them too high and nodes sit half-empty (wasted cost); too low and nodes get oversubscribed and pods fight.
- **Limits are a hard cap, enforced by cgroups** (Booklet 1). And the two resources behave *differently* at the limit:
  - **CPU is compressible** — hit the CPU limit and the container is **throttled** (slowed), not killed. Over-tight CPU limits show up as mysterious latency, not crashes.
  - **Memory is incompressible** — exceed the memory limit and the kernel **OOM-kills** the container (Booklet 1's OOM killer, scoped to the cgroup). This is the `OOMKilled` you see in `kubectl describe`.

<svg viewBox="0 0 360 88" role="img" aria-label="QoS classes: Guaranteed when requests equal limits, Burstable when requests are set below limits, BestEffort when nothing is set; eviction happens in reverse order" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="14" width="108" height="56" rx="4" fill="#e7efe9" stroke="#2f7d4f"/><text x="62" y="27" text-anchor="middle" font-size="6.4" fill="#2f7d4f">Guaranteed</text><text x="62" y="43" text-anchor="middle" font-size="5.8">requests = limits</text><text x="62" y="55" text-anchor="middle" font-size="5.4" fill="#777">evicted last</text>
  <rect x="126" y="14" width="108" height="56" rx="4" fill="#eaf1fb" stroke="#2a5db0"/><text x="180" y="27" text-anchor="middle" font-size="6.4" fill="#2a5db0">Burstable</text><text x="180" y="43" text-anchor="middle" font-size="5.8">requests &lt; limits</text><text x="180" y="55" text-anchor="middle" font-size="5.4" fill="#777">evicted next</text>
  <rect x="244" y="14" width="108" height="56" rx="4" fill="#fdecea" stroke="#c0392b"/><text x="298" y="27" text-anchor="middle" font-size="6.4" fill="#c0392b">BestEffort</text><text x="298" y="43" text-anchor="middle" font-size="5.8">nothing set</text><text x="298" y="55" text-anchor="middle" font-size="5.4" fill="#777">evicted first</text>
  <text x="180" y="83" text-anchor="middle" font-size="5.6" fill="#777">node under memory pressure → evict BestEffort, then Burstable over-request, then Guaranteed</text>
</svg>

- These settings assign a **QoS class** that decides who dies first when a *node* runs out of memory: **BestEffort** (no requests/limits) is evicted first, then **Burstable** (requests < limits), and **Guaranteed** (requests = limits for every container) last. Production workloads should be Guaranteed or carefully Burstable — never BestEffort.

:::warn
The two classic footguns. **Setting a memory limit too close to real usage** → periodic `OOMKilled` and CrashLoopBackOff under load spikes (memory can't be throttled, only killed). **Setting a CPU limit too low** → the app is throttled and p99 climbs while CPU graphs look *underused* — the limit, not the load, is the cause. Common guidance: set memory request = limit (avoid surprise OOM), set a CPU *request* but be cautious with a CPU *limit*. Always set **requests**, or the scheduler bin-packs blind and nodes get oversubscribed.
:::
