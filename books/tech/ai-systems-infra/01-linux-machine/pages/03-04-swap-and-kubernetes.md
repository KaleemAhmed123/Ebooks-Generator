## Swap, and why Kubernetes turned it off

- **Swap** lets the kernel spill cold anonymous pages to disk to free RAM, so a box can stay alive under pressure instead of OOM-killing immediately. The catch: a page on disk is roughly ten-thousand times slower to reach than one in RAM. If the *working set* no longer fits, the box **thrashes** — it spends its time paging in and out, CPU looks busy, throughput collapses, and latency falls off a cliff while the box still looks "up".
- That failure mode is why **Kubernetes historically required swap off**: the kubelet refused to start with swap enabled. Swap also breaks the clean memory accounting that **requests, limits, and QoS** depend on — a swapping pod hides its real memory pressure and gets unpredictable latency, so the scheduler's model stops matching reality.

:::note
2026 status: **Node swap (KEP-2400) reached GA in Kubernetes 1.34.** It did not flip the default — `NoSwap` is still the default, and the kubelet still errors if swap is simply left on with no config. Opt-in **`LimitedSwap`** gives swap only to **Burstable** pods, bounded in proportion to their memory request via cgroup v2; **Guaranteed** and **BestEffort** pods get none. Swap is now a deliberate, guard-railed choice — not the latency landmine that got it banned.
:::

- Practical rule: leave swap off on nodes unless you have a specific, measured reason and have read the guardrails. On your laptop and in dev containers swap is fine and useful; in a latency-sensitive production cluster, treat enabling it as a tuning decision, not a default.

### Module 3 — checkpoint
- **Key concepts:** virtual vs physical · pages & page faults · demand paging · page cache (read `available`) · RSS vs VSZ (vs PSS) · overcommit · OOM killer & `oom_score` · cgroup/memcg OOM → **OOMKilled / exit 137** · swap & thrashing · K8s NoSwap default (GA 1.34).
- **Task:** in a memory-limited container (`docker run -m 256m`), run a script that allocates and **touches** memory in a loop; watch it get OOM-killed, then confirm exit 137 and the RSS curve.
- **Questions:** Why does `malloc(1GB)` succeed instantly? Why is low "free" healthy? Leak vs too-low-limit — how do you tell? Why did K8s ban swap, and what changed in 1.34?
- **Next:** Module 4 — files, descriptors, and the event loop.
