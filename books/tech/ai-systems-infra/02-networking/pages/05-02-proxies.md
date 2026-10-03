## Proxies — forward, reverse, sidecar

- A **proxy** is a server that sits in the middle of a connection and relays it, usually doing something useful on the way. The same software (Envoy, nginx, HAProxy) is called different things depending on **where it sits and whose side it's on**:
  - **Forward proxy** — in front of **clients**, controlling and inspecting **outbound** traffic. Corporate egress filtering, caching, and "all outbound goes through here" policies. The server doesn't know the real client.
  - **Reverse proxy** — in front of **servers**, the public face of your backends. It terminates TLS, load-balances (L7), caches responses, authenticates, and rate-limits — so your application servers do none of that. Every production web system has one.
  - **Sidecar proxy** — a reverse proxy per **workload**, deployed beside each app instance. The app talks to `localhost`; the sidecar handles mTLS, retries, routing, and metrics for it. This is the **data plane of a service mesh** (Istio/Linkerd), and it's how mTLS (Module 3) gets added without touching app code.

- Why this matters: a huge amount of infra work is **configuring proxies**. "Add a retry," "terminate TLS here," "route 5% to canary," "rate-limit this client" — all proxy config, not application code. Envoy in particular is the proxy under API gateways, service meshes, and Kubernetes Gateway implementations, so learning its model pays off repeatedly.

:::note
The 2026 direction (Module 6 and Booklet 6/11): sidecar proxies add a hop and memory per pod, so meshes are moving work into the **kernel with eBPF** (Cilium) and to **node-level** proxies (Istio **ambient** mode: a per-node ztunnel for L4 + mTLS, an optional waypoint for L7). Same proxy *functions*, fewer and cheaper *proxies*. The concepts here don't change; where the proxy runs does.
:::
