## eBPF for the network

- `tcpdump` captures packets but at a cost, and it can't easily answer aggregate questions like "what's the p99 TCP connect time to this service, per pod, right now?" **eBPF** (Booklet 1) attaches tiny programs to **network hooks in the kernel** — at the driver (**XDP**), at the traffic-control layer (**tc**), and at the socket — to measure and even act on traffic at line rate, with almost no overhead.
- What that buys you, as ready-made tools:
  - **`tcplife` / `tcpretrans` / `tcpconnlat`** (bcc/bpftrace) — every connection's lifetime and bytes, every retransmit (packet loss, the cause of mystery latency), and connect latency as a histogram — continuously, in production.
  - **Cilium + Hubble** — because Cilium is the eBPF **CNI** (the pod network, Booklet 6), Hubble can show the **actual service-to-service flows** in a cluster: who talked to whom, which calls were dropped by policy, and the latency of each — a live map of L3–L7 traffic without sidecars.
- This is the cluster-scale answer to Module 6's questions. "Why can't A reach B?" → Hubble shows the flow being **dropped** (and by which NetworkPolicy). "Why is p99 4s across AZs?" → eBPF latency histograms show the retransmits or the connect-time tail, per path, without guessing.

:::note
The same technology, three booklets: eBPF is the **CNI and policy** engine (Booklet 6), the **observability** source for flows and profiles (Booklet 8), and the **runtime-security** sensor (Booklet 11). It is steadily replacing sidecar proxies and `iptables` because it does the same work **in the kernel**, cheaper. Learn to *read* its output and a cluster's network stops being a black box.
:::

### Module 6 — checkpoint
- **Key concepts:** one tool per layer (`ping`/`mtr`, `dig`, `ss`/`nc`, `curl -v/-w`, `openssl`, `tcpdump`) · hypothesis-driven debugging · the `curl -w` phase breakdown · cross-AZ × N+1 = seconds · eBPF/Hubble for cluster-scale flows.
- **Task + questions:** `curl -w` a real endpoint and attribute its time to a phase; then say which tool confirms "port not open" and which phase points at a too-small pool.
