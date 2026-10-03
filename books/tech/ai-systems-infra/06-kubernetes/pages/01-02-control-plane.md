## The control plane

- The **control plane** is the set of components that hold the desired state and run the reconcile loops. Four pieces, each with one job:

<svg viewBox="0 0 360 116" role="img" aria-label="Control plane: kubectl talks to the API server, which is the only component that reads and writes etcd; the scheduler and controller-manager also talk only through the API server" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="48" width="56" height="20" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="36" y="61" text-anchor="middle" font-size="6.4">kubectl</text>
  <rect x="104" y="44" width="92" height="28" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="150" y="56" text-anchor="middle" font-size="6.6" fill="#2a5db0">API server</text><text x="150" y="66" text-anchor="middle" font-size="5.4" fill="#777">authn/z · validate · the only door</text>
  <rect x="104" y="92" width="92" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="150" y="104" text-anchor="middle" font-size="6.4">etcd (state, Raft)</text>
  <rect x="232" y="20" width="118" height="18" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="291" y="32" text-anchor="middle" font-size="6.2">scheduler → assigns pods to nodes</text>
  <rect x="232" y="46" width="118" height="18" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="291" y="58" text-anchor="middle" font-size="6.2">controller-manager → loops</text>
  <rect x="232" y="72" width="118" height="18" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="291" y="84" text-anchor="middle" font-size="6.2">cloud-controller-manager</text>
  <path d="M64 58 L104 58" stroke="#1a1a1a" marker-end="url(#c2)"/>
  <path d="M150 72 L150 92" stroke="#1a1a1a" marker-end="url(#c2)"/><path d="M150 92 L150 72" stroke="#1a1a1a" marker-end="url(#c2)"/>
  <path d="M196 54 L232 29" stroke="#999" marker-end="url(#c2)"/><path d="M196 56 L232 55" stroke="#999" marker-end="url(#c2)"/><path d="M196 60 L232 81" stroke="#999" marker-end="url(#c2)"/>
  <defs><marker id="c2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **API server** — the front door and the *only* component that reads or writes etcd. Every request (from `kubectl`, a controller, a kubelet) goes through it: authenticate, authorise (RBAC — Booklet 11), validate, persist. Everything else talks to the cluster *through* the API server, never to etcd directly or to each other.
- **etcd** — the strongly-consistent key-value store that *is* the cluster's memory (Booklet 4's coordination store, running Raft from Booklet 3). Lose etcd and you lose desired state; it is the one component you back up. Odd member count (3 or 5) for quorum.
- **Scheduler** — watches for pods with no node assigned, scores every feasible node (resources, affinity, taints — Module 3), and writes the chosen node back. It only *decides*; the kubelet does the running.
- **Controller-manager** — one process running dozens of reconcile loops (Deployment, ReplicaSet, Job, Node, endpoints…). **cloud-controller-manager** holds the loops that call your cloud (provision a load balancer, attach a disk).

:::warn
Because the **API server is the only writer of etcd**, it is the cluster's throughput bottleneck and its blast radius. A controller with a hot loop (listing all pods every second), a huge object count, or an oversized `ConfigMap`/`Secret` can saturate the API server and etcd, and *everything* — scheduling, healing, your `kubectl`— slows or stalls. Watch API-server latency and etcd disk I/O as first-class signals (Booklet 8).
:::
